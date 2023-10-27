function decodeHtmlCharCodes(str) { 
    return str.replace(/(&#(\d+);)/g, function(match, capture, charCode) {
      return String.fromCharCode(charCode);
    });
}

window.onload = async function() {
    

    const container = document.querySelector("#container");
    const aside = document.createElement("aside"); // kind of a navbar
    const main = document.createElement("container"); // where the main info will be

    aside.className = "main-elements"
    main.className = "main-elements"
    aside.id = "aside";
    main.id = "main";

    // aside.innerText = "aside";

    // MAIN -> exchangable div depending on the nav bar on the aside part 

    // PROFILE  (Ps al principio de las variables para saber que ser refieren a esta parte)
    // profile as h1
    // username and option to change email, password or log out

    const profile_div = document.createElement("div"); // appears when profile is pressed on the navbar
    const ph1 = document.createElement("h1"); //name of div //p de profile
    ph1.innerText = "Mi perfil";
    // para conseguir la info del user hacemos fetch a la pag, lo demás lo manejamos con python
    const res = await fetch(`http://localhost:5000/ajustes?get=user`)
    const data = await res.json()
    // console.log(data);

    const ph2 = document.createElement("h2"); //username
    ph2.innerText = data.name
    const phr1 = document.createElement("hr");
    const phr2 = document.createElement("hr");

    const user_info = document.createElement("div"); //email y demás
    user_info.id = "user-info"
    
    // EMAIL
    const email_div = document.createElement("div");
    email_div.id = "email-div";
    email_div.className = "user-info";
    // const eh3 = document.createElement("h3");
    // eh3.innerText = "Email";
    const pp = document.createElement("p");
    pp.innerText = `Email: ${data.email}`
    // change email button
    const btn_change_e = document.createElement("button");
    btn_change_e.innerText = "cambiar"; // desplegará un div con un input
    btn_change_e.id = "btn-email";
    const div_change_e = document.createElement("form");
    div_change_e.id = "form-e"
    div_change_e.style.display = "none";
    const einput = document.createElement("input");
    einput.name = "email";
    einput.type = "email";
    einput.placeholder = "nuevo email";
    einput.id = "email-input";

    btn_change_e.onclick = function() {
        div_change_e.style.display = div_change_e.style.display === "none"? "flex":"none";
    };
    const btn_save_e = document.createElement("button");
    btn_save_e.type = "button";
    btn_save_e.innerText = "guardar";
    div_change_e.append(einput,btn_save_e)
    btn_save_e.onclick = async function() {
        const eform = new FormData(div_change_e);
        const eres = await fetch(`http://localhost:5000/ajustes?change=email`, {
            method:"POST",
            body: eform
        })
        const edata = await eres.json()
        if (edata.success) {
            // window.location.reload()
            window.location.assign(`http://localhost:5000/ajustes?perfil`);
        }
        else {
            console.log(edata)
            const p_msg = document.createElement("p");
            p_msg.innerText = edata.msg;
            div_change_e.append(p_msg);
        };
    };
    email_div.append(pp,btn_change_e,div_change_e);

    // PASSWORD
    const passw_div = document.createElement("div");
    passw_div.id = "pass-div";
    passw_div.className = "user-info";
    const btn_change_pw = document.createElement("button");
    btn_change_pw.innerText = "cambiar contraseña";
    btn_change_pw.id = "btn-change-pw"
    const div_change_pw = document.createElement("form");
    div_change_pw.id = "change-pw"
    div_change_pw.style.display = "none";
    const cpwinput = document.createElement("input"); // current pw input
    const npwinput = document.createElement("input"); // new pw input
    const rnpwinput = document.createElement("input"); // repeat new pw input
    npwinput.className = "pw-input";
    cpwinput.className = "pw-input";
    rnpwinput.className = "pw-input";
    cpwinput.id = "current-pw";
    npwinput.id = "new-pw";
    rnpwinput.id = "repeat-pw";
    cpwinput.name = "current-pw";
    npwinput.name = "new-pw";
    rnpwinput.name = "repeat-pw";
    cpwinput.type = "password";
    npwinput.type = "password";
    rnpwinput.type = "password";
    const cpwlabel = document.createElement("label");
    const npwlabel = document.createElement("label");
    const rnpwlabel = document.createElement("label");
    cpwlabel.innerText = "Contraseña actual";
    npwlabel.innerText = "Nueva contraseña";
    rnpwlabel.innerText = "Repite la nueva contraseña";
    cpwlabel.setAttribute("for","current-pw");
    npwlabel.setAttribute("for","new-pw");
    rnpwlabel.setAttribute("for","repeat-pw");

    const info = document.createElement("p");
    info.innerText = "Al cambiar la contraseña se te redirigirá al inicio de sesión para que vuelvas a validar tus credenciales";
    
    const btn_save_pw = document.createElement("button");
    btn_save_pw.type = "button";
    btn_save_pw.innerText = "guardar"

    div_change_pw.append(cpwlabel,cpwinput,npwlabel,npwinput,rnpwlabel,rnpwinput,btn_save_pw)
    btn_change_pw.onclick = function() {
        div_change_pw.style.display = div_change_pw.style.display === "none"? "flex":"none";
    };

    // save new password
    btn_save_pw.onclick = async function() {
        const pwform = new FormData(div_change_pw);
        const pwres = await fetch(`http://localhost:5000/ajustes?change=password`, {
            method:"POST",
            body: pwform
        })
        const pwdata = await pwres.json()
        if (pwdata.success) {
            window.location.assign(`http://localhost:5000/home?logout=true`)
        }
        else {
            console.log(pwdata)
            const p_msg = document.createElement("p");
            p_msg.innerText = pwdata.msg;
            div_change_pw.append(p_msg);
        };
    };
    
    passw_div.append(btn_change_pw,info,div_change_pw);

    // botón de logout y botón eliminar usuario
    // hacemos un div para que estén juntos
    const footer = document.createElement("footer");
    footer.id = "footer"

    const btn_logout = document.createElement("button");
    btn_logout.type = "button";
    btn_logout.id = "btn-logout"
    btn_logout.innerText = "cerrar sesión";
    btn_logout.onclick = function() {
        window.location.assign("http://localhost:5000/home?logout=true")
    };

    const btn_delete_user = document.createElement("button");
    btn_delete_user.type = "button";
    btn_delete_user.id = "btn-delete-user";
    btn_delete_user.innerText = "eliminar usuario";
    btn_delete_user.onclick = async function() {
        confirmation = confirm("¿seguro que desea eliminar este usuario? se eliminarán también los paquetes y tarjetas asociados");
        if (confirmation) {
            const res = await fetch(`http://localhost:5000/ajustes?delete_user=true`);
            const delete_res = await res.json()
            if (delete_res.success) {
                window.location.assign("http://localhost:5000/welcome");
                console.log("usuario eliminado");
            };
        }
        else {
            console.log("operación cancelada");
        };
    };

    footer.append(btn_logout,btn_delete_user)
    user_info.append(email_div,passw_div,footer);

    profile_div.append(ph1,ph2,phr1,user_info);

    // TARJETAS igual que el profile pero mostrando las tarjetas del usuario
    // dos partes, un main y un aside. el main tendrá una tabla de info con todas las tarjetas y el aside tendrá una sistema de filtrado
    const overlay = document.createElement("div");
    overlay.className = "overlay";
    overlay.style.display = "none";

    const cards_div = document.createElement("div");
    cards_div.className = "cards-div";

    const cards_main = document.createElement("div");
    const cards_aside = document.createElement("div");
    cards_main.className = "card-parts";
    cards_main.id = "cards-main";
    cards_aside.className = "card-parts";
    cards_aside.id = "cards-aside";

    // SISTEMA DE FILTRADO DE TARJETAS POR PAQUETES

    const div_filter = document.createElement("section");
    div_filter.className = "aside section";
    div_filter.id = "filter";

    const btn_filter = document.createElement("button");
    btn_filter.id = "btn-filter";
    btn_filter.type = "button";
    btn_filter.innerText = "Filtrar";

    const filter_info = document.createElement("p");
    filter_info.innerText = "Filtrar por paquete"

    const filter_input = document.createElement("select");
    filter_input.className = "filter-input"
    const filter_res = await fetch(`http://localhost:5000/ajustes?get_pack_names=true`);
    const packages = await filter_res.json();
    console.log(packages);

    for (let pack of packages.packages) {
        const option = document.createElement("option");
        option.innerText = pack.name;
        option.value = pack.id;
        filter_input.append(option);
    };

    const no_option = document.createElement("option");
    no_option.innerText = "sin filtros";
    no_option.value = null;
    no_option.setAttribute("selected","true"); // por defecto no hay filtros
    filter_input.append(no_option)

    btn_filter.onclick = async function(){

        let uri = `http://localhost:5000/ajustes?filter_by_pack=${filter_input.value}`;
        if (filter_input.value === "null") {
            uri = `http://localhost:5000/ajustes?get=mycards`;
        };


        const filtered_res = await fetch(uri);
        const filtered_data = await filtered_res.json();
        console.log(filtered_data);

        cards_main.innerText = "";

        let count = 0
        for (let card of filtered_data.cards) {
            const single_card = document.createElement("div");
            single_card.className = "single-card"


            // div with button to delete card
            const div_delete_card = document.createElement("div");
            div_delete_card.className = "div-delete-card";
            const btn_delete_card = document.createElement("button");
            btn_delete_card.innerText = "x";
            btn_delete_card.className = "btn-delete-card";
            btn_delete_card.type = "button";
            btn_delete_card.onclick = async function() {
                await fetch(`http://localhost:5000/ajustes?delete_card=${card.id}`)
                // window.location.reload()
                window.location.assign(`http://localhost:5000/ajustes?tarjetas`);
            };

            div_delete_card.append(btn_delete_card);

            // div with card info
            const div_info_card = document.createElement("div");
            div_info_card.className = "div-info-card";
            const psidea = document.createElement("p");
            const info_hr = document.createElement("hr");
            const psideb = document.createElement("p");
            psidea.innerText = card.side_a;
            psideb.innerText = card.side_b;

            div_info_card.append(psidea,info_hr,psideb);

            // div with packs asociated with the cards
            const div_as_pack = document.createElement("div");
            div_as_pack.className = "div-as-pack";
            const p_pack = document.createElement("p");
            p_pack.innerText = "Paquetes: ";
            if (card.packages.length !== 0) {
                    for (let pack of card.packages) {
                        if (card.packages.indexOf(pack) === card.packages.length - 1) {
                            p_pack.innerText += `${pack.name}`;
                        }
                        else {
                            p_pack.innerText += `${pack.name}`;
                            p_pack.innerText += `, `;
                        };
                };
            }
            else {
                p_pack.innerText = 'Sin paquete';
            }
            div_as_pack.append(p_pack);

            // div edit
            const div_edit = document.createElement("div");
            div_edit.className = "div-edit";
            const btn_edit = document.createElement("button");
            btn_edit.className = "btn-edit";
            btn_edit.type = "button";
            btn_edit.innerText = "editar";

            btn_edit.onclick = function() {
                overlay.style.display = "flex";
                const edit_card_popup = document.createElement("div");
                edit_card_popup.className = "edit-card-popup";

                const left_card = document.createElement("div");
                left_card.className = "left-card";
                const psidea_edit = document.createElement("p");
                const psideb_edit = document.createElement("p");
                const hr_edit = document.createElement("hr");
                psidea_edit.innerText = card.side_a;
                psideb_edit.innerText = card.side_b;
                left_card.append(psidea_edit,hr_edit,psideb_edit);

                const right_card = document.createElement("div");
                right_card.className = "right-card";
                const edit_card_div = document.createElement("div");
                edit_card_div.className = "edit-card-div";
                const edit_pack_div = document.createElement("div");
                edit_pack_div.className = "edit-pack-div";

                const textareaa = document.createElement("textarea");
                const textareab = document.createElement("textarea");
                const edit_hr = document.createElement("hr");
                textareaa.placeholder = "cara a";
                textareab.placeholder = "cara b";
                edit_card_div.append(textareaa,edit_hr,textareab);

                const div_list_pack = document.createElement("div");
                div_list_pack.className = "div-list-pack";
                const h4 = document.createElement("h4");
                h4.innerText = "Paquetes";
                const packs_list = document.createElement("ul");

                const to_edit_pack_list = [];

                if (card.packages.length !== 0) {
                    for (let pack of card.packages) {
                        const li = document.createElement("li");
                        li.innerText = pack.name;
                        li.id = pack.id
                        li.title = "eliminar tarjeta del paquete"
                        const ecs = document.createElement("button");
                        ecs.type = "button";
                        ecs.innerText = "x";
                        ecs.className = "btn-delete-pack";

                        ecs.onclick = async function(){
                            ecs.parentNode.style.display = "none";
                            to_edit_pack_list.push({"delete":ecs.parentNode.id})
                            // console.log(to_edit_pack_list);
                        };

                    li.append(ecs);
                    packs_list.append(li);
                    };
                };
                const btn_add_pack = document.createElement("button");
                btn_add_pack.type = "button";
                btn_add_pack.innerText = "añadir paquete";
                btn_add_pack.className = "btn-add-pack"; 

                btn_add_pack.onclick = async function(){
                    const res = await fetch(`http://localhost:5000/ajustes?get_pack_names=true`);
                    const data = await res.json();
                    // console.log(data);
                    if (data.packages.length != card.packages.length){
                        const datalist = document.createElement("select");
                        datalist.id = `pack_name_${count}`;
                        for (let pack of data.packages) {
                            const option = document.createElement("option");
                            option.innerText = `${pack.name}`;
                            option.value = `${pack.id},${pack.name}`;
                            datalist.append(option);
                        };
                        const btn_add_to_list = document.createElement("button");
                        btn_add_to_list.type = "button";
                        btn_add_to_list.id = "btn-add-to-list";
                        btn_add_to_list.innerText = "confirmar";

                        div_list_pack.append(datalist,btn_add_to_list);
                        btn_add_pack.style.display = "none";

                        btn_add_to_list.onclick = function(){
                            to_edit_pack_list.push({"add":datalist.value.split(",")[datalist.value.split(",").length - 2]})
                            const li = document.createElement("li");
                            li.innerText = datalist.value.split(",")[datalist.value.split(",").length - 1];
                            li.id = datalist.value.split(",")[datalist.value.split(",").length - 2];
                            packs_list.append(li);
                            const ecs = document.createElement("button");
                            ecs.type = "button";
                            ecs.innerText = "x";
                            ecs.className = "btn-delete-pack";
                            ecs.onclick = function(){
                                ecs.parentNode.style.display = "none";
                                to_edit_pack_list.push({"delete":ecs.parentNode.id});
                                // console.log(to_edit_pack_list);
                            };
                            li.append(ecs);
                            datalist.style.display = "none";
                            btn_add_to_list.style.display = "none";
                            btn_add_pack.style.display = "block";
                        };
                    }
                    else {
                        const msg = document.createElement("p");
                        msg.innerText = "No quedan paquetes por añadir";
                        msg.className = "msg";
                        edit_pack_div.append(msg);
                        btn_add_pack.style.display = "none";
                    };
                };
                    

                div_list_pack.append(packs_list);
                edit_pack_div.append(h4,div_list_pack,btn_add_pack);

                right_card.append(edit_card_div,edit_pack_div);

                // buttons to save and cancel
                const div_edit_buttons = document.createElement("div");
                div_edit_buttons.className = "div-edit-buttons";
                const btn_cancel = document.createElement("button");
                btn_cancel.innerText = "cancelar";
                btn_cancel.className = "btn-cancel";
                btn_cancel.type = "button";
                btn_cancel.onclick = function() {
                    overlay.style.display = "none";
                    overlay.innerText = "";
                };
                const btn_save = document.createElement("button");
                btn_save.innerText = "guardar";
                btn_save.className = "btn-save";
                btn_save.type = "button";
                btn_save.onclick = async function() {
                    const form = new FormData();
                    form.append("side_a",textareaa.value)
                    form.append("side_b",textareab.value)
                    // console.log(to_edit_pack_list);
                    if (to_edit_pack_list.lenght !== 0) {
                        let cdelete_add = 0;
                        for (let item of to_edit_pack_list) {
                            // console.log(item);
                            for (const [key,value] of Object.entries(item)){
                                form.append(`${key}_${cdelete_add}`,value);
                                cdelete_add += 1;
                            };
                        };
                    };
                    const prueba = await fetch(`http://localhost:5000/ajustes?edit_card=${card.id}`, {
                        method:"PUT",
                        body:form
                    });
                    const prueba_json = await prueba.json();
                    // console.log(prueba_json);
                    // window.location.reload()
                    window.location.assign(`http://localhost:5000/ajustes?cards`);
                };

                div_edit_buttons.append(btn_save,btn_cancel);

                edit_card_popup.append(left_card,right_card);
                overlay.append(edit_card_popup,div_edit_buttons);
            };

            div_edit.append(btn_edit);
            single_card.append(div_delete_card,div_info_card,div_as_pack,div_edit);
            cards_main.append(single_card);
        };
    }; 

    div_filter.append(filter_info,filter_input,btn_filter);
    cards_aside.append(div_filter);



    // cada tarjeta será un div con el side_a y side_b, lista de paquetes asociados y botones de editar y eliminar
    const cres = await fetch(`http://localhost:5000/ajustes?get=mycards`);
    const cdata = await cres.json();
    // console.log(cdata);
    let count = 0;

    if (cdata.cards.length === 0) {
        cards_main.className = "no-cards";
        const p_404 = document.createElement("p");
        p_404.className = "no-cards";
        p_404.innerText = "Vaya parece que aún no tienes ninguna tarjeta. Pincha en el botón para crear una paquete.";
        const create_new = document.createElement("button");
        create_new.innerText = "Crear paquete";
        create_new.type = "button";
        create_new.onclick = function() {
            window.location.assign(`http://localhost:5000/mis_paquetes/nuevo`)
        };
        create_new.className = "no-cards"
        cards_main.append(p_404,create_new);
    };

    for (let card of cdata.cards) {
        const single_card = document.createElement("div");
        single_card.className = "single-card"


        // div with button to delete card
        const div_delete_card = document.createElement("div");
        div_delete_card.className = "div-delete-card";
        const btn_delete_card = document.createElement("button");
        btn_delete_card.innerText = "x";
        btn_delete_card.className = "btn-delete-card";
        btn_delete_card.type = "button";
        btn_delete_card.onclick = async function() {
            await fetch(`http://localhost:5000/ajustes?delete_card=${card.id}`)
            // window.location.reload()
            window.location.assign(`http://localhost:5000/ajustes?tarjetas`);
        };

        div_delete_card.append(btn_delete_card);

        // div with card info
        const div_info_card = document.createElement("div");
        div_info_card.className = "div-info-card";
        const psidea = document.createElement("p");
        const info_hr = document.createElement("hr");
        const psideb = document.createElement("p");
        psidea.innerText = card.side_a;
        psideb.innerText = card.side_b;

        div_info_card.append(psidea,info_hr,psideb);

        // div with packs asociated with the cards
        const div_as_pack = document.createElement("div");
        div_as_pack.className = "div-as-pack";
        const p_pack = document.createElement("p");
        p_pack.innerText = "Paquetes: ";
        if (card.packages.length !== 0) {
                for (let pack of card.packages) {
                    if (card.packages.indexOf(pack) === card.packages.length - 1) {
                        p_pack.innerText += `${pack.name}`;
                    }
                    else {
                        p_pack.innerText += `${pack.name}`;
                        p_pack.innerText += `, `;
                    };
            };
        }
        else {
            p_pack.innerText = 'Sin paquete';
        }
        div_as_pack.append(p_pack);

        // div edit
        const div_edit = document.createElement("div");
        div_edit.className = "div-edit";
        const btn_edit = document.createElement("button");
        btn_edit.className = "btn-edit";
        btn_edit.type = "button";
        btn_edit.innerText = "editar";

        btn_edit.onclick = function() {
            overlay.style.display = "flex";
            const edit_card_popup = document.createElement("div");
            edit_card_popup.className = "edit-card-popup";

            const left_card = document.createElement("div");
            left_card.className = "left-card";
            const psidea_edit = document.createElement("p");
            const psideb_edit = document.createElement("p");
            const hr_edit = document.createElement("hr");
            psidea_edit.innerText = card.side_a;
            psideb_edit.innerText = card.side_b;
            left_card.append(psidea_edit,hr_edit,psideb_edit);

            const right_card = document.createElement("div");
            right_card.className = "right-card";
            const edit_card_div = document.createElement("div");
            edit_card_div.className = "edit-card-div";
            const edit_pack_div = document.createElement("div");
            edit_pack_div.className = "edit-pack-div";

            const textareaa = document.createElement("textarea");
            const textareab = document.createElement("textarea");
            const edit_hr = document.createElement("hr");
            textareaa.placeholder = "cara a";
            textareab.placeholder = "cara b";
            edit_card_div.append(textareaa,edit_hr,textareab);

            const div_list_pack = document.createElement("div");
            div_list_pack.className = "div-list-pack";
            const h4 = document.createElement("h4");
            h4.innerText = "Paquetes";
            const packs_list = document.createElement("ul");

            const to_edit_pack_list = [];

            if (card.packages.length !== 0) {
                for (let pack of card.packages) {
                    const li = document.createElement("li");
                    li.innerText = pack.name;
                    li.id = pack.id
                    li.title = "eliminar tarjeta del paquete"
                    const ecs = document.createElement("button");
                    ecs.type = "button";
                    ecs.innerText = "x";
                    ecs.className = "btn-delete-pack";

                    ecs.onclick = async function(){
                        ecs.parentNode.style.display = "none";
                        to_edit_pack_list.push({"delete":ecs.parentNode.id})
                        // console.log(to_edit_pack_list);
                    };

                li.append(ecs);
                packs_list.append(li);
                };
            };
            const btn_add_pack = document.createElement("button");
            btn_add_pack.type = "button";
            btn_add_pack.innerText = "añadir paquete";
            btn_add_pack.className = "btn-add-pack"; 

            btn_add_pack.onclick = async function(){
                const res = await fetch(`http://localhost:5000/ajustes?get_pack_names=true`);
                const data = await res.json();
                // console.log(data);
                if (data.packages.length != card.packages.length){
                    const datalist = document.createElement("select");
                    datalist.id = `pack_name_${count}`;
                    for (let pack of data.packages) {
                        const option = document.createElement("option");
                        option.innerText = `${pack.name}`;
                        option.value = `${pack.id},${pack.name}`;
                        datalist.append(option);
                    };
                    const btn_add_to_list = document.createElement("button");
                    btn_add_to_list.type = "button";
                    btn_add_to_list.id = "btn-add-to-list";
                    btn_add_to_list.innerText = "confirmar";

                    div_list_pack.append(datalist,btn_add_to_list);
                    btn_add_pack.style.display = "none";

                    btn_add_to_list.onclick = function(){
                        to_edit_pack_list.push({"add":datalist.value.split(",")[datalist.value.split(",").length - 2]})
                        const li = document.createElement("li");
                        li.innerText = datalist.value.split(",")[datalist.value.split(",").length - 1];
                        li.id = datalist.value.split(",")[datalist.value.split(",").length - 2];
                        packs_list.append(li);
                        const ecs = document.createElement("button");
                        ecs.type = "button";
                        ecs.innerText = "x";
                        ecs.className = "btn-delete-pack";
                        ecs.onclick = function(){
                            ecs.parentNode.style.display = "none";
                            to_edit_pack_list.push({"delete":ecs.parentNode.id});
                            // console.log(to_edit_pack_list);
                        };
                        li.append(ecs);
                        datalist.style.display = "none";
                        btn_add_to_list.style.display = "none";
                        btn_add_pack.style.display = "block";
                    };
                }
                else {
                    const msg = document.createElement("p");
                    msg.innerText = "No quedan paquetes por añadir";
                    msg.className = "msg";
                    edit_pack_div.append(msg);
                    btn_add_pack.style.display = "none";
                };
            };
                

            div_list_pack.append(packs_list);
            edit_pack_div.append(h4,div_list_pack,btn_add_pack);

            right_card.append(edit_card_div,edit_pack_div);

            // buttons to save and cancel
            const div_edit_buttons = document.createElement("div");
            div_edit_buttons.className = "div-edit-buttons";
            const btn_cancel = document.createElement("button");
            btn_cancel.innerText = "cancelar";
            btn_cancel.className = "btn-cancel";
            btn_cancel.type = "button";
            btn_cancel.onclick = function() {
                overlay.style.display = "none";
                overlay.innerText = "";
            };
            const btn_save = document.createElement("button");
            btn_save.innerText = "guardar";
            btn_save.className = "btn-save";
            btn_save.type = "button";
            btn_save.onclick = async function() {
                const form = new FormData();
                form.append("side_a",textareaa.value)
                form.append("side_b",textareab.value)
                // console.log(to_edit_pack_list);
                if (to_edit_pack_list.lenght !== 0) {
                    let cdelete_add = 0;
                    for (let item of to_edit_pack_list) {
                        // console.log(item);
                        for (const [key,value] of Object.entries(item)){
                            form.append(`${key}_${cdelete_add}`,value);
                            cdelete_add += 1;
                        };
                    };
                };
                const prueba = await fetch(`http://localhost:5000/ajustes?edit_card=${card.id}`, {
                    method:"PUT",
                    body:form
                });
                const prueba_json = await prueba.json();
                // console.log(prueba_json);
                // window.location.reload()
                window.location.assign(`http://localhost:5000/ajustes?tarjetas`);
            };

            div_edit_buttons.append(btn_save,btn_cancel);

            edit_card_popup.append(left_card,right_card);
            overlay.append(edit_card_popup,div_edit_buttons);
        };

        div_edit.append(btn_edit);
        single_card.append(div_delete_card,div_info_card,div_as_pack,div_edit);
        cards_main.append(single_card);
    };

    cards_div.append(cards_aside,cards_main);

    // DIV THEME: para cambiar el theme de colores entre dark y light
    const theme_div = document.createElement("div");
    theme_div.className = "theme-div";

    const dark_div = document.createElement("div");
    dark_div.className = "themes";
    // dark_div.id = "dark";
    dark_div.setAttribute("id","dark");
    const dark_h2 = document.createElement("h2");
    dark_h2.innerText = "Tema oscuro";
    const dark_p = document.createElement("p");
    dark_p.innerText = decodeHtmlCharCodes("&#9790;")
    dark_div.append(dark_h2,dark_p);
    
    const light_div = document.createElement("div");
    light_div.className = "themes";
    light_div.id = "light";
    const light_h2 = document.createElement("h2");
    light_h2.innerText = "Tema claro";
    const light_p = document.createElement("p");
    light_p.innerText = decodeHtmlCharCodes('&#9788;');
    light_div.append(light_h2,light_p);

    if (window.localStorage.getItem("theme") === "light") {
        const body = document.querySelector("body");
        body.className = "light";
        light_div.classList.add("theme-selected"); // por defecto
        dark_div.classList.remove("theme-selected");
    }
    else {
        light_div.classList.remove("theme-selected");
        dark_div.classList.add("theme-selected");
    }

    // window.localStorage.setItem("theme","dark");

    theme_div.append(dark_div,light_div);

    $(document).ready(function() {
        $(".themes").click(function(){
            $(this).addClass("theme-selected");
            if ($(this).attr("id") === "light"){
                $("#dark").removeClass("theme-selected");
                window.localStorage.setItem("theme","light");
                window.location.reload();
            }
            else if ($(this).attr("id") === "dark"){
                $("#light").removeClass("theme-selected");
                window.localStorage.setItem("theme","dark");
                window.location.reload();
            };
        });
    });
    
    main.append(profile_div, cards_div, theme_div) // metemos ambos divs en el main

    // ASIDE barra de navegación, lista de botones
    
    const btn_aside_profile = document.createElement("button");
    btn_aside_profile.type = "button";
    btn_aside_profile.className = "btn-aside";
    btn_aside_profile.innerText = "PERFIL";
    
    const btn_aside_cards = document.createElement("button");
    btn_aside_cards.type = "button";
    btn_aside_cards.className = "btn-aside";
    btn_aside_cards.innerText = "TARJETAS";

    const btn_aside_theme = document.createElement("button");
    btn_aside_theme.type = "button";
    btn_aside_theme.className = "btn-aside";
    btn_aside_theme.innerText = "TEMAS";

    const uri = window.location.href;
    if (uri.split("?")[uri.split("?").length - 1] === "tarjetas") {
        profile_div.style.display = "none";
        cards_div.style.display = "flex";
        theme_div.style.display = "none";
        btn_aside_theme.classList.remove("showing");
        btn_aside_profile.classList.remove("showing");
        btn_aside_cards.classList.add("showing");
    }
    else if (uri.split("?")[uri.split("?").length - 1] === "perfil") {
        profile_div.style.display = "block";
        cards_div.style.display = "none";
        theme_div.style.display = "none";
        btn_aside_profile.classList.add("showing");
        btn_aside_theme.classList.remove("showing");
        btn_aside_cards.classList.remove("showing");
    }
    else if (uri.split("?")[uri.split("?").length - 1] === "temas") {
        profile_div.style.display = "none";
        cards_div.style.display = "none";
        theme_div.style.display = "flex";
        btn_aside_profile.classList.remove("showing");
        btn_aside_theme.classList.add("showing");
        btn_aside_cards.classList.remove("showing");
    };


    btn_aside_profile.onclick = function() {
        window.location.assign('http://localhost:5000/ajustes?perfil');
    };
    btn_aside_cards.onclick = function() {
        window.location.assign('http://localhost:5000/ajustes?tarjetas');
    };
    btn_aside_theme.onclick = function() {
        window.location.assign('http://localhost:5000/ajustes?temas');
    };

    
    
    aside.append(btn_aside_profile,btn_aside_cards,btn_aside_theme);
    container.append(aside,main,overlay);
};
window.onload = async function() {
    if (window.localStorage.getItem("theme") === "light") {
        const body = document.querySelector("body");
        body.className = "light"
    };

    const res = await fetch(`http://localhost:5000/mis_paquetes/nuevo?get=categories`);
    const cat_list = await res.json();
    console.log(cat_list);

    const main = document.querySelector("#main");
    const form = document.createElement("form");

    const div_name = document.createElement("div");
    const input_name = document.createElement("input");
    const label_name = document.createElement("label");
    label_name.innerText = "Nombre";

    label_name.setAttribute("for", "name");

    input_name.setAttribute("id", "name");
    input_name.setAttribute("required", true);
    input_name.setAttribute("name","pack_name");
    input_name.setAttribute("type","text");
    input_name.style.overflow = "auto"

    div_name.append(label_name);
    div_name.append(input_name);
    div_name.className = "left-div";
    div_name.setAttribute("id","name-input")

    const div_category = document.createElement("div");
    div_category.className = "left-div";
    div_category.setAttribute("id","category-input");

    const label_cat = document.createElement("label");
    const input_cat = document.createElement("input");

    label_cat.setAttribute("for","category");
    label_cat.innerText = "Categoría"
    input_cat.setAttribute("id","category");
    input_cat.setAttribute("required",true);
    input_cat.setAttribute("name","category")
    div_category.append(label_cat)
    div_category.append(input_cat)

    const div_existing_categories = document.createElement("div");
    div_existing_categories.className = "existing-categories";

    if (cat_list.categories[1].private.length > 0) {
        const div_private_categories = document.createElement("div");
        div_private_categories.className = "existing-categories";
        div_private_categories.setAttribute("id","private-categories")
        for (let category of cat_list.categories[1].private) {
            const btn_category = document.createElement("button");
            btn_category.setAttribute("type","button");
            btn_category.innerText = category["name"];
            btn_category.className = "cat-name";
            div_private_categories.append(btn_category);
    
            btn_category.onclick = function() {
                input_cat.value = category['name'];
                input_cat.setAttribute("value",category["name"]);
            };
        };
        const hr = document.createElement("hr");
        div_existing_categories.append(div_private_categories,hr);
    };

    const div_public_categories = document.createElement("div");
    div_public_categories.id = "public-categories"
    for (let category of cat_list.categories[0].public) {
        const btn_category = document.createElement("button");
        btn_category.setAttribute("type","button");
        btn_category.innerText = category["name"];
        btn_category.className = "cat-name";
        div_public_categories.append(btn_category);

        btn_category.onclick = function() {
            btn_category.style.border_color = "#dd7596";
            input_cat.value = category['name'];
            input_cat.setAttribute("value",category["name"])
        };
    };
    div_existing_categories.append(div_public_categories)
    div_category.append(div_existing_categories);

    const h2 = document.createElement("h2");
    h2.innerText = "Tarjetas"
    const div_cards = document.createElement("div");
    div_cards.className = "cards";
    let count = 1
    while (count < 6) {
        const single_card_div = document.createElement("div");
        single_card_div.className = "card-input";
        single_card_div.setAttribute("id",`card_${count}`);
        const input_a = document.createElement("input");
        input_a.setAttribute("placeholder","cara a");
        input_a.setAttribute("name",`side_a_${count}`);
        const input_b = document.createElement("input");
        input_b.setAttribute("placeholder","cara b");
        input_b.setAttribute("name",`side_b_${count}`);
        single_card_div.append(input_a,input_b);
        div_cards.append(single_card_div);
        count += 1;
    };
    const btn_card = document.createElement("button");
    btn_card.setAttribute("type","button");
    btn_card.setAttribute("id","btn-more-cards");
    btn_card.innerText = "añadir tarjeta";
    btn_card.onclick = function() {
        const single_card_div = document.createElement("div");
        single_card_div.className = "card-input";
        single_card_div.setAttribute("id",`card_${count}`);
        const input_a = document.createElement("input");
        input_a.setAttribute("placeholder","cara a");
        input_a.setAttribute("name",`side_a_${count}`);
        const input_b = document.createElement("input");
        input_b.setAttribute("placeholder","cara b");
        input_b.setAttribute("name",`side_b_${count}`);
        single_card_div.append(input_a,input_b);
        div_cards.append(single_card_div);
        count += 1;
    };

    const div_status = document.createElement("div");
    div_status.className = "left-div";
    div_status.setAttribute("id","status-input");
    const div_status_btn = document.createElement("div");
    div_status_btn.setAttribute("id","status-input-btn");
    const btn_public = document.createElement("button");
    btn_public.className = "btn-status"
    btn_public.setAttribute("id","btn-public");
    btn_public.setAttribute("type","button");
    btn_public.innerText = "público";
    let status_value = null;
    btn_public.onclick = function() {
        status_value = "public";
        btn_private.className = "btn-status";
        btn_public.classList.add("btn-clicked");
    };
    const btn_private = document.createElement("button");
    btn_private.className = "btn-status"
    btn_private.setAttribute("id","btn-private");
    btn_private.setAttribute("type","button");
    btn_private.innerText = "privado";
    btn_private.classList.add("btn-clicked"); // de primeras está el modo privado
    btn_private.onclick = function() {
        status_value = "private";
        btn_public.className = "btn-status";
        btn_private.classList.add("btn-clicked");
    };
    const status_span = document.createElement("span")
    status_span.innerText = "Status";
    div_status_btn.append(btn_public,btn_private);
    div_status.append(status_span,div_status_btn);

    // POPUP  ////// con las tarjetas ya existentes que se pueden añadir
    // le das a un botón y te sale una ventana emergente (un div) con un display de todas las tarjetas que ya están creadas
    // se seleccionan las que se quieran y se añaden al paquete

    const btn_existing_card = document.createElement("button");
    btn_existing_card.className = "btn-existing-card";
    btn_existing_card.type = "button";
    btn_existing_card.innerText = "consultar mis tarjetas";

    const overlay = document.createElement("div");
    overlay.className = "overlay";

    // aparte del titulo, el popup tendrá dos partes, las tarjetas y el boton de confimar
    const popup = document.createElement("div");
    popup.className = "popup"
    const popres = await fetch(`http://localhost:5000/ajustes?get=mycards`);
    const result = await popres.json();

    for (let card of result.cards) {
        const single_card = document.createElement("div");
        const p_sidea = document.createElement("p");
        const p_sideb = document.createElement("p");
        const pophr = document.createElement("hr");
        single_card.id = card.id

        single_card.className = "single-card";
        p_sidea.innerText = card.side_a;
        p_sideb.innerText = card.side_b;

        single_card.append(p_sidea,pophr,p_sideb);
        popup.append(single_card);
    };

    // botón de confirmación y cerrar ventana
    const btn_confirmation = document.createElement("button");
    btn_confirmation.type = "button";
    btn_confirmation.innerText = "confirmar";
    btn_confirmation.className = "btn-confirm";

    // popup.append(title,exisiting_cards, btn_confirmation);

    btn_confirmation.onclick = function(){
        overlay.style.display = "none";
    };

    let cards_to_add = [];

    $(document).ready(function() {
        $(".single-card").click(function(){
            if ($(this).hasClass("card-selected")) {
                $(this).removeClass("card-selected");
                cards_to_add = cards_to_add.filter(card => card !== $(this).attr('id'));
                console.log(cards_to_add);
            }
            else {
                $(this).addClass("card-selected");
                cards_to_add.push($(this).attr('id'));
                console.log(cards_to_add);
            };
        });
    });



    overlay.style.display = "none";
    btn_existing_card.onclick = function() {overlay.style.display = "flex"};
    overlay.append(popup, btn_confirmation);

    // btn submit, creamos el paquete haciendo el fetch con toda la info

    const btn_submit = document.createElement("button");
    btn_submit.setAttribute("id","btn-submit")
    btn_submit.setAttribute("type","button");
    btn_submit.innerText = "Crear";

    btn_submit.onclick = async function() {
        const submit_form = new FormData();
        for (let elem of form) {
            if (elem.value) {
                submit_form.append(elem.name, elem.value);
            };
        };
        submit_form.append("status",status_value);
        let count = 0
        for (let item of cards_to_add){
            submit_form.append(`exist_${count}`,item);
            count += 1
        };
        console.log(submit_form)
        const answer = await fetch(`http://localhost:5000/mis_paquetes/nuevo`, {
            method: "POST",
            body: submit_form
        });
        const result = await answer.json()
        console.log(result)
        if (result.success) {
            window.location.assign("http://localhost:5000/mis_paquetes");
        }
        else {
            if (result.lasting_input === "category"){
                if (input_cat.style.borderColor !== "red"){
                    input_cat.style.borderColor = "red";
                    const msg = document.createElement("p");
                    msg.className = "msg";
                    msg.innerText = result.msg;
                    div_category.append(msg);
                };
            }
            if (result.lasting_input === "card"){
                if (div_cards.style.borderColor !== "red") {
                    div_cards.style.borderColor = "red";
                    const msg = document.createElement("p");
                    msg.className = "msg";
                    msg.innerText = result.msg;
                    div_cards.append(msg);
                };
            }
            if (result.lasting_input === "name") {
                if (input_name.style.borderColor !== "red"){
                    input_name.style.borderColor = "red";
                    const msg = document.createElement("p");
                    msg.className = "msg";
                    msg.innerText = result.msg;
                    div_name.append(msg);
                };
            };
        };
    };

    const left_div = document.createElement("section");
    left_div.setAttribute("id","left-section")
    const right_div = document.createElement("section");
    right_div.setAttribute("id","right-section")
    const btn_div = document.createElement("section");
    btn_div.setAttribute("id","down-section")
    
    left_div.append(div_name, div_category,div_status);
    right_div.append(h2,div_cards,btn_card,btn_existing_card);
    btn_div.append(btn_submit);
    form.append(left_div,right_div);

    main.append(form,btn_div,overlay);
};


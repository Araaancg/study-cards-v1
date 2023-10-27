window.onload = async function() {
    if (window.localStorage.getItem("theme") === "light") {
        const body = document.querySelector("body");
        body.className = "light"
    };

    res = await fetch(`http://localhost:5000/mis_paquetes`, {
        method:"POST"
    });
    const data = await res.json();

    console.log(data);

    const main = document.querySelector("#main");
    const main_div = document.createElement("div");
    main_div.className = "packages";

    const h1 = document.querySelector("h1");
    main_div.append(h1);

    const all_packages = document.createElement("div");
    all_packages.className = "all-packages";

    if (data.packages.length === 0) {
        const p_404 = document.createElement("p");
        p_404.className = "no-packs";
        p_404.innerText = "Vaya parece que aún no tienes ningún paquete. Pincha en el botón de 'nuevo paquete' para crear uno";
        all_packages.append(p_404);
    };

    for (pack of data.packages) {
        const sub_div = document.createElement("div");
        sub_div.className = "single-package"
        sub_div.setAttribute("id",pack.id);
        const a = document.createElement("a");
        a.className = "link-a"
        a.href = `http://localhost:5000/mis_paquetes/${pack.id}`
        const h2 = document.createElement("h2");
        h2.innerText = pack.name

        a.append(h2)
        const hr = document.createElement("hr");

        const span_cat = document.createElement("span");
        span_cat.innerText = `Categoría: ${pack.category.name}`

        const btn_cards = document.createElement("button");
        btn_cards.innerText = "tarjetas";
        sub_div.append(a,hr,span_cat);

        const table = document.createElement("table");
        const thead = document.createElement("thead");
        const tbody = document.createElement("tbody");

        const th_a = document.createElement("th");
        const th_b = document.createElement("th");
        th_a.innerText = "Cara A";
        th_b.innerText = "Cara B";
        thead.append(th_a,th_b)
        
        let number_cards = 0;

        for (card of pack.cards) {
            const tr = document.createElement("tr");
            const td_a = document.createElement("td");
            td_a.innerText = card.side_a;
            const td_b = document.createElement("td");
            td_b.innerText = card.side_b;
            tr.append(td_a,td_b);
            tbody.append(tr);
            number_cards += 1
        };
        const span_number = document.createElement("span")
        span_number.innerText = `Nº tarjetas: ${number_cards}`
        const info_pack = document.createElement("div");
        info_pack.className = "info-pack";
        info_pack.append(span_cat,span_number);
        table.append(thead,tbody);
        sub_div.append(info_pack,btn_cards,table);
        table.style.display = "none";

        btn_cards.onclick = function() {
            if (table.style.display !== "none") {
                table.style.display = "none";
            }
            else {
                table.style.display = "block";
            };
        };
        all_packages.append(sub_div)
    };
    main_div.append(all_packages);

    // ASIDE
    // dos partes: crear un nuevo paquete y filtrar los paquetes
    const aside = document.createElement("aside")
    aside.className = "aside";

    // crear un nuevo paquete
    const div_create = document.createElement("section");
    div_create.className = "aside section";
    div_create.id = "create";
    const btn_create_new = document.querySelector("#btn-create-new");
    btn_create_new.onclick = function() {
        window.location.assign("http://localhost:5000/mis_paquetes/nuevo");
    };
    const create_info = document.createElement("p");
    create_info.innerText = "¡Añade un paquete a la colección!"
    div_create.append(create_info,btn_create_new);

    // SISTEMA DE FILTRADO
    const div_filter = document.createElement("section");
    div_filter.className = "aside section";
    div_filter.id = "filter";

    const btn_filter = document.createElement("button");
    btn_filter.id = "btn-filter";
    btn_filter.type = "button";
    btn_filter.innerText = "Filtrar";

    const filter_info = document.createElement("p");
    filter_info.innerText = "Filtrar por categoría"

    const filter_input = document.createElement("select");
    filter_input.className = "filter-input"
    const filter_res = await fetch(`http://localhost:5000/mis_paquetes/nuevo?get=categories`);
    const categories = await filter_res.json();

    for (let category of categories.categories[0].public) {
        const option = document.createElement("option");
        option.innerText = category.name;
        option.value = category.id;
        filter_input.append(option);
    };

    for (let category of categories.categories[1].private) {
        const option = document.createElement("option");
        option.innerText = category.name;
        option.value = category.id;
        filter_input.append(option);
    };

    const no_option = document.createElement("option");
    no_option.innerText = "sin filtros";
    no_option.value = null;
    no_option.setAttribute("selected","true"); // por defecto no hay filtros
    filter_input.append(no_option)

    btn_filter.onclick = async function(){
        const filtered_res = await fetch(`http://localhost:5000/mis_paquetes?filter=${filter_input.value}`);
        const filtered_data = await filtered_res.json();
        console.log(filtered_data);

        all_packages.innerText = "";

        for (pack of filtered_data.packages) {
            const sub_div = document.createElement("div");
            sub_div.className = "single-package"
            sub_div.setAttribute("id",pack.id);
            const a = document.createElement("a");
            a.className = "link-a"
            a.href = `http://localhost:5000/mis_paquetes/${pack.id}`
            const h2 = document.createElement("h2");
            h2.innerText = pack.name
    
            a.append(h2)
            const hr = document.createElement("hr");
    
            const span_cat = document.createElement("span");
            span_cat.innerText = `Categoría: ${pack.category.name}`
    
            const btn_cards = document.createElement("button");
            btn_cards.innerText = "tarjetas";
            sub_div.append(a,hr,span_cat);
    
            const table = document.createElement("table");
            const thead = document.createElement("thead");
            const tbody = document.createElement("tbody");
    
            const th_a = document.createElement("th");
            const th_b = document.createElement("th");
            th_a.innerText = "Cara A";
            th_b.innerText = "Cara B";
            thead.append(th_a,th_b)
            
            let number_cards = 0;
    
            for (card of pack.cards) {
                const tr = document.createElement("tr");
                const td_a = document.createElement("td");
                td_a.innerText = card.side_a;
                const td_b = document.createElement("td");
                td_b.innerText = card.side_b;
                tr.append(td_a,td_b);
                tbody.append(tr);
                number_cards += 1
            };
            const span_number = document.createElement("span")
            span_number.innerText = `Nº tarjetas: ${number_cards}`
            const info_pack = document.createElement("div");
            info_pack.className = "info-pack";
            info_pack.append(span_cat,span_number);
            table.append(thead,tbody);
            sub_div.append(info_pack,btn_cards,table);
            table.style.display = "none";
    
            btn_cards.onclick = function() {
                if (table.style.display !== "none") {
                    table.style.display = "none";
                }
                else {
                    table.style.display = "block";
                };
            };
            all_packages.append(sub_div)
        };
    }; 

    div_filter.append(filter_info,filter_input,btn_filter);

    aside.append(div_create,div_filter);

    main.append(aside,main_div);
};
window.onload = function() {
    if (window.localStorage.getItem("theme") === "light") {
        const body = document.querySelector("body");
        body.className = "light";
    };

    const main = document.querySelector("#main");

    //tres divs que reflejen lo que se puede hacer en esta app

    const create = document.createElement("div");
    const study = document.createElement("div");
    const share = document.createElement("div");
    
    create.className = "main create";
    study.className = "main study";
    share.className = "main share";

    // en cada uno va a haber titulo, texto y foto
    const createh2 = document.createElement("h2");
    const studyh2 = document.createElement("h2");
    const shareh2 = document.createElement("h2");

    createh2.innerText = "CREA";
    studyh2.innerText = "ESTUDIA";
    shareh2.innerText = "COMPARTE";

    const createp = document.createElement("p");
    const studyp = document.createElement("p");
    const sharep = document.createElement("p");

    createp.innerText = `
        Inicia sesión y comienza a crear. Podrás transformar todas 
        esas hojas de vocabulario y texto a estudiar en flash-cards, creando 
        paquetes de vocabulario para estudiar.
    `;
    studyp.innerText = `
        Una vez creados tus paquetes pordrás acceder al apartado de flash-cards,
        donde te encontrarás con todas tus tarjetas preparadas para una sesión de estudio.
        Podrás cambiar el orden y muchos ajustes más para adpatarte a cada situación!
    `;
    sharep.innerText = `
        Tendrás la oportunidad de ser parte de una comunidad de estudiantes y ayudaros unos a otros.
        Los paquetes se podrán hacer públicos para dejar al mundo las tarjetas que has creado. Quien sabe,
        a lo mejor hay alguien estudiando el mismo vocabulario que tú y os podeís echar un mano.
    `;

    const prox = document.createElement("span");
    prox.innerText = "próximamente";
    prox.className = "prox";

    create.append(createh2,createp);
    study.append(studyh2,studyp);
    share.append(prox,shareh2,sharep);

    main.append(create,study,share);

};
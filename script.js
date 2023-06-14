let bundeslaender = [];



async function init() {
    await loadJson();
    render();

};


async function loadJson() {
    let url = './bundesland.json';
    let response = await fetch(url);
    bundeslaender = await response.json();
};



function render() {
    let content = document.getElementById('content');
    content.innerHTML = '';

    for (let i = 0; i < bundeslaender.length; i++) {
        const element = bundeslaender[i];

        content.innerHTML += /*html*/`
            ${templateBundesland(i)}
        `
    };
};


function templateBundesland(i) {
    return /*html*/`
        <a class="bundesland" id="bundesland${i}" href="${bundeslaender[i]['url']}">
            <h3>${bundeslaender[i]['name']}</h3>
            <p>${bundeslaender[i]['population']} Millionen</p>
    
        </a>


    `;
};



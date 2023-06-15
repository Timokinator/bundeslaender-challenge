let bundeslaender = [];
let letters = [];


async function init() {
    await loadJson();
    await loadLetters();
    renderBundeslaender();
    renderLetters();
};


async function loadJson() {
    let url = './bundesland.json';
    let response = await fetch(url);
    bundeslaender = await response.json();
};


function loadLetters() {
    for (let i = 0; i < bundeslaender.length; i++) {
        const name = bundeslaender[i]['name'];
        letter = name.slice(0,1);        
        letters.push(letter);
    };
    letters = [...new Set(letters)];
};


function renderBundeslaender() {
    let content = document.getElementById('content');
    content.innerHTML = '';

    for (let i = 0; i < bundeslaender.length; i++) {
        const element = bundeslaender[i];

        content.innerHTML += templateBundesland(i)
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


function renderLetters() {
    let content = document.getElementById('letters');
    content.innerHTML = '';

    for (let i = 0; i < letters.length; i++) {
        const letter = letters[i];
        
        content.innerHTML += templateLetters(letter);
    };

    content.innerHTML += /*html*/`
        <div onclick="renderBundeslaender()" style="width: 45px" id="alle" class="letter">Alle</div>
    `;
};


function templateLetters(letter) {
    return /*html*/`
        <div onclick="showOnly('${letter}')" id="letter${letter}" class="letter">${letter}</div>
    `;
};


function showOnly(letter) {
content = document.getElementById('content');
content.innerHTML = '';

    for (let i = 0; i < bundeslaender.length; i++) {
        const name = bundeslaender[i]['name'];
        const firstLetter = name.slice(0,1);

        if (firstLetter == letter) {
            content.innerHTML += templateBundesland(i)            
        };        
    };
};

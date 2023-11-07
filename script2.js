//Display Pokémon info of pressed Pokémon from API. Get ID from localstorage or sessionstorage.

let pokeN = localStorage.getItem("pokeID");

async function loadPokemon() {
    await fetchAbilities();
    displayAbilities();
}

loadPokemon();

function homePage() {
    window.location.href = "index.html";
}

async function fetchAbilities() {
    try {
        response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeN}/`);
        imageData = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeN}.png`;
        data = await response.json();
        console.log(data);
    } catch (err) {
        console.log("Failed to Fetch");
    }
}

function displayAbilities() {
    showAbilities(data.forms[0].name + ` #${pokeN}`);
}

function showAbilities(name) {

    let backButton = document.createElement("button");
    backButton.innerHTML = "Go Back";
    backButton.className = "cButton";

    let nameElement = document.createElement("h1");
    nameElement.innerHTML = name;

    let imgElement = document.createElement("img");
    imgElement.style.width = "100px";
    imgElement.style.display = "block";
    imgElement.style.margin = "0 auto";
    imgElement.id = imageData;
    imgElement.className = "image";
    imgElement.src = imageData;

    let typeElement = document.createElement("p");
    if (data.types.length == 1) {
        typeElement.innerHTML = "Type: " + data.types[0].type.name;
    } else typeElement.innerHTML = "Type: " + data.types[0].type.name + ", " + data.types[1].type.name;

    let moveElement = document.createElement("p");
    moveElement.innerHTML = "Moves: " + data.moves[0].move.name + ", " + data.moves[1].move.name + ", " + data.moves[2].move.name;

    let weightElement = document.createElement("p");
    weightElement.innerHTML = "Weight: " + data.weight;

    let heightElement = document.createElement("p");
    heightElement.innerHTML = "Height: " + data.height;


    backButton.onclick = function (e) {
        homePage();
    }

    let divElement = document.createElement("div");
    divElement.style.border = "solid";
    divElement.style.borderWidth = "1px";
    divElement.appendChild(backButton);
    divElement.appendChild(imgElement);
    divElement.appendChild(nameElement);
    divElement.appendChild(typeElement);
    divElement.appendChild(moveElement);
    divElement.appendChild(weightElement);
    divElement.appendChild(heightElement);

    document.getElementsByClassName("container")[0].appendChild(divElement);
    if (data.types.length == 1) {
        document.getElementsByClassName("pageTitle")[0].classList.add(data.types[0].type.name);
        document.getElementsByClassName("bottomColor")[0].classList.add(data.types[0].type.name);
    } else {
        document.getElementsByClassName("pageTitle")[0].classList.add(data.types[0].type.name);
        document.getElementsByClassName("bottomColor")[0].classList.add(data.types[1].type.name);
    }
}
let nameData, imgN = 0;
let imageData = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png`;

async function loadPokemon() {
    await fetchPokemon();
    displayPokemon();
}

loadPokemon();

function infoPage(id) {
    localStorage.setItem("pokeID", id);
    window.location.href = "pokeinfo.html";
    console.log(id);
}

async function fetchPokemon() {
    try {
        response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=151`);
        nameData = await response.json();
    } catch (err) {
        console.log("Failed to Fetch");
    }
}

function displayPokemon() {
    //document.getElementsByClassName("container")[0].innerHTML = data.results[0].name;
    for (let i = 0; i < nameData.results.length; i++) {
        nextPokemon(nameData.results[i].name + ` #${i+1}`);
        imageData = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${i+2}.png`;
    }
}

function imgID() {
    return imgN++;
}

function nextPokemon(name) {
    imgID();

    let pElement = document.createElement("p");
    pElement.innerHTML = name;

    let imgElement = document.createElement("img");
    imgElement.style.width = "100px";
    imgElement.style.display = "block";
    imgElement.style.margin = "0 auto";
    imgElement.id = imgN;
    imgElement.className = "image";
    imgElement.src = imageData;

    imgElement.onclick = function (e) {
        infoPage(imgElement.id);
    }

    let divElement = document.createElement("div");
    divElement.style.border = "solid";
    divElement.style.borderWidth = "1px";
    divElement.appendChild(pElement);
    divElement.appendChild(imgElement);

    document.getElementsByClassName("container")[0].appendChild(divElement);
}
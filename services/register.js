var listaCompleta = document.getElementById("listaCompleta");
let infoHd = document.getElementById("infoHd");

var hdList = JSON.parse(localStorage.getItem("hdList")) || [];
loadData();

class Hd {
    constructor(numSerie, marca, armazenamento, tipo) {
        this.numSerie = numSerie;
        this.marca = marca;
        this.armazenamento = armazenamento;
        this.tipo = tipo;
    }
}

function verificar() {
    let numSerie = document.getElementById('numSerie');
    let marca = document.getElementById('marca');
    let armazenamento = document.getElementById('armazenamento');
    let tipo = document.getElementById('tipo');

    if (!numSerie.value) {
        alert("Erro, você deve informar o número de série");
        return;
    } else if (!marca.value) {
        alert("Erro, você deve informar a marca");
        return;
    } else if (!armazenamento.value) {
        alert("Erro, você deve informar o armazenamento");
        return;
    } else if (!tipo.value) {
        alert("Erro, você deve informar o tipo");
        return;
    }

    if (hdList.find((h) => numSerie.value == h.numSerie)) {
        alert("Erro, este número de série já está cadastrado");
        return;
    }

    let hd = new Hd(numSerie.value, marca.value, armazenamento.value, tipo.value);
    hdList.push(hd);
    loadData();
    numSerie.value = "";
    marca.value = "";
    armazenamento.value = "";
    tipo.value = "";
    alert("HD cadastrado com sucesso!");
}

function loadData() {
    let novaLista = "";

    hdList.forEach((hd, index) => {
        novaLista += `<li class="flex p-3 rounded justify-between items-center border w-full">
            <h4 class="font-semibold">${hd.numSerie}</h4>
            <div>
                <button onclick="viewInfo(${index})" class="py-2 px-3 rounded bg-blue-500">Ver</button>
                <button onclick="excluir(${index})" class="py-2 px-3 rounded bg-red-500">Excluir</button>
            </div>
        </li>`;


    });

    listaCompleta.innerHTML = novaLista;


    if (hdList.length === 0) {
        listaCompleta.innerHTML = "";
    }

    saveData();
}

function viewInfo(index) {
    if (infoHd.style.display === "none") {
        infoHd.style.display = "block";
    } else {
        infoHd.style.display = "none";
    }
    switchInfo(index);
}

function switchInfo(index) {
    infoHd.innerHTML = `
        <button onclick="viewInfo()">
                <img src="../images/exit-icon.svg" class="w-8 absolute right-6 top-6">
        </button>
        <h2 class="text-2xl font-semibold mb-4">${hdList[index].numSerie}</h2>
        <p class="text-lg"><strong>Marca:</strong> ${hdList[index].marca}</p>
        <p class="text-lg"><strong>Armazenamento:</strong> ${hdList[index].armazenamento}</p>
        <p class="text-lg"><strong>Tipo:</strong> ${hdList[index].tipo}</p>
    `;
}

function excluir(index) {
    hdList.splice(index, 1);
    loadData();
}

function search() {
    let search = document.getElementById("search").value;

    var hd = hdList.find((hd) => search == hd.numSerie);

    if (!hd) {
        alert("HD não encontrado!");
    } else {
        viewInfo(hdList.indexOf(hd));
    }
}


function saveData() {
    localStorage.setItem("hdList", JSON.stringify(hdList));
}
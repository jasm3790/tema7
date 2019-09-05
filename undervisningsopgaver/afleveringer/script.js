document.addEventListener("DOMContentLoaded", start);
const url = "https://spreadsheets.google.com/feeds/list/17Dd7DvkPaFamNUdUKlrFgnH6POvBJXac7qyiS6zNRw0/od6/public/values?alt=json";
let kategorier;
let filter = "alle";

function start() {
    const filterKnapper = document.querySelectorAll("nav button");
    filterKnapper.forEach(knap => knap.addEventListener("click", filtrerKategorier));
    document.querySelector("#detalje").style.display = "none";
    skjulDetalje();
    loadData();
}

function filtrerKategorier() {
    filter = this.dataset.kategori;
    document.querySelector(".valgt").classList.remove("valgt");
    this.classList.add("valgt");
    vis();
}

async function loadData() {
    const response = await fetch(url);
    kategorier = await response.json();
    vis();
}

function vis() {

    const skabelon = document.querySelector("template").content;
    const dest = document.querySelector("#mad-liste");
    dest.textContent = "";
    kategorier.feed.entry.forEach(kategori => {
        if (kategori.gsx$kategori.$t == filter || filter == "alle") {

            //klone skabelon
            const klon = skabelon.cloneNode(true);

            console.log(klon);
            const h2 = klon.querySelector("h2");
            h2.textContent = kategori.gsx$navn.$t;



            const p1 = klon.querySelector("p");
            const p2 = klon.querySelector("p + p");
            const p3 = klon.querySelector("p + p + p");

            const img = klon.querySelector("img");
            img.src = "imgs/small/" + kategori.gsx$billede.$t + "-sm.jpg";
            img.alt = "Billede af " + kategori.gsx$navn.$t;

            p1.textContent = " pris " + kategori.gsx$pris.$t;
            p2.textContent += " kort " + kategori.gsx$kort.$t;
            p3.textContent += " oprindelse " + kategori.gsx$oprindelse.$t;



            dest.appendChild(klon);

            dest.lastElementChild.addEventListener("click", () => {
                visDetalje(kategori);
            });
        }
    });
}

//func. der viser person i detalje view
function visDetalje(kategori) {

    document.querySelector("#detalje").style.display = "block";

    document.querySelector("#detalje .luk").addEventListener("click", skjulDetalje);

    document.querySelector("#detalje h2").textContent = kategori.gsx$navn.$t;
    document.querySelector("#detalje img").src = "imgs/large/" + kategori.gsx$billede.$t + ".jpg";
    document.querySelector("detalje img").alt = `Portræt af ${kategori.gsx$billede.$t}`;
    //document.querySelector("detalje p").textContent = kategori.gsx$pris.$t;

    //    document.querySelector("#detalje .githubLink").href = `https: //github.com/${person.gsx$github.$t}`;
    //    document.querySelector("#detalje .githubLink").textContent = `github.com /${person.gsx$github.$t}`;

}

function skjulDetalje() {
    document.querySelector("#detalje").style.display = "none";
}

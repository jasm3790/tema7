       document.addEventListener("DOMContentLoaded", start);
       const url = "https://spreadsheets.google.com/feeds/list/17Dd7DvkPaFamNUdUKlrFgnH6POvBJXac7qyiS6zNRw0/od6/public/values?alt=json";
       let kategori;
       let filter = "hovedretter";

       //funktion der kaldes efter DOM er loaded
       function start() {
           const filterKnapper = document.querySelectorAll("button");
           filterKnapper.forEach(knap => knap.addEventListener("click", filtrerKategorier));
           loadData();
       }

       //funktion der filtrerer personer(json)
       function filtrerKategorier() {
           filter = this.dataset.køn; //sæt variabel "filter" til akutel værdi
           document.querySelector(".valgt").classList.remove("valgt"); //fjern klassen valgt fra aktuel knap
           this.classList.add("valgt");
           vis(); // kald funktionen vis igen med nyt filter
       }

       //funktioner der henter data fra Google Sheet

       async function loadData() {
           const response = await fetch(url);
           personer = await response.json();
           vis();
       }

       //funktioner der viser personer i liste view
       function vis() {

           const skabelon = document.querySelector("template").content; //select indhold af html skabelon, article
           const dest = document.querySelector("#liste");
           dest.textContent = "";
           personer.feed.entry.forEach(person => { //loop igennem json, personer
               if (person.gsx$pris.$t == filter || filter == "alle") { //tjek hvilket køn personen har og sammenlign med filter og vis alle

                   //klone skabelon
                   const klon = skabelon.cloneNode(true);

                   console.log(klon);
                   const h2 = klon.querySelector("h2");
                   h2.textContent = person.gsx$navn.$t;

                   const p1 = klon.querySelector("p");
                   const p2 = klon.querySelector("p + p");
                   const p3 = klon.querySelector("p + p + p");
                   const p4 = klon.querySelector("p + p + p + p");

                   p1.textContent = " pris " + kategori.gsx$pris.$t;
                   p2.textContent = " kategori " + kategori.gsx$kategori.$t;
                   p3.textContent += " navn " + kategori.gsx$navn.$t;
                   p4.textContent += " oprindelse " + kategori.gsx$oprindelse.$t;

                   const img = klon.querySelector("img");
                   img.src = person.gsx$billede.$t;
                   img.alt = "Billede af " + kategori.navn;

                   dest.appendChild(klon);
               }
           })
       }


document.addEventListener('DOMContentLoaded', () => {
    // Initialisation
    const currentYear = new Date().getFullYear();
    const yearInput = document.getElementById('yearInput');
    const yearDisplay = document.getElementById('yearDisplay');
    const bissextileResult = document.getElementById('bissextileResult');
    const fetesList = document.getElementById('fetesList');
    const fetesCard = document.getElementById('fetesCard');

    yearInput.value = currentYear;
    yearDisplay.textContent = currentYear;

    // Calcul année bissextile
    function isBissextile(year) {
        if (year < 1582) {
            // Avant 1582, les années bissextiles sont les années de siècles (divisibles par 100)
            return year % 100 === 0;
        } else {
            // Après 1582, appliquer la règle moderne
            return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
        }
    }

    // Calcul de Pâques (Algorithme de Meeus/Jones/Butcher)
    function calculerPaques(year) {
        const a = year % 19;
        const b = Math.floor(year / 100);
        const c = year % 100;
        const d = Math.floor(b / 4);
        const e = b % 4;
        const f = Math.floor((b + 8) / 25);
        const g = Math.floor((b - f + 1) / 3);
        const h = (19 * a + b - d - g + 15) % 30;
        const i = Math.floor(c / 4);
        const k = c % 4;
        const l = (32 + 2 * e + 2 * i - h - k) % 7;
        const m = Math.floor((a + 11 * h + 22 * l) / 451);
        const month = Math.floor((h + l - 7 * m + 114) / 31);
        const day = ((h + l - 7 * m + 114) % 31) + 1;
        
        return new Date(year, month - 1, day);
    }

    // Calcul des fêtes mobiles
    function calculerFetesMobiles(year) {
        const paques = calculerPaques(year);
        
        function addDays(date, days) {
            const result = new Date(date);
            result.setDate(result.getDate() + days);
            return result;
        }

        return {
            'Mardi Gras': addDays(paques, -47),
            'Mercredi des Cendres': addDays(paques, -46),
            'Dimanche des Rameaux': addDays(paques, -7),
            'Jeudi Saint': addDays(paques, -3),
            'Vendredi Saint': addDays(paques, -2),
            'Pâques': paques,
            'Lundi de Pâques': addDays(paques, 1),
            'Divine Miséricorde': addDays(paques, 7),
            "Jeudi de l'Ascension": addDays(paques, 39),
            'Pentecôte': addDays(paques, 49),
            'Lundi de Pentecôte': addDays(paques, 50),
            'Sainte Trinité': addDays(paques, 56),
            'Fête-Dieu': addDays(paques, 60)
        };
    }

    // Formatage des dates
    function formatDate(date) {
        return date.toLocaleDateString('fr-FR', {
            weekday: 'long',
            month: 'long',
            day: 'numeric'
        });
    }

    function updateDisplay() {
        const year = parseInt(yearInput.value);
        yearDisplay.textContent = year;
    
        // Affichage année bissextile
        const bissextile = isBissextile(year);
        bissextileResult.className = `p-4 rounded-lg text-center text-lg ${bissextile ? 'bg-green-100 bissextile' : 'bg-orange-100'}`;
        bissextileResult.textContent = bissextile ? 
            "✨ Cette année est bissextile ✨" : 
            "Cette année n'est pas bissextile";
         // Appliquer une classe conditionnelle sur le body si l'année est "666"
         if (year === 666) {
            document.body.classList.add('background-special'); // Ajoute une classe pour le fond spécial
            // Modifier le lien pour l'année 666
            if (specialLink) {
                specialLink.href = "https://www.amazon.fr/Ave-Satani-Bible-noire-diable/dp/2357799846/ref=sr_1_1?dib=eyJ2IjoiMSJ9.iiImnnl-NkweKzlaHCoTJKYBU0pNsNE7Deg3FkR_lzwm08W5j4Q2Z5g1fdrz_-shAjigxzk-X5Fl0q456Nkr0YYbifA0NC-owBKvVmJ-pkaVDCUoGcWnf0eiIVuEvbMZtpuXCPrZrgo6u5yb9tZwDptRy7uZiRpTntf7fgYie8GIgqDPMyn2tZrBCO7essb4OdpYEs5DSnOSHp6ffUra-dqq8LnkTL8pY_RjiqN-Kdb5LXs8nGh_s8EqYFBnoWsMiyhl6wIyMGYFxeTKbk5gLanTS_a3CpGE8n9KG4RtR90.vY38h4ueeh2J5Y-KjYk1GuBtsZNAXkhP77utimEjyTI&dib_tag=se&keywords=bible+du+diable&nsdOptOutParam=true&qid=1731402630&sr=8-1";

            }
        } else {
            document.body.classList.remove('background-special'); // Retire la classe si l'année n'est pas 666
            // Restaurer le lien pour les autres années
            if (specialLink) {
                specialLink.href = "https://www.amazon.fr/SAINTE-BIBLE-DARBY-2022-Nouvelle/dp/2970154706?source=ps-sl-shoppingads-lpcontext&ref_=fplfs&psc=1&smid=AAM4LBRNSI1SA";
                
            }
        }
    
        // Appliquer une classe conditionnelle sur le body ou un autre élément
        if (bissextile) {
            document.body.classList.add('bissextile');
        } else {
            document.body.classList.remove('bissextile');
        }
    
         // Création du tableau pour afficher les fêtes
    const fetes = calculerFetesMobiles(year);
    let tableHTML = `
        <table class="table-auto w-full border-collapse">
            <thead>
                <tr>
                    <th class="border-b-2 border-gray-300 p-2 text-left font-semibold">Fête</th>
                    <th class="border-b-2 border-gray-300 p-2 text-left font-semibold">Date</th>
                </tr>
            </thead>
            <tbody>
    `;

    Object.entries(fetes).forEach(([nom, date]) => {
        tableHTML += `
            <tr>
                <td class="border-b border-gray-200 p-2">${nom}</td>
                <td class="border-b border-gray-200 p-2">${formatDate(date)}</td>
            </tr>
        `;
    });

    tableHTML += `
            </tbody>
        </table>
    `;

    // Insertion du tableau dans l'élément HTML
    fetesList.innerHTML = tableHTML;

    // Afficher la section des fêtes mobiles
    fetesCard.style.display = 'block';
    }

    // Event listeners
    document.getElementById('prevYear').addEventListener('click', () => {
        yearInput.value = parseInt(yearInput.value) - 1;
        updateDisplay();
    });
    
    document.getElementById('nextYear').addEventListener('click', () => {
        yearInput.value = parseInt(yearInput.value) + 1;
        updateDisplay();
    });
    
    yearInput.addEventListener('input', updateDisplay);

    // Initialisation
    updateDisplay();
});



// Récupérer le switch et les colonnes
const toggleSwitch = document.getElementById("toggle-columns");
const leftColumn = document.querySelectorAll(".side-column")[0];
const rightColumn = document.querySelectorAll(".side-column")[1];

// Fonction pour changer l'affichage des colonnes
toggleSwitch.addEventListener("change", function () {
    if (toggleSwitch.checked) {
        // Afficher les colonnes
        leftColumn.style.display = "block";
        rightColumn.style.display = "block";
    } else {
        // Masquer les colonnes
        leftColumn.style.display = "none";
        rightColumn.style.display = "none";
    }
});

document.getElementById('toggle-columns').addEventListener('change', function() {
    const sideColumns = document.querySelectorAll('.side-column');
    const pageLayout = document.querySelector('.page-layout');

    if (this.checked) {
        // Masquer les colonnes latérales
        sideColumns.forEach(column => column.classList.add('hidden'));
        // Centrer la colonne principale
        pageLayout.classList.add('center-main');
    } else {
        // Afficher les colonnes latérales
        sideColumns.forEach(column => column.classList.remove('hidden'));
        // Réinitialiser la mise en page normale
        pageLayout.classList.remove('center-main');
    }
});


// script.js

let count = 0;  // Nombre de hosties
let priestCount = 0;  // Nombre de prêtres possédés
let churchCount = 0;  // Nombre d'églises possédées
let priestCost = 10;  // Coût initial du prêtre
let churchCost = 500;  // Coût initial de l'église (débloqué à 5000 hosties)
let hostiesPerSecond = 0;  // Hosties générées par seconde

// Sélection des éléments HTML
const counterDisplay = document.getElementById('counter');
const clickButton = document.getElementById('click-button');
const priestCountDisplay = document.getElementById('priest-count');
const buyPriestButton = document.getElementById('buy-priest-button');

const churchCountDisplay = document.getElementById('church-count');
const buyChurchButton = document.getElementById('buy-church-button');
const churchContainer = document.getElementById('church-container');

// Fonction pour formater les nombres
function formatNumber(number) {
  if (number >= 1e6) {
    return (number / 1e6).toFixed(1) + ' m';
  } else if (number >= 1e3) {
    return (number / 1e3).toFixed(1) + ' k';
  } else {
    return number;
  }
}

// Fonction pour cliquer manuellement et gagner des hosties
function incrementCounter() {
  count += 1;
  updateDisplay();
}

// Fonction pour acheter un prêtre
function buyPriest() {
  if (count >= priestCost) {
    count -= priestCost;
    priestCount += 1;
    hostiesPerSecond += 1;  // 1 hostie par seconde par prêtre

    priestCost = Math.floor(priestCost * 1.1);  // Coût exponentiel
    updateDisplay();
  }
}

// Fonction pour acheter une église
function buyChurch() {
  if (count >= churchCost) {
    count -= churchCost;
    churchCount += 1;
    hostiesPerSecond += 10;  // 10 hosties par seconde par église

    churchCost = Math.floor(churchCost * 1.2);  // Coût exponentiel
    updateDisplay();
  }
}

// Fonction pour mettre à jour l'affichage
function updateDisplay() {
  counterDisplay.textContent = `${formatNumber(count)} hosties`;
  priestCountDisplay.textContent = priestCount;
  buyPriestButton.textContent = `Acheter un prêtre (${formatNumber(priestCost)} hosties)`;
  
  churchCountDisplay.textContent = churchCount;
  buyChurchButton.textContent = `Acheter une église (${formatNumber(churchCost)} hosties)`;

  buyChurchButton.disabled = count < churchCost || count < 2500;
  buyPriestButton.disabled = count < priestCost;

  if (count >= 2500) {
    churchContainer.style.display = "flex";
  }
}

// Générer des hosties automatiquement toutes les secondes
setInterval(() => {
  count += hostiesPerSecond;
  updateDisplay();
}, 1000);

// Événements
clickButton.addEventListener('click', incrementCounter);
buyPriestButton.addEventListener('click', buyPriest);
buyChurchButton.addEventListener('click', buyChurch);

churchContainer.style.display = "none";

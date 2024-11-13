
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
    if (year === 0) {
        // Si l'année est 0, on retourne false ici, mais la logique de texte sera gérée plus tard
        return null;  // Utilisation de null pour signaler un cas spécial (année 0)
    }
    if (year < -46) {
        // Les années avant -46 ne sont jamais bissextiles
        return false;
    }
    if (year <= 1582) {
        // Avant ou en 1582, les années de siècles (divisibles par 100) sont aussi bissextiles,
        // et toutes les années divisibles par 4 sont bissextiles (y compris l'année 4)
        return year % 4 === 0 || year % 100 === 0;
    } else {
        // Après 1582, appliquer la règle moderne
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }
}


// Calcul de Pâques (Algorithme de Meeus/Jones/Butcher)
function calculerPaques(year) {
    // Si l'année est inférieure à 100, la traiter comme une année du 20ème siècle
    if (year < 100) {
        year += 1900;
    }

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

    // Retourner la date corrigée (le mois commence à 0 dans JavaScript, donc on soustrait 1 du mois)
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


function checkZero(input) {
    if (input.value == 0) {
        input.setCustomValidity("L'année 0 n'est pas valide.");
    } else {
        input.setCustomValidity(""); // Réinitialiser si la saisie est valide
    }
}

    // Fonction de mise à jour de l'affichage
    function updateDisplay() {
        const year = parseInt(yearInput.value);
        yearDisplay.textContent = year;

        // Affichage année bissextile
        const bissextile = isBissextile(year);
        // Si l'année est 0, afficher "Cette année n'existe pas"
        if (year === 0) {
            bissextileResult.textContent = "Cette année n'existe pas";
        } else {
            // Sinon, on applique la logique habituelle pour vérifier si l'année est bissextile
            bissextileResult.textContent = bissextile ? "✨ Cette année est bissextile ✨" : "Cette année n'est pas bissextile";
        }
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

        // Vérification si l'année est valide (inférieure à 325 ou égale à 0)
        if ( year < 325) {
            // Masquer la carte des fêtes et vider le contenu de la liste des fêtes si l'année est invalide
            fetesCard.style.display = 'none';  // Masquer la carte des fêtes
            fetesList.innerHTML = '';  // Effacer toute fête précédente
            return;  // Sortir de la fonction pour ne pas continuer avec l'affichage des fêtes
        
        } if (year === 0) {
            const errorMessage = document.getElementById('errorMessage');
            errorMessage.textContent = "Cette année n'existe pas";
            errorMessage.style.display = 'block';  // Afficher le message d'erreur
            return;
            
        }else {
            // Afficher la carte des fêtes si l'année est valide
            fetesCard.style.display = 'block';
        }

        // Calcul des fêtes mobiles
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

        // Ajouter les fêtes au tableau
        Object.entries(fetes).forEach(([nom, date]) => {
            tableHTML += `
                <tr>
                    <td class="border-b border-gray-200 p-2"><a href="https://www.google.com/search?q=${nom}" target="_blank" class="text-blue-500 hover:underline">${nom}</a></td>
                    <td class="border-b border-gray-200 p-2">${formatDate(date)}</td>
                </tr>
            `;
        });

        tableHTML += `
                </tbody>
            </table>
        `;

        // Insérer le tableau des fêtes dans l'élément HTML
        fetesList.innerHTML = tableHTML;
    }

    // Gestion des événements pour les boutons de l'année
    document.getElementById('prevYear').addEventListener('click', () => {
        yearInput.value = parseInt(yearInput.value) - 1;
        updateDisplay();
    });
        
    document.getElementById('nextYear').addEventListener('click', () => {
        yearInput.value = parseInt(yearInput.value) + 1;
        updateDisplay();
    });
        
    yearInput.addEventListener('input', updateDisplay);

    // Initialisation de l'affichage
    updateDisplay();


});





// Récupère les éléments de la page
const toggleSwitch = document.getElementById("toggle-columns");
const sideColumns = document.querySelectorAll(".side-column");
const adContainer = document.getElementById("ad-container");
const sideColumns1 = document.querySelectorAll(".side-column");
const adContainer1 = document.getElementById("ad-container1");

// Fonction pour afficher ou masquer les colonnes
function toggleInfo() {
    // Ajoute ou retire la classe 'hidden' en fonction de l'état du switch
    if (toggleSwitch.checked) {
        sideColumns.forEach(column => column.classList.remove('hidden'));
        adContainer.classList.remove('hidden');
        sideColumns1.forEach(column => column.classList.remove('hidden'));
        adContainer1.classList.remove('hidden');
    } else {
        sideColumns.forEach(column => column.classList.add('hidden'));
        adContainer.classList.add('hidden');
        sideColumns1.forEach(column => column.classList.add('hidden'));
        adContainer1.classList.add('hidden');
    }
}




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

  buyChurchButton.disabled = count < churchCost;
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

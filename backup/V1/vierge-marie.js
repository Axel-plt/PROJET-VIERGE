
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
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
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
        } else {
            document.body.classList.remove('background-special'); // Retire la classe si l'année n'est pas 666
        }
    
        // Appliquer une classe conditionnelle sur le body ou un autre élément
        if (bissextile) {
            document.body.classList.add('bissextile'); // Ajoute la classe "bissextile" à l'élément body
        } else {
            document.body.classList.remove('bissextile'); // Enlève la classe "bissextile" si l'année n'est pas bissextile
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






// script.js

// On commence par initialiser le compteur à 0
let count = 0;

// On sélectionne les éléments HTML nécessaires
const counterDisplay = document.getElementById('counter');
const clickButton = document.getElementById('click-button');

// Fonction pour incrémenter le compteur et mettre à jour l'affichage
function incrementCounter() {
  count += 1;
  counterDisplay.textContent = count;
}

// On ajoute un événement de clic au bouton
clickButton.addEventListener('click', incrementCounter);
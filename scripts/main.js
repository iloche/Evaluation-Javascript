// 🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐

// ⭐ // // // // //  Déclaration de variables // // // // // // // // // /🍄

// 🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐

let box = document.querySelector('.box'),
    count = document.querySelector(".count")
    nbr = 0,
    userInput = document.querySelector(".user-input"),
    miseTotal = document.querySelector(".mise-total"),
    finalTotal = document.querySelector(".finalTotal"),
    userChoice = document.querySelector(".user-choice")

    // Grosse prise de risque car je n'ai pas fait de tableau pour retirer les éléments ciblés, soorrrryyyy :p MAIS, ça marche héhé

// 🎀⭐🎀⭐🎀⭐🎀⭐🎀⭐🎀⭐🎀⭐🎀⭐🎀⭐🎀⭐🎀⭐🎀⭐🎀⭐🎀⭐🎀⭐🎀 

// ⭐ // // // // // // // // Fonctions // // // // // // // // // // // // ⭐

// 🎀⭐🎀⭐🎀⭐🎀⭐🎀⭐🎀⭐🎀⭐🎀⭐🎀⭐🎀⭐🎀⭐🎀⭐🎀⭐🎀⭐🎀⭐🎀 

// Fonction pour générer les données à partir de mon fichier .json
function displayMatch() {
  fetch("scripts/datas.json")
    .then(response => response.json())
    .then(data => {
      console.log(data);

       // Parcourt chaque match dans les données
       data.matchs.forEach(function (singleMatch) {

        // Injection du contenu HTML pour afficher les détails du match
        let match = `
          <div class="match-info" data-id=${singleMatch.match_id}>
            <div class="title">${singleMatch.hometeam} - ${singleMatch.awayteam}</div>
            <div class="buttons">

                <!-- Bouton pour la cote de l'équipe à domicile -->
                <button class="mise" 
                  data-team="${singleMatch.hometeam}" 
                  data-odd="${singleMatch.home_odd}">${singleMatch.home_odd}</button>
                
                <!-- Bouton pour la cote d'un match nul -->
                <button class="mise" 
                  data-team="Match Nul" 
                  data-odd="${singleMatch.draw_odd}">${singleMatch.draw_odd}</button>
                
                <!-- Bouton pour la cote de l'équipe à l'extérieur -->
                <button class="mise" 
                  data-team="${singleMatch.awayteam}" 
                  data-odd="${singleMatch.away_odd}">${singleMatch.away_odd}</button>
                  
            </div>
          </div>
        `;

        // Ajoute le contenu du match à l'élément avec la classe "box"
        box.innerHTML += match;
      })
    })
    .catch(error => { console.log("Erreur lors de la récup des données :", error); });
}

// Appel de la fonction pour afficher tout le contenu injecté
displayMatch();

////////////////////////////////////////////////////////////////////////////////////////

// Fonction pour générer de manière aléatoire l'image de fond sur right-content
function randomBG(){
  let backgrounds = ["bg1.png","bg2.png","bg3.png"],
      randomChoice = Math.floor(Math.random() * backgrounds.length),
      rightContent = document.querySelector(".right-content")

    rightContent.style.backgroundImage = `url(../images/${backgrounds[randomChoice]})`
}

// Appel de la fonction pour afficher l'image de fond
randomBG()

////////////////////////////////////////////////////////////////////////////////////////

// Fonction pour vérifier le nombre d'éléments dans userChoice pour le petit scroll
function scrollY() {
  let userChoice = document.querySelector('.user-choice');
  let elementsCount = userChoice.querySelectorAll('.selectedChoice').length;

  if (elementsCount > 3) {
    userChoice.style.maxHeight = '250px';
  } else {
    userChoice.style.maxHeight = ''; 
  }
}

// Appel de la fonction après chaque modification de userChoice
scrollY();

////////////////////////////////////////////////////////////////////////////////////////

// Fonction pour calculer le gain total en multipliant la mise par les cotes sélectionnées
function calculGainTotal() {
  let selectedButtons = document.querySelectorAll('.active');
  let montantMise = parseFloat(userInput.value); 
  let totalMise = montantMise;
  let totalOdd = 1; // Initialisation du produit des cotes à 1

  // Parcours des boutons actifs pour calculer le produit des cotes
  selectedButtons.forEach(btn => {
    // Récupération de la cote du bouton
    let odd = parseFloat(btn.dataset.odd);
    // Multiplication du total par la cote
    totalOdd *= odd;
  });

    // Calcul du montant total
    let gainTotal = totalMise * totalOdd;

    // Mise à jour de l'élément miseTotal avec le résultat calculé
    miseTotal.innerHTML = 
    `
    <strong>${(Math.round(totalOdd * 100) / 100).toFixed(2)}</strong>
    `;

    // Mise à jour de l'élément finalTotal avec le résultat calculé
    finalTotal.innerHTML = 
    `
    <strong>${(Math.round(gainTotal * 10) / 10).toFixed(2)}€</strong>
    `;
}

// Écouteur d'événements sur userInput pour recalculer le gain total
userInput.addEventListener("input", calculGainTotal);

// Écouteur d'événements sur les boutons .mise pour recalculer le gain total
document.querySelectorAll(".mise").forEach(btn => {
  btn.addEventListener("click", calculGainTotal); 
});

// Appel initial pour afficher le total au chargement de la page
calculGainTotal();

////////////////////////////////////////////////////////////////////////////////////////

// Fonction pour vérifier si un ID existe déjà dans le panier
function idExist(id) {
  // Sélectionnez tous les ID des matchs dans le panier
  const existingItem = userChoice.querySelector(`[data-id="${id}"]`);
  return existingItem !== null;
}

// 🏵️⭐🏵️⭐🏵️⭐🏵️⭐🏵️⭐🏵️⭐🏵️⭐🏵️⭐🏵️⭐🏵️⭐🏵️⭐🏵️⭐🏵️⭐🏵️⭐🏵️  

// ⭐ // // // // // // // Évenements // // // // // // // // // // // //⭐

// 🏵️⭐🏵️⭐🏵️⭐🏵️⭐🏵️⭐🏵️⭐🏵️⭐🏵️⭐🏵️⭐🏵️⭐🏵️⭐🏵️⭐🏵️⭐🏵️⭐🏵️ 

// Écouteur d'événements sur l'élément avec la classe "box" pour gérer les clics sur les boutons
box.addEventListener("click", function (e) {
  // Vérifie si l'élément cliqué a la classe "mise" (un des boutons)
  if (e.target.classList.contains("mise")) {
    // Vérifie si l'élément cliqué a déjà la classe "active"
    const isActive = e.target.classList.contains('active');

    // Supprimez la classe "active" de tous les boutons dans le même parent
    e.target.parentElement.querySelectorAll('.mise').forEach(btn => {
      btn.classList.remove('active');
    });

    // Inverse l'état de la classe "active" sur l'élément cliqué donc si c'est true, ça va ajouter la classe active, si c'est false, ça va la retirer
    e.target.classList.toggle('active', !isActive);

    // Sélectionner les attributs personnalisés du bouton cliqué
    const team = e.target.dataset.team;
    const odd = e.target.dataset.odd;
    
    // Récupère l'ID associé à l'élément cliqué
    const idWrapper = e.target.closest('.match-info').getAttribute('data-id');

    // Vérifie si cet ID existe déjà dans le panier
    if (idExist(idWrapper)) {
      const existingItem = userChoice.querySelector(`[data-id="${idWrapper}"]`);
      existingItem.closest('.selectedChoice').remove();
    }

    // Sélectionner le titre du match associé au bouton cliqué
    const teamInfo = e.target.closest('.match-info').querySelector('.title').textContent;

    // Vérifie si le bouton était inactif avant le clic
    if (!isActive) {
     // Vérifie si nbr est inférieur à 8 pour le bloquer
      if (nbr < 8) { 
         // Ajoute le contenu HTML de la mise sélectionnée dans la section "user-choice"
        userChoice.innerHTML += `
          <div class="selectedChoice">
            <div class="choice">
              <strong>${team}</strong> ${odd}
              <span class="delete-task" title="Supprimer la mise">🗑️</span>
            </div>
            <div class="choice">
              <p data-id=${idWrapper}>${teamInfo}</p>
            </div>
          </div>
        `;
      nbr++;
      
      // Recalcule le gain total
      calculGainTotal()
      }
    } else {
      // Récupère l'élément correspondant à l'équipe et à la cote du bouton cliqué
      let selectedChoice = e.target.closest('.selectedChoice');
      
      if (selectedChoice) {
        // Supprime l'élément de la section "user-choice"
        selectedChoice.remove()
      }
      nbr--;
    }

    // Met à jour le contenu de l'élément count avec nbr
    count.innerHTML = nbr;

    // Recalcule le gain total
    calculGainTotal()

    // Affiche ou cache l'élément .visible en fonction de nbr
    const visible = document.querySelector(".visible");
    visible.classList.toggle('show', nbr > 0);
  }
})

// Écouteur d'événements sur userChoice pour gérer les clics sur les éléments à l'intérieur
userChoice.addEventListener("click", function(e) {

  // Vérifie si l'élément cliqué est un bouton avec la classe "active"
  if (e.target.classList.contains("delete-task")) {
    const selectedChoice = e.target.closest(".selectedChoice");
    if (selectedChoice) {
      selectedChoice.remove();

      // Récupère l'élément .active et enlève la classe "active" s'il existe
      const activeButton = document.querySelector('.active');
      if (activeButton) {
        activeButton.classList.remove('active');
      }
      // Recalcule le gain total
      calculGainTotal();
    }
    nbr--
  }
  // Met à jour le contenu de l'élément count avec nbr
  count.innerHTML = nbr;

  // Affiche ou cache l'élément .visible en fonction de nbr
  const visible = document.querySelector(".visible");
  visible.classList.toggle('show', nbr > 0);
});

////////////////////////////////////////////////////////////////////////////////////////

const toggleIcon = document.querySelector('.toggle-mode');

// Tableau d'objets qui regroupe plusieurs éléments du DOM
const darkElements = [
  document.querySelector("header"),
  document.querySelector("nav"),
  document.querySelector(".team-info"),
  document.querySelector(".country"),
  document.querySelector(".bet-title")
];

// Écouteur d'événements pour basculer entre les modes
toggleIcon.addEventListener('click', function() {
  // Changez l'icône entre fa-moon et fa-sun
  toggleIcon.classList.toggle('fa-moon');
  toggleIcon.classList.toggle('fa-sun');

  // Parcours des éléments et ajout/suppression de la classe dark-mode
  darkElements.forEach(element => {
    element.classList.toggle('dark-mode');
  });

  // Enregistrer l'état du mode sombre dans localStorage
  const isDarkModeEnabled = document.querySelector("header").classList.contains('dark-mode');
  localStorage.setItem('darkModeEnabled', isDarkModeEnabled);
});

// Vérifier si le mode sombre est activé lors du chargement de la page
document.addEventListener('DOMContentLoaded', function() {
  const isDarkMode = localStorage.getItem('darkModeEnabled') === 'true'; 
  if (isDarkMode) {
    // Changez l'icône entre fa-moon et fa-sun
    toggleIcon.classList.toggle('fa-moon');
    toggleIcon.classList.toggle('fa-sun');

    // Ajoutez ou supprimez la classe dark-mode
    darkElements.forEach(element => {
      element.classList.add('dark-mode');
    });
  }
});

////////////////////////////////////////////////////////////////////////////////////////

document.addEventListener('DOMContentLoaded', function() {
  const cookie = document.querySelector(".cookie");
  const accept = document.querySelector(".accept");
  const refuse = document.querySelector(".refuse");

  // Afficher le pop-up
  cookie.style.display = 'block';

  // Gérer l'événement du bouton Accepter
  accept.addEventListener('click', function() {
      // Définir le cookie de consentement
      Cookies.set('consent', 'true');
      console.log('Consentement accepté');
      cookie.style.display = 'none'; 
  });

  // Gérer l'événement du bouton Refuser
  refuse.addEventListener('click', function() {
      Cookies.set('consent', 'false');
      console.log('Consentement refusé');
      cookie.style.display = 'none'; 
  });

  // Vérifier si l'utilisateur a déjà donné son consentement
  const consent = Cookies.get('consent');
  if (consent === 'true'|| consent === 'false') {
      cookie.style.display = 'none';
  }
});
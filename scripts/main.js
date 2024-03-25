// 🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐

// ⭐ // // // // //  Déclaration de variables // // // // // // // // // /🍄

// 🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐

let wrapper = document.querySelector(".wrapper"),
    count = document.querySelector(".count")
    nbr = 0;

// 🎀⭐🎀⭐🎀⭐🎀⭐🎀⭐🎀⭐🎀⭐🎀⭐🎀⭐🎀⭐🎀⭐🎀⭐🎀⭐🎀⭐🎀⭐🎀 

// ⭐ // // // // // // // // Fonctions // // // // // // // // // // // // ⭐

// 🎀⭐🎀⭐🎀⭐🎀⭐🎀⭐🎀⭐🎀⭐🎀⭐🎀⭐🎀⭐🎀⭐🎀⭐🎀⭐🎀⭐🎀⭐🎀 

function displayMatch() {
  let box = document.querySelector('.box');
  fetch("scripts/datas.json")
    .then(response => response.json())
    .then(data => {
      console.log(data);

       // Parcourt chaque match dans les données
       data.matchs.forEach(function (singleMatch) {

        // Crée un contenu HTML pour afficher les détails du match
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
      });

// 🏵️⭐🏵️⭐🏵️⭐🏵️⭐🏵️⭐🏵️⭐🏵️⭐🏵️⭐🏵️⭐🏵️⭐🏵️⭐🏵️⭐🏵️⭐🏵️⭐🏵️  

// ⭐ // // // // // // // Évenements // // // // // // // // // // // //⭐

// 🏵️⭐🏵️⭐🏵️⭐🏵️⭐🏵️⭐🏵️⭐🏵️⭐🏵️⭐🏵️⭐🏵️⭐🏵️⭐🏵️⭐🏵️⭐🏵️⭐🏵️ 

    // Écouteur d'événements sur l'élément avec la classe "box" pour gérer les clics sur les boutons
    box.addEventListener("click", function (e) {
      // Vérifie si l'élément cliqué a la classe "mise" (un des boutons)
      if (e.target.classList.contains("mise")) {

        // Stocke l'élément cliqué dans la constante clickedBtn
        const clickedBtn = e.target;

        // Vérifie si l'élément cliqué a déjà la classe "active"
        const isActive = clickedBtn.classList.contains('active');

        // Supprimez la classe "active" de tous les boutons dans le même parent
        clickedBtn.parentElement.querySelectorAll('.mise').forEach(btn => {
          btn.classList.remove('active');
        });

        // Inverse l'état de la classe "active" sur l'élément cliqué
        clickedBtn.classList.toggle('active', !isActive);

        // Sélectionner les attributs personnalisés du bouton cliqué
        const team = clickedBtn.dataset.team; // Équipe associée au bouton
        const odd = clickedBtn.dataset.odd; // Cote associée au bouton

        // Sélectionner le titre du match associé au bouton cliqué
        const teamInfo = clickedBtn.closest('.match-info').querySelector('.title').textContent;

        // Vérifie si le bouton était inactif (non active) avant le clic
        if (!isActive) {
          let userChoice = document.querySelector(".user-choice");
          // Ajoute le contenu HTML de la mise sélectionnée dans la section "user-choice"
          userChoice.innerHTML += `
            <div class="selectedChoice">
              <div class="choice">
                <strong>${team}</strong> ${odd}
                <span class="delete-task" title="Supprimer la mise">🗑️</span>
              </div>
              <div class="choice">
                <p>${teamInfo}</p>
              </div>
            </div>
          `;
          nbr++
          count.innerHTML = ""
          count.innerHTML += `${nbr}`

          const visible = document.querySelector(".visible")

          function show(){
            if (nbr > 0) {
              visible.classList.add('show'); // Afficher le panier s'il contient du contenu
            } else {
              visible.classList.remove('show'); // Cacher le panier s'il est vide
            }
          }
          }
          show()
        }
      })
    })
    .catch(error => { console.log("Erreur lors de la récup des données :", error); });
}

// Appel de la fonction pour afficher tout le contenu injecté
displayMatch();
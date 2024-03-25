
fetch("scripts/datas.json")
  .then(response => response.json())
  .then(data => {
    console.log(data);
    const contentDiv = document.getElementsByClassName("test");
        data.forEach(item => {
          const boxHtml = `
            <div class="box">
              <div class="title">${item.title}</div>
              <div class="buttons">
                ${item.odds.map(odd => `<button class="mise">${odd}</button>`).join('')}
              </div>
            </div>
          `;
          contentDiv.innerHTML += boxHtml;
        });
      })
  .catch(error => {console.log("Erreur lors de la récup des données :", error);
})

// 🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐

// ⭐ // // // // //  Déclaration de variables // // // // // // // // // /🍄

// 🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐

let boxes = document.querySelectorAll(".box")




















// 🎀⭐🎀⭐🎀⭐🎀⭐🎀⭐🎀⭐🎀⭐🎀⭐🎀⭐🎀⭐🎀⭐🎀⭐🎀⭐🎀⭐🎀⭐🎀 

// ⭐ // // // // // // // // Fonctions // // // // // // // // // // // // ⭐

// 🎀⭐🎀⭐🎀⭐🎀⭐🎀⭐🎀⭐🎀⭐🎀⭐🎀⭐🎀⭐🎀⭐🎀⭐🎀⭐🎀⭐🎀⭐🎀 

boxes.forEach(function(box) {
  box.addEventListener("click", function(e) {
    // Vérifiez si l'élément cliqué a la classe "mise"
    if (e.target.classList.contains("mise")) {
      // Si l'élément cliqué a la classe "active", alors la supprimer
      if (e.target.classList.contains('active')) {
        e.target.classList.remove("active");
      } else {
        // Si un enfant de la "box" possède déjà la classe "active", la supprimer d'abord
        if (box.querySelector('.active')) {
          box.querySelector('.active').classList.remove("active")
          e.target.classList.add("active")
        }
        // Ajoutez la classe "active" à l'élément cliqué
        e.target.classList.add("active");
      }
    }
  });
});


















// 🏵️⭐🏵️⭐🏵️⭐🏵️⭐🏵️⭐🏵️⭐🏵️⭐🏵️⭐🏵️⭐🏵️⭐🏵️⭐🏵️⭐🏵️⭐🏵️⭐🏵️  

// ⭐ // // // // // // // Évenements // // // // // // // // // // // //⭐

// 🏵️⭐🏵️⭐🏵️⭐🏵️⭐🏵️⭐🏵️⭐🏵️⭐🏵️⭐🏵️⭐🏵️⭐🏵️⭐🏵️⭐🏵️⭐🏵️⭐🏵️ 
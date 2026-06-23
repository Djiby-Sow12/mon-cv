/* ========== BOUTON RETOUR EN HAUT ========== */
const btnTop = document.getElementById("btn-top");

// Affiche le bouton quand on scrolle vers le bas
window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    // Si on a scrollé de plus de 200px
    btnTop.style.display = "block";
  } else {
    btnTop.style.display = "none";
  }
});

// Remonte en haut quand on clique
btnTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth", // Défilement fluide
  });
});

/* ========== MENU HAMBURGER ========== */
const hamburger = document.getElementById("menu-hamburger");
const navMenu = document.querySelector("nav ul");

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("actif");
});

// Fermer le menu quand on clique sur un lien
const liensNav = document.querySelectorAll("nav ul li a");

liensNav.forEach((lien) => {
  lien.addEventListener("click", () => {
    navMenu.classList.remove("actif"); // Retire la classe pour fermer le menu
  });
});

/* ========== DARK MODE ========== */
const btnTheme = document.getElementById("btn-theme");
const iconeTheme = btnTheme.querySelector("i");

// 1. Au chargement : lire localStorage et appliquer le thème sauvegardé
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
  iconeTheme.classList.replace("fa-moon", "fa-sun");
}

// 2. Au clic : basculer le dark mode et sauvegarder dans localStorage
btnTheme.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
    iconeTheme.classList.replace("fa-moon", "fa-sun");
  } else {
    localStorage.setItem("theme", "light");
    iconeTheme.classList.replace("fa-sun", "fa-moon");
  }
});

/* ========== ANIMATION DES BARRES ========== */
const barres = document.querySelectorAll(".progression");

const observateur = new IntersectionObserver(
  (entrees) => {
    entrees.forEach((entree) => {
      if (entree.isIntersecting) {
        // Si l'élément est visible
        const barre = entree.target;
        const niveau = barre.getAttribute("data-niveau");

        // Ligne 1 : appliquer le niveau comme largeur (ex: "70%")
        barre.style.width = niveau + "%";

        // Ligne 2 : arrêter d'observer cet élément (inutile de le re-animer)
        observateur.unobserve(barre);
      }
    });
  },
  { threshold: 0.3 },
); // Se déclenche quand 30% de l'élément est visible

// Lancer l'observation sur chaque barre
barres.forEach((barre) => observateur.observe(barre));

/* ========== FORMULAIRE DE CONTACT ========== */
const formulaire = document.getElementById("formulaire-contact");

formulaire.addEventListener("submit", (evenement) => {
  evenement.preventDefault(); // Empêche l'envoi réel du formulaire

  const nom = document.getElementById("nom").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  // Valider l'email avec une regex
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // 1. Vérifier que nom, email, message ne sont pas vides
  if (!nom || !email || !message) {
    alert("Veuillez remplir tous les champs.");
    return;
  }

  // 2. Vérifier que l'email correspond à regexEmail
  if (!regexEmail.test(email)) {
    alert("Veuillez entrer une adresse email valide.");
    return;
  }

  // 3. Afficher un message de succès
  alert("Formulaire envoyé avec succès !");
  formulaire.reset(); // Réinitialise le formulaire après succès
});

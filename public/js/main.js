document.getElementById("overlay").addEventListener('click', hideOverlay);

function loginOverlay() {
  document.getElementById("overlay").style.display = "block";
  document.getElementById("login").style.display = "flex";
  document.getElementById("sign-up").style.display = "none";
}

function signUpOverlay() {
  document.getElementById("overlay").style.display = "block";
  document.getElementById("login").style.display = "none";
  document.getElementById("sign-up").style.display = "flex";
}

function hideOverlay(e) {
  if (!e.target.matches('.overlay-form') && !e.target.matches('.overlay-form *')) {
    document.getElementById("overlay").style.display = "none";
  }
}

function dropDown() {
  document.getElementById("myDropdown").classList.toggle("show");
}

window.onclick = function (event) {
  if (!event.target.matches('.dropbtn')) {
    let dropdowns = document.getElementsByClassName("dropdown-content");
    for (let i = 0; i < dropdowns.length; i++) {
      let openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
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

function paymentOverlay() {
  document.getElementById("payment-overlay").style.display = "block";
}

function hideOverlay(id) {
  document.getElementById(id).style.display = "none";
}

function dropDown() {
  let dropdowns = document.getElementsByClassName("dropdown-content");
  for (let i = 0; i < dropdowns.length; i++) {
    dropdowns[i].classList.toggle("show");
  }
  icon = document.getElementById('dropdown-icon');
  icon.classList.toggle('fa-caret-down');
  icon.classList.toggle('fa-caret-up');
}

window.onclick = function (event) {
  if (!event.target.matches('.dropbtn')) {
    let dropdowns = document.getElementsByClassName("dropdown-content");
    for (let i = 0; i < dropdowns.length; i++) {
      let openDropdown = dropdowns[i];
      openDropdown.classList.remove('show');
    }
    icon = document.getElementById('dropdown-icon');
    icon.classList.remove('fa-caret-up');
    icon.classList.add('fa-caret-down');
  }
}
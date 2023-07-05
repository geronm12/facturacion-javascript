const mail = document.querySelector("#mail");
const password = document.querySelector("#password");
const btnLogin = document.getElementById("login");
const btnClose = document.getElementById("close");
const btnLogout = document.querySelector("#logout");
const btnLoginPage = document.getElementById("login-page");
const administrar = document.getElementById("administrar");

let email = "";
let pass = "";

const key = "sesion";

const sesion = JSON.parse(localStorage.getItem(key));

if (sesion) {
  btnLoginPage.style.display = "none";
  btnLogout.style.display = "block";
  administrar.style.display = "block";
}

mail.addEventListener("change", function (e) {
  email = e.target.value;
});

password.addEventListener("change", function (e) {
  pass = e.target.value;
});

btnLogin.addEventListener("click", function () {
  if (email === "admin" && pass === "admin") {
    const usuario = new Usuario(email, pass, "admin", true);
    localStorage.setItem(key, JSON.stringify(usuario));
    btnClose.click();
    btnLoginPage.style.display = "none";
    btnLogout.style.display = "block";
    administrar.style.display = "block";
  } else {
    console.error("Usuario o contraseña incorrectos");
  }
});

class Usuario {
  mail = "";
  password = "";
  rol = "";
  isLogged = false;

  constructor(mail, password, rol, isLogged) {
    this.mail = mail;
    this.password = password;
    this.rol = rol;
    this.isLogged = isLogged;
  }
}

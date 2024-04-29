var menuLateral = document.getElementById("menu-lateral");
var abrirFecharMenuBtn = document.getElementById("abrir-fechar-menu");

abrirFecharMenuBtn.addEventListener("click", function () {
  if (menuLateral.style.left === "-220px") {
    menuLateral.style.left = "0";
    abrirFecharMenuBtn.style.left = "0px"; /* Ajuste da posição */
  } else {
    menuLateral.style.left = "-220px";
    abrirFecharMenuBtn.style.left = "0px"; /* Ajuste da posição */
  }
});


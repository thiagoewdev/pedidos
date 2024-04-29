var menuLateral = document.getElementById("menu-lateral");
var abrirFecharMenuBtn = document.getElementById("abrir-fechar-menu");

abrirFecharMenuBtn.addEventListener("click", function () {
  if (menuLateral.style.left === "-220px") {
    menuLateral.style.left = "0";
    document.getElementById("conteudo").style.marginLeft =
      "240px"; /* Ajuste para evitar sobreposição */
  } else {
    menuLateral.style.left = "-220px";
    document.getElementById("conteudo").style.marginLeft =
      "20px"; /* Ajuste para evitar sobreposição */
  }
});

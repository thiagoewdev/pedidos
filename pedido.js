var addButtons = document.querySelectorAll(".add-button");
var carrinhoLista = document.getElementById("lista-carrinho");

// Modificar o evento de clique dos botões "Adicionar"
addButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    var objeto = this.parentElement.textContent.trim().replace(/Adicionar|Excluir/g, "");
    var quantidade = this.parentElement.querySelector(".quantidade").value;
    var pedido = `${quantidade}x ${objeto}`;

    // Verificar se o pedido já está no carrinho
    if (!pedidoEstaNoCarrinho(pedido)) {
      adicionarPedidoAoCarrinho(pedido);
      adicionarPedidoSeparado(pedido, [pedido]);
    }
  });
});

// Exportar para Excel
document.getElementById("export-button").addEventListener("click", function () {
  var items = [];
  carrinhoLista.querySelectorAll("li").forEach(function (item) {
    items.push(item.textContent);
  });
  exportToExcel(items);
});

// Função para verificar se o pedido já está no carrinho
function pedidoEstaNoCarrinho(pedido) {
  var items = carrinhoLista.querySelectorAll("li");
  for (var i = 0; i < items.length; i++) {
    if (items[i].textContent.trim() === pedido) {
      return true;
    }
  }
  return false;
}

// Função para adicionar pedido ao carrinho
function adicionarPedidoAoCarrinho(pedido) {
  // Adicionar pedido ao carrinho
  var itemLista = document.createElement("li");
  itemLista.textContent = pedido;
  carrinhoLista.appendChild(itemLista);

  // Adicionar botão de exclusão
  var deleteButton = document.createElement("button");
  deleteButton.textContent = "Excluir";
  deleteButton.classList.add("delete-button");
  itemLista.appendChild(deleteButton);
}

// Função para exportar para Excel
function exportToExcel(items) {
  var csvContent = "data:text/csv;charset=utf-8,";

  items.forEach(function (item) {
    csvContent += item.replace("x", ",") + "\r\n";
  });

  var encodedUri = encodeURI(csvContent);
  var link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "pedido_de_materiais.csv");
  document.body.appendChild(link);

  // Simular o clique no link para iniciar o download
  link.click();
}

// Restante do código...

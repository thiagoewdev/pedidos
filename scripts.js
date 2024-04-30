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

      // Implementação do filtro de busca
      var searchInput = document.getElementById("searchInput");
      var objetosExemplo = document.querySelectorAll(".objeto-exemplo");

      searchInput.addEventListener("input", function () {
        var searchTerm = this.value.toLowerCase();
        objetosExemplo.forEach(function (objeto) {
          var textoObjeto = objeto.textContent.toLowerCase();
          if (textoObjeto.includes(searchTerm)) {
            objeto.style.display = "block";
          } else {
            objeto.style.display = "none";
          }
        });
      });

      // Adicionar itens ao carrinho
      var addButtons = document.querySelectorAll(".add-button");
      var carrinhoLista = document.getElementById("lista-carrinho");

      addButtons.forEach(function (button) {
        button.addEventListener("click", function () {
          var objeto = this.parentElement.textContent
            .trim()
            .replace(/Adicionar|Excluir/g, '');
          var quantidade =
            this.parentElement.querySelector(".quantidade").value;
          var itemLista = document.createElement("li");
          itemLista.textContent = `${quantidade}x ${objeto}`;

          // Adicionando botão de exclusão ao item do carrinho
          var deleteButton = document.createElement("button");
          deleteButton.textContent = "Excluir";
          deleteButton.classList.add("delete-button");
          itemLista.appendChild(deleteButton);

          carrinhoLista.appendChild(itemLista);

          // Atualizar a lista de pedidos realizados no localStorage
          var pedidosRealizados =
            JSON.parse(localStorage.getItem("pedidosRealizados")) || [];
          pedidosRealizados.push(`${quantidade}x ${objeto}`);
          pedidosRealizados.push(pedido);
          localStorage.setItem("pedidosRealizados", JSON.stringify(pedidosRealizados));
        });
      });

      // Ao carregar a página, verificar se há pedidos realizados salvos e exibi-los
      window.onload = function () {
        var pedidosRealizados =
          JSON.parse(localStorage.getItem("pedidosRealizados")) || [];
        var listaPedidosRealizados = document.getElementById("lista-carrinho");
        pedidosRealizados.forEach(function (pedido) {
          var itemLista = document.createElement("li");
          itemLista.textContent = pedido;
          listaPedidosRealizados.appendChild(itemLista);
        });
      };

      // Excluir item do carrinho
      document
        .getElementById("lista-carrinho")
        .addEventListener("click", function (event) {
          if (event.target.classList.contains("delete-button")) {
            event.target.parentElement.remove();
          }
        });

      // Exportar para Excel
      document
        .getElementById("export-button")
        .addEventListener("click", function () {
          var items = [];
          carrinhoLista.querySelectorAll("li").forEach(function (item) {
            items.push(item.textContent);
          });
          exportToExcel(items);
        });

      function exportToExcel(items) {
        // Armazenar os dados da lista no localStorage
        localStorage.setItem("listaPedidos", JSON.stringify(items));

        // Criar um objeto Blob com os dados em formato CSV
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
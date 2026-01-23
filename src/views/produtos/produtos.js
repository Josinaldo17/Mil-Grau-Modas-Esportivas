// Variável de dados (fora da função para não resetar)
let produtos = JSON.parse(localStorage.getItem('produtos')) || [
    { id: 1, nome: "Tênis Nike", imagem: "https://imgcentauro-a.akamaihd.net/660x660/M17DRV46A4.jpg", preco: 299.90 },
    { id: 2, nome: "Tênis Adidas", imagem: "https://imgcentauro-a.akamaihd.net/660x660/M17DRV46A4.jpg", preco: 99.90 }
];

export const ProdutosView = () => {
    return `
 <main class="container-fluid px-4 py-4">
        <div class="container-fluid mt-4">
          <div class="row">
            <!-- Barra lateral de filtros -->
            <div class="col-md-3 mb-4">
              <div class="sidebar filtros">
                <h5 class="mb-3">Filtros</h5>

                <div class="mb-3">
                  <label class="form-label">Buscar Produto</label>
                  <input
                    type="text"
                    id="busca"
                    class="form-control"
                    placeholder="Pesquisar..."
                  />
                </div>

                <div class="mb-3">
                  <label class="form-label">Gênero</label>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value="Feminino"
                      id="feminino"
                    />
                    <label class="form-check-label" for="feminino"
                      >Feminino</label
                    >
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value="Masculino"
                      id="masculino"
                    />
                    <label class="form-check-label" for="masculino"
                      >Masculino</label
                    >
                  </div>
                </div>

                <div class="mb-3">
                  <label class="form-label">Tamanho</label>
                  <select class="form-select" id="tamanho">
                    <option selected>Todos</option>
                    <option>36</option>
                    <option>37</option>
                    <option>38</option>
                    <option>39</option>
                    <option>40</option>
                    <option>41</option>
                  </select>
                </div>

                <div>
                  <label class="form-label">Categoria</label>
                  <select class="form-select" id="categoria">
                    <option selected>Todos</option>
                    <option>Tênis</option>
                    <option>Camiseta</option>
                    <option>Bermuda</option>
                    <option>Jaqueta</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Área principal -->
            <div
              class="col-md-9 d-flex flex-column align-items-center justify-content-center"
            >
              <div
                class="col-md-9 d-flex align-items-center justify-content-between"
              >
                <h1 class="mb-4 text-center">Produtos</h1>

                <button id="btn-add-prod" class="btn btn-outline-success">
                        <i class="fas fa-plus-circle"></i> Adicionar produto
                </button>
              </div>

              <div
                class="container row overflow-auto mt-3"
                style="height: 70vh"
              >
                <div
                  class="row d-flex align-items-center justify-content-center"
                  id="galeria-produtos"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
            <div class="modal fade" id="modalProduto" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">

      <div class="modal-header">
        <h5 class="modal-title" id="tituloModal">Produto</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>

      <div class="modal-body">
        <input type="hidden" id="produtoId">

        <div class="mb-3">
          <label>Nome</label>
          <input type="text" id="produtoNome" class="form-control">
        </div>

        <div class="mb-3">
          <label>Preço</label>
          <input type="number" id="produtoPreco" class="form-control">
        </div>

        <div class="mb-3">
          <label>Quantidade</label>
          <input type="number" id="produtoQuantidade" class="form-control">
        </div>

        <div class="mb-3">
          <label>Imagem (URL)</label>
          <input type="text" id="produtoImagem" class="form-control">
        </div>
      </div>

      <div class="modal-footer">
        <button class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        <button class="btn btn-primary" id="btn-salvar-produto">Salvar</button>
      </div>

    </div>
  </div>
</div>

`;
};

export const initProdutos = () => {
    const galeria = document.getElementById('galeria-produtos');
    const modalElement = document.getElementById('modalProduto');
    
    // Inicializa o modal do Bootstrap
    const modalBootstrap = new bootstrap.Modal(modalElement);

    const render = () => {
        // Pega o valor da busca
        const termoBusca = document.getElementById('busca')?.value.toLowerCase() || '';
        
        // Filtra os produtos
        const produtosFiltrados = produtos.filter(p => 
            p.nome.toLowerCase().includes(termoBusca)
        );

        galeria.innerHTML = produtosFiltrados.map(p => `
            <div class="col-6 col-sm-4 col-md-3 mb-4">
                <div class="card shadow-sm text-center p-2">
                    <img src="${p.imagem}" class="card-img-top img-fluid" style="max-height: 150px; object-fit: contain;">
                    <div class="card-body p-2">
                        <p class="mb-1 fw-bold">${p.nome}</p>
                          <span class="text-success small d-block">R$ ${p.preco}</span>
                          <span class="text-muted small d-block mb-2">Quant: ${p.quantidade}</span>
                        <div class="d-flex gap-1 justify-content-center">
                            <button class="btn btn-sm btn-warning btn-editar" data-id="${p.id}"><i class="fas fa-edit"></i></button>
                            <button class="btn btn-sm btn-danger btn-apagar" data-id="${p.id}"><i class="fas fa-trash"></i></button>
                        </div>
                    </div>
                </div>
            </div>
            
        `).join('');

        // Reatribui eventos após o render
        document.querySelectorAll('.btn-apagar').forEach(btn => {
            btn.onclick = () => {
                const id = btn.getAttribute('data-id');
                if(confirm("Deseja apagar este produto?")) {
                    produtos = produtos.filter(p => p.id != id);
                    localStorage.setItem('produtos', JSON.stringify(produtos));
                    render();
                }
            };
        });

        document.querySelectorAll('.btn-editar').forEach(btn => {
            btn.onclick = () => {
                const id = btn.getAttribute('data-id');
                const p = produtos.find(prod => prod.id == id);
                document.getElementById('produtoId').value = p.id;
                document.getElementById('produtoNome').value = p.nome;
                document.getElementById('produtoPreco').value = p.preco;
                document.getElementById('produtoQuantidade').value = p.quantidade;
                document.getElementById('produtoImagem').value = p.imagem;
                document.getElementById('tituloModal').innerText = "Editar Produto";
                modalBootstrap.show();
            };
        });
    };

    // Lógica da Busca em Tempo Real
    document.getElementById('busca').oninput = () => {
        render();
    };

    // Botão Adicionar (Abre modal vazio)
    document.getElementById('btn-add-prod').onclick = () => {
        document.getElementById('produtoId').value = '';
        document.getElementById('produtoNome').value = '';
        document.getElementById('produtoPreco').value = '';
        document.getElementById('produtoQuantidade').value = '';
        document.getElementById('produtoImagem').value = '';
        document.getElementById('tituloModal').innerText = "Novo Produto";
        modalBootstrap.show();
    };

    // Botão Salvar (do Modal)
    document.getElementById('btn-salvar-produto').onclick = () => {
        const id = document.getElementById('produtoId').value;
        const nome = document.getElementById('produtoNome').value;
        const preco = document.getElementById('produtoPreco').value;
        const quantidade = document.getElementById('produtoQuantidade').value;
        const imagem = document.getElementById('produtoImagem').value || 'https://via.placeholder.com/150';

        if (id) {
            // Edição
            const index = produtos.findIndex(p => p.id == id);
            produtos[index] = { ...produtos[index], nome, preco: parseFloat(preco), quantidade, imagem };
        } else {
            // Novo
            produtos.push({ id: Date.now(), nome, preco: parseFloat(preco), quantidade, imagem });
        }

        localStorage.setItem('produtos', JSON.stringify(produtos));
        render();
        modalBootstrap.hide();
    };

    render(); // Primeira renderização
};
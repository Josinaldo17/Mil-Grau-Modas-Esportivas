export const VendasView = () => {
    return `
    <div id="vendas-container" class="container-fluid mt-4">
        <div class="row">

            <!-- Barra lateral de filtros -->
            <div class="col-md-3 mb-4">
                <div class="sidebar filtros">
                    <h5 class="mb-3">Filtros</h5>

                    <div class="mb-3">
                        <label class="form-label">Buscar Produto</label>
                        <input type="text" id="busca" class="form-control" placeholder="Pesquisar...">
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Gênero</label>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="Feminino" id="feminino">
                            <label class="form-check-label" for="feminino">Feminino</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="Masculino" id="masculino">
                            <label class="form-check-label" for="masculino">Masculino</label>
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

            <!-- VITRINE -->
            <section id="section-vitrine" class="col-md-9">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h2>Produtos</h2>

                    <button id="btn-ver-carrinho" class="btn btn-outline-danger p-3">
                        <i class="fas fa-shopping-cart"></i>
                        <span id="cart-count">0 itens</span>
                    </button>
                </div>

                <div class="row overflow-auto" style="height: 70vh;">
                    <div class="row" id="galeria-produtos"></div>
                </div>
            </section>

            <!-- CARRINHO -->
            <section id="section-carrinho" class="col-md-9 d-none">
                <div class="mb-4">
                    <button id="btn-voltar-vitrine" class="btn btn-link text-decoration-none">
                        <i class="fas fa-arrow-left"></i> Continuar Comprando
                    </button>
                </div>

                <div class="row">
                    <div class="col-lg-8 overflow-auto" id="itens-carrinho-lista" style="height: 70vh;"></div>
                    <div class="col-lg-4" id="resumo-financeiro"></div>
                </div>
            </section>

        </div>
    </div>
    `;
};

// 2. Criamos uma função separada para popular a galeria de VENDAS
export const initVendasEvents = () => {
    const container = document.getElementById('vendas-container');
    if (!container) return;

    // Carregamos os dados iniciais
    let carrinho = JSON.parse(localStorage.getItem('carrinho_atual')) || [];

    const atualizarInterface = () => {
        const galeria = document.getElementById('galeria-produtos');
        const listaCarrinho = document.getElementById('itens-carrinho-lista');
        const countBadge = document.getElementById('cart-count');
        const produtosEstoque = JSON.parse(localStorage.getItem('produtos')) || [];
        const totalItens = carrinho.reduce((acc, item) => acc + item.qtd, 0);

        // 1. Renderizar Vitrine com Verificação de Estoque
        if (galeria) {
            galeria.innerHTML = produtosEstoque.map(p => {
                const qtdNoEstoque = parseInt(p.quantidade) || 0;
                const esgotado = qtdNoEstoque <= 0;


                return `
                <div class="col-md-3 mb-4">
                    <div class="product-card text-center ${esgotado ? 'opacity-75' : ''}">
                        <img src="${p.imagem}" class="img-fluid product-img" alt="${p.nome}">
                        <div class="card-body">
                            <p class="mt-2">${p.nome}</p>
                            <p class="text-success">R$ ${parseFloat(p.preco).toFixed(2)}</p>
                             ${esgotado 
                                ? `<button class="btn btn-danger btn-sm w-100" disabled>Esgotado</button>`
                                : `<button class="btn btn-success btn-sm btn-add-cart w-100" data-id="${p.id}">Adicionar</button>`
                            }
                        </div>
                    </div>
                </div>`;
            }).join('');

            

            
        }

        // 2. Renderizar Carrinho (Usa o index para remover sem erro)
        if (countBadge) {
            countBadge.innerText = `${totalItens} ${totalItens === 1 ? 'item' : 'itens'}`;
        }

        // 2. Renderiza a lista no carrinho
        if (listaCarrinho) {
            if (carrinho.length === 0) {
                listaCarrinho.innerHTML = '<p class="text-center mt-5">Carrinho vazio</p>';
            } else {
                listaCarrinho.innerHTML = carrinho.map((item, index) => `
                    <div class="card mb-3 p-3">
                        <div class="row align-items-center">
                            <div class="col-md-2">
                                <img src="${item.imagem}" class="img-fluid" style="max-height: 60px">
                            </div>
                            <div class="col-md-4">
                                <h6>${item.nome}</h6>
                            </div>
                            <div class="col-md-6 text-end">
                                <button class="btn btn-sm btn-outline-danger btn-remove" data-index="${index}">
                                    ${item.qtd > 1 ? '<i class="fas fa-minus"></i>' : '<i class="fas fa-trash"></i>'}
                                </button>
                                
                                <span class="mx-3 fw-bold">${item.qtd}x</span>
                                
                                <span class="text-success fw-bold">R$ ${(item.preco * item.qtd).toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                `).join('');
            }
        }

        renderizarResumo();
        localStorage.setItem('carrinho_atual', JSON.stringify(carrinho));
    };

    const renderizarResumo = () => {
        const resumoDiv = document.getElementById('resumo-financeiro');
        // RECALCULO TOTAL: O segredo para não bugar o valor
        const total = carrinho.reduce((acc, item) => acc + (parseFloat(item.preco) * item.qtd), 0);
        
        if (resumoDiv) {
            resumoDiv.innerHTML = `
                <div class="card p-4 shadow-sm">
                    <h6 class="d-flex justify-content-between"><span>Subtotal</span> <span>R$ ${total.toFixed(2)}</span></h6>
                    <hr>
                    <h4 class="d-flex justify-content-between text-danger"><strong>Total</strong> <strong>R$ ${total.toFixed(2)}</strong></h4>
                    <button id="btn-finalizar-venda" class="btn btn-success w-100 mt-3" ${carrinho.length === 0 ? 'disabled' : ''}>
                        Finalizar Venda
                    </button>
                </div>`;
        }
    };

    // --- EVENTOS DE CLIQUE (DELEGAÇÃO) ---
    container.addEventListener('click', (e) => {
        // AÇÃO: ADICIONAR
        if (e.target.classList.contains('btn-add-cart')) {
            const id = e.target.dataset.id;
            const produtosEstoque = JSON.parse(localStorage.getItem('produtos')) || [];
            const produto = produtosEstoque.find(p => p.id == id);
            
            const itemNoCart = carrinho.find(item => item.id == id);
            if (itemNoCart) {
                itemNoCart.qtd++;
            } else {
                carrinho.push({ ...produto, qtd: 1 });
            }
            atualizarInterface();
        }

        // AÇÃO: REMOVER (O valor volta ao normal porque o atualizarInterface recalcula tudo)
        if (e.target.classList.contains('btn-remove')) {
            const index = e.target.dataset.index;
            carrinho.splice(index, 1); // Remove do array
            atualizarInterface(); // Redesenha a tela
        }

        // AÇÃO: FINALIZAR E BAIXAR ESTOQUE
        if (e.target.id === 'btn-finalizar-venda') {
            let estoqueGlobal = JSON.parse(localStorage.getItem('produtos')) || [];
            
            // 1. Dá baixa no estoque real
            carrinho.forEach(itemCart => {
                const prodEstoque = estoqueGlobal.find(p => p.id == itemCart.id);
                if (prodEstoque) {
                    prodEstoque.quantidade = parseInt(prodEstoque.quantidade) - itemCart.qtd;
                }
            });

            // 2. Salva o estoque atualizado e a venda
            localStorage.setItem('produtos', JSON.stringify(estoqueGlobal));
            
            const vendas = JSON.parse(localStorage.getItem('vendas_realizadas')) || [];
            vendas.push({
                id: Date.now(),
                data: new Date().toLocaleString(),
                itens: [...carrinho],
                total: carrinho.reduce((acc, i) => acc + (i.preco * i.qtd), 0)
            });
            localStorage.setItem('vendas_realizadas', JSON.stringify(vendas));

            alert("Venda realizada!");
            carrinho = [];
            localStorage.removeItem('carrinho_atual');
            atualizarInterface();
            // Volta para a vitrine
            document.getElementById('section-carrinho').classList.add('d-none');
            document.getElementById('section-vitrine').classList.remove('d-none');
        }

        // Alternar Telas
        if (e.target.closest('#btn-ver-carrinho')) {
            document.getElementById('section-vitrine').classList.add('d-none');
            document.getElementById('section-carrinho').classList.remove('d-none');
            atualizarInterface();
        }
        if (e.target.closest('#btn-voltar-vitrine')) {
            document.getElementById('section-carrinho').classList.add('d-none');
            document.getElementById('section-vitrine').classList.remove('d-none');
            atualizarInterface();
        }
    });

    atualizarInterface();
};
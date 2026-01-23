// src/views/vendas/vendas.js

const LINK_IMAGEM_PADRAO = "https://imgcentauro-a.akamaihd.net/660x660/M17DRV46A4.jpg";
let imagens = [LINK_IMAGEM_PADRAO, LINK_IMAGEM_PADRAO, LINK_IMAGEM_PADRAO, LINK_IMAGEM_PADRAO, LINK_IMAGEM_PADRAO, LINK_IMAGEM_PADRAO, LINK_IMAGEM_PADRAO, LINK_IMAGEM_PADRAO, LINK_IMAGEM_PADRAO, LINK_IMAGEM_PADRAO, LINK_IMAGEM_PADRAO];


export const VendasView = () => {
    // 1. Primeiro retornamos o HTML base
    return `<div class="container-fluid mt-4">
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
    
                    <!-- Área principal -->
                    <div class="col-md-9 d-flex flex-column align-items-center justify-content-center" >
                        <div class="col-md-9 d-flex align-items-center justify-content-between">
                             <h1 class="mb-4 text-center">Produtos</h1>
    
                            <div id="carrinho-fixo" class="btn btn-outline-danger text-danger p-3 rounded">
                                <i class="fas fa-shopping-cart"></i>
                                <span>3 itens</span>
                            </div>
                        </div>
                       
    
                        <div class="container  row overflow-auto  mt-3  " style="height: 70vh;">
    
                            <div class="row d-flex  align-items-center justify-content-center" id="galeria"></div>
                        </div>
                    </div>
                </div>
            </div>
            
            `;
};

// 2. Criamos uma função separada para popular a galeria
export const initVendasEvents = () => {
    const galeria = document.getElementById("galeria");
    if (!galeria) return;

    galeria.innerHTML = ''; // Limpa antes de renderizar

    imagens.forEach((linkDaImagem, index) => {
        let colDiv = document.createElement("div");
        colDiv.className = 'col-6 col-sm-4 col-md-3 mb-4';
        colDiv.innerHTML = `
            <div class="product-card text-center">
                <img src="${linkDaImagem}" class="img-fluid product-img" alt="Produto">
                <p class="mt-2">Item #${index + 1}</p>
                <button class="btn btn-success w-100">Adicionar</button>
            </div>
        `;
        galeria.appendChild(colDiv);
    });
};

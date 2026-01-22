export const DashboardView = () => {
    return `<main id="dashboard" class="container-fluid py-4">

            <section id="metricas-superiores" class="row row-cols-1 row-cols-md-4 g-4">
                <div class="col">
                    <div class="card shadow-sm border-0">
                        <div class="card-body">
                            <h5 class="card-title text-muted">Vendas Hoje</h5>
                            <p class="valor-diario h2 mb-0">R$ 1.500</p>
                            
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card shadow-sm border-0">
                        <div class="card-body">
                            <h5 class="card-title text-muted">Produtos com Baixo Estoque</h5>
                            <p class="numero-baixo-estoque h2 mb-0">18</p>
                            
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card shadow-sm border-0">
                        <div class="card-body">
                            <h5 class="card-title text-muted">Itens no Estoque</h5>
                            <p class="quantidade-itens-estoque h2 mb-0">987</p>
                            
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card shadow-sm border-0">
                        <div class="card-body">
                            <h5 class="card-title text-muted">Itens Vendidos Hoje</h5>
                            <p class="numero-vendas h2 mb-0">150</p>
                           
                        </div>
                    </div>
                </div>
            </section>
            
            <section id="centro" class="row g-4 mt-4">
                <div class="col-12 col-lg-9">
                    <div class="Graficos card shadow border-0 h-100">
                        <div class="card-body">
                            <div class="img-graficos bg-light rounded d-flex align-items-center justify-content-center p-5 mt-3" style="min-height: 250px;">
                                [Placeholder para Gráfico]
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-lg-3">
                    <div class="metricas-laterais d-grid gap-4">
                        <div class="card shadow-sm border-0"><div class="card-body"><h6 class="card-title text-primary">Produtos Mais Vendidos</h6><p class="mais-vendas">Camiseta T001</p></div></div>
                        <div class="card shadow-sm border-0"><div class="card-body"><h6 class="card-title text-info">Produtos Menos Vendidos</h6><p class="menos-vendas">Meia Esportiva Z</p></div></div>
                        <div class="card shadow-sm border-0"><div class="card-body"><h6 class="card-title text-success">Melhor Categoria</h6><p class="melhor-categoria">Bermudas</p></div></div>
                        <div class="card shadow-sm border-0"><div class="card-body"><h6 class="card-title text-danger">Reabastecimento Urgente</h6><p class="itens-reabastecimento">5 Itens</p></div></div>
                    </div>
                </div>
            </section>
            
            <section class="atalhos mt-5">
                <h2 class="mb-3">Atalhos Rápidos</h2>
                <div class="grade-atalhos row row-cols-1 row-cols-md-3 g-3">
                    <div class="col"><div class="card bg-light border-0 text-center shadow-sm p-3 cursor-pointer hover-shadow-lg">Cadastrar Produto</div></div>
                    <div class="col"><div class="card bg-light border-0 text-center shadow-sm p-3 cursor-pointer hover-shadow-lg">Listar Produtos</div></div>
                    <div class="col"><div class="card bg-light border-0 text-center shadow-sm p-3 cursor-pointer hover-shadow-lg">Excluir Produtos</div></div>
                    <div class="col"><div class="card bg-light border-0 text-center shadow-sm p-3 cursor-pointer hover-shadow-lg">Registrar Venda</div></div>
                    <div class="col"><div class="card bg-light border-0 text-center shadow-sm p-3 cursor-pointer hover-shadow-lg">Listar Vendas</div></div>
                    <div class="col"><div class="card bg-light border-0 text-center shadow-sm p-3 cursor-pointer hover-shadow-lg">Relatórios</div></div>
                </div>
            </section>
            
        </main>`;
};
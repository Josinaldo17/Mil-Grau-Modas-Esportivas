export const initDashboard = () => { 
  atualizarMetricasEstoque();
  renderizarGraficoDashboard();
}

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
                            <h6 class="card-title text-muted">Produtos com Baixo Estoque</h6>
                            <p class="numero-baixo-estoque h2 mb-0"></p>
                            
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card shadow-sm border-0">
                        <div class="card-body">
                            <h5 class="card-title text-muted">Itens no Estoque</h5>
                            <p class="quantidade-itens-estoque h2 mb-0"></p>
                            
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
                            <div class="img-graficos bg-light rounded p-3 mt-3" style="min-height: 250px;">
                                <canvas id="graficoProdutos"></canvas>
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
                    <div class="col"><div class="card bg-light border-0 text-center shadow-sm p-3 cursor-pointer hover-shadow-lg" onclick="window.location.href = '/produtos'">Cadastrar Produto</div></div>
                    <div class="col"><div class="card bg-light border-0 text-center shadow-sm p-3 cursor-pointer hover-shadow-lg" onclick="window.location.href = '/produtos'">Listar Produtos</div></div>
                    <div class="col"><div class="card bg-light border-0 text-center shadow-sm p-3 cursor-pointer hover-shadow-lg" onclick="window.location.href = '/produtos'">Excluir Produtos</div></div>
                    <div class="col"><div class="card bg-light border-0 text-center shadow-sm p-3 cursor-pointer hover-shadow-lg" onclick="window.location.href = '/vendas'" >Registrar Venda</div></div>
                    <div class="col"><div class="card bg-light border-0 text-center shadow-sm p-3 cursor-pointer hover-shadow-lg" onclick="window.location.href = '/vendas'">Listar Vendas</div></div>
                    <div class="col"><div class="card bg-light border-0 text-center shadow-sm p-3 cursor-pointer hover-shadow-lg" onclick="window.location.href = '/relatorio'">Relatórios</div></div>
                </div>
                
            </section>
            
        </main>`;
};

function renderizarGraficoDashboard() {
  const produtos = JSON.parse(localStorage.getItem('produtos')) || [];

  const nomes = produtos.map(p => p.nome);
  const quantidade = produtos.map(p => p.quantidade);

  const canvas = document.getElementById('graficoProdutos');
  if (!canvas) return;

  new Chart(canvas, {
  type: 'bar',
  data: {
    labels: nomes,
    datasets: [{
      label: 'Quantidade em Estoque:',
      data: quantidade,
      backgroundColor: 'rgb(231, 135, 25)',
      borderColor: 'rgb(231, 135, 25)',
      borderWidth: 2,
      borderRadius: 8,
      hoverBackgroundColor: 'rgb(116, 76, 25)'
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          font: {
            size: 14
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1
        },
        title: {
          display: true,
          text: 'Quantidade'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Produtos'
        }
      }
    }
  }
});
}
// setTimeout(renderizarGraficoDashboard, 0);


function atualizarMetricasEstoque() {
    // 1. DADOS DO ESTOQUE
    const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    let totalItensEstoque = 0;
    let baixoEstoqueCount = 0;

    produtos.forEach(p => {
        const qtd = Number(p.quantidade) || 0;
        totalItensEstoque += qtd;
        if (qtd <= 5) baixoEstoqueCount++; // Alerta para menos de 5 unidades
    });

    // 2. DADOS DE VENDAS (O Coração do Dash)
    const vendas = JSON.parse(localStorage.getItem('vendas_realizadas')) || [];
    const hoje = new Date().toLocaleDateString();

    let faturamentoHoje = 0;
    let itensVendidosHoje = 0;
    let mapaProdutosVendidos = {}; // Para ranking

    vendas.forEach(venda => {
        // Verifica se a venda foi hoje (comparando a string da data)
        if (venda.data.includes(hoje)) {
            faturamentoHoje += venda.total;
            
            venda.itens.forEach(item => {
                itensVendidosHoje += item.qtd;
                
                // Agrupar para o ranking
                mapaProdutosVendidos[item.nome] = (mapaProdutosVendidos[item.nome] || 0) + item.qtd;
            });
        }
    });

    // 3. RANKING DE PRODUTOS
    const listaRanqueada = Object.entries(mapaProdutosVendidos).sort((a, b) => b[1] - a[1]);
    const maisVendido = listaRanqueada.length > 0 ? listaRanqueada[0][0] : "Nenhuma venda";
    const menosVendido = listaRanqueada.length > 1 ? listaRanqueada[listaRanqueada.length - 1][0] : "Nenhuma venda";

    // --- ATUALIZAÇÃO DO DOM ---
    
    // Métricas Superiores
    document.querySelector('.valor-diario').innerText = `R$ ${faturamentoHoje.toFixed(2)}`;
    document.querySelector('.numero-baixo-estoque').innerText = baixoEstoqueCount;
    document.querySelector('.quantidade-itens-estoque').innerText = totalItensEstoque;
    document.querySelector('.numero-vendas').innerText = itensVendidosHoje;

    // Métricas Laterais
    document.querySelector('.mais-vendas').innerText = maisVendido;
    document.querySelector('.menos-vendas').innerText = menosVendido;
    document.querySelector('.itens-reabastecimento').innerText = `${baixoEstoqueCount} Itens`;
}






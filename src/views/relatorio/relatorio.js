document.addEventListener('DOMContentLoaded', () => {
    const reportTypeSelect = document.getElementById('report-type');
    const reportSubtypeSelect = document.getElementById('report-subtype');
    const generateReportBtn = document.getElementById('generate-report-btn');
    const reportTitle = document.getElementById('report-title');

    // Mapeamento de todos os seus relatórios
    const reportsMap = {
        vendas: [
            "Vendas por dia / semana / mês / ano",
            "Vendas por produto",
            "Vendas por categoria",
            "Vendas por tamanho",
            "Vendas por cor",
            "Vendas por funcionário / vendedor",
            "Ticket médio",
            "Formas de pagamento",
            "Produtos mais vendidos",
            "Produtos menos vendidos"
        ],
        financeiro: [
            "Faturamento total no período",
            "Lucro bruto e líquido",
            "Custos (CMV)",
            "Despesas fixas e variáveis",
            "Margem de lucro por produto",
            "Caixa diário (entradas e saídas)"
        ],
        estoque: [
            "Estoque atual por produto",
            "Nível mínimo de estoque (alertas)",
            "Curva ABC",
            "Produtos prestes a acabar",
            "Produtos encalhados (muito tempo sem giro)",
            "Histórico de movimentações"
        ],
        clientes: [
            "Clientes que mais compram",
            "Clientes que não compram há muito tempo",
            "Clientes novos no período",
            "Frequência de compras",
            "Ticket médio por cliente",
            "Relatório de fidelização"
        ],
        promocoes: [
            "Descontos aplicados por período",
            "Produtos mais vendidos em oferta",
            "Impacto das promoções no faturamento",
            "Comparativo: antes / durante / depois da promoção"
        ],
        operacional: [
            "Devoluções / trocas",
            "Motivos das trocas",
            "Tempo médio de atendimento",
            "Pedidos cancelados",
            "Relatório de metas vs resultados"
        ]
    };

    // Função para preencher o select de Subtipo com base no Tipo selecionado
    function populateSubtypeSelect(selectedType) {
        reportSubtypeSelect.innerHTML = ''; // Limpa as opções existentes
        
        const subTypes = reportsMap[selectedType] || [];
        
        // Adiciona a opção padrão
        const defaultOption = document.createElement('option');
        defaultOption.value = "";
        defaultOption.textContent = "Selecione o relatório específico";
        reportSubtypeSelect.appendChild(defaultOption);

        // Adiciona as novas opções
        subTypes.forEach(subType => {
            const option = document.createElement('option');
            option.value = subType; // Usamos o próprio texto como valor para simplificar
            option.textContent = subType;
            reportSubtypeSelect.appendChild(option);
        });
        
        // Seleciona a primeira opção válida automaticamente (ou a padrão)
        if (subTypes.length > 0) {
             reportSubtypeSelect.selectedIndex = 1; // Seleciona o primeiro item útil
        } else {
             reportSubtypeSelect.selectedIndex = 0;
        }
    }

    // Inicializa o Subtipo de Relatório ao carregar a página
    populateSubtypeSelect(reportTypeSelect.value);

    // Listener para o filtro principal (Tipo de Relatório)
    reportTypeSelect.addEventListener('change', (event) => {
        populateSubtypeSelect(event.target.value);
    });

    // Listener para o botão Gerar Relatório
    generateReportBtn.addEventListener('click', () => {
        const type = reportTypeSelect.options[reportTypeSelect.selectedIndex].text;
        const subtype = reportSubtypeSelect.value;
        const startDate = document.getElementById('period-start').value;
        const endDate = document.getElementById('period-end').value;

        if (subtype) {
            // Simulação de atualização do Dashboard
            reportTitle.textContent = `Relatório: ${subtype} | Período: ${startDate} a ${endDate}`;
            
            // Aqui você adicionaria a lógica real para buscar e renderizar os dados
            alert(`Gerando relatório de ${type}: "${subtype}" de ${startDate} a ${endDate}. (Funcionalidade de simulação)`);
            
            // Exemplo de como você poderia atualizar as métricas (apenas visual)
            document.getElementById('faturamento-bruto').textContent = 'R$ 18.500,00';
            document.getElementById('ticket-medio').textContent = 'R$ 185,00';
            document.getElementById('cmv').textContent = 'R$ 6.100,00';
            document.getElementById('lucro-bruto').textContent = 'R$ 12.400,00';

        } else {
            alert('Por favor, selecione um relatório específico na lista.');
        }
    });

    // Listener para o botão Exportar PDF
    document.getElementById('export-pdf-btn').addEventListener('click', () => {
        alert('Exportando o relatório atual para PDF. (Funcionalidade de simulação)');
    });
});

export const RelatorioView = () => {
    return `<main class="main-content flex-grow-1 p-4 overflow-auto">
            <header class="header mb-4">
                <h2 class="fw-bold text-dark">Relatórios Analíticos</h2>
            </header>

            <section class="filters-section card shadow-sm mb-4">
                <div class="card-body">
                    <h3 class="card-title text-danger border-bottom border-danger pb-2 mb-3 fs-5">Opções de Relatório</h3>
                    
                    <div class="filter-controls d-flex flex-wrap gap-3 mb-3">
                        <div class="filter-group flex-fill" style="min-width: 200px;">
                            <label for="report-type" class="form-label small fw-bold">Tipo de Relatório:</label>
                            <select id="report-type" class="form-select">
                                <option value="vendas">Vendas</option>
                                <option value="financeiro">Financeiro</option>
                                <option value="estoque">Estoque</option>
                                <option value="clientes">Clientes</option>
                                <option value="promocoes">Promoções / Descontos</option>
                                <option value="operacional">Operacional</option>
                            </select>
                        </div>

                        <div class="filter-group flex-fill" style="min-width: 200px;">
                            <label for="report-subtype" class="form-label small fw-bold">Subtipo de Relatório:</label>
                            <select id="report-subtype" class="form-select">
                                <option value="">Selecione um Tipo</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="period-controls d-flex flex-wrap align-items-end gap-3">
                        <div class="filter-group flex-fill" style="min-width: 150px;">
                            <label for="period-start" class="form-label small fw-bold">Início:</label>
                            <input type="date" id="period-start" value="2025-11-01" class="form-control">
                        </div>
                        <div class="filter-group flex-fill" style="min-width: 150px;">
                            <label for="period-end" class="form-label small fw-bold">Fim:</label>
                            <input type="date" id="period-end" value="2025-11-30" class="form-control">
                        </div>
                        
                        <button id="generate-report-btn" class="btn btn-danger primary-btn"><i class="fas fa-search me-1"></i> Gerar Relatório</button>
                        <button id="export-pdf-btn" class="btn btn-outline-secondary secondary-btn"><i class="fas fa-file-pdf me-1"></i> Exportar PDF</button>
                    </div>
                </div>
            </section>

            <section class="report-view-section">
                <h3 id="report-title" class="fs-4 mb-3">Relatório: Vendas por Dia (Novembro/2025)</h3>
                
                <div class="report-summary-grid row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4 mb-4">
                    
                    <div class="col">
                        <div class="metric-card card text-center p-3 h-100 border-start border-5 border-danger shadow-sm">
                            <i class="fas fa-money-bill-wave fa-2x text-danger mb-2"></i>
                            <p class="mb-1 text-muted small">Faturamento Bruto</p>
                            <span class="value fs-4 fw-bold text-dark" id="faturamento-bruto">R$ 15.000,00</span>
                        </div>
                    </div>
                    
                    <div class="col">
                        <div class="metric-card card text-center p-3 h-100 border-start border-5 border-secondary shadow-sm">
                            <i class="fas fa-percentage fa-2x text-secondary mb-2"></i>
                            <p class="mb-1 text-muted small">Ticket Médio</p>
                            <span class="value fs-4 fw-bold text-dark" id="ticket-medio">R$ 150,00</span>
                        </div>
                    </div>
                    
                    <div class="col">
                        <div class="metric-card alert-low card text-center p-3 h-100 border-start border-5 border-danger shadow-sm">
                            <i class="fas fa-box-open fa-2x text-danger mb-2"></i>
                            <p class="mb-1 text-muted small">CMV (Custo)</p>
                            <span class="value fs-4 fw-bold text-danger" id="cmv">R$ 5.000,00</span>
                        </div>
                    </div>
                    
                    <div class="col">
                        <div class="metric-card alert-high card text-center p-3 h-100 border-start border-5 border-success shadow-sm">
                            <i class="fas fa-chart-line fa-2x text-success mb-2"></i>
                            <p class="mb-1 text-muted small">Lucro Bruto</p>
                            <span class="value fs-4 fw-bold text-success" id="lucro-bruto">R$ 10.000,00</span>
                        </div>
                    </div>
                </div>

                <div class="card shadow-sm mb-4">
                    <div class="card-body">
                        <h4 class="card-title fs-5 mb-3">Evolução Diária de Vendas</h4>
                        <div class="chart-area border rounded p-3">
                            <div class="chart-simulation d-flex align-items-end justify-content-around p-3" style="height: 250px;">
                                <div class="bar-container text-center mx-1" style="flex: 1;">
                                    <div class="bg-danger rounded" style="height: 40%;" title="Semana 1"></div>
                                    <small class="d-block mt-2">S1</small>
                                </div>
                                <div class="bar-container text-center mx-1" style="flex: 1;">
                                    <div class="bg-danger rounded" style="height: 60%;" title="Semana 2"></div>
                                    <small class="d-block mt-2">S2</small>
                                </div>
                                <div class="bar-container text-center mx-1" style="flex: 1;">
                                    <div class="bg-danger rounded" style="height: 80%;" title="Semana 3"></div>
                                    <small class="d-block mt-2">S3</small>
                                </div>
                                <div class="bar-container text-center mx-1" style="flex: 1;">
                                    <div class="bg-danger rounded" style="height: 100%;" title="Semana 4"></div>
                                    <small class="d-block mt-2">S4</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card shadow-sm">
                    <div class="card-body">
                        <h4 class="card-title fs-5 mb-3">Detalhes do Top 5 Produtos Mais Vendidos</h4>
                        <div class="table-responsive">
                            <table class="report-table table table-hover">
                                <thead class="table-light">
                                    <tr>
                                        <th>Rank</th>
                                        <th>Produto</th>
                                        <th>Vendas (Qtd)</th>
                                        <th>Faturamento</th>
                                        <th>Margem (%)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><span class="badge bg-danger">1</span></td>
                                        <td>Camisa Premium Gola V</td>
                                        <td>150</td>
                                        <td>R$ 7.500</td>
                                        <td><span class="text-success fw-bold">45%</span></td>
                                    </tr>
                                    <tr>
                                        <td><span class="badge bg-secondary">2</span></td>
                                        <td>Tênis Runner Pro</td>
                                        <td>120</td>
                                        <td>R$ 14.400</td>
                                        <td><span class="text-warning fw-bold">30%</span></td>
                                    </tr>
                                    <tr>
                                        <td><span class="badge bg-secondary">3</span></td>
                                        <td>Boné Aba Reta Urbano</td>
                                        <td>80</td>
                                        <td>R$ 3.200</td>
                                        <td><span class="text-success fw-bold">50%</span></td>
                                    </tr>
                                    <tr>
                                        <td>4</td>
                                        <td>Calça Jeans Slim Fit</td>
                                        <td>75</td>
                                        <td>R$ 11.250</td>
                                        <td><span class="text-success fw-bold">40%</span></td>
                                    </tr>
                                    <tr>
                                        <td>5</td>
                                        <td>Meia Esportiva (3 pares)</td>
                                        <td>60</td>
                                        <td>R$ 900</td>
                                        <td><span class="text-success fw-bold">60%</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                
            </section>
        </main>`;
};
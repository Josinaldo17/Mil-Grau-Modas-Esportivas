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
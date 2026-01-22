export const ConfiguracaoView = () => {
    return `<main class="container-fluid px-4 py-4">

    <!-- Título -->
    <div class="mb-4">
        <h2 class="fw-bold"><i class="fas fa-cog me-2"></i>Configurações</h2>
        <p class="text-muted">Gerencie as preferências do sistema</p>
    </div>

    <div class="row g-4">

        <!-- Perfil do Usuário -->
        <div class="col-md-6">
            <div class="card shadow-sm h-100">
                <div class="card-body">
                    <h5 class="card-title mb-3"><i class="fas fa-user me-2"></i>Perfil do Usuário</h5>

                    <div class="text-center mb-3">
                        <img src="https://ui-avatars.com/api/?name=John+Doe&background=4361ee&color=fff"
                             class="rounded-circle mb-2" width="80">
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Nome</label>
                        <input type="text" class="form-control" value="John Doe">
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Email</label>
                        <input type="email" class="form-control" value="john@email.com">
                    </div>

                    <button class="btn btn-primary w-100">Salvar alterações</button>
                </div>
            </div>
        </div>

        <!-- Preferências da Interface -->
        <div class="col-md-6">
            <div class="card shadow-sm h-100">
                <div class="card-body">
                    <h5 class="card-title mb-3"><i class="fas fa-palette me-2"></i>Interface</h5>

                    <div class="form-check form-switch mb-3">
                        <input class="form-check-input" type="checkbox" id="temaEscuro">
                        <label class="form-check-label" for="temaEscuro">Tema escuro</label>
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Tamanho da fonte</label>
                        <select class="form-select">
                            <option>Pequena</option>
                            <option selected>Média</option>
                            <option>Grande</option>
                        </select>
                    </div>

                    <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" checked>
                        <label class="form-check-label">Ativar animações</label>
                    </div>
                </div>
            </div>
        </div>

        <!-- Dados da Loja -->
        <div class="col-md-6">
            <div class="card shadow-sm h-100">
                <div class="card-body">
                    <h5 class="card-title mb-3"><i class="fas fa-store me-2"></i>Dados da Loja</h5>

                    <div class="mb-3">
                        <label class="form-label">Nome da loja</label>
                        <input type="text" class="form-control" value="Mil Grau Modas Esportivas">
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Telefone</label>
                        <input type="text" class="form-control" value="(00) 00000-0000">
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Endereço</label>
                        <input type="text" class="form-control">
                    </div>
                </div>
            </div>
        </div>

        <!-- Preferências de Vendas -->
        <div class="col-md-6">
            <div class="card shadow-sm h-100">
                <div class="card-body">
                    <h5 class="card-title mb-3"><i class="fas fa-tags me-2"></i>Vendas</h5>

                    <div class="mb-3">
                        <label class="form-label">Desconto máximo (%)</label>
                        <input type="number" class="form-control" value="10">
                    </div>

                    <div class="form-check mb-2">
                        <input class="form-check-input" type="checkbox" checked>
                        <label class="form-check-label">Permitir promoções</label>
                    </div>

                    <div class="form-check">
                        <input class="form-check-input" type="checkbox">
                        <label class="form-check-label">Valor mínimo por pedido</label>
                    </div>
                </div>
            </div>
        </div>

        <!-- Sistema -->
        <div class="col-12">
            <div class="card shadow-sm">
                <div class="card-body d-flex flex-wrap gap-2 justify-content-between align-items-center">
                    <div>
                        <h5 class="mb-1"><i class="fas fa-desktop me-2"></i>Sistema</h5>
                        <small class="text-muted">Versão 1.0.0</small>
                    </div>

                    <div class="d-flex gap-2">
                        <button class="btn btn-outline-secondary">Restaurar padrões</button>
                        <button class="btn btn-outline-danger">Limpar dados</button>
                    </div>
                </div>
            </div>
        </div>

    </div>

</main>`;
};
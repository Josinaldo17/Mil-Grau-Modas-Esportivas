export const initFuncionarios = () => {
    const container = document.querySelector('#funcionarios-page-container');
    
    // Se o container não existe na tela, não faz nada
    if (!container) return;

    const telaLista = document.getElementById('view-lista-funcionarios');
    const telaCadastro = document.getElementById('view-cadastro-funcionario');

    container.addEventListener('click', (e) => {
        // Verifica se clicou no botão de NOVO ou em algo dentro dele
        if (e.target.closest('#btn-ir-para-cadastro')) {
            telaLista.classList.add('d-none');
            telaCadastro.classList.remove('d-none');
        }

        // Verifica se clicou no botão de VOLTAR ou no de CANCELAR
        if (e.target.closest('#btn-voltar-para-lista') || e.target.closest('button[type="reset"]')) {
            e.preventDefault();
            telaCadastro.classList.add('d-none');
            telaLista.classList.remove('d-none');
        }
    });
};


export const FuncionariosView = () => {
    return `
    <div id="funcionarios-page-container" style="height: 105%;">        
        <div id="view-lista-funcionarios">
            <div class="d-flex justify-content-between align-items-center mb-4">
              <h2><i class="fas fa-users me-2"></i>Funcionários</h2>
              <button id="btn-ir-para-cadastro" class="btn btn-primary">
                <i class="fas fa-user-plus me-1"></i> Novo Funcionário
              </button>
            </div>

            <div class="card shadow-sm">
              <div class="card-body">
                <table class="table table-hover align-middle">
                  <thead class="table-light">
                    <tr>
                      <th>Nome</th>
                      <th>Email</th>
                      <th>Cargo</th>
                      <th class="text-center">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Administrador</td>
                      <td>administrador@empresa.com</td>
                      <td><span class="badge bg-danger">Administrador</span></td>
                      <td><span class="badge badge-ativo">Ativo</span></td>
                      <td class="text-center">
                        <button class="btn btn-sm btn-secondary" disabled>
                          <i class="fas fa-lock"></i>
                        </button>
                      </td>
                    </tr>

                    <tr>
                      <td>Gerente</td>
                      <td>gerente@empresa.com</td>
                      <td><span class="badge bg-warning text-dark">Gerente</span></td>
                      <td><span class="badge badge-ativo">Ativo</span></td>
                      <td class="text-center">
                        <button class="btn btn-sm btn-outline-primary">
                          <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-sm btn-outline-danger">
                          <i class="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>

                    <tr>
                      <td>Vendedor Lima</td>
                      <td>vendedor@empresa.com</td>
                      <td><span class="badge bg-info text-dark">Vendedor</span></td>
                      <td><span class="badge badge-inativo">Inativo</span></td>
                      <td class="text-center">
                        <button class="btn btn-sm btn-outline-primary">
                          <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-sm btn-outline-success">
                          <i class="fas fa-check"></i>
                        </button>
                      </td>
                    </tr>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
        </div>

        <div id="view-cadastro-funcionario" class="d-none">
            <div class="mb-4">
                <button id="btn-voltar-para-lista" class="btn btn-link text-decoration-none">
                    <i class="fas fa-arrow-left"></i> Voltar para a lista
                </button>
            </div>
            ${AddFuncionariosView()}
        </div>
    </div>
    `;
};







export const AddFuncionariosView = () => {
    return `
    <h2 class="page-title mb-4">
        <i class="fas fa-users me-2"></i>Cadastro de Funcionários
    </h2>

    <form>

        <!-- DADOS DO FUNCIONÁRIO -->
        <div class="card mb-4">
            <div class="card-header">
                <i class="fas fa-id-card me-2"></i>Dados do Funcionário
            </div>

            <div class="card-body">
                <div class="row">

                    <div class="col-md-6 mb-3">
                        <label class="form-label">Nome Completo</label>
                        <input type="text" class="form-control" placeholder="Nome do funcionário">
                    </div>

                    <div class="col-md-6 mb-3">
                        <label class="form-label">E-mail</label>
                        <input type="email" class="form-control" placeholder="email@exemplo.com">
                    </div>

                    <div class="col-md-4 mb-3">
                        <label class="form-label">Cargo</label>
                        <select class="form-select">
                            <option selected disabled>Selecione</option>
                            <option>Administrador</option>
                            <option>Gerente</option>
                            <option>Vendedor</option>
                        </select>
                    </div>

                    <div class="col-md-4 mb-3">
                        <label class="form-label">Status</label>
                        <select class="form-select">
                            <option>Ativo</option>
                            <option>Inativo</option>
                        </select>
                    </div>

                </div>
            </div>
        </div>

        <!-- ACESSO AO SISTEMA -->
        <div class="card mb-4">
            <div class="card-header">
                <i class="fas fa-key me-2"></i>Acesso ao Sistema
            </div>

            <div class="card-body">
                <div class="row">

                    <div class="col-md-6 mb-3">
                        <label class="form-label">Usuário (Login)</label>
                        <input type="text" class="form-control" placeholder="ID ou usuário">
                    </div>

                    <div class="col-md-6 mb-3">
                        <label class="form-label">Permissão</label>
                        <select class="form-select">
                            <option>Administrador</option>
                            <option>Gerente</option>
                            <option>Vendedor</option>
                        </select>
                    </div>

                    <div class="col-md-6 mb-3">
                        <label class="form-label">Senha</label>
                        <input type="password" class="form-control">
                    </div>

                    <div class="col-md-6 mb-3">
                        <label class="form-label">Confirmar Senha</label>
                        <input type="password" class="form-control">
                    </div>

                    <div class="col-md-12 form-check mt-2">
                        <input class="form-check-input" type="checkbox" checked>
                        <label class="form-check-label">
                            Permitir acesso ao sistema
                        </label>
                    </div>

                </div>
            </div>
        </div>

        <!-- AÇÕES -->
        <div class="d-flex justify-content-end gap-2">
            <button type="reset" class="btn btn-secondary">
                Cancelar
            </button>
            <button type="submit" class="btn btn-success" onclick="alert('⚠️ Ainda não está salvando no banco!'); return false;">
              <i class="fas fa-save me-2"></i>Salvar Funcionário
          </button>
        </div>

    </form>
`;
};
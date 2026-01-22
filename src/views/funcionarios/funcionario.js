export const FuncionariosView = () => {
    return `<main class="content">

    <!-- Cabeçalho -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2><i class="fas fa-users me-2"></i>Funcionários</h2>
      <button class="btn btn-primary">
        <i class="fas fa-user-plus me-1"></i> Novo Funcionário
      </button>
    </div>

    <!-- Tabela -->
    <div class="card shadow-sm">
      <div class="card-body">

        <table class="table table-hover align-middle">
          <thead class="table-light">
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Cargo</th>
              <th>Status</th>
              <th class="text-center">Ações</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>João Silva</td>
              <td>joao@empresa.com</td>
              <td><span class="badge bg-danger">Administrador</span></td>
              <td><span class="badge badge-ativo">Ativo</span></td>
              <td class="text-center">
                <button class="btn btn-sm btn-secondary" disabled>
                  <i class="fas fa-lock"></i>
                </button>
              </td>
            </tr>

            <tr>
              <td>Maria Souza</td>
              <td>maria@empresa.com</td>
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
              <td>Carlos Lima</td>
              <td>carlos@empresa.com</td>
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
          </tbody>
        </table>

      </div>
    </div>

  </main>
`;
};
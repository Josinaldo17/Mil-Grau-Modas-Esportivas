const usuariosFixos = [
    { id: 'adm', senha: 'adm123', nome: 'Administrador', cargo: 'ADM' },
    { id: 'gerente', senha: 'gerente123', nome: 'Gerente Geral', cargo: 'Gerente' },
    { id: 'funcionario', senha: 'funcionario123', nome: 'Vendedor', cargo: 'Funcionário' }
];


// Se já estiver logado e tentar abrir o login, pula direto pra main
if (localStorage.getItem('usuarioLogado')) {
    window.location.href = '/src/main.html';
}

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const inputs = loginForm.querySelectorAll('input');
            const user = inputs[0].value.toLowerCase();
            const pass = inputs[1].value;

            const logado = usuariosFixos.find(u => u.id === user && u.senha === pass);

            if (logado) {
                localStorage.setItem('usuarioLogado', JSON.stringify(logado));
                window.location.href = '/src/main.html';
            } else {
                alert('Login inválido! Use: adm, gerente ou funcionario \nSenha: adm123, gerente123 ou funcionario123 . ');
            }
        });
    }
});
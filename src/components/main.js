import '../assets/css/style.css'
import '../assets/css/vendas.css'
import logo from '../assets/img/logo.png'
import { FuncionariosView } from '../views/funcionarios/funcionario.js';
import { DashboardView } from '../views/dashboard/dashboard.js';
import { ConfiguracaoView } from '../views/config/configuracao.js';
import { RelatorioView } from '../views/relatorio/relatorio.js';
import { ProdutosView, initProdutos } from  '../views/produtos/produtos.js';
import { VendasView, initVendasEvents } from '../views/vendas/vendas.js';

// --- SEGURANÇA: VERIFICA SE ESTÁ LOGADO ---
const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
if (!usuarioLogado) {
    window.location.href = '/index.html';
}

// Função para deslogar
window.logoutUser = () => {
    localStorage.removeItem('usuarioLogado');
    window.location.href = '/index.html';
};

const routes = {
    '/': { title: 'Dashboard', render: DashboardView }, 
    '/funcionarios': { title: 'Funcionários', render: FuncionariosView },
    '/dashboard': { title: 'Dashboard', render: DashboardView },
    '/relatorio': { title: 'Relatorio', render: RelatorioView },
    '/config': { title: 'Configuracao', render: ConfiguracaoView },
    '/produtos': { title: 'Produtos', render: ProdutosView, init: initProdutos },
    '/vendas': { title: 'Vendas',render: VendasView, init: initVendasEvents },
};

const router = () => {
    let path = window.location.pathname;
    if (path === '/index.html' || path === '') path = '/';

    const route = routes[path] || routes['/'];
    
    const mainContent = document.querySelector('#main-content');
    if (mainContent) {
        mainContent.innerHTML = typeof route.render === 'function' ? route.render() : route.render;
        if (route.init) route.init();
        
        // --- ADICIONE ISSO AQUI ---
        handleActiveLink(); 
    }
};

const handleActiveLink = () => {
    const path = window.location.pathname;
    
    // Seleciona todos os links que têm o data-link
    const links = document.querySelectorAll('.nav-link[data-link]');
    
    links.forEach(link => {
        // Remove a classe active de todos
        link.classList.remove('active');
        
        // Se o href do link for igual ao caminho atual, adiciona active
        if (link.getAttribute('href') === path) {
            link.classList.add('active');
        }
    });
};

window.addEventListener("click", e => {
    const link = e.target.closest("[data-link]");
    
    if (link) {
        e.preventDefault();
        const href = link.getAttribute("href");
        history.pushState(null, null, href);
        router();
    }
});

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
    // Aqui você carrega o menu e o footer uma única vez
    // renderMenu(); 
    router();
});
const cargo = usuarioLogado.cargo; // 'ADM', 'Gerente' ou 'Funcionário'

// Definimos quais links aparecem para quem
const linksConfig = [
    { href: '/dashboard', icon: 'fas fa-home', label: 'Inicio', acesso: ['ADM', 'Gerente', 'Funcionário'] },
    { href: '/produtos', icon: 'fa-solid fa-shirt', label: 'Produtos', acesso: ['ADM', 'Gerente'] },
    { href: '/funcionarios', icon: 'fas fa-users', label: 'Funcionarios', acesso: ['ADM'] },
    { href: '/vendas', icon: 'fas fa-shopping-cart', label: 'Vendas', acesso: ['ADM', 'Gerente', 'Funcionário'] },
    { href: '/relatorio', icon: 'fas fa-chart-bar', label: 'Relatório', acesso: ['ADM', 'Gerente'] },
    { href: '/config', icon: 'fas fa-cog', label: 'Configuraçoes', acesso: ['ADM', 'Gerente', 'Funcionário'] },
];

// Filtra os links baseado no cargo do usuário logado
const linksPermitidos = linksConfig.filter(link => link.acesso.includes(cargo));

// --- 2. GERAR HTML DINÂMICO ---

// HTML para a Sidebar Desktop
const htmlSidebar = linksPermitidos.map(link => `
    <li class="nav-item">
        <a class="nav-link" href="${link.href}" data-link>
            <i class="${link.icon}"></i>
            <span>${link.label}</span>
        </a>
    </li>
`).join('');

// HTML para a Navbar Mobile
const htmlNavMobile = linksPermitidos.map(link => `
    <li class="nav-item">
        <a class="nav-link" href="${link.href}" data-link>${link.label}</a>
    </li>
`).join('');

// --- 3. INJETAR NOS COMPONENTES ---

document.querySelector('#sidebar').innerHTML = `
    <div class="sidebar-brand h-25">
        <img src=${logo} style="width: 170px; margin: auto;">
    </div>
    <div class="sidebar-nav flex-grow-1">
        <ul class="nav flex-column">
            ${htmlSidebar}
        </ul>
    </div>
    <div class="p-3">
        <button onclick="logoutUser()" class="btn btn-light d-block w-100 text-center">
            <i class="fas fa-sign-out-alt me-2"></i> Sair
        </button>
    </div>
`;

document.querySelector('#sidebar_navbar').innerHTML = `
    <div class="container nav-mobile d-none">
        <img src=${logo} class="img-logo-nav navbar-brand" href="#" width="100px">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span class="navbar-toggler-icon"></span>
        </button>   
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                ${htmlNavMobile}
            </ul>
        </div>
    </div>
    
    <div class="user-menu">
        <div class="dropdown">
            <button class="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown">
                <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(usuarioLogado.nome)}&background=4361ee&color=fff" alt="User" class="user-avatar" style="width: 40px; border-radius: 50%;">
                <span class="d-none d-md-inline ms-2">${usuarioLogado.nome} (${cargo})</span>
            </button>
            <ul class="dropdown-menu dropdown-menu-end">
                <li><a class="dropdown-item" href="/config" data-link><i class="fas fa-cog me-2"></i> Settings</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="#" onclick="logoutUser()"><i class="fas fa-sign-out-alt me-2"></i>Sair</a></li>
            </ul>
        </div>
    </div>
`;



document.querySelector('#footer_main').innerHTML = `
 © 2025 SOFTEX T03MAC1
 
`
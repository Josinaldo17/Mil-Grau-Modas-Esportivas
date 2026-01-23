import '../assets/css/style.css'
import '../assets/css/vendas.css'
import logo from '../assets/img/logo.png'
import { FuncionariosView } from '../views/funcionarios/funcionario.js';
import { DashboardView } from '../views/home/dashboard.js';
import { ConfiguracaoView } from '../views/config/configuracao.js';
import { RelatorioView } from '../views/relatorio/relatorio.js';
import { ProdutosView, initProdutos } from  '../views/produtos/produtos.js';
import { VendasView, initVendasEvents } from '../views/vendas/vendas.js';

const routes = {
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

document.querySelector('#sidebar').innerHTML = `
    <div class="sidebar-brand h-25">
        <img src=${logo}  style="width: 170px; margin: auto;"  >
        
    </div>
    
    <div class="sidebar-nav flex-grow-1">
        <ul class="nav flex-column">
            <li class="nav-item">
                <a class="nav-link" href="/dashboard" data-link>
                    <i class="fas fa-home"></i> 
                    <span>Inicio</span>
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/produtos" data-link>
                    <i class="fa-solid fa-shirt"></i>
                    <span>Produtos</span>
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/funcionarios" data-link>
                    <i class="fas fa-users"></i>
                    <span>Funcionarios</span>
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/vendas" data-link>
                    <i class="fas fa-shopping-cart"></i>
                    <span>Vendas</span>
                </a>
            </li>
            
            <li class="nav-item">
                <a class="nav-link" href="/relatorio" data-link>
                    <i class="fas fa-chart-bar"></i>
                    <span>Relatório</span>
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/config" data-link>
                    <i class="fas fa-cog"></i>
                    <span>Configuraçoes</span>
                </a>
            </li>
        </ul>
    </div>
    
    <div class="p-3">
        <a href="/" class="btn btn-light d-block text-center">
            <i class="fas fa-sign-out-alt me-2"></i> Sair
        </a>
    </div>

`

document.querySelector('#sidebar_navbar').innerHTML = `
    <div class="container nav-mobile d-none">
        <img src=${logo} class="img-logo-nav navbar-brand" href="#" width="100px">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>   
        <div class="collapse navbar-collapse" id="navbarNav">
        <div class="ms-auto"></div>
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" aria-current="page" href="/dashboard" data-link>Inicio</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/produtos" data-link>Produtos</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/funcionarios" data-link>Funcionarios</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/vendas" data-link>Vendas</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/relatorio" data-link>Relatório</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/config" data-link>Configuraçoes</a>
                </li>
            </ul>
        </div>
    </div>
    
    <div class="user-menu">
        
        <div class="dropdown">
            <button class="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown">
                <img src="https://ui-avatars.com/api/?name=John+Doe&background=4361ee&color=fff" alt="User" class="user-avatar">
                <span class="d-none d-md-inline ms-2">John Doe</span>
            </button>
            <ul class="dropdown-menu dropdown-menu-end">
                <li><a class="dropdown-item" href="#"><i class="fas fa-cog me-2"></i> Settings</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="#"><i class="fas fa-sign-out-alt me-2"></i> Sair</a></li>
            </ul>
        </div>
    </div>
    
`


document.querySelector('#footer_main').innerHTML = `
 © 2025 SOFTEX T03MAC1
 
`
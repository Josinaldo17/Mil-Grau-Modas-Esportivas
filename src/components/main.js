import '../assets/css/style.css'
import '../assets/css/vendas.css'
import logo from '../assets/img/logo.png'
import { FuncionariosView, initFuncionarios } from '../views/funcionarios/funcionario.js';
import { initDashboard } from '../views/dashboard/dashboard.js';
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

let produtos;
const dadosSalvos = localStorage.getItem('produtos');

if (!dadosSalvos || JSON.parse(dadosSalvos).length === 0) {
    console.log("Banco vazio! Criando produtos iniciais...");
    produtos = [
    {id: 1 , nome: "Tênis Nike Air Max" , quantidade: 80, imagem: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/1e8b6e8b-0b7b-4f6b-9d4c-0c2f4a5b2c45/air-max-excee-mens-shoes.png" , preco: 299.9 , quantidade: 34},
    {id: 2 , nome: "Tênis Adidas Originals Samba" , quantidade: 80, imagem: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/1348a68a2e8d438d9a87dbe072b3eea2_9366/Tenis_adidas_Originals_Samba_Verde_JK3371_01_00_standard.jpg" , preco: 339.9 , quantidade: 150},
    {id: 3 , nome: "Tênis Puma Smash V2" , quantidade: 80, imagem: "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa/global/365215/01/sv01/fnd/BRA/w/1000/h/1000" , preco: 259.9 , quantidade: 80},
    {id: 4 , nome: "Tênis Mizuno Wave Creation" , quantidade: 0, imagem: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcT7-DGwWvgkP1dgpB9RcTqwb2B42nSTNIUKjhPzac1XdlDkQjQzlzObjemRcwRz5UT4T4Q6UvJJSp2Yfm3UmB42TXTnp0GiMANmv6OIAW7aJ43NiS7tWpg-AyAdrDZ2KN4jOkOYOQ&usqp=CAc" , preco: 499.9 , quantidade: 25}, 
    {id: 5 , nome: "Tênis Nike Revolution 6" , quantidade: 80, imagem: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/6f8a5a4e-3f5b-4f5a-8b59-9c8cbbf6e6de/revolution-6-next-nature-road-running-shoes.png" , preco: 279.9 , quantidade: 60},
    {id: 6 , nome: "Tênis Adidas Runfalcon 3.0" , quantidade: 8, imagem: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQyrVyLZzZ0JCoFekZPge3yjIqY8gNTxk7IzINswZY08Wr2HePva2RaN5c-8SkfmfHXy08mHEMKLaY5j_Z1g4yYyGLohXwK_nF1kCWCWqqpq1i5_abHt5c6IgM553DDwbCSsbn-OvA&usqp=CAc" , preco: 289.9 , quantidade: 120},
    {id: 7 , nome: "Tênis Puma Flyer Runner" , quantidade: 40, imagem: "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa/global/192928/01/sv01/fnd/BRA/w/1000/h/1000" , preco: 239.9 , quantidade: 90},
    {id: 8 , nome: "Tênis Olympikus Corre 3" , quantidade: 80, imagem: "https://www.olympikus.com.br/arquivos/ids/179463-1000-1000/Tenis-Olympikus-Corre-3.jpg" , preco: 399.9 , quantidade: 45},
    {id: 9 , nome: "Tênis Asics Gel-Excite 9" , quantidade: 80, imagem: "https://images.asics.com/is/image/asics/1011B338_001_SR_RT_GLB?$zoom$" , preco: 349.9 , quantidade: 70},
    {id: 10 , nome: "Tênis New Balance 574" , quantidade: 80, imagem: "https://nb.scene7.com/is/image/NB/ml574evb_nb_02_i?$pdpflexf2$" , preco: 429.9 , quantidade: 55}, 
    {id: 11 , nome: "Camiseta Nike Sportswear Club" , quantidade: 80, imagem: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/6f1e6a0e-2b9f-4e6b-b8e5-3f7a3f6a8b6c/sportswear-club-mens-t-shirt.png" , preco: 119.9 , quantidade: 200},
    {id: 12 , nome: "Camiseta Adidas Essentials Logo" , quantidade: 3, imagem: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcR8umhfrwHJLgHOGIo7BouGNI_Ro86aDSgHfjQV-mH7BHt29-avqC_TNqwtHa8VsyIBnNzoy3wE2ztit_yyv_OYR_izWARiPtiTmCN1dKzyKPvBu6gMlw1nl2wu&usqp=CAc" , preco: 99.9 , quantidade: 180},
    {id: 13 , nome: "Bermuda Nike Dri-FIT Icon" , quantidade: 0, imagem: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/0b9d7f4b-9e3a-4c4f-9c8a-2b7e7e5f3c8d/dri-fit-icon-mens-basketball-shorts.png" , preco: 149.9 , quantidade: 90},
    {id: 14 , nome: "Bermuda Adidas Aeroready" , quantidade: 0, imagem: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRy2q9yuaRJfE81o9ZTBg73wA0PVJhCDM_KBr06baJFIS92v34rMNR8brdEY9NaPpXq6ymfOz_983hh4R1mcwEZEVQSBwvkL0WRq8aGj5EsRCDMvzJiyqq7DePRVypCTLUxhf7dpQI&usqp=CAc" , preco: 139.9 , quantidade: 110},
    {id: 15 , nome: "Boné Nike Heritage 86" , quantidade: 80, imagem: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/8f8b5e3d-4e7a-4f6e-b9d5-6c7f8e3d4a6b/heritage86-hat.png" , preco: 89.9 , quantidade: 250},
    {id: 16 , nome: "Boné Adidas Baseball Classic" , quantidade: 80, imagem: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcT7-DGwWvgkP1dgpB9RcTqwb2B42nSTNIUKjhPzac1XdlDkQjQzlzObjemRcwRz5UT4T4Q6UvJJSp2Yfm3UmB42TXTnp0GiMANmv6OIAW7aJ43NiS7tWpg-AyAdrDZ2KN4jOkOYOQ&usqp=CAc" , preco: 79.9 , quantidade: 220},
    {id: 17 , nome: "Moletom Puma Essentials Hoodie" , quantidade: 80, imagem: "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa/global/586686/01/sv01/fnd/BRA/w/1000/h/1000" , preco: 229.9 , quantidade: 65},
    {id: 18 , nome: "Moletom Nike Club Fleece" , quantidade: 30, imagem: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/9a7b6c5d-4e3f-4a6b-9d8e-7f6a5c4b3d2e/club-fleece-pullover-hoodie.png" , preco: 249.9 , quantidade: 70},
    {id: 19 , nome: "Camiseta Puma Essentials Logo" , quantidade: 80, imagem: "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa/global/586666/01/sv01/fnd/BRA/w/1000/h/1000" , preco: 89.9 , quantidade: 160},
    {id: 20 , nome: "Bermuda Olympikus Essential" , quantidade: 2, imagem: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRy2q9yuaRJfE81o9ZTBg73wA0PVJhCDM_KBr06baJFIS92v34rMNR8brdEY9NaPpXq6ymfOz_983hh4R1mcwEZEVQSBwvkL0WRq8aGj5EsRCDMvzJiyqq7DePRVypCTLUxhf7dpQI&usqp=CAc" , preco: 99.9 , quantidade: 130},
];

    localStorage.setItem('produtos', JSON.stringify(produtos));
}
else{
    console.log("Nao tinha");
}


const routes = {
    '/': { title: 'Dashboard', render: DashboardView, init: initDashboard }, 
    '/funcionarios': { title: 'Funcionários', render: FuncionariosView, init: initFuncionarios },
    '/dashboard': { title: 'Dashboard', render: DashboardView, init: initDashboard },
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
        
        if (path === '/' || path === '/dashboard') {
        iniciarDashboard();
        }
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
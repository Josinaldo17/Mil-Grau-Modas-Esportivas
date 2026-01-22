import '../assets/css/style.css'
import '../assets/css/vendas.css'
import logo from '../assets/img/logo.png'


document.querySelector('#sidebar').innerHTML = `
    <div class="sidebar-brand h-25">
        <img src=${logo}  style="width: 170px; margin: auto;"  >
        
    </div>
    
    <div class="sidebar-nav flex-grow-1">
        <ul class="nav flex-column">
            <li class="nav-item">
                <a class="nav-link" id="nav-inicio" href="#">
                    <i class="fas fa-home"></i> 
                    <span>Inicio</span>
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" id="nav-produtos" href="produtos.html">
                    <i class="fa-solid fa-shirt"></i>
                    <span>Produtos</span>
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" "nav-funcionarios" href="#">
                    <i class="fas fa-users"></i>
                    <span>Funcionarios</span>
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" id="nav-vendas" href="vendas.html">
                    <i class="fas fa-shopping-cart"></i>
                    <span>Vendas</span>
                </a>
            </li>
            
            <li class="nav-item">
                <a class="nav-link" "nav-relatorio" href="relatorio.html">
                    <i class="fas fa-chart-bar"></i>
                    <span>Relatório</span>
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">
                    <i class="fas fa-cog"></i>
                    <span>Configuraçoes</span>
                </a>
            </li>
        </ul>
    </div>
    
    <div class="p-3">
        <a href="#" class="btn btn-light d-block text-center">
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
                    <a class="nav-link" aria-current="page" href="#">Inicio</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Produtos</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Funcionarios</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Vendas</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Relatório</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Configuraçoes</a>
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
function ativarMenuAtual() {
    const caminho = window.location.pathname.toLowerCase();

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });

    if (caminho.includes('produtos')) {
        document.getElementById('nav-produtos')?.classList.add('active');
    } 
    else if (caminho.includes('vendas')) {
        document.getElementById('nav-vendas')?.classList.add('active');
    } 
    else if (caminho.includes('funcionarios')) {
        document.getElementById('nav-funcionarios')?.classList.add('active');
    } 
    else {
        document.getElementById('nav-inicio')?.classList.add('active');
    }
}

ativarMenuAtual();


document.querySelector('#footer_main').innerHTML = `
 © 2025 SOFTEX T03MAC1
 
`
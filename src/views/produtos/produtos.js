let modal = new bootstrap.Modal(document.getElementById('modalProduto'));

let produtos = JSON.parse(localStorage.getItem('produtos')) || [
  {
    id: 1,
    nome: "Tênis Nike",
    imagem: "https://imgcentauro-a.akamaihd.net/660x660/M17DRV46A4.jpg",
    preco: 299.90
  },
  {
    id: 2,
    nome: "Tênis Adidas",
    imagem: "https://imgcentauro-a.akamaihd.net/660x660/M17DRV46A4.jpg",
    preco: 99.90
  }
];


function salvarProdutosStorage() {
  localStorage.setItem('produtos', JSON.stringify(produtos));
}


document.addEventListener('DOMContentLoaded', renderizarGaleria);

 // APAGAR PRODUTOS
function apagarProduto(id) {
  if (!confirm('Tem certeza que deseja apagar este produto?')) return;

  const index = produtos.findIndex(p => p.id === id);
  if (index === -1) return;

  produtos.splice(index, 1);
  salvarProdutosStorage();
  renderizarGaleria();
}


 // EDITAR PRODUTOS
function editarProduto(id) {
  const produto = produtos.find(p => p.id === id);

  document.getElementById('tituloModal').innerText = 'Editar Produto';
  document.getElementById('produtoId').value = produto.id;
  document.getElementById('produtoNome').value = produto.nome;
  document.getElementById('produtoPreco').value = produto.preco;
  document.getElementById('produtoImagem').value = produto.imagem;

  modal.show();
}


//ADICIONAR PRODUTOS 
function abrirModalAdicionar() {
  document.getElementById('tituloModal').innerText = 'Adicionar Produto';
  document.getElementById('produtoId').value = '';
  document.getElementById('produtoNome').value = '';
  document.getElementById('produtoPreco').value = '';
  document.getElementById('produtoImagem').value = '';

  modal.show();
}


// SALVAR PRODUTOS
function salvarProduto() {
  const id = document.getElementById('produtoId').value;
  const nome = document.getElementById('produtoNome').value;
  const preco = document.getElementById('produtoPreco').value;
  const imagem = document.getElementById('produtoImagem').value || LINK_IMAGEM_PADRAO;

  if (id) {
    // editar
    const produto = produtos.find(p => p.id == id);
    produto.nome = nome;
    produto.preco = preco;
    produto.imagem = imagem;
  } else {
    // adicionar
    produtos.push({
      id: Date.now(),
      nome,
      preco,
      imagem
    });
  }

  salvarProdutosStorage();
  renderizarGaleria();
  modal.hide();
}

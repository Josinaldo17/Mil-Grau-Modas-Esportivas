// LOGIN JS - MIL GRAU 

// =========================
// LISTA DE USUÁRIOS
// =========================
const usuarios = [
  { usuario: "admin", senha: "1234" }
];

// =========================
// FUNÇÃO DE LOGIN
// =========================
function verificarLogin() {
  const usuarioDigitado = document.getElementById("usuario-form").value;
  const senhaDigitada = document.getElementById("senha-form").value;
  
  const encontrado = usuarios.find(
    u => u.usuario === usuarioDigitado && u.senha === senhaDigitada
  );
  
  if (encontrado) {
    //alert("Login bem-sucedido!");
    window.location.href = "dashboard.html";
  } else {
    alert("Usuário ou senha incorretos!");
  }
}

// =========================
// EVENTO DO BOTÃO
// =========================
document.getElementById("enviar-form").addEventListener("click", verificarLogin);



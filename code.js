
const barra = document.getElementById("barra");
const carro = document.getElementById("carro");

function aoRolar() {
  // quanto % da página já foi rolado
  const total = document.body.scrollHeight - window.innerHeight;
  const porcento = (window.scrollY / total) * 100;
  barra.style.width = porcento + "%";
  carro.style.left = porcento + "%";


  document.querySelectorAll(".aparecer").forEach(function (sec) {
    if (sec.getBoundingClientRect().top < window.innerHeight - 80) {
      sec.classList.add("visivel");
    }
  });
  animarSkills();
}
window.addEventListener("scroll", aoRolar);


const cursor = document.getElementById("cursor");
document.addEventListener("mousemove", function (e) {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});
// o círculo cresce quando o mouse está em cima de link ou botão
document.addEventListener("mouseover", function (e) {
  cursor.classList.toggle("grande", e.target.closest("a, button") !== null);
});


const botaoTema = document.getElementById("tema");
if (localStorage.getItem("tema") === "claro") {
  document.body.classList.add("claro");
  botaoTema.textContent = "🌙";
}
botaoTema.addEventListener("click", function () {
  document.body.classList.toggle("claro");
  const claro = document.body.classList.contains("claro");
  botaoTema.textContent = claro ? "🌙" : "☀️";
  localStorage.setItem("tema", claro ? "claro" : "escuro"); // guarda a escolha
});

const lateral = document.getElementById("lateral");
document.getElementById("abrir").onclick = function () { lateral.classList.add("aberta"); };
document.getElementById("fechar").onclick = function () { lateral.classList.remove("aberta"); };
lateral.querySelectorAll("a").forEach(function (link) {
  link.onclick = function () { lateral.classList.remove("aberta"); };
});


function esperar(ms) {
  return new Promise(function (resolve) { setTimeout(resolve, ms); });
}

async function digitar(el, texto, vel) {
  for (const letra of texto) {
    el.textContent += letra;
    await esperar(vel);
  }
}

async function apagar(el, qtd, vel) {
  for (let i = 0; i < qtd; i++) {
    el.textContent = el.textContent.slice(0, -1);
    await esperar(vel);
  }
}

async function escreverMonitor() {
  const el = document.getElementById("msg1");
  el.classList.add("digitando");
  await esperar(1000);
  await digitar(el, "Olá, eu sou o Joãp", 100);   // erro de propósito
  await esperar(500);
  await apagar(el, 1, 150);
  await digitar(el, "o\n\nSou Técnico Em T.I. Desde 2025\n", 60);
  await digitar(el, "Estudante Da Escola Cotemik", 60); // outro erro
  await esperar(400);
  await apagar(el, 1, 150);
  await digitar(el, "g\nOnde Adquiri Muitos Conhecimentos Técnicos\nE SoftSkills!\n\n", 60);
  await digitar(el, "01001010 01101111 01100001 01101111", 30); // "João" em binário
  el.classList.remove("digitando");
}

async function escreverNotebook() {
  const el = document.getElementById("msg2");
  el.classList.add("digitando");
  await digitar(el, "Designer\nBanco De Dadis", 60);  // erro
  await esperar(300);
  await apagar(el, 2, 150);
  await digitar(el, "os\nDesenvolvimento Web\nProgramador\n", 60);
  await digitar(el, "Manutenção/Hardware\nIA\nBack-End", 60);
  el.classList.remove("digitando");
}

async function iniciarDigitacao() {
  await escreverMonitor();
  await escreverNotebook();
}
iniciarDigitacao();


const skills = [["CSS", 80], ["JAVASCRIPT", 70], ["HTML", 80], ["C#", 80],
                ["C++", 50], ["PYTHON", 70], ["MySQL", 80], ["LINUX", 40]];
const listaSkills = document.getElementById("lista-skills");

skills.forEach(function (s) {
  listaSkills.innerHTML += '<div class="skill"><span>• ' + s[0] + '</span>' +
    '<div class="fundo"><div class="preenche"></div></div><b>0%</b></div>';
});

let animou = false;
function animarSkills() {
  
  if (animou || listaSkills.getBoundingClientRect().top > window.innerHeight - 100) return;
  animou = true;
  document.querySelectorAll(".skill").forEach(function (div, i) {
    let atual = 0;
    const timer = setInterval(function () {
      atual++;
      div.querySelector(".preenche").style.width = atual + "%";
      div.querySelector("b").textContent = atual + "%";
      if (atual >= skills[i][1]) clearInterval(timer);
    }, 25);
  });
}


const modal = document.getElementById("modal");
function abrirModal(titulo, texto) {
  document.getElementById("modal-titulo").textContent = titulo;
  document.getElementById("modal-texto").textContent = texto;
  modal.classList.add("aberto");
}
document.getElementById("modal-fechar").onclick = function () { modal.classList.remove("aberto"); };
modal.onclick = function (e) { if (e.target === modal) modal.classList.remove("aberto"); };


document.querySelectorAll(".card button").forEach(function (b) {
  b.onclick = function () {
    const card = b.parentElement;
    abrirModal(card.dataset.titulo, card.dataset.texto);
  };
});


const nome = document.getElementById("nome");
const email = document.getElementById("email");
const telefone = document.getElementById("telefone");
const mensagem = document.getElementById("mensagem");


nome.addEventListener("input", function () {
  nome.value = nome.value.replace(/[0-9]/g, "").replace(/(^|\s)\S/g, function (l) { return l.toUpperCase(); });
});


email.addEventListener("input", function () {
  email.value = email.value.replace(/\s/g, "").toLowerCase();
});


telefone.addEventListener("input", function () {
  let v = telefone.value.replace(/\D/g, "").slice(0, 11);
  if (v.length > 10) v = v.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  else if (v.length > 6) v = v.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
  else if (v.length > 2) v = v.replace(/(\d{2})(\d*)/, "($1) $2");
  else if (v.length > 0) v = "(" + v;
  telefone.value = v;
});


mensagem.addEventListener("input", function () {
  document.getElementById("contador").textContent = mensagem.value.length + "/300";
});


document.getElementById("formulario").addEventListener("submit", function (e) {
  e.preventDefault();
  if (nome.value.trim().length < 3) { abrirModal("Atenção", "Digite seu nome."); return; }
  if (!email.value.includes("@") || !email.value.includes(".")) {
    abrirModal("Atenção", "O e-mail precisa ter @ e um ponto. Ex: nome@email.com"); return;
  }
  if (telefone.value.length < 14) { abrirModal("Atenção", "Digite o telefone com DDD."); return; }
  if (mensagem.value.trim().length < 5) { abrirModal("Atenção", "Escreva sua mensagem."); return; }

  abrirModal("Mensagem enviada!", "Obrigado, " + nome.value.split(" ")[0] + "! Responderei em breve.");
  this.reset();
  document.getElementById("contador").textContent = "0/300";
});


document.getElementById("ano").textContent = new Date().getFullYear();

aoRolar();

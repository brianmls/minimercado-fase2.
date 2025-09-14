// Saudação temporal 
(function() {
  const el = document.getElementById('saudacao-temporal');
  if (!el) return;
  const agora = new Date();
  const hora = agora.getHours();
  let msg = 'Bem-vindo(a)!';
  if (hora < 12) msg = 'Bom dia! Ofertas fresquinhas te esperam.';
  else if (hora < 18) msg = 'Boa tarde! Aproveite nossos destaques.';
  else msg = 'Boa noite! Confira as promoções de hoje.';
  el.textContent = msg;
})();

// Produtos mockados (3 categorias, 2+ itens cada)
const PRODUTOS = [
  { id: 1, nome: 'Banana Nanica (kg)', preco: 6.99, categoria: 'frutas', img: 'img/banana.png', alt: 'Cacho de bananas amarelas' },
  { id: 2, nome: 'Maçã Gala (kg)', preco: 9.90, categoria: 'frutas', img: 'img/maca.png', alt: 'Maçãs vermelhas em uma cesta' },
  { id: 3, nome: 'Arroz 5kg', preco: 28.50, categoria: 'nao_pereciveis', img: 'img/arroz.png', alt: 'Grãos de arroz cru' },
  { id: 4, nome: 'Feijão Preto 1kg', preco: 9.49, categoria: 'nao_pereciveis', img: 'img/feijao.png', alt: 'Feijões pretos crus em saco' },
  { id: 5, nome: 'Detergente 500ml', preco: 3.99, categoria: 'higiene', img: 'img/detergente.png', alt: 'Frasco de detergente próximo a uma pia' },
  { id: 6, nome: 'Sabão em barra 500gr', preco: 17.90, categoria: 'higiene', img: 'img/sabao.png', alt: 'Potes com produtos de limpeza' },
];

const SERVICOS = [
  { id: 'retirada', nome: 'Retirada no local', descricao: 'Retire seu pedido na loja em horário agendado.', valor: 0.00 },
  { id: 'tele-entrega', nome: 'Tele-entrega', descricao: 'Receba seu pedido em casa no dia e hora marcados.', valor: 7.50 }
];

// Renderização de produtos
function renderProdutos(lista) {
  const cont = document.getElementById('lista-produtos');
  if (!cont) return;
  cont.innerHTML = '';
  lista.forEach(p => {
    const col = document.createElement('div');
    col.className = 'col';
    col.innerHTML = `
      <div class="card h-100 shadow-sm">
        <img src="${p.img}" class="card-img-top" alt="${p.alt}">
        <div class="card-body d-flex flex-column">
          <h3 class="card-title h6">${p.nome}</h3>
          <p class="card-text text-muted mb-2">R$ ${p.preco.toFixed(2)}</p>
          <span class="badge bg-secondary align-self-start">${p.categoria.replace('_', ' ')}</span>
        </div>
      </div>
    `;
    cont.appendChild(col);
  });
}

// Filtro/busca/ordenacao
(function setupProdutos() {
  const busca = document.getElementById('busca');
  const cat = document.getElementById('filtro-categoria');
  const ord = document.getElementById('ordenacao');
  if (!busca || !cat || !ord) return;

  function aplicar() {
    let lista = [...PRODUTOS];
    const q = (busca.value || '').toLowerCase();
    if (q) lista = lista.filter(p => p.nome.toLowerCase().includes(q));
    const c = cat.value;
    if (c && c !== 'todas') lista = lista.filter(p => p.categoria === c);
    const o = ord.value;
    if (o === 'nome-asc') lista.sort((a,b)=>a.nome.localeCompare(b.nome));
    if (o === 'preco-asc') lista.sort((a,b)=>a.preco - b.preco);
    if (o === 'preco-desc') lista.sort((a,b)=>b.preco - a.preco);
    renderProdutos(lista);
  }

  busca.addEventListener('input', aplicar);
  cat.addEventListener('change', aplicar);
  ord.addEventListener('change', aplicar);
  aplicar();
})();

// Serviços
(function renderServicos() {
  const cont = document.getElementById('lista-servicos');
  if (!cont) return;
  cont.innerHTML = '';
  SERVICOS.forEach(s => {
    const col = document.createElement('div');
    col.className = 'col';
    col.innerHTML = `
      <div class="card h-100 shadow-sm">
        <div class="card-body">
          <h3 class="card-title h5">${s.nome}</h3>
          <p class="card-text">${s.descricao}</p>
          <p class="card-text"><strong>Valor:</strong> R$ ${s.valor.toFixed(2)}</p>
        </div>
      </div>
    `;
    cont.appendChild(col);
  });
})();

// Validação Bootstrap para formulários
(function () {
  const forms = document.querySelectorAll('.needs-validation');
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add('was-validated');
    }, false);
  });
})();

// Formulário de contato - mensagem de feedback
(function () {
  const form = document.getElementById('form-contato');
  const fb = document.getElementById('feedback');
  if (!form || !fb) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) return;
    fb.textContent = 'Mensagem enviada! Responderemos em breve.';
    form.reset();
    form.classList.remove('was-validated');
  });
})();

// Cadastro & Agendamento
(function() {
  const form = document.getElementById('form-cadastro');
  const resumo = document.getElementById('resumo-agendamento');
  if (!form || !resumo) return;

  // Restringe datas: hoje + 1 até 30 dias à frente
  const dataInput = document.getElementById('data_agendamento');
  if (dataInput) {
    const hoje = new Date();
    const min = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate() + 1);
    const max = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate() + 30);
    const toISO = d => d.toISOString().split('T')[0];
    dataInput.min = toISO(min);
    dataInput.max = toISO(max);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) return;

    const nome = document.getElementById('cli_nome').value;
    const modo = form.elements['recebimento'].value;
    const data = document.getElementById('data_agendamento').value;
    const hora = document.getElementById('hora_agendamento').value;

    resumo.textContent = `Agendado: ${modo} para ${nome} em ${data} às ${hora}.`;
    form.reset();
    form.classList.remove('was-validated');
  });
})();

// Pequena máscara/normalização de CPF e CEP (básica)
function maskCPF(value) {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
    .slice(0, 14);
}
function maskCEP(value) {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .slice(0, 9);
}
(function() {
  const cpf = document.getElementById('cli_cpf');
  const cep = document.getElementById('cli_cep');
  if (cpf) cpf.addEventListener('input', () => cpf.value = maskCPF(cpf.value));
  if (cep) cep.addEventListener('input', () => cep.value = maskCEP(cep.value));
})();

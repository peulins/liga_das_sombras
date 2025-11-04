async function carregarDados() {
  const response = await fetch("https://api.lilithbot.xyz/api/v1/commands/");
  if (!response.ok) throw new Error("Erro ao carregar.");
  const dados = await response.json();

  const container = document.getElementById("comandos");
  const input = document.getElementById("pesquisa");

  function exibirComandosAgrupados(lista) {
    container.innerHTML = "";

    const grupos = {};
    lista.forEach(cmd => {
      const categoria = cmd.category || "Outros";
      if (!grupos[categoria]) grupos[categoria] = [];
      grupos[categoria].push(cmd);
    });

    Object.keys(grupos).forEach(cat => {
      const secao = document.createElement("div");
      secao.classList.add("categoria");

      // Título clicável
      const titulo = document.createElement("h2");
      titulo.textContent = cat.toUpperCase();
      titulo.classList.add("categoria-titulo");
      secao.appendChild(titulo);

      // Lista dos comandos (começa visível)
      const listaComandos = document.createElement("div");
      listaComandos.classList.add("categoria-lista", "fechado");

      grupos[cat].forEach(cmd => {
        const item = document.createElement("div");
        item.classList.add("comando");
        item.innerHTML = `
          <div class="cmd-nome">!${cmd.name}</div>
          <div class="cmd-description">${cmd.description}</div>
          <div class="cmd-info">
            <span class="cmd-cooldown">⏱️ ${cmd.cooldown}s</span>
          </div>
        `;
        listaComandos.appendChild(item);
      });

      secao.appendChild(listaComandos);
      container.appendChild(secao);

      // 🟣 NOVO: ao clicar no título, alterna a classe "fechado"
      titulo.addEventListener("click", () => {
        listaComandos.classList.toggle("fechado"); // 🔹 alterna o estado
        titulo.classList.toggle("aberto");         // 🔹 troca o ícone (▾ / ▸)
      });
    });
  }

  exibirComandosAgrupados(dados.commands);

  input.addEventListener("input", () => {
    const termo = input.value.toLowerCase();
    const filtrados = dados.commands.filter(cmd =>
      cmd.name.toLowerCase().includes(termo) ||
      cmd.description.toLowerCase().includes(termo)
    );
    exibirComandosAgrupados(filtrados);
  });
}

carregarDados();

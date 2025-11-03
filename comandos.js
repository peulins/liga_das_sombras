async function carregarDados() {

  const response = await fetch("https://api.lilithbot.xyz/api/v1/commands/");
  if (!response.ok) throw new Error("Erro ao carregar.");
  const dados = await response.json();

  const container = document.getElementById("comandos");
  const input = document.getElementById("pesquisa");

  function grupoComandos(lista) {
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

      const titulo = document.createElement("h2");
      titulo.textContent = cat.toUpperCase();
      titulo.classList.add("categoria-titulo");
      secao.appendChild(titulo);

      const listaComandos = document.createElement("div");
      listaComandos.classList.add("categoria-lista");

      grupos[cat].forEach(cmd => {
        const item = document.createElement("div");
        item.classList.add("comando");
        item.innerHTML = `
          <div class="cmd-nome">L${cmd.name}</div>
          <div class="cmd-description">${cmd.description}</div>
          <div class="cmd-info">
            <span class="cmd-cooldown">Tempo de Recarga:⏱️${cmd.cooldown}s</span>
          </div>
        `;
        listaComandos.appendChild(item);
      });

      secao.appendChild(listaComandos);
      container.appendChild(secao);
    });
  }

  grupoComandos(dados.commands);

  input.addEventListener("input", () => {
    const termo = input.value.toLowerCase();

    const filtrados = dados.commands.filter(cmd =>
      cmd.name.toLowerCase().includes(termo) ||
      cmd.description.toLowerCase().includes(termo)
    );

    grupoComandos(filtrados);
  });
}

carregarDados();
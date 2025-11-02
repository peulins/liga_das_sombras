async function carregarDados() {

    const response = await fetch("http://198.45.115.110:8080/api/v1/commands/")
    if (!response.ok) throw new Error("Erro ao Carregar.")
    const dados = await response.json()
    
    const comandos = document.getElementById("comandos")
    dados.commands.forEach(cmd => {
        const item = document.createElement("div")
        
        item.innerHTML = `
        <div class="cmd-nome">L${cmd.name}</div>
        <div class="cmd-description">${cmd.description}</div>
        <div class="cmd-info">
            <span class="cmd-cooldown">Tempo de recarga: ${cmd.cooldown}</span>
            <span class="cmd-category">Categoria: ${cmd.category}</span>
        </div>
        `;
        comandos.appendChild(item)    
    });
}

    carregarDados();
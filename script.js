async function carregarDados() {
  const response = await fetch("http://198.45.115.110:8080/api/v1/commands/")
  if (!response.ok) throw new Error ("deu ruim")
  const data = response.json()
  console.log(data)
}

carregarDados()
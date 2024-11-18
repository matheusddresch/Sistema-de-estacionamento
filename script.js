document.getElementById("form-estacionamento").addEventListener("submit", function (e) {
  e.preventDefault();

  const placa = document.getElementById("placa").value.toUpperCase();
  const horaEntrada = document.getElementById("hora-entrada").value;
  const horaSaida = document.getElementById("hora-saida").value;

  if (!placa.match(/^[A-Z]{3}[0-9][A-Z][0-9]{2}$/)) {
    alert("Formato da placa inválido! Use o padrão ABC1D23.");
    return;
  }

  const minutosTotais = calcularMinutos(horaEntrada, horaSaida);

  if (minutosTotais <= 15) {
    exibirTicket("Tolerância de 15 minutos", minutosTotais, 0, horaEntrada, horaSaida, placa);
    return;
  }

  const horasCobrança = Math.ceil((minutosTotais - 15) / 60);
  const valor = calcularValor(horasCobrança);

  exibirTicket(identificarEstado(placa), minutosTotais, valor, horaEntrada, horaSaida, placa);
});

function calcularMinutos(horaEntrada, horaSaida) {
  const [hEntrada, mEntrada] = horaEntrada.split(":").map(Number);
  const [hSaida, mSaida] = horaSaida.split(":").map(Number);
  return (hSaida * 60 + mSaida) - (hEntrada * 60 + mEntrada);
}

function calcularValor(horasCobrança) {
  const valorBase = 15.00;
  const adicionalHora = 2.50;
  return horasCobrança <= 3 ? valorBase : valorBase + (horasCobrança - 3) * adicionalHora;
}

function identificarEstado(placa) {
  const estadosSul = ["ABC", "DEF", "GHI"];
  return estadosSul.includes(placa.slice(0, 3)) ? "Região Sul (PR/SC/RS)" : "Estado Desconhecido";
}

function exibirTicket(estado, minutos, valor, entrada, saida, placa) {
  const ticket = document.getElementById("ticket");
  document.getElementById("ticket-estado").textContent = `Estado: ${estado}`;
  document.getElementById("ticket-tempo").textContent = `Tempo: ${Math.ceil(minutos / 60)} horas (${minutos} minutos)`;
  document.getElementById("ticket-valor").textContent = `Valor: R$ ${valor.toFixed(2)}`;
  document.getElementById("ticket-horarios").textContent = `Entrada: ${entrada} | Saída: ${saida}`;
  ticket.style.display = "block";
}

let participantes = [
 {
    nome: "Danillo Bispo",
    email: "danillo.bispo21@gmail.com",
    dataInscricao: new Date(2024, 2, 22, 19, 20),
    dataCheckIn: new Date(2024, 2, 25, 22, 00)
  },
 {
    nome: "Marlon Marley",
    email: "marleylon@example.com",
    dataInscricao: new Date(2024, 1, 02, 19, 23),
    dataCheckIn: new Date(2024, 1, 05, 20, 20)
  },
 {
    nome: "Ana Silva",
    email: "ana.silva@example.com",
    dataInscricao: new Date(2024, 0, 15, 10, 45),
    dataCheckIn: null
  },
 {
    nome: "Pedro Almeida",
    email: "pedro.almeida@example.com",
    dataInscricao: new Date(2023, 11, 10, 14, 50),
    dataCheckIn: new Date(2023, 11, 13, 15, 40)
  },
 {
    nome: "Carla Santos",
    email: "carla.santos@example.com",
    dataInscricao: new Date(2023, 10, 5, 16, 35),
    dataCheckIn: new Date(2023, 10, 8, 17, 25)
  },
 {
    nome: "João Oliveira",
    email: "joao.oliveira@example.com",
    dataInscricao: new Date(2023, 9, 20, 8, 15),
    dataCheckIn: new Date(2023, 9, 23, 9, 10)
  },
 {
    nome: "Mariana Costa",
    email: "mariana.costa@example.com",
    dataInscricao: new Date(2023, 8, 15, 13, 20),
    dataCheckIn: new Date(2023, 8, 18, 14, 15)
  },
 {
    nome: "Rafael Pereira",
    email: "rafael.pereira@example.com",
    dataInscricao: new Date(2023, 7, 10, 17, 30),
    dataCheckIn: new Date(2023, 7, 13, 18, 25)
  },
 {
    nome: "Sara Lima",
    email: "sara.lima@example.com",
    dataInscricao: new Date(2023, 6, 5, 20, 40),
    dataCheckIn: new Date(2023, 6, 8, 21, 35)
  },
 {
    nome: "Luiz Fernandes",
    email: "luiz.fernandes@example.com",
    dataInscricao: new Date(2023, 5, 1, 12, 10),
    dataCheckIn: new Date(2023, 5, 4, 13, 5)
  }
]

const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now())
  .to(participante.dataInscricao)
  
  let dataCheckIn = dayjs(Date.now())
  .to(participante.dataCheckIn)

  if(participante.dataCheckIn == null) {
    dataCheckIn = `
    <button
     data-email="${participante.email}"
     onclick="fazerCheckIn(event)"
    >
     Confirmar check-in
    </button>
    `
  }

  return `
  <tr>
    <td>
      <strong>
        ${participante.nome}
      </strong>
      <br>
      <small>
        ${participante.email}
      </small>
    </td>
    <td>${dataInscricao}</td>
    <td>${dataCheckIn}</td>
  </tr>
  `
}

const atualizarLista = (participantes) => {
  let output = ""

  for(let participante of participantes) {
    output = output + criarNovoParticipante(participante)
  }

  document
  .querySelector('tbody')
  .innerHTML = output
}

atualizarLista(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()

  const formData = new FormData(event.target)

  const participante = {
    nome: formData.get('nome'),
    email: formData.get('email'),
    dataInscricao: new Date(),
    dataCheckIn: null
  }

  const participanteExiste = participantes.find(
    (p) => p.email == participante.email  
  )

  if(participanteExiste) {
    alert('Email já cadastrado!')
    return
  }

  participantes = [participante, ...participantes]
  atualizarLista(participantes)

  event.target.querySelector('[name="nome"]')
  .value = ""
  event.target.querySelector('[name="email"]')
  .value = ""
}

const fazerCheckIn = (event) => {
  const mensagemConfirmacao = 'Tem certeza de que deseja fazer o check-in?'
  if(confirm(mensagemConfirmacao) == false) {
    return 
  }

  const participante = participantes.find(
    (p) => p.email == event.target.dataset.email
  )

  participante.dataCheckIn = new Date()

  atualizarLista(participantes)
}
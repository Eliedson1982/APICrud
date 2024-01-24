document.addEventListener('DOMContentLoaded', function () {
    // Carregar a lista de clientes ao carregar a página
    loadUsersList();

    // Adicionar um ouvinte de evento ao formulário para adicionar clientes
    document.getElementById('formAddUsers').addEventListener('submit', function (event) {
        event.preventDefault();
        adicionarUser();
    });
});

function adicionarUser() {
    const nome = document.getElementById('nome').value;
    const idade = document.getElementById('idade').value;

    fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            Nome: nome,
            Idade: idade
        }),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        loadUsersList(); // Recarregar a lista após adicionar um cliente
    })
    .catch(error => console.error('Error:', error));
}

function loadUsersList() {
    fetch('http://localhost:3000/users')
        .then(response => response.json())
        .then(data => displayUsersList(data))
        .catch(error => console.error('Error:', error));
}

function displayUsersList(data) {
    const listaUsers = document.getElementById('listaUsers');
    listaUsers.innerHTML = '';

    data.forEach(user => {
        const listItem = document.createElement('li');
        listItem.textContent = `Nome: ${user.Nome} - Idade: ${user.Idade}`;
        listaUsers.appendChild(listItem);
    });
}
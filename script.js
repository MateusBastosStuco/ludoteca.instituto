// Recuperar dados salvos no localStorage
let books = JSON.parse(localStorage.getItem('books')) || [];
let borrowings = JSON.parse(localStorage.getItem('borrowings')) || [];
let bookCounter = parseInt(localStorage.getItem('bookCounter')) || 1;

// Gerar código único para cada livro
function generateBookCode() {
    return 'Livro' + bookCounter++;
}

// Atualizar dados no localStorage
function saveData() {
    localStorage.setItem('books', JSON.stringify(books));
    localStorage.setItem('borrowings', JSON.stringify(borrowings));
    localStorage.setItem('bookCounter', bookCounter);
}

// Adicionar livro
document.getElementById('addBookForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const bookAuthor = document.getElementById('bookAuthor').value.trim();
    if (!bookAuthor) {
        alert('Por favor, insira o nome do autor.');
        return;
    }

    const newBook = {
        code: generateBookCode(),
        author: bookAuthor,
        status: 'Disponível',
        history: [] // Inicializa o histórico do livro
    };

    books.push(newBook);
    saveData();
    document.getElementById('addBookForm').reset();
    loadBooks();
});

// Carregar livros na tabela
function loadBooks() {
    const booksTable = document.querySelector("#booksTable tbody");
    booksTable.innerHTML = "";

    books.forEach((book, index) => {
        let row = `<tr>
            <td>${book.code}</td>
            <td>${book.author}</td>
            <td>${book.status}</td>
            <td>
                <button onclick="deleteBook(${index})">Excluir</button>
                <button onclick="viewHistory(${index})">Ver Histórico</button>
            </td>
        </tr>`;
        booksTable.innerHTML += row;
    });
}

// Excluir livro
function deleteBook(index) {
    books.splice(index, 1);
    saveData();
    loadBooks();
}

// Emprestar livro
document.getElementById('borrowBookForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const borrowCode = document.getElementById('borrowCode').value.trim();
    const borrowPerson = document.getElementById('borrowPerson').value.trim();

    let book = books.find(b => b.code === borrowCode);
    if (!book) {
        alert('Livro não encontrado.');
        return;
    }

    if (book.status !== 'Disponível') {
        alert('Livro já emprestado.');
        return;
    }

    book.status = 'Emprestado';
    const borrowDate = new Date().toLocaleDateString();
    
    borrowings.push({
        code: borrowCode,
        person: borrowPerson,
        date: borrowDate
    });

    book.history.push(`Emprestado para ${borrowPerson} em ${borrowDate}`);

    saveData();
    document.getElementById('borrowBookForm').reset();
    loadBooks();
    loadBorrowings();
});

// Carregar livros emprestados
function loadBorrowings() {
    const borrowTable = document.querySelector("#pendingBooksTable tbody");
    borrowTable.innerHTML = "";

    borrowings.forEach((borrow, index) => {
        let row = `<tr>
            <td>${borrow.code}</td>
            <td>${borrow.person}</td>
            <td>${borrow.date}</td>
            <td><button onclick="returnBook(${index})">Devolver</button></td>
        </tr>`;
        borrowTable.innerHTML += row;
    });
}

// Devolver livro
function returnBook(index) {
    let borrow = borrowings[index];
    let book = books.find(b => b.code === borrow.code);

    if (book) {
        book.status = 'Disponível';
        const returnDate = new Date().toLocaleDateString();
        book.history.push(`Devolvido por ${borrow.person} em ${returnDate}`);
    }

    borrowings.splice(index, 1);
    saveData();
    loadBooks();
    loadBorrowings();
}

// Exibir histórico do livro
function viewHistory(index) {
    const book = books[index];
    const historyContent = document.getElementById('historyContent');
    
    historyContent.innerHTML = `<h3>Histórico de ${book.code}</h3>`;
    
    if (book.history.length === 0) {
        historyContent.innerHTML += "<p>Nenhum histórico disponível.</p>";
    } else {
        book.history.forEach(entry => {
            historyContent.innerHTML += `<p>${entry}</p>`;
        });
    }

    document.getElementById('historyModal').style.display = 'block';
}

// Fechar modal
function closeModal(id) {
    document.getElementById(id).style.display = 'none';
}

// Verificar login ao carregar a página
document.addEventListener("DOMContentLoaded", function() {
    if (localStorage.getItem('isLoggedIn') === 'true') {
        document.getElementById('loginContainer').style.display = 'none';
        document.getElementById('mainContainer').style.display = 'block';
        loadBooks();
        loadBorrowings();
    }
});

// Login
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (username === 'Instituto' && password === 'Adama') {
        localStorage.setItem('isLoggedIn', 'true');
        document.getElementById('loginContainer').style.display = 'none';
        document.getElementById('mainContainer').style.display = 'block';
        loadBooks();
        loadBorrowings();
    } else {
        alert('Usuário ou senha incorretos.');
    }
});

// Logout
function logout() {
    localStorage.removeItem('isLoggedIn');
    window.location.reload();
}

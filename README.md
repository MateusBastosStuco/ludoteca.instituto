<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ludoteca Virtual</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #4d9219;
            color: #333;
            margin: 0;
            padding: 0;
        }

        .container {
            width: 90%;
            max-width: 800px;
            margin: 20px auto;
            padding: 20px;
            background-color: #ffffff;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
        }

        h1,
        h2 {
            color: #1b5e20;
            text-align: center;
        }

        input[type="text"],
        input[type="password"],
        button {
            width: 100%;
            padding: 10px;
            margin: 10px 0;
            border: 1px solid #ccc;
            border-radius: 4px;
            box-sizing: border-box;
        }

        button {
            background-color: #388e3c;
            color: #fff;
            border: none;
            cursor: pointer;
        }

        button:hover {
            background-color: #2e7d32;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }

        th,
        td {
            border: 1px solid #ddd;
            padding: 10px;
            text-align: left;
        }

        th {
            background-color: #388e3c;
            color: #fff;
        }

        tr:nth-child(even) {
            background-color: #f9f9f9;
        }

        .error,
        .message {
            color: #d9534f;
            background-color: #f2dede;
            padding: 10px;
            border-radius: 4px;
            margin-top: 10px;
            display: none;
            text-align: center;
        }

        .message {
            color: #5bc0de;
            background-color: #d9edf7;
        }

        .modal {
            display: none;
            position: fixed;
            z-index: 1000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            background-color: rgba(0, 0, 0, 0.5);
        }

        .modal-content {
            background-color: #fff;
            margin: 15% auto;
            padding: 20px;
            border: 1px solid #888;
            width: 80%;
            max-width: 500px;
            border-radius: 8px;
        }

        .modal .close {
            color: #aaa;
            float: right;
            font-size: 28px;
            font-weight: bold;
            cursor: pointer;
        }

        .modal .close:hover,
        .modal .close:focus {
            color: #000;
            text-decoration: none;
            cursor: pointer;
        }

        .confirm-delete {
            background-color: #fdfcfc;
            color: rgb(0, 0, 0);
            padding: 10px;
            border-radius: 4px;
            text-align: center;
        }

        .confirm-delete button {
            margin-top: 10px;
        }

        .history-record {
            margin-top: 10px;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 4px;
            background-color: #f9f9f9;
        }

        .overdue {
            color: #d9534f;
            font-weight: bold;
        }

        .action-buttons {
            text-align: center;
        }

        .action-buttons button {
            width: 30%;
            padding: 10px;
            margin: 10px 5px;
        }

        .logo {
            text-align: center;
            margin-bottom: 20px;
        }

        .logo img {
            max-width: 100px;
        }
    </style>
</head>

<body>
    <div id="loginContainer" class="login-container">
        <div class="container">
            <h1>Login</h1>
            <form id="loginForm">
                <input type="text" id="username" placeholder="Usuário" required>
                <input type="password" id="password" placeholder="Senha" required>
                <button type="submit">Entrar</button>
            </form>
            <div id="loginError" class="error"></div>
        </div>
    </div>

    <div id="mainContainer" class="container" style="display: none;">
        <div class="logo">
            <img src="https://media.licdn.com/dms/image/C4E0BAQFLOmeON1RWag/company-logo_200_200/0/1626460469892?e=2147483647&v=beta&t=hoYNWLC__oXHeyur9ItafPQc4LT7m-AEctTYBl2G9w0" alt="Instituto Adama Logo">
        </div>
        <h1>Ludoteca Virtual</h1>

        <form id="addBookForm">
            <h2>Adicionar Livro</h2>
            <input type="text" id="bookTitle" placeholder="Título do Livro" required>
            <input type="text" id="bookAuthor" placeholder="Autor do Livro" required>
            <button type="submit">Adicionar Livro</button>
        </form>

        <form id="borrowBookForm">
            <h2>Emprestar Livro</h2>
            <input type="text" id="borrowTitle" placeholder="Título do Livro" required>
            <input type="text" id="borrowPerson" placeholder="Nome da Pessoa" required>
            <button type="submit">Emprestar Livro</button>
        </form>

        <form id="returnBookForm">
            <h2>Devolver Livro</h2>
            <input type="text" id="returnTitle" placeholder="Título do Livro" required>
            <input type="text" id="returnPerson" placeholder="Nome da Pessoa" required>
            <button type="submit">Devolver Livro</button>
        </form>

        <div class="action-buttons">
            <button onclick="toggleBooksTable()">Listar Livros Registrados</button>
            <button onclick="togglePendingBooksTable()">Listar Livros Pendentes</button>
            <button onclick="logout()">Sair</button>
            <button onclick="clearAllHistory()">Limpar Todo o Histórico</button>
        </div>

        <div id="message" class="message"></div>
        <div id="error" class="error"></div>

        <h2>Livros Registrados</h2>
        <table id="booksTable">
            <thead>
                <tr>
                    <th>Título</th>
                    <th>Autor</th>
                    <th>Status</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                <!-- Livros serão adicionados aqui -->
            </tbody>
        </table>

        <h2>Livros Pendentes</h2>
        <table id="pendingBooksTable">
            <thead>
                <tr>
                    <th>Título</th>
                    <th>Nome da Pessoa</th>
                    <th>Data de Empréstimo</th>
                    <th>Data de Devolução</th>
                    <th>Status</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                <!-- Livros pendentes serão adicionados aqui -->
            </tbody>
        </table>

        <div id="historyModal" class="modal">
            <div class="modal-content">
                <span class="close" onclick="closeModal('historyModal')">&times;</span>
                <div id="historyContent">
                    <!-- Histórico do livro será adicionado aqui -->
                </div>
            </div>
        </div>

        <div id="deleteModal" class="modal">
            <div class="modal-content">
                <span class="close" onclick="closeModal('deleteModal')">&times;</span>
                <div class="confirm-delete">
                    <p>Tem certeza que deseja excluir o livro?</p>
                    <button id="confirmDeleteButton" onclick="confirmDelete()">Confirmar</button>
                    <button onclick="closeModal('deleteModal')">Cancelar</button>
                </div>
            </div>
        </div>
    </div>

    <script>
        let books = JSON.parse(localStorage.getItem('books')) || [];
        let borrowings = JSON.parse(localStorage.getItem('borrowings')) || [];
        let selectedBookIndex = null; // Manter o índice do livro selecionado para exclusão

        // Verificar se o usuário já está logado
        if (localStorage.getItem('isLoggedIn') === 'true') {
            document.getElementById('loginContainer').style.display = 'none';
            document.getElementById('mainContainer').style.display = 'block';
            loadBooks();
            loadBorrowings();
        }

        document.getElementById('loginForm').addEventListener('submit', function (event) {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Substitua isso pela sua lógica de autenticação
            if (username === 'Instituto' && password === 'Adama') {
                localStorage.setItem('isLoggedIn', 'true'); // Salvar estado de login
                document.getElementById('loginContainer').style.display = 'none';
                document.getElementById('mainContainer').style.display = 'block';
                loadBooks();
                loadBorrowings();
            } else {
                showError('Usuário ou senha incorretos.');
            }
        });

        document.getElementById('addBookForm').addEventListener('submit', function (event) {
            event.preventDefault();
            const title = document.getElementById('bookTitle').value;
            const author = document.getElementById('bookAuthor').value;
            const book = { title, author, status: 'Disponível', history: [] };
            books.push(book);
            localStorage.setItem('books', JSON.stringify(books));
            document.getElementById('bookTitle').value = '';
            document.getElementById('bookAuthor').value = '';
            loadBooks();
            showMessage('Livro adicionado com sucesso.');
        });

        document.getElementById('borrowBookForm').addEventListener('submit', function (event) {
            event.preventDefault();
            const title = document.getElementById('borrowTitle').value;
            const person = document.getElementById('borrowPerson').value;
            const book = books.find(b => b.title === title && b.status === 'Disponível');

            if (book) {
                const borrowDate = new Date().toLocaleDateString();
                const returnDate = new Date();
                returnDate.setDate(returnDate.getDate() + 14);
                const returnDateString = returnDate.toLocaleDateString();
                borrowings.push({ title, person, borrowDate, returnDate: returnDateString });
                book.status = 'Emprestado';
                book.history.push({ person, borrowDate, returnDate: returnDateString, status: 'Emprestado' });
                localStorage.setItem('books', JSON.stringify(books));
                localStorage.setItem('borrowings', JSON.stringify(borrowings));
                document.getElementById('borrowTitle').value = '';
                document.getElementById('borrowPerson').value = '';
                loadBooks();
                loadBorrowings();
                showMessage('Livro emprestado com sucesso.');
            } else {
                showError('Livro não disponível para empréstimo.');
            }
        });

        document.getElementById('returnBookForm').addEventListener('submit', function (event) {
            event.preventDefault();
            const title = document.getElementById('returnTitle').value;
            const person = document.getElementById('returnPerson').value;
            const book = books.find(b => b.title === title && b.status === 'Emprestado');

            if (book) {
                const returnIndex = borrowings.findIndex(b => b.title === title && b.person === person);
                if (returnIndex !== -1) {
                    const returnDate = new Date().toLocaleDateString();
                    const isReturnedEarly = new Date(returnDate) < new Date(borrowings[returnIndex].returnDate);
                    book.status = 'Disponível';
                    book.history.push({
                        person,
                        borrowDate: borrowings[returnIndex].borrowDate,
                        returnDate,
                        status: isReturnedEarly ? 'Devolvido antes do prazo' : 'Devolvido'
                    });
                    borrowings.splice(returnIndex, 1);
                    localStorage.setItem('books', JSON.stringify(books));
                    localStorage.setItem('borrowings', JSON.stringify(borrowings));
                    document.getElementById('returnTitle').value = '';
                    document.getElementById('returnPerson').value = '';
                    loadBooks();
                    loadBorrowings();
                    showMessage('Livro devolvido com sucesso.');
                } else {
                    showError('Empréstimo não encontrado.');
                }
            } else {
                showError('Livro não está emprestado.');
            }
        });

        function loadBooks() {
            const tbody = document.querySelector('#booksTable tbody');
            tbody.innerHTML = '';
            books.forEach((book, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>${book.status}</td>
                    <td>
                        <button onclick="showHistory(${index})">Histórico</button>
                        <button onclick="confirmDelete(${index})">Excluir</button>
                    </td>
                `;
                tbody.appendChild(row);
            });
        }

        function loadBorrowings() {
            const tbody = document.querySelector('#pendingBooksTable tbody');
            tbody.innerHTML = '';
            borrowings.forEach((borrowing, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${borrowing.title}</td>
                    <td>${borrowing.person}</td>
                    <td>${borrowing.borrowDate}</td>
                    <td>${borrowing.returnDate}</td>
                    <td class="${new Date(borrowing.returnDate) < new Date() ? 'overdue' : ''}">
                        ${new Date(borrowing.returnDate) < new Date() ? 'Atrasado' : 'Pendente'}
                    </td>
                    <td><button onclick="confirmDelete(${index}, true)">Excluir</button></td>
                `;
                tbody.appendChild(row);
            });
        }

        function showHistory(index) {
            const book = books[index];
            const historyContent = document.getElementById('historyContent');
            historyContent.innerHTML = `<h3>Histórico de "${book.title}"</h3>`;
            book.history.forEach(entry => {
                historyContent.innerHTML += `
                    <div class="history-record">
                        <strong>Nome:</strong> ${entry.person}<br>
                        <strong>Data de Empréstimo:</strong> ${entry.borrowDate}<br>
                        <strong>Data de Devolução:</strong> ${entry.returnDate}<br>
                        <strong>Status:</strong> ${entry.status}<br>
                    </div>
                `;
            });
            document.getElementById('historyModal').style.display = 'block';
        }

        function confirmDelete(index, isBorrowing = false) {
            selectedBookIndex = index; // Armazenar o índice do livro ou do empréstimo
            document.getElementById('deleteModal').style.display = 'block';
            document.getElementById('confirmDeleteButton').onclick = function() {
                deleteItem(selectedBookIndex, isBorrowing);
            };
        }

        function deleteItem(index, isBorrowing) {
            if (isBorrowing) {
                borrowings.splice(index, 1);
                localStorage.setItem('borrowings', JSON.stringify(borrowings));
                loadBorrowings();
                showMessage('Empréstimo excluído com sucesso.');
            } else {
                books.splice(index, 1);
                localStorage.setItem('books', JSON.stringify(books));
                loadBooks();
                showMessage('Livro excluído com sucesso.');
            }
            closeModal('deleteModal');
        }

        function closeModal(modalId) {
            document.getElementById(modalId).style.display = 'none';
        }

        function toggleBooksTable() {
            const table = document.getElementById('booksTable');
            table.style.display = table.style.display === 'none' ? 'table' : 'none';
        }

        function togglePendingBooksTable() {
            const table = document.getElementById('pendingBooksTable');
            table.style.display = table.style.display === 'none' ? 'table' : 'none';
        }

        function logout() {
            // Não remover o estado de login
            document.getElementById('mainContainer').style.display = 'none';
            document.getElementById('loginContainer').style.display = 'block';
        }

        function clearAllHistory() {
            books.forEach(book => {
                book.history = [];
            });
            localStorage.setItem('books', JSON.stringify(books));
            showMessage('Todo o histórico foi limpo com sucesso.');
        }

        function showError(message) {
            const errorDiv = document.getElementById('error');
            errorDiv.innerText = message;
            errorDiv.style.display = 'block';
        }

        function showMessage(message) {
            const messageDiv = document.getElementById('message');
            messageDiv.innerText = message;
            messageDiv.style.display = 'block';
        }
    </script>
</body>

</html>

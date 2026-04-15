// Indeks: 75663
document.addEventListener('DOMContentLoaded', () => {
    // --- ZADANIE 4: Motyw i ukrywanie ---
    const themeBtn = document.getElementById('theme-toggle');
    const expBtn = document.getElementById('experience-toggle');
    const expSection = document.getElementById('experience');

    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('theme-green');
        document.body.classList.toggle('theme-red');
    });

    expBtn.addEventListener('click', () => {
        if (expSection.style.display === 'none') {
            expSection.style.display = 'block';
        } else {
            expSection.style.display = 'none';
        }
    });

    // --- ZADANIE 5: Walidacja formularza ---
    const form = document.getElementById('contact-form');
    const successMsg = document.getElementById('form-success');

    const showError = (inputId, message) => {
        const input = document.getElementById(inputId);
        const errorSpan = document.getElementById(`error-${inputId}`);
        input.classList.add('input-error');
        errorSpan.textContent = message;
        errorSpan.style.display = 'block';
    };

    const clearErrors = () => {
        const inputs = document.querySelectorAll('.input-error');
        const errors = document.querySelectorAll('.error-msg');
        inputs.forEach(input => input.classList.remove('input-error'));
        errors.forEach(error => error.style.display = 'none');
        successMsg.style.display = 'none';
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        clearErrors();

        let isValid = true;
        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        const noDigitsRegex = /^[^0-9]+$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (firstName === '') { showError('firstName', 'Pole imię jest wymagane.'); isValid = false; } 
        else if (!noDigitsRegex.test(firstName)) { showError('firstName', 'Imię nie może zawierać cyfr.'); isValid = false; }

        if (lastName === '') { showError('lastName', 'Pole nazwisko jest wymagane.'); isValid = false; } 
        else if (!noDigitsRegex.test(lastName)) { showError('lastName', 'Nazwisko nie może zawierać cyfr.'); isValid = false; }

        if (email === '') { showError('email', 'Pole e-mail jest wymagane.'); isValid = false; } 
        else if (!emailRegex.test(email)) { showError('email', 'Podaj poprawny format e-mail.'); isValid = false; }

        if (message === '') { showError('message', 'Wiadomość nie może być pusta.'); isValid = false; }

        if (isValid) {
            successMsg.style.display = 'block';
            form.reset();
        }
    });

    // --- ZADANIE 7: Local Storage (Notatnik / To-Do) ---
    const todoInput = document.getElementById('todo-input');
    const addTodoBtn = document.getElementById('add-todo-btn');
    const todoList = document.getElementById('todo-list');

    // 1. Odczyt danych z localStorage przy starcie
    // Używamy unikalnego klucza z numerem indeksu
    let todos = JSON.parse(localStorage.getItem('todos_75663')) || [];

    // Funkcja do rysowania listy zadań na ekranie
    const renderTodos = () => {
        todoList.innerHTML = '';
        todos.forEach((todo, index) => {
            const li = document.createElement('li');
            li.textContent = todo;

            // Przycisk usuwania
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Usuń';
            deleteBtn.classList.add('delete-btn');
            
            // 2. Możliwość usunięcia elementu
            deleteBtn.addEventListener('click', () => {
                deleteTodo(index);
            });

            li.appendChild(deleteBtn);
            todoList.appendChild(li);
        });
    };

    // 3. Dodawanie elementu i zapis do localStorage
    const addTodo = () => {
        const text = todoInput.value.trim();
        if (text !== '') {
            todos.push(text); // Dodaj do tablicy
            localStorage.setItem('todos_75663', JSON.stringify(todos)); // Zapisz w przeglądarce
            todoInput.value = ''; // Wyczyść pole
            renderTodos(); // Odśwież widok
        }
    };

    // Funkcja usuwająca zadanie z tablicy i aktualizująca localStorage
    const deleteTodo = (index) => {
        todos.splice(index, 1);
        localStorage.setItem('todos_75663', JSON.stringify(todos));
        renderTodos();
    };

    // Nasłuchiwanie na kliknięcie przycisku "Dodaj"
    addTodoBtn.addEventListener('click', addTodo);

    // Renderuj listę przy pierwszym załadowaniu strony
    renderTodos();
});

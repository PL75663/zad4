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

    // Funkcja do pokazywania błędu
    const showError = (inputId, message) => {
        const input = document.getElementById(inputId);
        const errorSpan = document.getElementById(`error-${inputId}`);
        input.classList.add('input-error');
        errorSpan.textContent = message;
        errorSpan.style.display = 'block';
    };

    // Funkcja do czyszczenia błędów
    const clearErrors = () => {
        const inputs = document.querySelectorAll('.input-error');
        const errors = document.querySelectorAll('.error-msg');
        inputs.forEach(input => input.classList.remove('input-error'));
        errors.forEach(error => error.style.display = 'none');
        successMsg.style.display = 'none';
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Zatrzymuje przeładowanie strony
        clearErrors();

        let isValid = true;

        // Pobieranie wartości
        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        // Regex (Wyrażenia regularne) do sprawdzania cyfr i formatu email
        const noDigitsRegex = /^[^0-9]+$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Walidacja Imienia
        if (firstName === '') {
            showError('firstName', 'Pole imię jest wymagane.');
            isValid = false;
        } else if (!noDigitsRegex.test(firstName)) {
            showError('firstName', 'Imię nie może zawierać cyfr.');
            isValid = false;
        }

        // Walidacja Nazwiska
        if (lastName === '') {
            showError('lastName', 'Pole nazwisko jest wymagane.');
            isValid = false;
        } else if (!noDigitsRegex.test(lastName)) {
            showError('lastName', 'Nazwisko nie może zawierać cyfr.');
            isValid = false;
        }

        // Walidacja E-mail
        if (email === '') {
            showError('email', 'Pole e-mail jest wymagane.');
            isValid = false;
        } else if (!emailRegex.test(email)) {
            showError('email', 'Podaj poprawny format e-mail (np. nazwa@domena.pl).');
            isValid = false;
        }

        // Walidacja Wiadomości
        if (message === '') {
            showError('message', 'Wiadomość nie może być pusta.');
            isValid = false;
        }

        // Jeśli wszystko jest poprawne
        if (isValid) {
            successMsg.style.display = 'block';
            form.reset(); // Czyszczenie formularza po wysłaniu
        }
    });
});

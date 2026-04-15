// Indeks: 75663
document.addEventListener('DOMContentLoaded', () => {
    const themeBtn = document.getElementById('theme-toggle');
    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('theme-green');
        document.body.classList.toggle('theme-red');
    });

    const form = document.getElementById('contact-form');
    const loadingMsg = document.getElementById('form-loading');
    const successMsg = document.getElementById('form-success');
    const errorMsgGlobal = document.getElementById('form-error');

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
        errorMsgGlobal.style.display = 'none';
    };

    // --- ZADANIE 8: Wysyłka danych na serwer (Backend) ---
    const sendDataToServer = async (formData) => {
        loadingMsg.style.display = 'block';
        
        try {
            // Używamy testowego API (JSONPlaceholder), które akceptuje POST
            // W prawdziwym projekcie zamień ten URL na swój endpoint Supabase/Firebase
            const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Odpowiedź serwera:', result);
                successMsg.style.display = 'block';
                form.reset();
            } else {
                throw new Error('Błąd serwera');
            }
        } catch (error) {
            console.error('Błąd wysyłki:', error);
            errorMsgGlobal.style.display = 'block';
        } finally {
            loadingMsg.style.display = 'none';
        }
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        clearErrors();

        let isValid = true;
        const data = {
            firstName: document.getElementById('firstName').value.trim(),
            lastName: document.getElementById('lastName').value.trim(),
            email: document.getElementById('email').value.trim(),
            message: document.getElementById('message').value.trim(),
            studentIndex: "75663" // Dodajemy indeks do danych wysyłanych
        };

        const noDigitsRegex = /^[^0-9]+$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (data.firstName === '') { showError('firstName', 'Pole wymagane'); isValid = false; }
        if (data.lastName === '') { showError('lastName', 'Pole wymagane'); isValid = false; }
        if (!emailRegex.test(data.email)) { showError('email', 'Zły format email'); isValid = false; }
        if (data.message === '') { showError('message', 'Wpisz wiadomość'); isValid = false; }

        if (isValid) {
            sendDataToServer(data);
        }
    });
});

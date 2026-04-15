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

    // --- ZADANIE 6: Pobieranie danych z pliku JSON (Fetch API) ---
    const loadData = () => {
        fetch('data.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Błąd ładowania danych');
                }
                return response.json();
            })
            .then(data => {
                // Wypełnianie listy umiejętności
                const skillsList = document.getElementById('skills-list');
                skillsList.innerHTML = ''; // Czyścimy tekst "Ładowanie danych..."
                data.skills.forEach(skill => {
                    const li = document.createElement('li');
                    li.textContent = skill;
                    skillsList.appendChild(li);
                });

                // Wypełnianie listy projektów
                const projectsList = document.getElementById('projects-list');
                projectsList.innerHTML = ''; // Czyścimy tekst "Ładowanie danych..."
                data.projects.forEach(project => {
                    const li = document.createElement('li');
                    li.innerHTML = `<strong>${project.name}:</strong> ${project.description}`;
                    projectsList.appendChild(li);
                });
            })
            .catch(error => {
                console.error('Błąd:', error);
                document.getElementById('skills-list').innerHTML = '<li>Brak danych do wyświetlenia.</li>';
                document.getElementById('projects-list').innerHTML = '<li>Brak danych do wyświetlenia.</li>';
            });
    };

    // Wywołanie funkcji pobierającej dane po załadowaniu strony
    loadData();
});

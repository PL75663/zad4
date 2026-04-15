// Indeks: 75663
document.addEventListener('DOMContentLoaded', () => {
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
});

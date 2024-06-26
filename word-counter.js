document.addEventListener("DOMContentLoaded", function () {
    const textbox = document.getElementById("textbox");
    const wordCountLabel = document.getElementById("wordCount");
    const timerLabel = document.getElementById("timer");
    const timeSelect = document.getElementById("timeSelect");
    const startBtn = document.getElementById("startBtn");
    const pauseBtn = document.getElementById("pauseBtn");
    const resetBtn = document.getElementById("resetBtn");
    const btnEnglish = document.getElementById("btnEnglish");
    const btnSpanish = document.getElementById("btnSpanish");

    const translations = {
        en: {
            title: "Word Counter",
            selectLanguage: "Select the Language:",
            enterWords: "Type your words:",
            words: "Words",
            selectTime: "Select time:",
            timeRemaining: "Time remaining",
            start: "Start",
            pause: "Pause",
            reset: "Reset",
            minute: "minute",
            minutes: "minutes",
            seconds: "seconds",
            Oneminute: "1 minute",
            Twominutes: "2 minutes",
            Threeminutes: "3 minutes",
            Fourminutes: "4 minutes",
            Fiveminutes: "5 minutes",
            footerLabel: "Copyright 2024 ©",
            footerLabel2: "Developed by Bryan Pérez González."
        },
        es: {
            title: "Contador de Palabras",
            selectLanguage: "Selecciona el Idioma:",
            enterWords: "Escribe tus palabras:",
            words: "Palabras",
            selectTime: "Seleccione el tiempo:",
            timeRemaining: "Tiempo restante",
            start: "Iniciar",
            pause: "Pausar",
            reset: "Reiniciar",
            minute: "minuto",
            minutes: "minutos",
            seconds: "segundos",
            Oneminute: "1 minuto",
            Twominutes: "2 minutos",
            Threeminutes: "3 minutos",
            Fourminutes: "4 minutos",
            Fiveminutes: "5 minutos",
            footerLabel: "Derechos de autor 2024 ©",
            footerLabel2: "Desarrollado por Bryan Pérez González."
        }
    };

    let timer;
    let timeRemaining = parseInt(timeSelect.value);
    let isRunning = false;
    let currentLanguage = "en";

    function updateWordCount() {
        const text = textbox.value.trim();
        const wordCount = text ? text.split(/\s+/).length : 0;
        wordCountLabel.textContent = `${translations[currentLanguage].words}: ${wordCount}`;
    }

    function updateTimerLabel() {
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        let timeText = "";

        if (minutes > 0) {
            timeText += minutes > 1
                ? `${minutes} ${translations[currentLanguage].minutes} `
                : `${minutes} ${translations[currentLanguage].minute} `;
        }
        timeText += `${seconds} ${translations[currentLanguage].seconds}`;

        timerLabel.textContent = `${translations[currentLanguage].timeRemaining}: ${timeText}`;
    }

    function startTimer() {
        if (!isRunning) {
            isRunning = true;
            textbox.disabled = false;
            timeSelect.disabled = true;
            startBtn.disabled = true;
            pauseBtn.disabled = false;
            timer = setInterval(() => {
                timeRemaining--;
                updateTimerLabel();
                if (timeRemaining <= 0) {
                    clearInterval(timer);
                    textbox.disabled = true;
                    timeSelect.disabled = false;
                    startBtn.disabled = true;
                    pauseBtn.disabled = true;
                    isRunning = false;
                }
            }, 1000);
        }
    }

    function pauseTimer() {
        if (isRunning) {
            clearInterval(timer);
            isRunning = false;
            textbox.disabled = true;
            startBtn.disabled = false;
            pauseBtn.disabled = true;
        }
    }

    function resetTimer() {
        clearInterval(timer);
        isRunning = false;
        timeRemaining = parseInt(timeSelect.value);
        updateTimerLabel();
        textbox.value = "";
        updateWordCount();
        textbox.disabled = true;
        timeSelect.disabled = false;
        startBtn.disabled = false;
        pauseBtn.disabled = true;
    }

    function updateLanguage(lang) {
        currentLanguage = lang;
    
        // Actualizar etiquetas con atributo data-key
        const labels = document.querySelectorAll("[data-key]");
        labels.forEach(label => {
            const key = label.getAttribute("data-key");
            label.textContent = translations[currentLanguage][key];
        });
    
        // Actualizar botones de idioma
        if (currentLanguage === "en") {
            btnEnglish.classList.add("active");
            btnSpanish.classList.remove("active");
        } else if (currentLanguage === "es") {
            btnEnglish.classList.remove("active");
            btnSpanish.classList.add("active");
        }
    
        // Actualizar contador de palabras y etiqueta del temporizador
        updateWordCount();
        updateTimerLabel();
    }
    

    textbox.addEventListener("input", updateWordCount);

    timeSelect.addEventListener("change", () => {
        timeRemaining = parseInt(timeSelect.value);
        updateTimerLabel();
    });

    startBtn.addEventListener("click", startTimer);
    pauseBtn.addEventListener("click", pauseTimer);
    resetBtn.addEventListener("click", resetTimer);

    btnEnglish.addEventListener("click", () => {
        if (currentLanguage !== "en") {
            updateLanguage("en");
        }
    });

    btnSpanish.addEventListener("click", () => {
        if (currentLanguage !== "es") {
            updateLanguage("es");
        }
    });

    resetTimer(); // Inicializar el estado
    updateLanguage(currentLanguage); // Inicializar el idioma
});

// Consolidación de todos los listeners DOMContentLoaded
document.addEventListener('DOMContentLoaded', function () {
    // Check if ScrollReveal is defined before using it
    if (typeof ScrollReveal !== 'undefined') {
        ScrollReveal().reveal('.reveal', {
            distance: '60px',
            duration: 1300,
            easing: 'ease-in-out',
            origin: 'right',
            reset: true
        });
    }

    // Inicializar animaciones de texto (Solo si existen los elementos - Legacy safety)
    const welcomeText = document.getElementById('WelcomeText');
    const introText = document.getElementById('introText');
    if (welcomeText) welcomeText.classList.add('fadeIn');
    if (introText) introText.classList.add('fadeIn');

    // Actualizar año dinámicamente en el footer
    const currentYear = new Date().getFullYear();
    document.getElementById('currentYear').textContent = currentYear;

    // Gestión de modales
    const modalElements = document.querySelectorAll('.modal');
    modalElements.forEach(function (modal) {
        modal.addEventListener('hidden.bs.modal', function () {
            const focusedElement = document.querySelector('.ver-detalle-btn:focus');
            if (focusedElement) {
                focusedElement.blur();
            }
        });
    });

    // Descarga de PDF

    // Descarga de PDF (Solo si existe el botón)
    const pdfBtn = document.getElementById('descargarPDF');
    if (pdfBtn) {
        pdfBtn.addEventListener('click', function (event) {
            event.preventDefault();
            const link = document.createElement('a');
            link.href = 'CV.pdf';
            link.download = 'LuisFelipeGuillenMarquez.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }

    // Inicializar animaciones de tecnologías para todos los proyectos
    ['project1', 'project2', 'project3', 'project4'].forEach(project => {
        startAnimation(project);
    });

    // Validación de formulario de contacto
    initContactForm();

    // Idioma
    initLanguage();

    // Tema
    initTheme();

    // Spotlight Effect (Premium Interaction)
    const spotlightCards = document.querySelectorAll('.skill-category-card, #proyectos .card');

    spotlightCards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
});

function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const icon = themeToggle.querySelector('i');
    const body = document.body;

    // Check saved theme
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'light') {
        body.classList.add('light-mode');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }

    themeToggle.addEventListener('click', function () {
        body.classList.toggle('light-mode');

        if (body.classList.contains('light-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            localStorage.setItem('theme', 'light');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            localStorage.setItem('theme', 'dark');
        }
    });
}

// --- Traducciones ---
const translations = {
    es: {
        nav_cv: "CV",
        nav_home: "Home",
        nav_projects: "Proyectos",
        nav_skills: "Habilidades",
        nav_contact: "Contacto",
        hero_greeting: "¡Hola! Soy",
        hero_role: "Analista de Sistemas / .NET Developer / QA Analyst",
        hero_desc: "Desarrollador enfocado en el ecosistema .NET. Utilizo mi sólida base en QA y Base de Datos para escribir código limpio, prevenir deuda técnica y asegurar la calidad del software desde la arquitectura. Estudiante avanzado de Ingeniería (5to año).",
        hero_btn_projects: "Ver Proyectos",
        hero_btn_contact: "Contactar",
        about_title: "Sobre Mí <span class=\"text-primary\">.</span>",
        about_story_title: "Perfil Profesional",
        about_story_text: "Analista de Sistemas y estudiante avanzado de Ingeniería (5to año). Cuento con sólida experiencia en QA técnico, desarrollando una mentalidad orientada a la calidad. Mi objetivo es transicionar al rol de Desarrollador .NET/C#, aplicando conocimientos en POO, SQL y arquitectura.",
        about_exp_title: "Experiencia Profesional",
        about_exp_role: "QA Analyst @ Epidata",
        about_exp_desc: "Diseño y ejecución de casos de prueba integrales para aplicativos bancarios. Validación de servicios SoapUI, consultas SQL y reporte de bugs (Jira/Trello).",
        about_tech_title: "Tecnologías",
        about_tech_desc: "C# / .NET, ASP.NET, Python (Flask), SQL Server, MySQL, SoapUI, Postman, Jira, Git. Enfoque en soluciones robustas y escalables.",
        projects_title: "Proyectos <span class=\"text-primary\">.</span>",
        skills_title: "Habilidades Técnicas <span class=\"text-primary\">.</span>",
        backend_db_title: "<i class=\"fas fa-server text-secondary mr-2\"></i> Backend & DB",
        testing_tools_title: "<i class=\"fas fa-vial text-primary mr-2\"></i> Testing & Tools",
        frontend_title: "<i class=\"fas fa-laptop-code text-accent mr-2\"></i> Frontend",
        contact_title: "Contáctame <span class=\"text-primary\">.</span>",
        contact_intro_text: "¿Tienes alguna propuesta o quieres charlar sobre tecnología? No dudes en contactarme. Estoy abierto a nuevas oportunidades.",
        contact_label_name: "Nombre",
        contact_ph_name: "Tu nombre",
        contact_label_email: "Correo electrónico",
        contact_ph_email: "tu@email.com",
        contact_label_msg: "Mensaje",
        contact_ph_msg: "Escribe tu mensaje aquí...",
        contact_btn_submit: "Enviar Mensaje",
        footer_rights: "Luis Felipe Guillén Márquez",
        // Proyectos
        btn_details: "Ver Detalles",
        btn_tech: "Tecnologías",
        btn_close: "Cerrar",
        label_desc: "Descripción:",
        label_obj: "Objetivos:",
        label_tech: "Tecnologías Utilizadas:",
        label_features: "Características:",
        label_challenges: "Desafíos:",

        project1_title: "Calculadora Básica",
        project1_desc: "Aplicación web de calculadora desarrollada con HTML, CSS y JavaScript. Ofrece operaciones básicas y una interfaz intuitiva.",
        project1_modal_desc: "Esta calculadora básica permite realizar operaciones matemáticas fundamentales como suma, resta, multiplicación y división.",
        project1_modal_obj: "Proporcionar una herramienta sencilla para realizar cálculos básicos.",
        project1_feat_1: "Interfaz intuitiva y fácil de usar.",
        project1_feat_2: "Soporte para operaciones matemáticas básicas.",
        project1_feat_3: "Diseño responsivo.",
        project1_modal_challenges: "Asegurar que la interfaz sea clara y funcional en diferentes dispositivos.",

        project2_title: "Clima en Tu Lugar",
        project2_desc: "Aplicación web que brinda información sobre el clima actual en tu ubicación.",

        project3_title: "Blog de la localidad El Tigre",
        project3_desc: "Proyecto colaborativo para crear un blog sobre la localidad El Tigre, destacando su historia y lugares de interés.",

        project4_title: "PetZone - Tienda de Mascotas",
        project4_desc: "Proyecto de tienda de mascotas con frontend y backend. Utiliza Python, Flask y MySQL para el ABM de productos."
    },
    en: {
        nav_cv: "Resume",
        nav_home: "Home",
        nav_projects: "Projects",
        nav_skills: "Skills",
        nav_contact: "Contact",
        hero_greeting: "Hello! I am",
        hero_role: "Systems Analyst / .NET Developer / QA Analyst",
        hero_desc: "Developer focused on the .NET ecosystem. I use my solid background in QA and Databases to write clean code, prevent technical debt, and ensure software quality from the architecture level. Advanced Engineering student (5th year).",
        hero_btn_projects: "View Projects",
        hero_btn_contact: "Contact Me",
        about_title: "About Me <span class=\"text-primary\">.</span>",
        about_story_title: "Professional Profile",
        about_story_text: "Systems Analyst and Advanced Engineering Student (5th year). I have solid experience in Technical QA, developing a quality-oriented mindset. My goal is to transition to a .NET/C# Developer role, applying OOP, SQL, and architecture knowledge.",
        about_exp_title: "Professional Experience",
        about_exp_role: "QA Analyst @ Epidata",
        about_exp_desc: "Design and execution of integral test cases for banking applications. SoapUI service validation, SQL queries, and bug reporting (Jira/Trello).",
        about_tech_title: "Technologies",
        about_tech_desc: "C# / .NET, ASP.NET, Python (Flask), SQL Server, MySQL, SoapUI, Postman, Jira, Git. Focus on robust and scalable solutions.",
        projects_title: "Projects <span class=\"text-primary\">.</span>",
        skills_title: "Technical Skills <span class=\"text-primary\">.</span>",
        backend_db_title: "<i class=\"fas fa-server text-secondary mr-2\"></i> Backend & DB",
        testing_tools_title: "<i class=\"fas fa-vial text-primary mr-2\"></i> Testing & Tools",
        frontend_title: "<i class=\"fas fa-laptop-code text-accent mr-2\"></i> Frontend",
        contact_title: "Contact Me <span class=\"text-primary\">.</span>",
        contact_intro_text: "Do you have a proposal or want to chat about technology? Feel free to contact me. I am open to new opportunities.",
        contact_label_name: "Name",
        contact_ph_name: "Your Name",
        contact_label_email: "Email",
        contact_ph_email: "your@email.com",
        contact_label_msg: "Message",
        contact_ph_msg: "Write your message here...",
        contact_btn_submit: "Send Message",
        footer_rights: "Luis Felipe Guillén Márquez",
        // Projects
        btn_details: "View Details",
        btn_tech: "Technologies",
        btn_close: "Close",
        label_desc: "Description:",
        label_obj: "Objectives:",
        label_tech: "Technologies Used:",
        label_features: "Features:",
        label_challenges: "Challenges:",

        project1_title: "Basic Calculator",
        project1_desc: "Web calculator application developed with HTML, CSS, and JavaScript. Offers basic operations and an intuitive interface.",
        project1_modal_desc: "This basic calculator allows performing fundamental mathematical operations such as addition, subtraction, multiplication, and division.",
        project1_modal_obj: "Provide a simple tool for basic calculations.",
        project1_feat_1: "Intuitive and easy-to-use interface.",
        project1_feat_2: "Support for basic mathematical operations.",
        project1_feat_3: "Responsive design.",
        project1_modal_challenges: "Ensuring the interface is clear and functional across different devices.",

        project2_title: "Weather in Your Location",
        project2_desc: "Web application that provides real-time weather information for your location.",

        project3_title: "El Tigre Blog",
        project3_desc: "Collaborative project to create a blog about the El Tigre locality, highlighting its history and places of interest.",

        project4_title: "PetZone - Pet Shop",
        project4_desc: "Pet shop project with frontend and backend. Uses Python, Flask, and MySQL for product management."
    }
};

function initLanguage() {
    const langToggle = document.getElementById('lang-toggle');
    if (!langToggle) return;

    let currentLang = 'es'; // Default

    langToggle.addEventListener('click', function () {
        // Toggle Language
        currentLang = currentLang === 'es' ? 'en' : 'es';

        // Update Flag
        const flagIcon = langToggle.querySelector('.flag-icon');
        if (currentLang === 'en') {
            flagIcon.classList.remove('flag-icon-es');
            flagIcon.classList.add('flag-icon-us');
        } else {
            flagIcon.classList.remove('flag-icon-us');
            flagIcon.classList.add('flag-icon-es');
        }

        // Update Text
        updateTexts(currentLang);
    });
}

function updateTexts(lang) {
    const elements = document.querySelectorAll('[data-lang-key]');
    const placeholders = document.querySelectorAll('[data-lang-placeholder]');

    elements.forEach(element => {
        const key = element.getAttribute('data-lang-key');
        if (translations[lang] && translations[lang][key]) {
            element.innerHTML = translations[lang][key];
        }
    });

    placeholders.forEach(element => {
        const key = element.getAttribute('data-lang-placeholder');
        if (translations[lang] && translations[lang][key]) {
            element.setAttribute('placeholder', translations[lang][key]);
        }
    });

    // Re-initialize ScrollReveal/Animations if needed (Text change might affect layout)
    // For now, simpler is better.
}

// Función para iniciar animaciones de tecnologías
function startAnimation(project) {
    const btn = document.querySelector(`.tecnologias-btn[data-project="${project}"]`);
    const container = document.querySelector(`.tech-logos-container[data-project="${project}"]`);

    if (!btn || !container) return;

    btn.addEventListener('click', function () {
        container.classList.remove('d-none');

        // Re-create animation on every click to ensure proper calculation
        anime({
            targets: `.property-keyframes-demo[data-project="${project}"] .el`,
            translateX: [
                { value: 100, duration: 1000, delay: 500 },
                { value: -100, duration: 1000, delay: 500 },
                { value: 0, duration: 500, delay: 1000 }
            ],
            translateY: [
                { value: 2, duration: 500 },
                { value: 18, duration: 500, delay: 1000 },
                { value: 0, duration: 500, delay: 1000 }
            ],
            scaleX: [
                { value: 2, duration: 100, delay: 500, easing: 'easeOutExpo' },
                { value: 1, duration: 900 },
                { value: 2, duration: 100, delay: 500, easing: 'easeOutExpo' },
                { value: 1, duration: 900 }
            ],
            scaleY: [
                { value: [1.75, 1], duration: 500 },
                { value: 2, duration: 50, delay: 1000, easing: 'easeOutExpo' },
                { value: 1, duration: 450 },
                { value: 1.75, duration: 50, delay: 1000, easing: 'easeOutExpo' },
                { value: 1, duration: 450 }
            ],
            rotate: {
                value: 360,
                duration: 1000,
                easing: 'easeInOutExpo'
            },
            easing: 'easeOutElastic(3, .9)',
            loop: false,
            autoplay: true,
            complete: function () {
                setTimeout(function () {
                    container.classList.add('d-none');
                }, 3000);
            }
        });
    });
}

// Función para inicializar validación del formulario de contacto
function initContactForm() {
    const form = document.getElementById('contactForm');

    form.addEventListener('submit', function (event) {
        let valid = true;

        // Validar Nombre
        const name = document.getElementById('name');
        const nameError = document.getElementById('nameError');
        if (name.value.trim() === '') {
            nameError.textContent = 'Por favor ingresa tu nombre.';
            nameError.style.display = 'block';
            valid = false;
        } else {
            nameError.style.display = 'none';
        }

        // Validar Email con patrón mejorado
        const email = document.getElementById('email');
        const emailError = document.getElementById('emailError');
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(email.value.trim())) {
            emailError.textContent = 'Por favor ingresa un correo electrónico válido.';
            emailError.style.display = 'block';
            valid = false;
        } else {
            emailError.style.display = 'none';
        }

        // Validar Mensaje
        const message = document.getElementById('message');
        const messageError = document.getElementById('messageError');
        if (message.value.trim() === '') {
            messageError.textContent = 'Por favor ingresa un mensaje.';
            messageError.style.display = 'block';
            valid = false;
        } else {
            messageError.style.display = 'none';
        }

        // Prevenir envío si hay errores
        if (!valid) {
            event.preventDefault();
        }
    });
}

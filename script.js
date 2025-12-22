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
    ['projectCSharp', 'project2', 'project3', 'project4'].forEach(project => {
        startAnimation(project);
    });

    initContactForm();

    initLanguage();

    initTheme();

    // Aplicar traducciones iniciales
    updateTexts('es');

    // Inicializar Scroll to Top
    initScrollToTop();

    // Inicializar auto-cerrar navbar en móviles
    initMobileNavbar();

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
        nav_education: "Formación",
        nav_projects: "Proyectos",
        nav_skills: "Habilidades",
        nav_contact: "Contacto",
        hero_greeting: "¡Hola! Soy",
        hero_role: "Analista de Sistemas / .NET Developer / QA Analyst",
        hero_desc: "Desarrollador enfocado en el ecosistema .NET. Utilizo mi sólida base en QA y Base de Datos para escribir código limpio, prevenir deuda técnica y asegurar la calidad del software desde la arquitectura. Estudiante avanzado de Ingeniería (5to año).",
        hero_btn_projects: "Ver Proyectos",
        projects_titles: "Mis Proyectos",
        hero_btn_contact: "Contactar",
        about_title: "Sobre Mí <span class=\"text-primary\">.</span>",
        about_story_title: "Perfil Profesional",
        about_story_text: "Analista de Sistemas y estudiante avanzado de Ingeniería (5to año). Cuento con sólida experiencia en QA técnico, desarrollando una mentalidad orientada a la calidad. Mi objetivo es transicionar al rol de Desarrollador .NET/C#, aplicando conocimientos en POO, SQL y arquitectura.",
        about_exp_title: "Experiencia Profesional",
        about_exp_role_current: "QA Analyst @ Epidata",
        about_exp_dates_current: "Jul 2025 - Actualidad",
        about_exp_desc_current: "Detecté 25+ bugs críticos en aplicativos bancarios antes de producción. Optimicé casos de prueba reduciendo tiempo de testing 30%.",
        about_exp_role_freelance: "QA Tester Freelance",
        about_exp_dates_freelance: "Sep 2024 - Jul 2025",
        about_exp_desc_freelance: "Colaboración directa con desarrollo en <strong>evemtos.com.ar</strong>. Prevención de deuda técnica y validación de reglas críticas de negocio.",
        about_tech_title: "Tecnologías",
        about_tech_desc: "C# / .NET, ASP.NET WebForms, Python (Flask), SQL Server, MySQL, SoapUI, Postman, Jira, Git. Metodologías: Scrum, Agile.",
        // Formación Académica
        education_title: "Formación Académica <span class=\"text-primary\">.</span>",
        education_engineering_title: "Ingeniería en Sistemas Informáticos",
        education_engineering_uni: "Universidad Abierta Interamericana (UAI)",
        education_engineering_status: "Mar 2025 - Actualidad (En curso - 5to año)",
        education_engineering_progress: "Restan 8 materias para finalizar",
        education_technical_title: "Técnico Superior en Análisis de Sistemas",
        education_technical_inst: "Inst. Sup. del Profesorado Juan Bautista Alberdi",
        education_technical_status: "Mar 2022 - Mar 2025",
        education_technical_completed: "Título Obtenido",
        education_technical_desc: "Formación completa en análisis y diseño de sistemas",
        projects_title: "Proyectos <span class=\"text-primary\">.</span>",
        skills_title: "Habilidades Técnicas <span class=\"text-primary\">.</span>",
        backend_db_title: "<i class=\"fas fa-server text-secondary mr-2\"></i> Backend & DB",
        testing_tools_title: "<i class=\"fas fa-vial text-primary mr-2\"></i> Testing & Tools",
        frontend_title: "<i class=\"fas fa-laptop-code text-accent mr-2\"></i> Frontend",
        contact_title: "Contáctame <span class=\"text-primary\">.</span>",
        contact_intro_text: "¿Tienes alguna propuesta o quieres charlar sobre tecnología? No dudes en contactarme. Estoy abierto a nuevas oportunidades.",
        contact_email_label: "Email",
        contact_phone_label: "Teléfono",
        contact_location_label: "Ubicación",
        contact_label_name: "Nombre",
        contact_ph_name: "Tu nombre",
        contact_label_email: "Correo electrónico",
        contact_ph_email: "tu@email.com",
        contact_label_msg: "Mensaje",
        contact_ph_msg: "Escribe tu mensaje aquí...",
        contact_btn_submit: "Enviar Mensaje",
        contact_language_label: "Idiomas",
        contact_language_value: "Inglés B1 (Intermedio)",
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

        btn_view_code: "Ver Código",
        projectCSharp_modal_title: "Gestor de Empleados - Arquitectura N-Capas",
        projectCSharp_modal_tech_list: "C# .NET Framework, Windows Forms, SQL Server (Stored Procedures), ADO.NET.",
        projectCSharp_feat_4: "Gestión correcta de memoria (uso de using).",

        projectCSharp_title: "Gestor de Empleados N-Capas",
        projectCSharp_desc: "Aplicación de escritorio corporativa desarrollada con arquitectura de 3 capas, WinForms y SQL Server.",
        projectCSharp_modal_desc: "Sistema de gestión de empleados diseñado bajo una arquitectura estricta de 3 capas (Presentación, Negocio, Datos). Utiliza Windows Forms y ADO.NET.",
        projectCSharp_modal_obj: "Demostrar la capacidad de crear software escalable y mantenible, desacoplando la lógica de negocio.",
        projectCSharp_feat_1: "CRUD Completo con validaciones.",
        projectCSharp_feat_2: "Uso de Stored Procedures (SQL Server).",
        projectCSharp_feat_3: "Arquitectura limpia N-Capas.",
        projectCSharp_modal_challenges: "Implementar correctamente la separación de responsabilidades y la gestión de memoria.",

        project2_title: "Clima en Tu Lugar",
        project2_desc: "Aplicación web que brinda información sobre el clima actual en tu ubicación.",

        project3_title: "Blog de la localidad El Tigre",
        project3_desc: "Proyecto colaborativo para crear un blog sobre la localidad El Tigre, destacando su historia y lugares de interés.",

        project4_title: "PetZone - Tienda de Mascotas",
        project4_desc: "Proyecto de tienda de mascotas con frontend y backend. Utiliza Python, Flask y MySQL para el ABM de productos.",
        
        // Modales de Proyectos
        project2_modal_title: "Clima en tu Lugar",
        project2_modal_desc: "Esta aplicación simple te brinda información sobre el clima actual en tu ubicación, mostrando la temperatura, presión atmosférica, humedad relativa y una descripción del clima actual.",
        project2_modal_features_label: "Funcionalidades:",
        project2_feat_1: "Muestra la temperatura actual.",
        project2_feat_2: "Muestra la presión atmosférica.",
        project2_feat_3: "Muestra la humedad relativa.",
        project2_feat_4: "Proporciona una descripción del clima actual.",
        project2_modal_requirements_label: "Requisitos:",
        project2_req_1: "Conexión a Internet para obtener los datos del clima.",
        project2_req_2: "Permiso del navegador para acceder a la ubicación del usuario.",
        project2_modal_api_label: "API Utilizada:",
        project2_modal_api_desc: "La aplicación utiliza la API de OpenWeatherMap para obtener la información del clima.",
        project2_modal_tech_list: "HTML, CSS, JavaScript.",

        project3_modal_title: "Blog de la localidad El Tigre",
        project3_modal_desc: "Proyecto colaborativo que destaca la historia, cultura y lugares de interés de esta región. El objetivo es proporcionar a los residentes y visitantes una fuente de información detallada y atractiva sobre la localidad.",
        project3_modal_obj: "Crear una plataforma informativa sobre El Tigre. Promover el turismo y el conocimiento cultural de la región. Ofrecer información histórica y actualizada sobre eventos y lugares de interés.",
        project3_feat_1: "Secciones dedicadas a la historia, cultura y eventos de El Tigre.",
        project3_feat_2: "Galería de imágenes de lugares destacados de la localidad.",
        project3_feat_3: "Integración de videos y contenido multimedia para una experiencia enriquecedora.",
        project3_modal_participation_label: "Participación:",
        project3_modal_participation_desc: "Este proyecto fue desarrollado en colaboración con dos compañeras, quienes contribuyeron significativamente en la recopilación de información, desarrollo de contenido y diseño del blog.",
        project3_modal_tech_list: "HTML, CSS, JavaScript y Bootstrap",

        project4_modal_title: "PetZone - Tienda de Mascotas",
        project4_modal_desc: "Proyecto colaborativo de tienda de mascotas realizado en el curso \"Codo a Codo\". Incluye desarrollo frontend y backend utilizando Python con Flask y MySQL para gestionar el ABM de productos.",
        project4_obj_1: "Crear una plataforma de gestión de productos para una tienda de mascotas.",
        project4_obj_2: "Facilitar la administración y actualización de inventarios.",
        project4_obj_3: "Proporcionar una interfaz amigable para los usuarios.",
        project4_feat_1: "Gestión de productos (alta, baja, modificación).",
        project4_feat_2: "Integración con base de datos MySQL.",
        project4_feat_3: "Diseño responsivo con Bootstrap.",
        project4_feat_4: "Interfaz intuitiva para facilitar la navegación y administración.",
        project4_modal_participation_label: "Participación:",
        project4_modal_participation_desc: "Este proyecto fue desarrollado en colaboración con dos compañeras en el curso \"Codo a Codo\", quienes contribuyeron significativamente en la implementación de funcionalidades y el diseño del sistema.",
        project4_modal_tech_list: "HTML, CSS, JavaScript, Bootstrap, Python, Flask, MySQL."
    },
    en: {
        nav_cv: "Resume",
        nav_home: "Home",
        nav_education: "Education",
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
        projects_titles: "My Projects",
        about_exp_title: "Professional Experience",
        about_exp_role_current: "QA Analyst @ Epidata",
        about_exp_dates_current: "Jul 2025 - Present",
        about_exp_desc_current: "Detected 25+ critical bugs in banking applications before production. Optimized test cases reducing testing time by 30%.",
        about_exp_role_freelance: "QA Tester Freelance",
        about_exp_dates_freelance: "Sep 2024 - Jul 2025",
        about_exp_desc_freelance: "Direct collaboration with development at <strong>evemtos.com.ar</strong>. Technical debt prevention and critical business rules validation.",
        about_tech_title: "Technologies",
        about_tech_desc: "C# / .NET, ASP.NET WebForms, Python (Flask), SQL Server, MySQL, SoapUI, Postman, Jira, Git. Methodologies: Scrum, Agile.",
        // Education
        education_title: "Academic Background <span class=\"text-primary\">.</span>",
        education_engineering_title: "Computer Systems Engineering",
        education_engineering_uni: "Universidad Abierta Interamericana (UAI)",
        education_engineering_status: "Mar 2025 - Present (In Progress - 5th year)",
        education_engineering_progress: "8 subjects remaining to graduate",
        education_technical_title: "Higher Technician in Systems Analysis",
        education_technical_inst: "Inst. Sup. del Profesorado Juan Bautista Alberdi",
        education_technical_status: "Mar 2022 - Mar 2025",
        education_technical_completed: "Degree Obtained",
        education_technical_desc: "Complete training in systems analysis and design",
        projects_title: "Projects <span class=\"text-primary\">.</span>",
        skills_title: "Technical Skills <span class=\"text-primary\">.</span>",
        backend_db_title: "<i class=\"fas fa-server text-secondary mr-2\"></i> Backend & DB",
        testing_tools_title: "<i class=\"fas fa-vial text-primary mr-2\"></i> Testing & Tools",
        frontend_title: "<i class=\"fas fa-laptop-code text-accent mr-2\"></i> Frontend",
        contact_title: "Contact Me <span class=\"text-primary\">.</span>",
        contact_intro_text: "Do you have a proposal or want to chat about technology? Feel free to contact me. I am open to new opportunities.",
        contact_email_label: "Email",
        contact_phone_label: "Phone",
        contact_location_label: "Location",
        contact_label_name: "Name",
        contact_ph_name: "Your Name",
        contact_label_email: "Email",
        contact_ph_email: "your@email.com",
        contact_label_msg: "Message",
        contact_ph_msg: "Write your message here...",
        contact_btn_submit: "Send Message",
        contact_language_label: "Languages",
        contact_language_value: "English B1 (Intermediate)",
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

        btn_view_code: "View Code",
        projectCSharp_modal_title: "Employee Manager - N-Tier Architecture",
        projectCSharp_modal_tech_list: "C# .NET Framework, Windows Forms, SQL Server (Stored Procedures), ADO.NET.",
        projectCSharp_feat_4: "Correct memory management (using statements).",
        projectCSharp_title: "Employee Manager N-Tier",
        projectCSharp_desc: "Corporate desktop application developed with 3-tier architecture, WinForms, and SQL Server.",
        projectCSharp_modal_desc: "Employee management system designed under a strict 3-tier architecture (Presentation, Business, Data). Uses Windows Forms and ADO.NET.",
        projectCSharp_modal_obj: "Demonstrate the ability to create scalable and maintainable software by decoupling business logic.",
        projectCSharp_feat_1: "Full CRUD with validations.",
        projectCSharp_feat_2: "Use of Stored Procedures (SQL Server).",
        projectCSharp_feat_3: "Clean N-Tier Architecture.",
        projectCSharp_modal_challenges: "Correctly implementing separation of concerns and memory management.",

        project2_title: "Weather in Your Location",
        project2_desc: "Web application that provides real-time weather information for your location.",

        project3_title: "El Tigre Blog",
        project3_desc: "Collaborative project to create a blog about the El Tigre locality, highlighting its history and places of interest.",

        project4_title: "PetZone - Pet Shop",
        project4_desc: "Pet shop project with frontend and backend. Uses Python, Flask, and MySQL for product management.",
        
        // Project Modals
        project2_modal_title: "Weather in Your Location",
        project2_modal_desc: "This simple application provides you with information about the current weather in your location, showing temperature, atmospheric pressure, relative humidity, and a description of the current weather.",
        project2_modal_features_label: "Features:",
        project2_feat_1: "Displays current temperature.",
        project2_feat_2: "Shows atmospheric pressure.",
        project2_feat_3: "Displays relative humidity.",
        project2_feat_4: "Provides a description of the current weather.",
        project2_modal_requirements_label: "Requirements:",
        project2_req_1: "Internet connection to obtain weather data.",
        project2_req_2: "Browser permission to access user location.",
        project2_modal_api_label: "API Used:",
        project2_modal_api_desc: "The application uses the OpenWeatherMap API to obtain weather information.",
        project2_modal_tech_list: "HTML, CSS, JavaScript.",

        project3_modal_title: "El Tigre Locality Blog",
        project3_modal_desc: "Collaborative project that highlights the history, culture, and places of interest in this region. The goal is to provide residents and visitors with a detailed and attractive source of information about the locality.",
        project3_modal_obj: "Create an informative platform about El Tigre. Promote tourism and cultural knowledge of the region. Offer historical and updated information about events and places of interest.",
        project3_feat_1: "Sections dedicated to the history, culture, and events of El Tigre.",
        project3_feat_2: "Image gallery of prominent places in the locality.",
        project3_feat_3: "Integration of videos and multimedia content for an enriching experience.",
        project3_modal_participation_label: "Participation:",
        project3_modal_participation_desc: "This project was developed in collaboration with two colleagues, who contributed significantly to the collection of information, content development, and blog design.",
        project3_modal_tech_list: "HTML, CSS, JavaScript, and Bootstrap",

        project4_modal_title: "PetZone - Pet Shop",
        project4_modal_desc: "Collaborative pet shop project carried out in the \"Codo a Codo\" course. Includes frontend and backend development using Python with Flask and MySQL to manage product CRUD operations.",
        project4_obj_1: "Create a product management platform for a pet shop.",
        project4_obj_2: "Facilitate inventory administration and updates.",
        project4_obj_3: "Provide a user-friendly interface.",
        project4_feat_1: "Product management (create, delete, modify).",
        project4_feat_2: "Integration with MySQL database.",
        project4_feat_3: "Responsive design with Bootstrap.",
        project4_feat_4: "Intuitive interface to facilitate navigation and administration.",
        project4_modal_participation_label: "Participation:",
        project4_modal_participation_desc: "This project was developed in collaboration with two colleagues in the \"Codo a Codo\" course, who contributed significantly to the implementation of functionalities and system design.",
        project4_modal_tech_list: "HTML, CSS, JavaScript, Bootstrap, Python, Flask, MySQL."
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

// Función para inicializar Scroll to Top
function initScrollToTop() {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    // Mostrar/ocultar botón según scroll
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });
    
    // Scroll suave al hacer click
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Función para mejorar UX del navbar móvil
function initMobileNavbar() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Auto-cerrar navbar cuando se hace click en un link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Solo en móviles (cuando el toggler es visible)
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                // Cerrar el navbar usando Bootstrap
                $(navbarCollapse).collapse('hide');
            }
        });
    });
    
    // Cerrar navbar al hacer click fuera (opcional)
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navbarCollapse.contains(event.target) || navbarToggler.contains(event.target);
        const isNavOpen = navbarCollapse.classList.contains('show');
        
        if (!isClickInsideNav && isNavOpen && window.getComputedStyle(navbarToggler).display !== 'none') {
            $(navbarCollapse).collapse('hide');
        }
    });
}

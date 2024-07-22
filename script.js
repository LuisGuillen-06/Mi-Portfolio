document.addEventListener('DOMContentLoaded', function() {
    ScrollReveal().reveal('.reveal', {
        distance: '60px',
        duration: 1300,
        easing: 'ease-in-out',
        origin: 'right',
        reset: true
    });
});

window.addEventListener('load', ()=>{
    const welcomeText = document.getElementById('WelcomeText')
    const introText = document.getElementById('introText')

    welcomeText.classList.add('fadeIn');
    introText.classList.add('fadeIn');
});

document.addEventListener("DOMContentLoaded", function() {
    var modalElements = document.querySelectorAll('.modal');

    modalElements.forEach(function(modal) {
        modal.addEventListener('hidden.bs.modal', function() {
            var focusedElement = document.querySelector('.ver-detalle-btn:focus');
            if (focusedElement) {
                focusedElement.blur();
            }
        });
    });
});


document.getElementById('descargarPDF').addEventListener('click',function(event){
    event.preventDefault(); 

    var link = document.createElement('a');
    link.href = '/CV.pdf';
    link.download = 'LuisFelipeGuillenMarquez.pdf'

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});


document.addEventListener("DOMContentLoaded", function() {
    function startAnimation(project) {
        // Define la animación
        var techAnimation = anime({
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
                value: 360, // Rotación completa
                duration: 1000, // Duración de la rotación
                easing: 'easeInOutExpo'
            },
            easing: 'easeOutElastic(3, .9)',
            loop: false, // Solo una vez
            autoplay: false, // Inicia en pausa
            complete: function() {
                // Oculta el contenedor después de la animación
                setTimeout(function() {
                    var container = document.querySelector(`.tech-logos-container[data-project="${project}"]`);
                    container.classList.add('d-none'); // Oculta el contenedor
                }, 3000); // 5000 ms = 5 segundos
            }
        });

        // Mostrar logos de tecnologías al hacer clic en el botón
        document.querySelector(`.tecnologias-btn[data-project="${project}"]`).addEventListener('click', function() {
            var container = document.querySelector(`.tech-logos-container[data-project="${project}"]`);
            container.classList.remove('d-none'); // Muestra el contenedor
            techAnimation.play(); // Inicia la animación
        });
    }

    // Inicia la animación para los proyectos especificados
    startAnimation('project1');
    startAnimation('project2');
    startAnimation('project3');
    startAnimation('project4');
});

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    
    form.addEventListener('submit', function(event) {
        // Prevenir el envío del formulario si hay errores
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

        // Validar Email
        const email = document.getElementById('email');
        const emailError = document.getElementById('emailError');
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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

        // Si hay errores, prevenir el envío del formulario
        if (!valid) {
            event.preventDefault();
        }
    });
});


  

  
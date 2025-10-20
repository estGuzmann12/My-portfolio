/*!
=========================================================
* Mi Portafolio Maximalista
=========================================================
* Funcionalidades: Smooth Scroll, Filtros, Animaciones
=========================================================
*/

$(document).ready(function(){
    
    // =========================
    // SMOOTH SCROLL PARA NAVEGACIÓN
    // =========================
    $(".nav-link").on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            
            $('html, body').animate({
                scrollTop: $(hash).offset().top - 80
            }, 700, function(){
                window.location.hash = hash;
            });
            
            // Cerrar menú móvil después de hacer clic
            $('#navMenu').removeClass('active');
        }
    });

    // =========================
    // MENÚ HAMBURGUESA
    // =========================
    $('#burger').click(function() {
        $('#navMenu').toggleClass('active');
    });

    // Cerrar menú al hacer clic fuera
    $(document).click(function(event) {
        var clickover = $(event.target);
        var isNavOpen = $('#navMenu').hasClass('active');
        
        if (isNavOpen && !clickover.closest('.nav-container').length) {
            $('#navMenu').removeClass('active');
        }
    });

    // =========================
    // NAVBAR SCROLL
    // =========================
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $('#navbar').addClass('scrolled');
        } else {
            $('#navbar').removeClass('scrolled');
        }
    });

    // =========================
    // FILTROS DE PORTAFOLIO
    // =========================
    $('.filter-btn').click(function() {
        // Remover clase activa de todos los botones
        $('.filter-btn').removeClass('active');
        // Agregar clase activa al botón clickeado
        $(this).addClass('active');
        
        var filter = $(this).attr('data-filter');
        
        if (filter === 'all') {
            // Mostrar todos los items con fadeIn
            $('.portfolio-item').fadeIn(400);
        } else {
            // Ocultar todos los items primero
            $('.portfolio-item').fadeOut(300);
            // Mostrar solo los items del filtro seleccionado
            setTimeout(function() {
                $('.portfolio-item[data-category="' + filter + '"]').fadeIn(400);
            }, 300);
        }
    });

    // =========================
    // FORMULARIO DE CONTACTO
    // =========================
    $('#contactForm').submit(function(e) {
        e.preventDefault();
        
        // Obtener valores del formulario
        var name = $('#name').val();
        var email = $('#email').val();
        var message = $('#message').val();
        
        // Validación simple
        if (name && email && message) {
            alert('¡Mensaje enviado con éxito!\n\nNombre: ' + name + '\nEmail: ' + email + '\n\n(Esta es una demostración. En producción, aquí se enviaría el formulario a un servidor.)');
            
            // Limpiar formulario
            this.reset();
        } else {
            alert('Por favor, completa todos los campos del formulario.');
        }
    });

    // =========================
    // ANIMACIÓN AL SCROLL
    // =========================
    function isInViewport(element) {
        if (!element || !$(element).length) return false;
        var elementTop = $(element).offset().top;
        var elementBottom = elementTop + $(element).outerHeight();
        var viewportTop = $(window).scrollTop();
        var viewportBottom = viewportTop + $(window).height();
        return elementBottom > viewportTop && elementTop < viewportBottom;
    }

    // Ejecutar al cargar y al hacer scroll
    function checkVisibility() {
        $('.about-card, .portfolio-item').each(function() {
            if (isInViewport(this) && !$(this).hasClass('animated')) {
                $(this).addClass('fade-in animated');
            }
        });
    }

    // Ejecutar al cargar la página
    setTimeout(checkVisibility, 100);

    // Ejecutar al hacer scroll
    $(window).scroll(function() {
        checkVisibility();
    });

    // =========================
    // SMOOTH SCROLL PARA BOTONES
    // =========================
    $('.btn-primary[href^="#"]').on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            
            $('html, body').animate({
                scrollTop: $(hash).offset().top - 80
            }, 700, function(){
                window.location.hash = hash;
            });
        }
    });

    // =========================
    // PRELOADER
    // =========================
    $(window).on('load', function() {
        $('body').addClass('loaded');
    });

    // =========================
    // ANIMACIÓN DE NÚMEROS
    // =========================
    function animateNumbers() {
        $('.skill-item span:last-child').each(function() {
            var $this = $(this);
            var text = $this.text().replace('%', '');
            var countTo = parseInt(text);
            
            if (!isNaN(countTo) && !$this.hasClass('animated')) {
                $this.addClass('animated');
                $({ countNum: 0 }).animate({
                    countNum: countTo
                }, {
                    duration: 2000,
                    easing: 'swing',
                    step: function() {
                        $this.text(Math.floor(this.countNum) + '%');
                    },
                    complete: function() {
                        $this.text(countTo + '%');
                    }
                });
            }
        });
    }

    // Ejecutar animación de números cuando la sección esté visible
    var numbersAnimated = false;
    $(window).scroll(function() {
        if (!numbersAnimated && $('#about').length && isInViewport($('#about')[0])) {
            animateNumbers();
            numbersAnimated = true;
        }
    });

    // =========================
    // EFECTO PARALLAX SUAVE
    // =========================
    $(window).scroll(function() {
        var scrollTop = $(this).scrollTop();
        $('.hero-pattern').css('transform', 'translateY(' + (scrollTop * 0.5) + 'px)');
    });

    // =========================
    // NAVEGACIÓN ACTIVA SEGÚN SCROLL
    // =========================
    $(window).scroll(function() {
        var scrollPos = $(document).scrollTop() + 100;
        
        $('.nav-link').each(function() {
            var currLink = $(this);
            var refElement = $(currLink.attr("href"));
            
            if (refElement.length) {
                if (refElement.offset().top <= scrollPos && 
                    refElement.offset().top + refElement.height() > scrollPos) {
                    $('.nav-link').removeClass("active");
                    currLink.addClass("active");
                } else {
                    currLink.removeClass("active");
                }
            }
        });
    });

    // =========================
    // CONTADOR DE CARACTERES EN TEXTAREA
    // =========================
    $('#message').on('input', function() {
        var maxLength = 500;
        var currentLength = $(this).val().length;
        
        if (currentLength > maxLength) {
            $(this).val($(this).val().substring(0, maxLength));
        }
    });

    // =========================
    // LAZY LOADING PARA IMÁGENES
    // =========================
    if ('IntersectionObserver' in window) {
        var imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    var image = entry.target;
                    if (image.dataset.src) {
                        image.src = image.dataset.src;
                    }
                    image.classList.add('loaded');
                    imageObserver.unobserve(image);
                }
            });
        });

        $('.portfolio-item img').each(function() {
            imageObserver.observe(this);
        });
    }

    // =========================
    // BOTÓN SCROLL TO TOP
    // =========================
    // Crear botón si no existe
    if ($('#scrollTop').length === 0) {
        $('body').append('<button id="scrollTop">↑</button>');
    }

    // Mostrar/ocultar botón según scroll
    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            $('#scrollTop').fadeIn();
        } else {
            $('#scrollTop').fadeOut();
        }
    });

    // Funcionalidad del botón
    $('#scrollTop').click(function() {
        $('html, body').animate({scrollTop: 0}, 700);
        return false;
    });

    // =========================
    // PREVENIR SCROLL HORIZONTAL
    // =========================
    $('body').css('overflow-x', 'hidden');

    // =========================
    // CONSOLE LOG PERSONALIZADO
    // =========================
    console.log('%c¡Portafolio Cargado! 🚀', 'color: #000; font-size: 20px; font-weight: bold; background: #fff; padding: 10px; border: 3px solid #000;');
    console.log('%cSi estás viendo esto, eres un desarrollador curioso 😎', 'color: #666; font-size: 14px;');
    
}); // Fin de document.ready

// =========================
// FUNCIONES FUERA DE DOCUMENT.READY
// =========================

// Función para detectar dispositivo móvil
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Aplicar estilos específicos para móvil
if (isMobile()) {
    $(document).ready(function() {
        $('body').addClass('mobile-device');
    });
}

// Prevenir zoom en inputs en iOS
$(document).on('focus', 'input, textarea', function() {
    if (isMobile()) {
        $('meta[name=viewport]').attr('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0');
    }
});

$(document).on('blur', 'input, textarea', function() {
    if (isMobile()) {
        $('meta[name=viewport]').attr('content', 'width=device-width, initial-scale=1.0');
    }
});

// =========================
// FIN DEL SCRIPT
// =========================

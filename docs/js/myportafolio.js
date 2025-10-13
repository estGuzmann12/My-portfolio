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
            // Mostrar todos los items
            $('.portfolio-item').fadeOut(300, function() {
                $(this).fadeIn(400);
            });
        } else {
            // Ocultar todos los items
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
        var elementTop = $(element).offset().top;
        var elementBottom = elementTop + $(element).outerHeight();
        var viewportTop = $(window).scrollTop();
        var viewportBottom = viewportTop + $(window).height();
        return elementBottom > viewportTop && elementTop < viewportBottom;
    }

    // Ejecutar al cargar y al hacer scroll
    function checkVisibility() {
        $('.about-card, .portfolio-item').each(function() {
            if (isInViewport(this) && !$(this).hasClass('fade-in')) {
                $(this).addClass('fade-in');
            }
        });
    }

    // Ejecutar al cargar la página
    checkVisibility();

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
    // PRELOADER (OPCIONAL)
    // =========================
    $(window).on('load', function() {
        $('body').addClass('loaded');
    });

    // =========================
    // ANIMACIÓN DE NÚMEROS (OPCIONAL)
    // =========================
    function animateNumbers() {
        $('.skill-item span:last-child').each(function() {
            var $this = $(this);
            var countTo = parseInt($this.text());
            
            $({ countNum: 0 }).animate({
                countNum: countTo
            }, {
                duration: 2000,
                easing: 'linear',
                step: function() {
                    $this.text(Math.floor(this.countNum) + '%');
                },
                complete: function() {
                    $this.text(this.countNum + '%');
                }
            });
        });
    }

    // Ejecutar animación de números cuando la sección esté visible
    var numbersAnimated = false;
    $(window).scroll(function() {
        if (!numbersAnimated && isInViewport($('#about'))) {
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
    // TOOLTIP PARA LINKS SOCIALES (OPCIONAL)
    // =========================
    $('.social-link').hover(
        function() {
            $(this).css('box-shadow', '0 10px 20px rgba(0,0,0,0.2)');
        },
        function() {
            $(this).css('box-shadow', 'none');
        }
    );

    // =========================
    // EFECTO HOVER EN CARDS
    // =========================
    $('.about-card').hover(
        function() {
            $(this).css('transform', 'translateY(-5px)');
        },
        function() {
            $(this).css('transform', 'translateY(0)');
        }
    );

    // =========================
    // CONTADOR DE CARACTERES EN TEXTAREA (OPCIONAL)
    // =========================
    $('#message').on('input', function() {
        var maxLength = 500;
        var currentLength = $(this).val().length;
        
        if (currentLength > maxLength) {
            $(this).val($(this).val().substring(0, maxLength));
        }
    });

    // =========================
    // ANIMACIÓN DE ENTRADA PARA PORTFOLIO ITEMS
    // =========================
    $('.portfolio-item').each(function(index) {
        $(this).css({
            'animation-delay': (index * 0.1) + 's',
            'opacity': '0'
        });
        
        setTimeout(function(el) {
            $(el).css('opacity', '1');
        }, index * 100, this);
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
    // PREVENIR SCROLL HORIZONTAL
    // =========================
    $('body').css('overflow-x', 'hidden');

    // =========================
    // LAZY LOADING PARA IMÁGENES (OPCIONAL)
    // =========================
    if ('IntersectionObserver' in window) {
        var imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    var image = entry.target;
                    image.src = image.dataset.src || image.src;
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
    // EFECTO DE ESCRITURA PARA EL TÍTULO (OPCIONAL)
    // =========================
    function typeWriter(element, text, speed) {
        var i = 0;
        var txt = text;
        element.html('');
        
        function type() {
            if (i < txt.length) {
                element.html(element.html() + txt.charAt(i));
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Descomentar para activar efecto de escritura
    // var heroTitle = $('.hero h1');
    // var titleText = heroTitle.text();
    // typeWriter(heroTitle, titleText, 100);

    // =========================
    // BOTÓN SCROLL TO TOP (OPCIONAL)
    // =========================
    // Crear botón si no existe
    if ($('#scrollTop').length === 0) {
        $('body').append('<button id="scrollTop" style="display:none; position:fixed; bottom:30px; right:30px; background:#000; color:#fff; border:3px solid #000; width:60px; height:60px; cursor:pointer; z-index:999; font-size:24px; transition:all 0.3s;">↑</button>');
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

    // Hover effect para el botón
    $('#scrollTop').hover(
        function() {
            $(this).css({
                'background': '#fff',
                'color': '#000',
                'transform': 'translateY(-5px)'
            });
        },
        function() {
            $(this).css({
                'background': '#000',
                'color': '#fff',
                'transform': 'translateY(0)'
            });
        }
    );

    // =========================
    // PROTECCIÓN DE CLIC DERECHO EN IMÁGENES (OPCIONAL)
    // =========================
    // Descomentar para activar
    // $('.portfolio-item img').on('contextmenu', function(e) {
    //     e.preventDefault();
    //     return false;
    // });

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
    $('body').addClass('mobile-device');
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
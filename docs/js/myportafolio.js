/*!
=========================================================
* My Maximalist Portfolio
=========================================================
* Features: Smooth Scroll, Filters, Animations
=========================================================
*/

$(document).ready(function(){
    
    // =========================
    // SMOOTH SCROLL FOR NAVIGATION
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
            
            // Close mobile menu after clicking
            $('#navMenu').removeClass('active');
        }
    });

    // =========================
    // HAMBURGER MENU
    // =========================
    $('#burger').click(function() {
        $('#navMenu').toggleClass('active');
    });

    // Close menu when clicking outside
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
    // PORTFOLIO FILTERS
    // =========================
    $('.filter-btn').click(function() {
        // Remove active class from all buttons
        $('.filter-btn').removeClass('active');
        // Add active class to clicked button
        $(this).addClass('active');
        
        var filter = $(this).attr('data-filter');
        
        if (filter === 'all') {
            // Show all items with fadeIn
            $('.portfolio-item').fadeIn(400);
        } else {
            // Hide all items first
            $('.portfolio-item').fadeOut(300);
            // Show only items from selected filter
            setTimeout(function() {
                $('.portfolio-item[data-category="' + filter + '"]').fadeIn(400);
            }, 300);
        }
    });

    // =========================
    // CONTACT FORM
    // =========================
    $('#contactForm').submit(function(e) {
        e.preventDefault();
        
        // Get form values
        var name = $('#name').val();
        var email = $('#email').val();
        var message = $('#message').val();
        
        // Simple validation
        if (name && email && message) {
            alert('Message sent successfully!\n\nName: ' + name + '\nEmail: ' + email + '\n\n(This is a demo. In production, the form would be sent to a server here.)');
            
            // Clear form
            this.reset();
        } else {
            alert('Please fill out all form fields.');
        }
    });

    // =========================
    // SCROLL ANIMATION
    // =========================
    function isInViewport(element) {
        if (!element || !$(element).length) return false;
        var elementTop = $(element).offset().top;
        var elementBottom = elementTop + $(element).outerHeight();
        var viewportTop = $(window).scrollTop();
        var viewportBottom = viewportTop + $(window).height();
        return elementBottom > viewportTop && elementTop < viewportBottom;
    }

    // Execute on load and scroll
    function checkVisibility() {
        $('.about-card, .portfolio-item').each(function() {
            if (isInViewport(this) && !$(this).hasClass('animated')) {
                $(this).addClass('fade-in animated');
            }
        });
    }

    // Execute on page load
    setTimeout(checkVisibility, 100);

    // Execute on scroll
    $(window).scroll(function() {
        checkVisibility();
    });

    // =========================
    // SMOOTH SCROLL FOR BUTTONS
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
    // NUMBER ANIMATION
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

    // Execute number animation when section is visible
    var numbersAnimated = false;
    $(window).scroll(function() {
        if (!numbersAnimated && $('#about').length && isInViewport($('#about')[0])) {
            animateNumbers();
            numbersAnimated = true;
        }
    });

    // =========================
    // SMOOTH PARALLAX EFFECT
    // =========================
    $(window).scroll(function() {
        var scrollTop = $(this).scrollTop();
        $('.hero-pattern').css('transform', 'translateY(' + (scrollTop * 0.5) + 'px)');
    });

    // =========================
    // ACTIVE NAVIGATION BASED ON SCROLL
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
    // CHARACTER COUNTER IN TEXTAREA
    // =========================
    $('#message').on('input', function() {
        var maxLength = 500;
        var currentLength = $(this).val().length;
        
        if (currentLength > maxLength) {
            $(this).val($(this).val().substring(0, maxLength));
        }
    });

    // =========================
    // LAZY LOADING FOR IMAGES
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
    // SCROLL TO TOP BUTTON
    // =========================
    // Create button if it doesn't exist
    if ($('#scrollTop').length === 0) {
        $('body').append('<button id="scrollTop">↑</button>');
    }

    // Show/hide button based on scroll
    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            $('#scrollTop').fadeIn();
        } else {
            $('#scrollTop').fadeOut();
        }
    });

    // Button functionality
    $('#scrollTop').click(function() {
        $('html, body').animate({scrollTop: 0}, 700);
        return false;
    });

    // =========================
    // PREVENT HORIZONTAL SCROLL
    // =========================
    $('body').css('overflow-x', 'hidden');

    // =========================
    // CUSTOM CONSOLE LOG
    // =========================
    console.log('%cPortfolio Loaded! 🚀', 'color: #000; font-size: 20px; font-weight: bold; background: #fff; padding: 10px; border: 3px solid #000;');
    console.log('%cIf you\'re seeing this, you\'re a curious developer 😎', 'color: #666; font-size: 14px;');
    
}); // End of document.ready

// =========================
// FUNCTIONS OUTSIDE DOCUMENT.READY
// =========================

// Function to detect mobile device
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Apply mobile-specific styles
if (isMobile()) {
    $(document).ready(function() {
        $('body').addClass('mobile-device');
    });
}

// Prevent zoom on inputs in iOS
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
// END OF SCRIPT
// =========================

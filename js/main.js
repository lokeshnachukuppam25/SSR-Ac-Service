(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').addClass('shadow-sm').css('top', '0px');
        } else {
            $('.sticky-top').removeClass('shadow-sm').css('top', '-100px');
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        items: 1,
        dots: false,
        loop: true,
        nav: true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });

    // Service selection function
    window.selectService = function(service) {
        // Update the dropdown button text
        var dropdownButton = document.getElementById('serviceDropdown');
        if (dropdownButton) {
            dropdownButton.innerHTML = service + ' <span class="caret"></span>';
        }
        
        // You can add additional logic here, such as:
        // - Storing the selected service in a form field
        // - Redirecting to a specific service page
        // - Showing additional information about the selected service
        
        console.log('Selected service:', service);
        
        // For now, just log the selection. You can expand this function later
        // to integrate with your booking system or form submission
    };

    // Form submission handler
    $(document).ready(function() {
        $('form[action*="formsubmit"]').on('submit', function(e) {
            e.preventDefault(); // Prevent default form submission
            
            var form = $(this);
            var submitBtn = form.find('button[type="submit"]');
            var originalText = submitBtn.text();
            
            // Show loading state
            submitBtn.prop('disabled', true).text('Submitting...');
            
            // Prepare form data
            var formData = new FormData(this);
            
            // Submit form via AJAX
            fetch(form.attr('action'), {
                method: 'POST',
                body: formData
            })
            .then(response => {
                console.log('Response status:', response.status);
                console.log('Response ok:', response.ok);
                
                if (response.ok || response.status === 200) {
                    // Success - show submitted message
                    form.html('<div class="text-center py-4"><div class="alert alert-success"><h4 class="alert-heading">Submitted!</h4><p>Thank you for your inquiry. We will contact you soon.</p></div></div>');
                } else {
                    // Error handling - show more details
                    response.text().then(text => {
                        console.log('Error response:', text);
                        submitBtn.prop('disabled', false).text(originalText);
                        alert('Form submission failed. Please try again or contact us directly at +91 86374 01169');
                    });
                }
            })
            .catch(error => {
                // Network error
                console.log('Network error:', error);
                submitBtn.prop('disabled', false).text(originalText);
                alert('Network error. Please check your connection and try again.');
            });
        });
    });
    
})(jQuery);


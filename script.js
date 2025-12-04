document.addEventListener('DOMContentLoaded', function() {
    // ============================================
    // CV Modal/Popup
    // ============================================
    
    const cvBtn = document.getElementById('viewCvBtn');
    const cvModal = document.getElementById('cvModal');
    const cvClose = document.querySelector('.cv-close');
    const cvFrame = document.getElementById('cvFrame');

    if (cvBtn && cvModal) {
        // Open CV modal
        cvBtn.addEventListener('click', function() {
            cvFrame.src = '/Daniel_Santos_Final_Project/assets/cv/Daniel Santos CV.png';
            cvModal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });

        // Close CV modal
        if (cvClose) {
            cvClose.addEventListener('click', function() {
                cvModal.style.display = 'none';
                cvFrame.src = ''; // Clear iframe
                document.body.style.overflow = 'auto'; // Restore scrolling
            });
        }

        // Close modal when clicking outside
        cvModal.addEventListener('click', function(e) {
            if (e.target === cvModal) {
                cvModal.style.display = 'none';
                cvFrame.src = '';
                document.body.style.overflow = 'auto';
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && cvModal.style.display === 'block') {
                cvModal.style.display = 'none';
                cvFrame.src = '';
                document.body.style.overflow = 'auto';
            }
        });
    }

    // ============================================
    // Theme Toggle
    // ============================================
    
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.remove('light-mode');
        if (themeToggle) themeToggle.checked = true;
    } else {
        // Default to light mode (unchecked = light)
        body.classList.add('light-mode');
        if (themeToggle) themeToggle.checked = false;
    }

    // Handle theme toggle
    if (themeToggle) {
        themeToggle.addEventListener('change', function() {
            if (this.checked) {
                // Checked shows moon = dark mode
                body.classList.remove('light-mode');
                localStorage.setItem('theme', 'dark');
            } else {
                // Unchecked shows sun = light mode
                body.classList.add('light-mode');
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // ============================================
    // Navbar Collapse on Link Click
    // ============================================
    
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navLinks = document.querySelectorAll('.nav-link');

    console.log('Navbar setup - toggler:', navbarToggler, 'collapse:', navbarCollapse, 'links:', navLinks.length);

    // Close navbar when a nav link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            console.log('Nav link clicked:', this.textContent);
            // Only close if navbar is open
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                console.log('Navbar is open, closing it');
                // Remove the show class to hide the navbar
                navbarCollapse.classList.remove('show');
                // Add collapsed class to toggler button
                if (navbarToggler) {
                    navbarToggler.classList.add('collapsed');
                }
                // Set aria-expanded to false
                if (navbarToggler) {
                    navbarToggler.setAttribute('aria-expanded', 'false');
                }
                console.log('Navbar closed');
            } else {
                console.log('Navbar not open or elements missing');
            }
        });
    });

    // ============================================
    // Contact Form Handling
    // ============================================
    
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    // Handle form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Extract form field values
            const name = document.getElementById('contactName').value;
            const email = document.getElementById('contactEmail').value;
            const subject = document.getElementById('contactSubject').value;
            const message = document.getElementById('contactMessage').value;

            // Validate that all fields are filled
            if (!name || !email || !subject || !message) {
                showMessage('Please fill in all fields.', 'danger');
                return;
            }

            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showMessage('Please enter a valid email address.', 'danger');
                return;
            }

            // Show success message
            showMessage('Thank you for your message! I will get back to you soon.', 'success');
            
            // Reset form for next entry
            contactForm.reset();

            // Auto-hide message after 5 seconds
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        });
    }

    /**
     * Display a temporary message to the user
     * @param {string} text - Message text to display
     * @param {string} type - Bootstrap alert type: 'success', 'danger', 'warning', 'info'
     */
    function showMessage(text, type) {
        if (formMessage) {
            formMessage.textContent = text;
            formMessage.className = 'alert alert-' + type;
            formMessage.style.display = 'block';
            formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }

    // ============================================
    // Fix Testimonials Section Padding
    // ============================================
    
    const testimonialsSection = document.querySelector('.testimonials-section');
    if (testimonialsSection) {
        // Get navbar height
        const navbar = document.querySelector('.custom-navbar');
        if (navbar) {
            const navbarHeight = navbar.offsetHeight;
            const topPosition = navbar.offsetTop;
            const totalNavbarSpace = navbarHeight + topPosition + 40; // Add extra 40px buffer
            
            // Force the padding-top
            testimonialsSection.style.paddingTop = totalNavbarSpace + 'px';
        }
    }
});

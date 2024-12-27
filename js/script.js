// Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Scroll-based header styling
  window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.backgroundColor = 'rgba(12, 12, 12, 0.95)';
    } else {
        header.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
    }
});

//HAMBURGER MENU
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const body = document.body;

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    body.classList.toggle('menu-open');
});

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        body.classList.remove('menu-open');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('active') && 
        !navLinks.contains(e.target) && 
        !hamburger.contains(e.target)) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        body.classList.remove('menu-open');
    }
});

// Handle escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        body.classList.remove('menu-open');
    }
});

   // Expandable Cards
   document.querySelectorAll('.read-more').forEach(button => {
    button.addEventListener('click', () => {
        const card = button.closest('.post-card');
        const isExpanded = card.classList.contains('expanded');
        
        // Close all other cards first
        document.querySelectorAll('.post-card.expanded').forEach(expandedCard => {
            if (expandedCard !== card) {
                expandedCard.classList.remove('expanded');
                const otherButton = expandedCard.querySelector('.read-more');
                otherButton.innerHTML = 'Read More <span class="read-more-icon">▼</span>';
            }
        });
        
        

        // Toggle current card
        card.classList.toggle('expanded');
        button.innerHTML = isExpanded ? 
            'Read More <span class="read-more-icon">▼</span>' : 
            'Read Less <span class="read-more-icon">▼</span>';

        if (!isExpanded) {
            card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    });
});

//CONTACT PAGE SCRIPT!!!!!!!!!!!!!!!!
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Reset error messages
    document.querySelectorAll('.error-message').forEach(error => {
        error.style.display = 'none';
    });

    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    // Validation flags
    let isValid = true;

    // Name validation
    if (name === '') {
        document.getElementById('nameError').style.display = 'block';
        isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        document.getElementById('emailError').style.display = 'block';
        isValid = false;
    }

    // Subject validation
    if (subject === '') {
        document.getElementById('subjectError').style.display = 'block';
        isValid = false;
    }

    // Message validation
    if (message === '') {
        document.getElementById('messageError').style.display = 'block';
        isValid = false;
    }

    // If form is valid, show success message
    if (isValid) {
        document.getElementById('successMessage').style.display = 'block';
        document.getElementById('contactForm').reset();

        // Hide success message after 5 seconds
        setTimeout(() => {
            document.getElementById('successMessage').style.display = 'none';
        }, 5000);
    }
});

// Real-time validation
const inputs = document.querySelectorAll('.form-group input, .form-group textarea');
inputs.forEach(input => {
    input.addEventListener('input', function() {
        const errorElement = document.getElementById(`${this.id}Error`);
        if (this.value.trim() !== '') {
            errorElement.style.display = 'none';
        }
        
        // Special validation for email
        if (this.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(this.value.trim())) {
                errorElement.style.display = 'block';
            } else {
                errorElement.style.display = 'none';
            }
        }
    });
});
// ===================================
// Smooth Scrolling for Navigation Links
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===================================
// Intersection Observer for Fade-in Animations
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// ===================================
// Skill Bar Animation on Scroll
// ===================================
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.skill-progress');
            progressBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width;
                }, 200);
            });
        }
    });
}, observerOptions);

// Observe skill categories
document.querySelectorAll('.skill-category').forEach(el => {
    skillObserver.observe(el);
});

// ===================================
// Contact Form Submission Handler
// ===================================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Get form data
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);
        
        // Log the data (in production, you would send this to a server)
        console.log('Form submitted with data:', data);
        
        // Show success message
        alert('Thank you for your message! I will get back to you soon.');
        
        // Reset the form
        event.target.reset();
        
        // Here you can add code to send the data to your backend/email service
        // Example:
        // fetch('your-backend-url', {
        //     method: 'POST',
        //     body: JSON.stringify(data),
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // })
        // .then(response => response.json())
        // .then(result => {
        //     alert('Message sent successfully!');
        //     event.target.reset();
        // })
        // .catch(error => {
        //     alert('Error sending message. Please try again.');
        //     console.error('Error:', error);
        // });
    });
}

// ===================================
// Active Navigation Highlighting on Scroll
// ===================================
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = 'var(--accent)';
        }
    });
});

// ===================================
// Project Card Click Interaction
// ===================================
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', function() {
        const projectTitle = this.querySelector('h3').textContent;
        console.log('Project clicked:', projectTitle);
        
        // You can add more functionality here, such as:
        // - Opening a modal with more project details
        // - Navigating to a project detail page
        // - Showing an expanded view
        
        // Example: Show alert with project title
        // alert(`View more about: ${projectTitle}`);
        
        // Example: Open a modal (you would need to create a modal element)
        // openProjectModal(projectTitle);
    });
});

// ===================================
// Parallax Effect on Hero Section
// ===================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-visual');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// ===================================
// Dynamic Stats Counter Animation
// ===================================
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16); // 60fps
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + (target % 1 === 0 ? '+' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + '+';
        }
    }, 16);
}

// Observe stats card and animate when visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const targetText = stat.textContent;
                const target = parseFloat(targetText);
                if (!isNaN(target)) {
                    stat.textContent = '0';
                    setTimeout(() => {
                        animateCounter(stat, target);
                    }, 300);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsCard = document.querySelector('.stats-card');
if (statsCard) {
    statsObserver.observe(statsCard);
}

// ===================================
// Navbar Background on Scroll
// ===================================
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 100) {
        nav.style.background = 'rgba(10, 14, 39, 0.95)';
        nav.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
    } else {
        nav.style.background = 'rgba(10, 14, 39, 0.9)';
        nav.style.boxShadow = 'none';
    }
});

// ===================================
// Typing Effect for Hero Title (Optional)
// ===================================
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Uncomment below to enable typing effect on page load
// window.addEventListener('load', () => {
//     const heroTitle = document.querySelector('.hero-text h1');
//     if (heroTitle) {
//         const originalText = heroTitle.textContent;
//         typeWriter(heroTitle, originalText, 50);
//     }
// });

// ===================================
// Mobile Menu Toggle (if you want to add a hamburger menu)
// ===================================
function createMobileMenu() {
    const nav = document.querySelector('nav .container');
    const navUl = document.querySelector('nav ul');
    
    // Create hamburger button
    const hamburger = document.createElement('div');
    hamburger.className = 'hamburger';
    hamburger.innerHTML = '☰';
    hamburger.style.display = 'none';
    hamburger.style.fontSize = '2rem';
    hamburger.style.cursor = 'pointer';
    hamburger.style.color = 'var(--accent)';
    
    // Add click event
    hamburger.addEventListener('click', () => {
        navUl.classList.toggle('active');
    });
    
    // Show hamburger on mobile
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    function handleMobileMenu(e) {
        if (e.matches) {
            hamburger.style.display = 'block';
            navUl.style.display = 'none';
        } else {
            hamburger.style.display = 'none';
            navUl.style.display = 'flex';
        }
    }
    
    mediaQuery.addListener(handleMobileMenu);
    handleMobileMenu(mediaQuery);
    
    // Insert hamburger before ul
    nav.insertBefore(hamburger, navUl);
}

// Uncomment to enable mobile menu
// createMobileMenu();

// ===================================
// Console Welcome Message
// ===================================
console.log('%c👋 Welcome to my Data Analytics Portfolio!', 'color: #00d4ff; font-size: 20px; font-weight: bold;');
console.log('%cInterested in the code? Check out the repository!', 'color: #a8b2c1; font-size: 14px;');

// ===================================
// Initialize All Functions on Page Load
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio website loaded successfully!');
    
    // Any initialization code can go here
    // For example, you might want to:
    // - Load data from an API
    // - Set up analytics tracking
    // - Initialize third-party libraries
});

// ===================================
// Export functions if using modules (optional)
// ===================================
// export { typeWriter, animateCounter, createMobileMenu };
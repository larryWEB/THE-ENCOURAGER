 document.addEventListener('DOMContentLoaded', function() {
            // Smooth scrolling for anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    
                    document.querySelector(this.getAttribute('href')).scrollIntoView({
                        behavior: 'smooth'
                    });
                });
            });
            
            // Mobile menu toggle functionality
            const mobileMenuButton = document.querySelector('.mobile-menu');
            const navMenu = document.querySelector('nav ul');
            
            mobileMenuButton.addEventListener('click', function() {
                navMenu.classList.toggle('active');
                this.innerHTML = navMenu.classList.contains('active') ? '✕' : '☰';
            });
        });
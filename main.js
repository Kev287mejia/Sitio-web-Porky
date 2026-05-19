document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close mobile menu when clicking any nav link
        const menuLinks = navLinks.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // Accordion Logic
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const isActive = item.classList.contains('active');
            
            // Close all items
            document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('active'));
            
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Reveal Animations on Scroll
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    
    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.85;
        
        revealElements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;
            
            if (elTop < triggerBottom) {
                el.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check

    // Interactive Pricing Calculator Tabs
    const calcTabs = document.querySelectorAll('.calc-tab');
    const calcPanels = document.querySelectorAll('.calc-panel');

    if (calcTabs.length > 0 && calcPanels.length > 0) {
        calcTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const target = tab.getAttribute('data-target');
                
                // Toggle active class on tabs
                calcTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                // Toggle active class on panels with a smooth transition
                calcPanels.forEach(panel => {
                    if (panel.id === target) {
                        panel.classList.add('active');
                    } else {
                        panel.classList.remove('active');
                    }
                });
            });
        });
    }

    // Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form Submission (Web3Forms AJAX integration / Hybrid)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;
            
            // Check if they have configured their access key
            const accessKeyInput = contactForm.querySelector('input[name="access_key"]');
            const accessKey = accessKeyInput ? accessKeyInput.value : '';
            
            btn.innerText = 'Enviando...';
            btn.disabled = true;
            
            // If the user has not configured the key, run the simulated version
            if (!accessKey || accessKey === 'YOUR_ACCESS_KEY_HERE') {
                setTimeout(() => {
                    alert('¡Gracias! Tu mensaje ha sido enviado (Simulación). Para recibir correos reales de tus clientes, por favor registra tu correo gratis en https://web3forms.com y actualiza el campo de "access_key" en tu archivo HTML.');
                    contactForm.reset();
                    btn.innerText = originalText;
                    btn.disabled = false;
                }, 1500);
                return;
            }
            
            // Real AJAX submission
            try {
                const formData = new FormData(contactForm);
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json'
                    },
                    body: formData
                });
                
                const result = await response.json();
                if (result.success) {
                    alert('¡Gracias! Tu mensaje ha sido enviado con éxito. El Chele Garth se pondrá en contacto contigo muy pronto.');
                    contactForm.reset();
                } else {
                    alert('Hubo un error al procesar el mensaje: ' + (result.message || 'Error desconocido'));
                }
            } catch (error) {
                alert('Ocurrió un error al enviar el mensaje. Revisa tu conexión de red o vuelve a intentarlo más tarde.');
                console.error('Web3Forms Error:', error);
            } finally {
                btn.innerText = originalText;
                btn.disabled = false;
            }
        });
    }
});

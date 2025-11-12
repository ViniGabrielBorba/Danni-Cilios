// Menu Hambúrguer
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');

menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Fechar menu ao clicar em um link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// Header fixo com efeito de scroll
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 2px 20px rgba(255, 20, 147, 0.3)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(255, 20, 147, 0.2)';
    }
    
    lastScroll = currentScroll;
});

// Animação de scroll para elementos
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

// Observar elementos para animação
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll('.produto-card, .sobre-text, .sobre-image');
    elementsToAnimate.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// Efeito de hover nos cards de produto
const produtoCards = document.querySelectorAll('.produto-card');
produtoCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Botões de comprar - efeito de clique
const btnComprar = document.querySelectorAll('.btn-comprar');
btnComprar.forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Efeito de ripple
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.6)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.left = e.offsetX + 'px';
        ripple.style.top = e.offsetY + 'px';
        ripple.style.width = ripple.style.height = '20px';
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
        
        // Aqui você pode adicionar a lógica de compra
        alert('Produto adicionado ao carrinho! 🛒');
    });
});

// Adicionar animação de ripple ao CSS dinamicamente
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Smooth scroll para links de navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Efeito parallax suave no hero (mais sutil)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < window.innerHeight) {
        const opacity = Math.max(0, 1 - scrolled / 600);
        hero.style.opacity = opacity;
    }
});

// Adicionar efeito de brilho nos botões
const buttons = document.querySelectorAll('.btn-primary, .btn-comprar');
buttons.forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.filter = 'brightness(1.2)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.filter = 'brightness(1)';
    });
});

// Animação de contador (opcional - para estatísticas futuras)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Lazy loading para imagens (melhora performance)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Adicionar efeito de typing no título do hero (opcional)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Console message
console.log('%c$Wowlashes', 'font-size: 20px; font-weight: bold; color: #ff1493;');
console.log('%cRealçando sua beleza com estilo! ✨', 'font-size: 14px; color: #9370db;');

// ========== FUNCIONALIDADES ESPECÍFICAS POR PÁGINA ==========

// Filtros de Produtos - Página Produtos
document.addEventListener('DOMContentLoaded', () => {
    const filtroBtns = document.querySelectorAll('.filtro-btn');
    const produtoCards = document.querySelectorAll('.produto-card[data-categoria]');
    
    if (filtroBtns.length > 0) {
        filtroBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active de todos os botões
                filtroBtns.forEach(b => b.classList.remove('active'));
                // Adiciona active no botão clicado
                btn.classList.add('active');
                
                const categoria = btn.getAttribute('data-categoria');
                
                produtoCards.forEach(card => {
                    if (categoria === 'todos' || card.getAttribute('data-categoria') === categoria) {
                        card.style.display = 'block';
                        card.style.animation = 'fadeInUp 0.5s ease-out';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
});

// FAQ Accordion - Página Contato
document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Fecha todos os outros itens
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle do item atual
                item.classList.toggle('active', !isActive);
            });
        }
    });
});

// Formulário de Contato - Página Contato
document.addEventListener('DOMContentLoaded', () => {
    const contatoForm = document.getElementById('contatoForm');
    
    if (contatoForm) {
        contatoForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Coleta os dados do formulário
            const formData = new FormData(contatoForm);
            const dados = {
                nome: formData.get('nome'),
                email: formData.get('email'),
                telefone: formData.get('telefone'),
                assunto: formData.get('assunto'),
                mensagem: formData.get('mensagem')
            };
            
            // Validação básica
            if (!dados.nome || !dados.email || !dados.assunto || !dados.mensagem) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }
            
            // Simulação de envio (aqui você integraria com um backend)
            const btnSubmit = contatoForm.querySelector('.btn-submit');
            const originalText = btnSubmit.textContent;
            
            btnSubmit.textContent = 'Enviando...';
            btnSubmit.disabled = true;
            
            // Simula delay de envio
            setTimeout(() => {
                alert('Mensagem enviada com sucesso! Entraremos em contato em breve. ✨');
                contatoForm.reset();
                btnSubmit.textContent = originalText;
                btnSubmit.disabled = false;
            }, 1500);
        });
    }
});

// Animações adicionais para elementos específicos
document.addEventListener('DOMContentLoaded', () => {
    // Animar cards de destaque
    const destaqueCards = document.querySelectorAll('.destaque-card, .valor-card, .diferencial-item');
    destaqueCards.forEach((card, index) => {
        card.classList.add('fade-in');
        card.style.animationDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Animar galeria
    const galeriaItems = document.querySelectorAll('.galeria-item');
    galeriaItems.forEach((item, index) => {
        item.classList.add('fade-in');
        item.style.animationDelay = `${index * 0.15}s`;
        observer.observe(item);
    });
    
    // Animar timeline
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.classList.add('fade-in');
        item.style.animationDelay = `${index * 0.2}s`;
        observer.observe(item);
    });
    
    // Animar info cards
    const infoCards = document.querySelectorAll('.info-card');
    infoCards.forEach((card, index) => {
        card.classList.add('fade-in');
        card.style.animationDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
});

// Efeito de hover melhorado nos cards de produto
document.addEventListener('DOMContentLoaded', () => {
    const produtoCards = document.querySelectorAll('.produto-card');
    
    produtoCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.transition = 'all 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Detectar página atual e destacar no menu
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        }
    });
});

// Adicionar efeito de scroll suave para elementos internos
document.addEventListener('DOMContentLoaded', () => {
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerHeight = header ? header.offsetHeight : 80;
                    const targetPosition = target.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});


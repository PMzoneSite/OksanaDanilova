class PsychologistSite {
    constructor() {
        this.init();
    }

    init() {
        this.cacheElements();
        this.bindEvents();
        this.animateOnScroll();
        this.setupMicroInteractions();
    }

    cacheElements() {
        this.aboutToggle = document.getElementById('aboutToggle');
        this.workToggle = document.getElementById('workToggle');
        this.aboutContent = document.getElementById('aboutContent');
        this.workContent = document.getElementById('workContent');
        this.appointmentBtn = document.getElementById('appointmentBtn');
        this.modal = document.getElementById('appointmentModal');
        this.closeModal = document.getElementById('closeModal');
        this.serviceCards = document.querySelectorAll('.service-card');
    }

    bindEvents() {
        // Аккордеон "Образование"
        if (this.aboutToggle && this.aboutContent) {
            this.aboutToggle.addEventListener('click', () => this.toggleSection(this.aboutToggle, this.aboutContent));
        }

        // Аккордеон "С чем я работаю"
        if (this.workToggle && this.workContent) {
            this.workToggle.addEventListener('click', () => this.toggleSection(this.workToggle, this.workContent));
        }

        // Модальное окно записи
        if (this.appointmentBtn) {
            this.appointmentBtn.addEventListener('click', () => this.openModal());
        }

        if (this.closeModal) {
            this.closeModal.addEventListener('click', () => this.closeModalWindow());
        }

        window.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModalWindow();
            }
        });

        // Карточки услуг
        this.serviceCards.forEach(card => {
            card.addEventListener('click', () => this.handleServiceCard(card));
            card.addEventListener('mousemove', (e) => this.handleCardGlow(e, card));
            card.addEventListener('mouseleave', () => this.resetCardGlow(card));
        });
    }

    toggleSection(toggle, content) {
        toggle.classList.toggle('active');
        content.classList.toggle('open');
        
        const icon = toggle.querySelector('svg');
        if (icon) {
            icon.style.transform = content.classList.contains('open') 
                ? 'rotate(180deg)' 
                : 'rotate(0deg)';
        }
    }

    openModal() {
        this.modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    closeModalWindow() {
        this.modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    handleServiceCard(card) {
        const title = card.querySelector('h3')?.textContent;
        this.showToast(`Выбрано: ${title}`);
        
        card.style.transform = 'scale(0.98)';
        setTimeout(() => {
            card.style.transform = '';
        }, 200);
    }

    handleCardGlow(event, card) {
        const rect = card.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;
        
        const glow = card.querySelector('.card-glow');
        if (glow) {
            glow.style.background = `radial-gradient(circle at ${x}% ${y}%, var(--glow-color), transparent 70%)`;
        }
    }

    resetCardGlow(card) {
        const glow = card.querySelector('.card-glow');
        if (glow) {
            glow.style.background = '';
        }
    }

    animateOnScroll() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.service-card, .resource-link, .hero-text').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    setupMicroInteractions() {
        const photoFrame = document.querySelector('.photo-frame');
        if (photoFrame) {
            document.addEventListener('mousemove', (e) => {
                const x = (window.innerWidth / 2 - e.pageX) / 50;
                const y = (window.innerHeight / 2 - e.pageY) / 50;
                photoFrame.style.transform = `translate(${x}px, ${y}px)`;
            });
        }
    }

    showToast(message) {
        const toast = document.createElement('div');
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: var(--text-dark);
            color: white;
            padding: 12px 24px;
            border-radius: 40px;
            font-size: 14px;
            z-index: 1001;
            animation: slideUp 0.3s ease;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 2000);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new PsychologistSite();
});

const style = document.createElement('style');
style.textContent = `
    @keyframes slideUp {
        from { opacity: 0; transform: translate(-50%, 20px); }
        to { opacity: 1; transform: translate(-50%, 0); }
    }
    
    @keyframes fadeOut {
        to { opacity: 0; }
    }
`;
document.head.appendChild(style);
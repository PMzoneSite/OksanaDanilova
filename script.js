// Современный интерактив для 2026 года

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
        // Основные элементы
        this.aboutToggle = document.getElementById('aboutToggle');
        this.aboutContent = document.getElementById('aboutContent');
        this.appointmentBtn = document.getElementById('appointmentBtn');
        this.modal = document.getElementById('appointmentModal');
        this.closeModal = document.getElementById('closeModal');
        this.serviceCards = document.querySelectorAll('.service-card');
        this.actionBtns = document.querySelectorAll('.action-btn');
        
        // Текущий год
        this.currentYear = new Date().getFullYear();
    }

    bindEvents() {
        // Аккордеон "Об Оксане"
        if (this.aboutToggle) {
            this.aboutToggle.addEventListener('click', () => this.toggleAbout());
        }

        // Модальное окно записи
        if (this.appointmentBtn) {
            this.appointmentBtn.addEventListener('click', () => this.openModal());
        }

        if (this.closeModal) {
            this.closeModal.addEventListener('click', () => this.closeModalWindow());
        }

        // Закрытие модалки по клику вне
        window.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModalWindow();
            }
        });

        // Быстрые действия
        this.actionBtns.forEach(btn => {
            btn.addEventListener('click', (e) => this.handleQuickAction(e));
        });

        // Карточки услуг
        this.serviceCards.forEach(card => {
            card.addEventListener('click', () => this.handleServiceCard(card));
            card.addEventListener('mousemove', (e) => this.handleCardGlow(e, card));
            card.addEventListener('mouseleave', (e) => this.resetCardGlow(card));
        });
    }

    toggleAbout() {
        this.aboutToggle.classList.toggle('active');
        this.aboutContent.classList.toggle('open');
        
        // Плавное изменение иконки
        const icon = this.aboutToggle.querySelector('svg');
        if (icon) {
            icon.style.transform = this.aboutContent.classList.contains('open') 
                ? 'rotate(180deg)' 
                : 'rotate(0deg)';
        }
    }

    openModal() {
        this.modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        // Анимация цифр (фишка 2026)
        this.animateCounter();
    }

    closeModalWindow() {
        this.modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    handleQuickAction(event) {
        const action = event.currentTarget.dataset.action;
        const actionText = event.currentTarget.querySelector('span').textContent;
        
        // Создаем всплывающее уведомление
        this.showToast(`Открываю ${actionText}...`);
        
        // Здесь можно добавить реальную логику открытия мессенджеров
        console.log(`Quick action: ${action}`);
    }

    handleServiceCard(card) {
        const title = card.querySelector('h3')?.textContent;
        this.showToast(`Выбрано: ${title}`);
        
        // Эффект нажатия
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
        // Простая анимация появления при скролле
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.service-card, .resource-link').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    setupMicroInteractions() {
        // Добавляем параллакс эффект на фото
        const photoFrame = document.querySelector('.photo-frame');
        if (photoFrame) {
            document.addEventListener('mousemove', (e) => {
                const x = (window.innerWidth / 2 - e.pageX) / 50;
                const y = (window.innerHeight / 2 - e.pageY) / 50;
                photoFrame.style.transform = `translate(${x}px, ${y}px)`;
            });
        }

        // Подсвечиваем год
        const yearBadges = document.querySelectorAll('.year-badge');
        yearBadges[1]?.classList.add('current-year');
    }

    showToast(message) {
        // Создаем временное уведомление
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

    animateCounter() {
        // Эффект счетчика для 2026 года
        const year = document.querySelector('.year-badge:last-child');
        if (year && !year.classList.contains('animated')) {
            let count = 2020;
            const interval = setInterval(() => {
                year.textContent = count;
                count++;
                if (count > 2026) {
                    clearInterval(interval);
                    year.classList.add('animated');
                }
            }, 50);
        }
    }
}

// Запуск при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    new PsychologistSite();
});

// Добавляем ключевые кадры для анимаций
const style = document.createElement('style');
style.textContent = `
    @keyframes slideUp {
        from { opacity: 0; transform: translate(-50%, 20px); }
        to { opacity: 1; transform: translate(-50%, 0); }
    }
    
    @keyframes fadeOut {
        to { opacity: 0; }
    }
    
    .current-year {
        background: linear-gradient(135deg, var(--primary), var(--primary-dark));
        color: white;
        font-weight: 600;
    }
`;
document.head.appendChild(style);
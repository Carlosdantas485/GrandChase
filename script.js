// Funções para os formulários de personagens
function saveAllCharacters() {
    const cards = document.querySelectorAll('.character-form-card');
    const characterData = {};
    
    cards.forEach(card => {
        const characterName = card.querySelector('h3').textContent;
        const inputs = card.querySelectorAll('input, select, textarea');
        
        characterData[characterName] = {
            level: card.querySelector('input[type="number"]').value,
            class: card.querySelector('select').value,
            equipment: card.querySelectorAll('input[type="text"]')[1].value,
            stats: {
                ataque: card.querySelectorAll('.stat-inputs input')[0].value,
                defesa: card.querySelectorAll('.stat-inputs input')[1].value,
                velocidade: card.querySelectorAll('.stat-inputs input')[2].value
            },
            notes: card.querySelector('textarea').value
        };
    });
    
    // Salvar no localStorage
    localStorage.setItem('grandChaseCharacters', JSON.stringify(characterData));
    
    // Mostrar mensagem de sucesso
    showNotification('Dados salvos com sucesso! 🎉', 'success');
}

function resetAllCharacters() {
    if (confirm('Tem certeza que deseja limpar todos os dados?')) {
        const inputs = document.querySelectorAll('.character-form-card input, .character-form-card select, .character-form-card textarea');
        inputs.forEach(input => {
            if (input.type === 'number' || input.type === 'text') {
                input.value = '';
            } else if (input.tagName === 'SELECT') {
                input.selectedIndex = 0;
            } else if (input.tagName === 'TEXTAREA') {
                input.value = '';
            }
        });
        
        // Limpar localStorage
        localStorage.removeItem('grandChaseCharacters');
        
        showNotification('Dados limpos com sucesso! 🔄', 'info');
    }
}

function exportData() {
    const savedData = localStorage.getItem('grandChaseCharacters');
    
    if (!savedData) {
        showNotification('Nenhum dado para exportar! 💾', 'warning');
        return;
    }
    
    const characterData = JSON.parse(savedData);
    let exportText = '=== FICHA DE PERSONAGENS - GRAND CHASE ===\n\n';
    
    for (const [character, data] of Object.entries(characterData)) {
        exportText += `📋 ${character}\n`;
        exportText += `├─ Nível: ${data.level || 'Não definido'}\n`;
        exportText += `├─ Classe: ${data.class || 'Não definida'}\n`;
        exportText += `├─ Equipamento: ${data.equipment || 'Não definido'}\n`;
        exportText += `├─ Stats - ATAQUE: ${data.stats.ataque || '0'} | DEFESA: ${data.stats.defesa || '0'} | VELOCIDADE: ${data.stats.velocidade || '0'}\n`;
        exportText += `└─ Notas: ${data.notes || 'Nenhuma'}\n\n`;
    }
    
    exportText += `=== Exportado em ${new Date().toLocaleString('pt-BR')} ===`;
    
    // Criar arquivo para download
    const blob = new Blob([exportText], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `grand-chase-personagens-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    showNotification('Dados exportados com sucesso! 📤', 'success');
}

function loadSavedData() {
    const savedData = localStorage.getItem('grandChaseCharacters');
    
    if (!savedData) return;
    
    const characterData = JSON.parse(savedData);
    const cards = document.querySelectorAll('.character-form-card');
    
    cards.forEach(card => {
        const characterName = card.querySelector('h3').textContent;
        const data = characterData[characterName];
        
        if (data) {
            card.querySelector('input[type="number"]').value = data.level || '';
            card.querySelector('select').value = data.class || '';
            card.querySelectorAll('input[type="text"]')[1].value = data.equipment || '';
            card.querySelectorAll('.stat-inputs input')[0].value = data.stats.ataque || '';
            card.querySelectorAll('.stat-inputs input')[1].value = data.stats.defesa || '';
            card.querySelectorAll('.stat-inputs input')[2].value = data.stats.velocidade || '';
            card.querySelector('textarea').value = data.notes || '';
        }
    });
}

function showNotification(message, type = 'info') {
    // Criar elemento de notificação
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 10px;
        color: white;
        font-weight: 600;
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    `;
    
    // Definir cor baseada no tipo
    const colors = {
        success: 'linear-gradient(135deg, #28a745, #20c997)',
        warning: 'linear-gradient(135deg, #ffc107, #fd7e14)',
        info: 'linear-gradient(135deg, #17a2b8, #6f42c1)',
        error: 'linear-gradient(135deg, #dc3545, #e83e8c)'
    };
    
    notification.style.background = colors[type] || colors.info;
    
    // Adicionar ao DOM
    document.body.appendChild(notification);
    
    // Remover após 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Adicionar CSS das notificações
const notificationCSS = `
@keyframes slideInRight {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes slideOutRight {
    from {
        transform: translateX(0);
        opacity: 1;
    }
    to {
        transform: translateX(100%);
        opacity: 0;
    }
}
`;

const notificationStyleSheet = document.createElement('style');
notificationStyleSheet.textContent = notificationCSS;
document.head.appendChild(notificationStyleSheet);

// Carregar dados salvos quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    // Chamar depois de um pequeno delay para garantir que os elementos existam
    setTimeout(loadSavedData, 500);
});

// Animação de entrada para os cards de personagens
document.addEventListener('DOMContentLoaded', () => {
    const characterCards = document.querySelectorAll('.character-card');
    const expandedCards = document.querySelectorAll('.character-card-expanded');
    
    // Adicionar animação de entrada sequencial para cards da hero
    characterCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 * (index + 1));
    });
    
    // Adicionar animação de entrada para cards expandidos
    expandedCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px) scale(0.95)';
        card.style.transition = 'all 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        
        // Usar Intersection Observer para animar quando entrar na tela
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0) scale(1)';
                    }, 150 * index);
                    observer.unobserve(card);
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(card);
    });
    
    // Adicionar efeito de partículas brilhantes em todos os cards
    const allCards = [...characterCards, ...expandedCards];
    allCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            createSparkles(card);
        });
    });
});

// Função para criar partículas brilhantes
function createSparkles(element) {
    const sparklesCount = 8;
    
    for (let i = 0; i < sparklesCount; i++) {
        const sparkle = document.createElement('div');
        sparkle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: linear-gradient(45deg, #ff6b35, #ffd700);
            border-radius: 50%;
            pointer-events: none;
            animation: sparkleFloat 1s ease-out forwards;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            z-index: 10;
        `;
        
        element.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, 1000);
    }
}

// Adicionar CSS para animação das partículas
const sparkleCSS = `
@keyframes sparkleFloat {
    0% {
        transform: scale(0) rotate(0deg);
        opacity: 1;
    }
    100% {
        transform: scale(1.5) rotate(180deg) translateY(-20px);
        opacity: 0;
    }
}
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = sparkleCSS;
document.head.appendChild(styleSheet);

// Menu Mobile Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// Verificar se os elementos existem antes de adicionar event listeners
if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Fechar menu ao clicar em link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Smooth Scroll para links de navegação
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

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(26, 26, 46, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(26, 26, 46, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Character Showcase Animation
const characterCards = document.querySelectorAll('.character-card');
let currentCharacter = 0;

function showCharacter(index) {
    characterCards.forEach((card, i) => {
        card.classList.toggle('active', i === index);
    });
}

// Auto-rotate characters
setInterval(() => {
    currentCharacter = (currentCharacter + 1) % characterCards.length;
    showCharacter(currentCharacter);
}, 3000);

// Click to show specific character
characterCards.forEach((card, index) => {
    card.addEventListener('click', () => {
        currentCharacter = index;
        showCharacter(index);
    });
});

// Scroll Animations
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

// Adicionar classes de animação aos elementos
document.addEventListener('DOMContentLoaded', () => {
    // Animar elementos quando entrarem na viewport
    const animateElements = document.querySelectorAll('.character-card-expanded, .feature-card, .stat-card, .mode-item');
    
    animateElements.forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.animationDelay = `${index * 0.1}s`;
        observer.observe(el);
    });

    // Animar seções
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });
});

// Character Stats Animation
const statBars = document.querySelectorAll('.stat-fill');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const fill = entry.target;
            const width = fill.style.width;
            fill.style.width = '0%';
            setTimeout(() => {
                fill.style.width = width;
            }, 100);
            statsObserver.unobserve(fill);
        }
    });
}, { threshold: 0.5 });

statBars.forEach(bar => statsObserver.observe(bar));

// Typing Effect para Hero Title
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

// Aplicar efeito de digitação quando a página carregar
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 150);
    }
});

// Parallax Effect para Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Interactive Download Buttons
const downloadButtons = document.querySelectorAll('.btn[href="#download"]');
downloadButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Criar modal de confirmação
        const modal = document.createElement('div');
        modal.className = 'download-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h3>🎮 Prepare-se para a Aventura!</h3>
                <p>O Grand Chase está pronto para ser baixado. Escolha sua plataforma:</p>
                <div class="modal-buttons">
                    <button class="btn btn-primary" onclick="simulateDownload('windows')">
                        🖥️ Windows
                    </button>
                    <button class="btn btn-secondary" onclick="simulateDownload('mobile')">
                        📱 Mobile
                    </button>
                </div>
                <button class="btn-close" onclick="closeModal()">✕</button>
            </div>
        `;
        
        // Adicionar estilos ao modal
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        document.body.appendChild(modal);
        
        // Animar entrada
        setTimeout(() => {
            modal.style.opacity = '1';
        }, 10);
        
        // Funções globais para o modal
        window.simulateDownload = (platform) => {
            console.log(`Iniciando download para ${platform}...`);
            closeModal();
            
            // Mostrar notificação
            showNotification(`Download iniciado para ${platform}!`);
        };
        
        window.closeModal = () => {
            modal.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(modal);
            }, 300);
        };
    });
});

// Sistema de Notificações
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'var(--primary-color)' : 'var(--secondary-color)'};
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: var(--shadow-heavy);
        z-index: 10001;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Remover após 3 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Interactive Character Cards
const characterCardsExpanded = document.querySelectorAll('.character-card-expanded');
characterCardsExpanded.forEach(card => {
    card.addEventListener('click', function() {
        // Remover classe active de todos
        characterCardsExpanded.forEach(c => c.classList.remove('character-active'));
        
        // Adicionar classe active ao clicado
        this.classList.add('character-active');
        
        // Animar stats
        const stats = this.querySelectorAll('.stat-fill');
        stats.forEach(stat => {
            const width = stat.style.width;
            stat.style.width = '0%';
            setTimeout(() => {
                stat.style.width = width;
            }, 100);
        });
    });
});

// Easter Egg: Konami Code
let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateEasterEgg();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateEasterEgg() {
    showNotification('🎉 Konami Code ativado! Você desbloqueou o modo secreto!', 'success');
    
    // Adicionar efeito especial ao body
    document.body.style.animation = 'rainbow 5s linear';
    
    // Criar CSS para o efeito
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    // Remover efeito após 5 segundos
    setTimeout(() => {
        document.body.style.animation = '';
    }, 5000);
}

// Performance Monitor (Development only)
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    let fps = 0;
    let lastTime = performance.now();
    
    function updateFPS() {
        const currentTime = performance.now();
        fps = Math.round(1000 / (currentTime - lastTime));
        lastTime = currentTime;
        
        // Mostrar FPS no console a cada segundo
        if (Math.random() < 0.01) { // Apenas ocasionalmente para não poluir
            console.log(`FPS: ${fps}`);
        }
        
        requestAnimationFrame(updateFPS);
    }
    
    updateFPS();
}

// Lazy Loading para imagens (se implementado no futuro)
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        }
    });
});

// Observar imagens com classe lazy
document.querySelectorAll('img.lazy').forEach(img => {
    imageObserver.observe(img);
});

// Theme Toggle (Dark/Light Mode) - Preparado para implementação futura
function toggleTheme() {
    document.body.classList.toggle('light-theme');
    localStorage.setItem('theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
}

// Carregar tema salvo
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
}

// Adicionar botão de tema toggle ao header (opcional)
function addThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '🌙';
    themeToggle.addEventListener('click', toggleTheme);
    
    const navContainer = document.querySelector('.nav-container');
    if (navContainer) {
        navContainer.appendChild(themeToggle);
    }
}

// Descomentar para ativar o toggle de tema
// addThemeToggle();

console.log('🎮 Grand Chase Site - Script carregado com sucesso!');

document.addEventListener('DOMContentLoaded', () => {

    // ═══════════════════════════════════════════════════════════════════════════
    // CARROSSEL 3D
    // ═══════════════════════════════════════════════════════════════════════════

    const carouselWrapper = document.querySelector('.carousel-wrapper');
    const cards = Array.from(document.querySelectorAll('.card'));
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    if (cards.length > 0) {
        const totalCards = cards.length;
        const angleStep = 360 / totalCards;

        let currentRotation = 0;
        let radius = 550;

        /**
         * Atualiza o raio do carrossel baseado na variável CSS --carousel-radius.
         * Permite responsividade dinâmica para telas 4K.
         */
        function updateRadius() {
            const rootStyles = getComputedStyle(document.documentElement);
            const radiusValue = rootStyles.getPropertyValue('--carousel-radius').trim();
            radius = parseInt(radiusValue) || 550;
        }

        updateRadius();
        window.addEventListener('resize', () => {
            updateRadius();
            updateCarousel();
        });


        /**
         * Calcula a posição 3D (X, Z, Rotação) de cada card.
         * Usa Math.sin/cos para distribuição circular.
         */
        function updateCarousel() {
            cards.forEach((card, index) => {
                const angle = angleStep * index + currentRotation;
                const radian = (angle * Math.PI) / 180;

                // Posição 3D
                const x = Math.sin(radian) * radius;
                const z = Math.cos(radian) * radius;
                const rotateY = -angle;

                // Normalização de ângulo e verificação de hemisfério
                let normalizedAngle = angle % 360;
                if (normalizedAngle < 0) normalizedAngle += 360;

                const distanceFromFront = Math.min(normalizedAngle, 360 - normalizedAngle);
                const isFrontHemisphere = z > 0;

                // Escala e Opacidade baseadas na profundidade (Z)
                const scale = isFrontHemisphere
                    ? 1 - (distanceFromFront / 360) * 0.4
                    : 0.6;

                const opacity = isFrontHemisphere
                    ? 1 - (distanceFromFront / 360) * 0.6
                    : 0.3;

                // Aplicação de estilos
                card.style.transform = `translateX(${x}px) translateZ(${z}px) rotateY(${rotateY}deg) scale(${scale})`;
                card.style.opacity = opacity;
                card.style.zIndex = Math.round(z);

                // Highlight card central
                const isCenter = distanceFromFront < (angleStep / 2);
                if (isCenter) {
                    card.classList.add('is-center');
                    card.style.pointerEvents = 'auto';
                } else {
                    card.classList.remove('is-center');
                }
            });
        }

        updateCarousel(); // Inicialização

        function resetAllFlips() {
            cards.forEach(card => card.classList.remove('flipped'));
        }

        // --- Event Listeners ---

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                resetAllFlips();
                currentRotation += angleStep;
                updateCarousel();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                resetAllFlips();
                currentRotation -= angleStep;
                updateCarousel();
            });
        }

        // Navegação por teclado
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                resetAllFlips();
                currentRotation += angleStep;
                updateCarousel();
            } else if (e.key === 'ArrowRight') {
                resetAllFlips();
                currentRotation -= angleStep;
                updateCarousel();
            }
        });

        // Clique no card para flip (apenas central)
        cards.forEach(card => {
            card.addEventListener('click', (e) => {
                if (e.target.closest('a') || e.target.closest('button')) return;

                if (card.classList.contains('is-center')) {
                    card.classList.toggle('flipped');
                }
            });
        });
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // FORMULÁRIO DE CONTATO
    // ═══════════════════════════════════════════════════════════════════════════
    const form = document.querySelector('.contact-form');
    const successMsg = document.getElementById('form-success');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const btn = document.querySelector('.submit-btn');
            const originalText = btn.innerHTML;

            btn.innerHTML = 'Enviando...';
            btn.style.opacity = '0.7';

            // Simulação de envio assíncrono
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.opacity = '1';
                successMsg.classList.remove('hidden');
                form.reset();

                setTimeout(() => {
                    successMsg.classList.add('hidden');
                }, 5000);
            }, 1500);
        });
    }
});

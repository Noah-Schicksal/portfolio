document.addEventListener('DOMContentLoaded', () => {

    // Pegando os elementos do carrossel
    const carouselWrapper = document.querySelector('.carousel-wrapper');
    const cards = Array.from(document.querySelectorAll('.card'));
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    // Só executa se existirem cards na página
    if (cards.length > 0) {

        // Configurações do carrossel 3D
        const totalCards = cards.length;
        const angleStep = 360 / totalCards; // Quanto cada card ocupa no círculo
        const radius = 550; // Distância dos cards do centro

        let currentRotation = 0; // Controla a rotação atual do carrossel

        // Atualiza a posição de todos os cards
        function updateCarousel() {
            cards.forEach((card, index) => {
                // Calcula o ângulo de cada card
                const angle = angleStep * index + currentRotation;
                const radian = (angle * Math.PI) / 180;

                // Calcula posição X (horizontal) e Z (profundidade)
                const x = Math.sin(radian) * radius;
                const z = Math.cos(radian) * radius;

                // Faz o card sempre "olhar" para frente
                const rotateY = -angle;

                // Ajusta o ângulo para ficar entre 0 e 360
                let normalizedAngle = angle % 360;
                if (normalizedAngle < 0) normalizedAngle += 360;

                // Calcula distância do card até a frente
                const distanceFromFront = Math.min(normalizedAngle, 360 - normalizedAngle);

                // Verifica se o card está na frente ou atrás
                const isFrontHemisphere = z > 0;

                // Cards da frente ficam maiores, cards de trás ficam menores
                const scale = isFrontHemisphere
                    ? 1 - (distanceFromFront / 360) * 0.4
                    : 0.6;

                // Cards da frente ficam opacos, cards de trás ficam transparentes
                const opacity = isFrontHemisphere
                    ? 1 - (distanceFromFront / 360) * 0.6
                    : 0.3;

                // Aplica todas as transformações no card
                card.style.transform = `translateX(${x}px) translateZ(${z}px) rotateY(${rotateY}deg) scale(${scale})`;
                card.style.opacity = opacity;

                // Cards mais próximos ficam por cima dos outros
                card.style.zIndex = Math.round(z);

                // Marca o card central para poder clicar nele
                const isCenter = distanceFromFront < (angleStep / 2);

                if (isCenter) {
                    card.classList.add('is-center');
                    card.style.pointerEvents = 'auto';
                } else {
                    card.classList.remove('is-center');
                }
            });
        }

        // Posiciona os cards inicialmente
        updateCarousel();


        // Desvira todos os cards quando o carrossel girar
        function resetAllFlips() {
            cards.forEach(card => card.classList.remove('flipped'));
        }


        // Botão anterior (esquerda)
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                resetAllFlips();
                currentRotation += angleStep;
                updateCarousel();
            });
        }

        // Botão próximo (direita)
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                resetAllFlips();
                currentRotation -= angleStep;
                updateCarousel();
            });
        }

        // Navegação com setas do teclado
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

        // Clique nos cards para virar e mostrar detalhes
        cards.forEach(card => {
            card.addEventListener('click', (e) => {
                // Não vira o card se clicar em links ou botões
                if (e.target.closest('a') || e.target.closest('button')) return;

                // Só vira o card que está no centro
                if (card.classList.contains('is-center')) {
                    card.classList.toggle('flipped');
                }
            });
        });
    }

    // Formulário de contato
    const form = document.querySelector('.contact-form');
    const successMsg = document.getElementById('form-success');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); // Impede recarregar a página

            const btn = document.querySelector('.submit-btn');
            const originalText = btn.innerHTML;

            // Mostra estado de "enviando"
            btn.innerHTML = 'Enviando...';
            btn.style.opacity = '0.7';

            // Simula envio do formulário
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.opacity = '1';
                successMsg.classList.remove('hidden');
                form.reset();

                // Esconde mensagem de sucesso após 5 segundos
                setTimeout(() => {
                    successMsg.classList.add('hidden');
                }, 5000);
            }, 1500);
        });
    }
});

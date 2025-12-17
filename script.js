document.addEventListener('DOMContentLoaded', () => {

    // lógica do carrosel 
    const carouselWrapper = document.querySelector('.carousel-wrapper');
    const cards = Array.from(document.querySelectorAll('.card'));
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    // o carrosel só funiona se houver projetos adicionados 
    if (cards.length > 0) {

        //quantas cartas tem e qual o espaço que cada uma vai ocupar no círculo (em graus)
        const totalCards = cards.length;
        const angleStep = 360 / totalCards;
        const radius = 450; // Reduzi o raio (era 650) pra ficar mais compacto

        let currentRotation = 0; // começo com a rotação zerada

        //função principal, decide onde cada carta vai ficar
        function updateCarousel() {
            cards.forEach((card, index) => {
                // descopro o ângulo dessa carta específica somando com o quanto o carrossel já girou
                const angle = angleStep * index + currentRotation;

                // transformo esse ângulo em radianos
                const radian = (angle * Math.PI) / 180;

                //seno e cosseno pra achar a posição X (lado) e Z (profundidade)
                const x = Math.sin(radian) * radius;
                const z = Math.cos(radian) * radius;

                //giro a carta ao contrário do ângulo dela (-angle)
                // isso faz com queenquanto ela gira no carrossel, ela tente sempre "olhar" pro centro
                // as cartas laterais ficam inclinadinhas, dando aquele efeito 3D legal
                const rotateY = -angle;

                // --- AJUSTES VISUAIS ---
                // verifico o card está na frente ou atrás para mudar o tamanho e a transparência

                //rimeiro deixo o ângulo "limpo" entre 0 e 360
                let normalizedAngle = angle % 360;
                if (normalizedAngle < 0) normalizedAngle += 360;

                // calculo quão longe ela está da frente (que é o ângulo 0)
                const distanceFromFront = Math.min(normalizedAngle, 360 - normalizedAngle);

                // Se o Z for positivo, ela tá na metade da frente
                const isFrontHemisphere = z > 0;

                // Se tiver na frente, deixo grande (escala 1). Se for pra trás, diminuo pra 0.6
                // aço uma conta pra ela diminuirsuavemente conforme se afasta
                const scale = isFrontHemisphere
                    ? 1 - (distanceFromFront / 360) * 0.4
                    : 0.6;

                // mesma coisa pra opacidade: lá no fundo fica meio transparente (0.3)
                const opacity = isFrontHemisphere
                    ? 1 - (distanceFromFront / 360) * 0.6
                    : 0.3;

                // jogo no CSS da carta de uma vez só
                card.style.transform = `translateX(${x}px) translateZ(${z}px) rotateY(${rotateY}deg) scale(${scale})`;
                card.style.opacity = opacity;

                // Quem tá na frente tem que ficar por cima (Z-Index maior)
                card.style.zIndex = Math.round(z);

                // se a carta estiverno centro, eu deixo clicar nela
                const isCenter = distanceFromFront < (angleStep / 2);

                if (isCenter) {
                    card.classList.add('is-center');
                    card.style.pointerEvents = 'auto'; // Pode clicar
                } else {
                    card.classList.remove('is-center');
                    // ns outras, a gente ignora o clique por enquanto
                }
            });
        }

        // chamo a função uma vez pra arrumar tudo na tela.
        updateCarousel();


        // --- FUNÇÃO PRA DESVIRAR TUDO ---
        //criei essa função pra garantir que, quando o carrossel girar,
        // qualquer carta que esteja virada (mostrando o verso) volte a ficar normal
        function resetAllFlips() {
            cards.forEach(card => card.classList.remove('flipped'));
        }


        // --- BOTÕES E TECLADO ---
        // se clicar pra esquerda ou direita, eu giro o carrossel
        // e chamo a função que desvira as cartas

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                resetAllFlips(); // desvira qualquer card virado
                currentRotation += angleStep;
                updateCarousel();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                resetAllFlips(); // desvira qualquer card virado
                currentRotation -= angleStep;
                updateCarousel();
            });
        }

        // caso queira passar o carrosel com as setas do teclado
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

        // --- PARTE 2: A CARTA QUE VIRA (FLIP) ---
        // quando eu clicar em uma carata ela vira
        cards.forEach(card => {
            card.addEventListener('click', (e) => {
                // Se o clique foi num link ou botão dentro da carta, ela não vira de volta
                if (e.target.closest('a') || e.target.closest('button')) return;

                // só a carta que está na frente de exibição pode virar de costas
                if (card.classList.contains('is-center')) {
                    card.classList.toggle('flipped'); // Vira ou desvira
                }
            });
        });
    }

    //formulário
    //formulário não recarregar a página de verdade
    const form = document.querySelector('.contact-form');
    const successMsg = document.getElementById('form-success');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); // inpede o navegador de recarregar a página

            const btn = document.querySelector('.submit-btn');
            const originalText = btn.innerHTML;

            // Finjo que estou enviando o formulário
            btn.innerHTML = 'Enviando...';
            btn.style.opacity = '0.7';

            // Espero 1.5 segundose digo que deu tudo certo
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.opacity = '1';
                successMsg.classList.remove('hidden'); // Mostra o "Sucesso!"
                form.reset(); // limpa o formulário pra pessoa escrever de novo se quiser

                // Depois de 5 segundos, eu escondo a mensagem de sucesso 
                setTimeout(() => {
                    successMsg.classList.add('hidden');
                }, 5000);
            }, 1500);
        });
    }
});

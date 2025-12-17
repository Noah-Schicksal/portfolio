# Portfólio Pessoal - Noah Schicksal

Este é um projeto de portfólio pessoal desenvolvido com foco em **Alta Performance, Responsividade e Interatividade 3D**, sem o uso de frameworks externos.

🔗 **Visualização**: Basta abrir o arquivo `index.html` em qualquer navegador moderno.

## 🚀 Tecnologias Utilizadas

O projeto foi construído utilizando apenas tecnologias nativas da web (Vanilla), garantindo leveza e controle total sobre o código.

- **HTML5**: Estrutura semântica e acessível.
- **CSS3**:
  - Flexbox e Grid Layout para estruturação.
  - Animações (`keyframes`) e transições suaves.
  - Efeitos de vidro (`backdrop-filter`) e gradientes modernos.
  - Responsividade avançada (Mobile First até telas 4K).
- **JavaScript (ES6+)**:
  - Manipulação do DOM.
  - Lógica matemática (trigonometria) para o carrossel 3D.
  - Event Listeners para interatividade e acessibilidade.

## ✨ Funcionalidades Principais

### 1. Carrossel de Projetos 3D
A joia do projeto é um carrossel circular tridimensional construído do zero.
- **Matemática Pura**: Usa `Math.sin` e `Math.cos` para posicionar os cards em um círculo perfeito no espaço 3D.
- **Interativo**: Navegação por botões, setas do teclado e cliques.
- **Dinâmico**: O raio do círculo se ajusta automaticamente para telas maiores (lendo variáveis CSS via JS).
- **Cards Interativos**: Efeito de "flip" (virar) ao clicar no card central para ver detalhes técnicos.

### 2. Design Premium & Responsivo
O layout se adapta fluidamente a qualquer dispositivo.
- **Mobile**: Layout otimizado para toque e telas verticais.
- **Desktop**: Uso eficiente do espaço horizontal.
- **Ultra-Wide / 4K**: Escalonamento inteligente de fontes e elementos para telas de altíssima resolução (3840px+).

### 3. Formulário de Contato Simulado
Uma implementação UX completa de formulário.
- Feedback visual instantâneo ("Enviando...").
- Tratamento de estados de sucesso.
- Reset automático após envio.

## 📂 Estrutura do Projeto

```
/
├── index.html      # Estrutura principal
├── styles.css      # Estilos e responsividade
├── script.js       # Lógica do carrossel e interações
└── assets/         # Imagens e ícones
```

## 🎨 Personalização

Para modificar as cores ou fontes, edite as variáveis `:root` no início do arquivo `styles.css`:

```css
:root {
    --accent: #6366f1;        /* Cor de destaque */
    --bg-dark: #050505;       /* Cor de fundo */
    --carousel-radius: 550px; /* Tamanho do carrossel */
}
```

---
Desenvolvido por **Michael Jhonathan** © 2025

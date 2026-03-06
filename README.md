# Grand Chase - Site Fã Oficial

Um site moderno e responsivo dedicado ao jogo Grand Chase, criado com HTML5, CSS3 e JavaScript vanilla. Este site foi desenvolvido para ser publicado no GitHub Pages e servir como um portal para fãs do jogo.

## 🎮 Sobre o Projeto

Este é um site fã não oficial do Grand Chase, featuring:

- **Design Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- **Animações Modernas**: Efeitos suaves e interativos usando CSS3 e JavaScript
- **Navegação Intuitiva**: Menu com smooth scroll e navegação mobile-friendly
- **Showcase de Personagens**: Cards interativos com estatísticas animadas
- **Seções de Gameplay**: Informações detalhadas sobre modos de jogo
- **Área de Download**: Call-to-action para baixar o jogo
- **Comunidade**: Links para redes sociais e estatísticas

## 🚀 Tecnologias Utilizadas

- **HTML5**: Semântica moderna e acessibilidade
- **CSS3**: Flexbox, Grid, animações e variáveis CSS
- **JavaScript Vanilla**: ES6+, Intersection Observer API
- **Google Fonts**: Orbitron e Roboto para tipografia
- **GitHub Pages**: Hospedagem gratuita

## 📁 Estrutura do Projeto

```
grand-chase-site/
├── index.html          # Página principal
├── noticias.html       # Página de notícias
├── styles.css          # Estilos CSS
├── script.js           # Scripts JavaScript
├── README.md           # Este arquivo
└── Chars/              # Diretório de assets (vazio)
```

## 🌐 Como Publicar no GitHub Pages

### Pré-requisitos
- Conta no GitHub
- Git instalado na sua máquina

### Passos para Publicar

1. **Faça o upload do projeto para o GitHub**
   ```bash
   # Crie um novo repositório chamado `seu-usuario.github.io`
   # Ou use um repositório qualquer e habilite o GitHub Pages nas configurações
   ```

2. **Habilite o GitHub Pages**
   - Vá para as configurações do seu repositório
   - Clique em "Pages" na barra lateral esquerda
   - Em "Source", selecione "Deploy from a branch"
   - Escolha a branch `main` e a pasta `/root`
   - Clique em "Save"

3. **Aguarde o deploy**
   - O GitHub levará alguns minutos para processar
   - Seu site estará disponível em: `https://seu-usuario.github.io/grand-chase-site`

### Alternativa: Domínio Personalizado

Se você quiser usar um domínio personalizado:
1. Adicione um arquivo `CNAME` na raiz do projeto com seu domínio
2. Configure as DNS conforme documentação do GitHub Pages

## 🎨 Personalização

### Cores
As cores do tema estão definidas nas variáveis CSS em `styles.css`:
```css
:root {
    --primary-color: #ff6b35;    /* Laranja Grand Chase */
    --secondary-color: #f7931e;  /* Amarelo/Dourado */
    --accent-color: #4a90e2;     /* Azul */
    --dark-color: #1a1a2e;       /* Fundo escuro */
}
```

### Fontes
- **Orbitron**: Para títulos e elementos de destaque
- **Roboto**: Para texto corporativo

## 📱 Recursos Responsivos

O site é totalmente responsivo e se adapta a:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (até 767px)

## 🚀 Funcionalidades

- **Menu Responsivo**: Hamburguer menu para dispositivos móveis
- **Animações ao Scroll**: Elementos aparecem com fade-in
- **Hover Effects**: Interações suaves em cards e botões
- **Lazy Loading**: Otimização de carregamento de imagens
- **SEO Otimizado**: Meta tags e semântica HTML5

## 🤝 Contribuição

Este é um projeto fã não oficial. Sinta-se à vontade para:
- Reportar issues
- Sugerir melhorias
- Contribuir com novo conteúdo

## 📄 Licença

Este projeto está sob licença MIT. Sinta-se livre para usar e modificar.

## ⚠️ Aviso Importante

Este é um site fã não oficial e não está afiliado à KOG Studios ou qualquer desenvolvedor oficial do Grand Chase. Todo o conteúdo é para fins informativos e de entretenimento.

---

**Divirta-se explorando o mundo de Grand Chase!** ⚔️
├── script.js           # Funcionalidades JavaScript
└── README.md           # Este arquivo
```

## 🛠️ Como Publicar no GitHub Pages

### Método 1: Usando GitHub Desktop (Recomendado para iniciantes)

1. **Clone este repositório**:
   ```bash
   git clone https://github.com/seu-usuario/grand-chase-site.git
   cd grand-chase-site
   ```

2. **Abra o projeto no GitHub Desktop**:
   - File → Add Local Repository
   - Selecione a pasta `grand-chase-site`

3. **Commit suas alterações**:
   - No GitHub Desktop, clique em "Commit to main"
   - Adicione uma descrição como "Initial commit - Grand Chase site"

4. **Publique no GitHub**:
   - Clique em "Publish repository"
   - Mantenha as configurações padrão
   - Clique em "Publish repository"

5. **Ative o GitHub Pages**:
   - Vá para o repositório no GitHub
   - Settings → Pages
   - Em "Build and deployment", selecione "Deploy from a branch"
   - Escolha "main" branch e "/ (root)" folder
   - Clique em "Save"

6. **Aguarde o deployment**:
   - O GitHub vai construir e publicar seu site
   - Após alguns minutos, seu site estará disponível em:
     `https://seu-usuario.github.io/grand-chase-site/`

### Método 2: Usando Linha de Comando

1. **Fork este repositório** no GitHub

2. **Clone localmente**:
   ```bash
   git clone https://github.com/seu-usuario/grand-chase-site.git
   cd grand-chase-site
   ```

3. **Faça commit e push**:
   ```bash
   git add .
   git commit -m "Initial commit - Grand Chase site"
   git push origin main
   ```

4. **Ative GitHub Pages**:
   - Vá para Settings → Pages no seu repositório
   - Configure como descrito no método 1

## 🎨 Personalização

### Cores e Tema

As cores principais estão definidas no arquivo `styles.css`:

```css
:root {
    --primary-color: #ff6b35;    /* Laranja Grand Chase */
    --secondary-color: #f7931e;  /* Amarelo/Dourado */
    --dark-color: #1a1a2e;       /* Azul escuro */
    --light-color: #f5f5f5;      /* Branco suave */
}
```

### Adicionar Novos Personagens

Para adicionar novos personagens:

1. **No HTML**: Copie e cole um bloco `.character-card-expanded`
2. **Atualize os dados**: Nome, classe, descrição e estatísticas
3. **Ajuste o ícone**: Use emojis ou adicione imagens

### Modificar Seções

- **Hero Section**: Altere o texto principal em `index.html`
- **Gameplay**: Adicione novos modos de jogo
- **Community**: Atualize as estatísticas e links sociais

## 🌐 Funcionalidades Implementadas

### Navegação
- Menu responsivo com hamburger para mobile
- Smooth scroll entre seções
- Navbar que muda de aparência ao rolar

### Animações
- Fade-in ao rolar a página
- Efeito de digitação no título principal
- Parallax na hero section
- Animações de hover em cards

### Interatividade
- Showcase rotativo de personagens
- Cards de personagens clicáveis
- Modal de download
- Sistema de notificações
- Easter egg (Konami Code)

### Performance
- Lazy loading preparado para imagens
- Otimizado para mobile
- FPS monitor (development only)

## 📱 Compatibilidade

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Mobile Safari
- ✅ Chrome Mobile
- ✅ Samsung Internet

## 🐛 Troubleshooting

### Site não aparece no GitHub Pages

1. **Verifique o nome do arquivo**: Deve ser `index.html` (exatamente)
2. **Aguarde o deployment**: Pode levar até 10 minutos
3. **Verifique o branch**: Certifique-se que está usando `main`
4. **Limpe o cache**: Force refresh (Ctrl+F5)

### Imagens não carregam

1. **Verifique os caminhos**: Use caminhos relativos
2. **Verifique o case sensitivity**: GitHub Pages é case-sensitive
3. **Use formatos web**: WebP, JPG, PNG otimizados

### Animações não funcionam no mobile

1. **Verifique o viewport**: Meta tag viewport configurada
2. **Teste em diferentes dispositivos**: Use Chrome DevTools

## 🚀 Melhorias Futuras

- [ ] Adicionar imagens reais dos personagens
- [ ] Implementar sistema de busca
- [ ] Adicionar seção de notícias/blog
- [ ] Criar galeria de screenshots
- [ ] Adicionar formulário de contato
- [ ] Implementar dark mode toggle
- [ ] Adicionar mais efeitos sonoros
- [ ] Criar versão em inglês

## 📄 Licença

Este projeto é um site fã não oficial. Grand Chase é propriedade da KOG Studios. Todo o conteúdo aqui é para fins educacionais e de entretenimento.

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fazer fork do projeto
2. Criar uma branch para sua feature (`git checkout - feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Add nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abrir um Pull Request

## 📞 Contato

Se você tiver dúvidas ou sugestões:

- Abra uma Issue no GitHub
- Encontre-me nas redes sociais
- Mande um email para: [seu-email]

---

**Divirta-se com seu site do Grand Chase! ⚔️🎮**

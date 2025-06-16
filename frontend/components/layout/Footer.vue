<template>
  <footer class="footer">
    <div class="footer__container">
      <div class="footer__column">
        <h3 class="footer__title">Links</h3>
        <ul class="footer__list">
          <li v-for="link in navLinks" :key="link.name" class="footer__list-item">
            <NuxtLink :to="link.path" class="footer__link">{{ link.name }}</NuxtLink>
          </li>
        </ul>
      </div>
      <div class="footer__column">
        <h3 class="footer__title">Contato</h3>
        <ul class="footer__list">
          <li class="footer__list-item">📞 +55-11-4034-7800</li>
          <li class="footer__list-item">
            <a href="mailto:websupport@gmail.com" class="footer__link">websupport@gmail.com</a>
          </li>
          <li class="footer__list-item">Av. Maj. Fernando Valle, 2013</li>
          <li class="footer__list-item">Bragança Paulista, SP, Brasil</li>
        </ul>
      </div>
      <div class="footer__column">
        <h3 class="footer__title">Siga-nos</h3>
        <ul class="footer__social-list">
          <li class="footer__social-item">
            <a href="https://facebook.com/concordsupplies" target="_blank" rel="noopener" class="footer__link">
              👍 Facebook
            </a>
          </li>
          <li class="footer__social-item">
            <a href="https://instagram.com/concordsupplies" target="_blank" rel="noopener" class="footer__link">
              📸 Instagram
            </a>
          </li>
          <li class="footer__social-item">
            <a href="https://linkedin.com/company/concordsupplies" target="_blank" rel="noopener" class="footer__link">
              💼 LinkedIn
            </a>
          </li>
          <li class="footer__social-item">
            <a href="https://twitter.com/concordsupplies" target="_blank" rel="noopener" class="footer__link">
              🐦 Twitter
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="footer__bottom">
      <p class="footer__text">© 2025 ConcordSupplies. Todos os direitos reservados.</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Contato', path: '/contato' }
]
</script>

<style scoped>
body, html {
  margin: 0;
  padding: 0;
}

.footer {
  background-color: #333333;
  color: white;
  padding: 2rem 1rem;
  font-size: 0.9rem;
  text-align: center;
}

.footer__container {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: 0 auto;
}

.footer__column {
  flex: 1 1 200px;
  margin: 1rem;
}

.footer__title {
  color: #f4b183;
  font-size: 1.2rem;
  margin-bottom: 1rem;
  text-transform: uppercase;
}

.footer__list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer__list-item {
  margin-bottom: 0.7rem;
}

.footer__link {
  color: white;
  text-decoration: none;
}

.footer__link:hover {
  color: #f4a261;
}

/* Novos estilos para social links em linha */
.footer__social-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  gap: 1.5rem;
  justify-content: center;
}

.footer__social-item {
  margin-bottom: 0;
}

.footer__bottom {
  margin-top: 2rem;
}

.footer__text {
  font-size: 0.8rem;
}
</style>


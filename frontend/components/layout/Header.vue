<template>
  <header class="header">
    <div class="header__top-bar">
      <div class="header__contact-info">
        <span>📞 +55-11-4034-7800</span>
        <span>📧 websupport@gmail.com</span>
      </div>
      <div class="header__social-icons">
        <a href="https://www.facebook.com/" target="_blank" title="Facebook" class="header__social-link" rel="noopener">📘</a>
        <a href="https://www.instagram.com/" target="_blank" title="Instagram" class="header__social-link" rel="noopener">📸</a>
        <a href="https://br.linkedin.com/" target="_blank" title="Linkedin" class="header__social-link" rel="noopener">🔗</a>
        <a href="https://x.com/i/flow/login" target="_blank" title="X" class="header__social-link" rel="noopener">🐦</a>
      </div>
    </div>

    <nav class="header__nav">
      <h1 class="header__logo">ConcordSupplies</h1>
      <ul class="header__nav-list">
        <li v-for="link in navLinks" :key="link.name" class="header__nav-item">
          <NuxtLink :to="link.path" class="header__nav-link">{{ link.name }}</NuxtLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup lang="ts">
const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Produtos', path: '/produtos' },
  { name: 'Contato', path: '/contato' },
  { name: 'Cadastro', path: '/usuarios' },
  { name: 'Pedido', path: '/order' }
]
</script>

<style scoped>
body, html {
  margin: 0;
  padding: 0;
}

.header {
  background-color: burlywood;
  color: white;
  font-family: Arial, sans-serif;
}

/* Top bar */
.header__top-bar {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  background-color: burlywood;
  font-size: 0.9rem;
  align-items: center;
}

.header__contact-info span {
  margin-right: 1.5rem;
}

.header__social-icons {
  display: flex;
  gap: 1rem;
  font-size: 1.3rem;
}

.header__social-link {
  color: white;
  text-decoration: none;
  transition: color 0.3s ease;
}

.header__social-link:hover {
  color: #264653;
}

/* Nav */
.header__nav {
  display: flex;
  align-items: center;
  padding: 1rem;
  position: relative;
}

/* Logo */
.header__logo {
  font-size: 1.8rem;
  font-weight: bold;
  margin: 0;
  color: white;
  flex-shrink: 0;
  z-index: 2;
}

/* Barra de navigação */
.header__nav-list {
  list-style: none;
  padding: 0;
  margin: 0 auto;
  display: flex;
  gap: 2rem;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.header__nav-link {
  color: white;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.header__nav-link:hover {
  color: #264653;
}
</style>


<template>
  <main>
    <section class="contact">
      <!-- Informações de Contato -->
      <div class="contact__info">
        <h2 class="contact__info-title">Informações de Contato</h2>
        <ul class="contact__info-list">
          <li class="contact__info-item">📞 +55 11 4034 7800</li>
          <li class="contact__info-item">📧 websupport@gmail.com</li>
          <li class="contact__info-item">🏠 Av. Maj. Fernando Valle, 2013 - Bragança Paulista/SP</li>
        </ul>
      </div>

      <!-- Formulário -->
      <form class="contact__form" ref="formElement">
        <div class="form__group">
          <label for="name" class="contact__label">Nome</label>
          <input
            type="text"
            id="nome"
            name="nome"
            class="contact__input"
            placeholder="Digite seu nome"
            required
            v-model="form.nome"
          />
        </div>

        <div class="form__group">
          <label for="email" class="contact__label">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            class="contact__input"
            placeholder="Digite seu email"
            required
            v-model="form.email"
          />
        </div>

        <div class="form__group">
          <label for="message" class="contact__label">Mensagem</label>
          <textarea
            id="message"
            name="mensagem"
            class="contact__textarea"
            rows="5"
            placeholder="Digite sua mensagem"
            required
            v-model="form.mensagem"
          ></textarea>
        </div>

        <button type="button" class="contact__button">Enviar Mensagem</button>
      </form>
    </section>

    <!-- Mapa google -->
    <section class="map">
      <h2 class="map__title">Nossa Localização</h2>
      <div class="map__container">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3674.0403139075684!2d-46.56107662468851!3d-22.948742379225553!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cecbd5c86e1b01%3A0x4c01556c237aa0cc!2sAv.%20Maj.%20Fernando%20Valle%2C%202013%20-%20S%C3%A3o%20Miguel%2C%20Bragan%C3%A7a%20Paulista%20-%20SP%2C%2012903-000!5e0!3m2!1spt-BR!2sbr!4v1733826591588!5m2!1spt-BR!2sbr"
          width="100%"
          height="400"
          style="border: 0;"
          class="map__iframe"
          loading="lazy"
        ></iframe>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const form = ref({
  nome: '',
  email: '',
  mensagem: ''
})
</script>

<style scoped>
.contact {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem;
  flex-wrap: wrap;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

/* Contato Formulário */
.contact__info,
.contact__form {
  flex: 1;
  min-width: 300px;
}

.contact__info-title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #333;
}

.contact__info-list {
  list-style: none;
  padding: 0;
}

.contact__info-item {
  margin-bottom: 0.75rem;
  font-size: 1rem;
}

.contact__form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form__group {
  display: flex;
  flex-direction: column;
}

.contact__label {
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.contact__input,
.contact__textarea {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
}

.contact__button {
  align-self: flex-start;
  padding: 0.6rem 1.2rem;
  background-color: #f4a261;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.contact__button:hover {
  background-color: darkorange;
}

/* Mapa */
.map {
  margin-top: 3rem;
  padding: 0 2rem;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}

.map__title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #333;
}

.map__container {
  border: 1px solid #ccc;
  border-radius: 6px;
  overflow: hidden;
}
</style>


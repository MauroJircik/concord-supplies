<template>
    <main class="home">
      <section class="banner">
        <div class="banner__text">
          <h1 class="banner__title">All Office Products</h1>
          <h2 class="banner__subtitle">Under One Roof</h2>
          <p class="banner__description">
            Explore a variedade de materiais de escritório.
          </p>
        </div>
        <div class="banner__image-container">
          <img src="/images/banner.png" alt="Banner" class="banner__image" />
        </div>
      </section>
    </main>
  </template>
  
  <script setup lang="ts">
  // Nenhum script necessário!!
  </script>
  
  <style scoped>
    body, html {
    margin: 0;
    padding: 0;
    }

  .banner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    min-height: 400px;
    padding: 2rem;
    background-color: gainsboro;
  }
  
  .banner__text {
    flex: 1 1 45%;
    padding: 1rem;
    color: #333;
  }
  
  .banner__title {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
  }
  
  .banner__subtitle {
    font-size: 1.8rem;
    margin-bottom: 1rem;
    color: #f4a261;
  }
  
  .banner__description {
    font-size: 1.2rem;
    line-height: 1.5;
  }
  
  .banner__image-container {
    flex: 1 1 45%;
    text-align: right;
  }
  
  .banner__image {
    max-width: 100%;
    height: auto;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  </style>
  


<template>
  <main class="cadastro-produto">
    <h2 class="form__title">Cadastro de Produto</h2>

    <form class="form" @submit.prevent="onSalvarProduto">
      <div class="form__grid">
        <!-- Coluna esquerda -->
        <div class="form__col">
          <div class="form__group">
            <label>Nome do Produto</label>
            <input v-model="produto.nomeProduct" type="text" required />
          </div>

          <div class="form__group">
            <label>Descrição</label>
            <input v-model="produto.descricao" type="text" required />
          </div>

          <div class="form__group">
            <label>Preço (R$)</label>
            <input v-model.number="produto.preco_unitario" type="number" step="0.01" required />
          </div>

          <div class="form__group">
            <label>Unidade de Medida</label>
            <select v-model="produto.unidade" required>
              <option value="">Selecione</option>
              <option value="un">un</option>
              <option value="cx">cx</option>
              <option value="pct">pct</option>
            </select>
          </div>

          <div class="form__group switch-group">
            <label>Produto Ativo</label>
            <label class="switch">
              <input type="checkbox" v-model="produto.ativo" />
              <span class="slider"></span>
            </label>
          </div>

          <button type="submit" class="btn-save">
            {{ editando ? "Atualizar" : "Cadastrar" }}
          </button>
          <button
            v-if="editando"
            type="button"
            @click="cancelarEdicao"
            class="btn-cancel"
          >
            Cancelar
          </button>
        </div>
      </div>
    </form>

    <!-- Lista de produtos -->
    <div class="produto-table" v-if="produtos.length > 0">
      <div class="produto-header">
        <span>Nome</span>
        <span>Descrição</span>
        <span>Preço</span>
        <span>Unidade</span>
        <span>Status</span>
        <span>Ações</span>
      </div>

      <div
        class="produto-row"
        v-for="p in produtos"
        :key="p.ProductId"
      >
        <span>{{ p.nomeProduct }}</span>
        <span>{{ p.descricao }}</span>
        <span>R$ {{ p.preco_unitario.toFixed(2) }}</span>
        <span>{{ p.unidade }}</span>
        <span :class="p.ativo ? 'ativo' : 'inativo'">
          [{{ p.ativo ? 'Ativo' : 'Inativo' }}]
        </span>
        <span>
          <button @click="editar(p)" title="Editar">✏️</button>
          <button @click="remover(p.ProductId)" title="Remover">🗑️</button>
        </span>
      </div>
    </div>
    <p v-else>Nenhum produto cadastrado.</p>
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useProdutos, type Produto } from '~/composables/useProdutos'

const { produtos, carregarProdutos, salvarProduto, removerProduto } = useProdutos()
const produto = ref<Produto>({
  ProductId: 0,
  nomeProduct: '',
  descricao: '',
  preco_unitario: 0,
  unidade: '',
  ativo: true
})
const editando = ref(false)

onMounted(() => {
  carregarProdutos()
})

async function onSalvarProduto() {
  try {
    await salvarProduto(produto.value)
    editando.value = false
    resetForm()
  } catch (error) {
    alert('Erro ao salvar produto: ' + error)
  }
}

async function remover(ProductId: number) {
  if (!confirm('Confirma remoção?')) return
  try {
    await removerProduto(ProductId)
    if (editando.value && produto.value.ProductId === ProductId) cancelarEdicao()
  } catch (error) {
    alert('Erro ao remover produto: ' + error)
  }
}

function editar(p: Produto) {
  produto.value = { ...p }
  editando.value = true
}

function cancelarEdicao() {
  resetForm()
  editando.value = false
}

function resetForm() {
  produto.value = {
    ProductId: 0,
    nomeProduct: '',
    descricao: '',
    preco_unitario: 0,
    unidade: '',
    ativo: true
  }
}
</script>
  
  <style scoped>
  .cadastro-produto {
    max-width: 900px;
    margin: 2rem auto;
    padding: 1rem;
    font-family: Arial, sans-serif;
  }
  
  .form__title {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  
  .form {
    background-color: gainsboro;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgb(0 0 0 / 0.1);
  }
  
  .form__grid {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }
  
  .form__col {
    flex: 1 1 100%;
    max-width: 400px;
    margin-right: 2rem;
  }
  
  .form__group {
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
  }
  
  .form__group label {
    margin-bottom: 0.3rem;
    font-weight: 600;
  }
  
  .form__group input,
  .form__group select {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .switch-group {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
  }
  
  /* Switch Estilo */
  .switch {
    position: relative;
    display: inline-block;
    width: 44px;
    height: 24px;
  }
  
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0; left: 0; right: 0; bottom: 0;
    background-color: #ccc;
    border-radius: 24px;
    transition: 0.4s;
  }
  
  .slider:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }
  
  input:checked + .slider {
    background-color: #4caf50;
  }
  
  input:checked + .slider:before {
    transform: translateX(20px);
  }
  
  .btn-save {
    background-color: #f4a261;
    color: white;
    border: none;
    padding: 0.6rem 1.2rem;
    border-radius: 5px;
    cursor: pointer;
    font-weight: 700;
    margin-top: 0.5rem;
  }
  
  .btn-save:hover {
    background-color: darkorange;
  }
  
  .btn-cancel {
    background-color: #e53935;
    color: white;
    border: none;
    padding: 0.6rem 1.2rem;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    margin-left: 1rem;
    margin-top: 0.5rem;
  }
  
  .btn-cancel:hover {
    background-color: #c62828;
  }
  
  /* Lista de produtos como tabela */
  
  .produto-table {
    display: flex;
    flex-direction: column;
    margin-top: 2rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
  }
  
  .produto-header,
  .produto-row {
    display: grid;
    grid-template-columns: 2fr 3fr 1fr 1fr 1fr 1fr;
    gap: 1rem;
    padding: 0.75rem 1rem;
    align-items: center;
  }
  
  .produto-header {
    background-color: #f0f0f0;
    font-weight: bold;
    border-bottom: 1px solid #ccc;
  }
  
  .produto-row:nth-child(even) {
    background-color: #fafafa;
  }
  
  .ativo {
    color: green;
    font-weight: bold;
  }
  
  .inativo {
    color: red;
    font-weight: bold
  }
  
  .produto-row button {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.1rem;
    margin-right: 0.5rem;
  }
  
  .produto-row button:hover {
    color: darkorange;
  }
  
  </style>
  

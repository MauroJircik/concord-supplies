<template>
    <main class="cadastro-usuario">
      <h2 class="form-title">Cadastro de Usuário</h2>
  
      <form class="form" @submit.prevent="onSalvarUsuario">
        <div class="form-grid">
          <div class="form-group">
            <label>Nome Completo</label>
            <input v-model="usuario.nomeUser" type="text" required />
          </div>
  
          <div class="form-group">
            <label>E-mail</label>
            <input v-model="usuario.email" type="email" required />
          </div>
  
          <div class="form-group">
            <label>Senha</label>
            <input v-model="usuario.senha" type="password" required />
          </div>
  
          <div class="form-group">
            <label>Tipo de Usuário</label>
            <select v-model="usuario.tipo" required>
              <option value="">Selecione</option>
              <option value="administrador">Administrador</option>
              <option value="comum">Comum</option>
            </select>
          </div>
  
          <div class="form-group switch-group">
            <label>Usuário Ativo</label>
            <label class="switch">
              <input type="checkbox" v-model="usuario.ativo" />
              <span class="slider"></span>
            </label>
          </div>
  
          <div class="form-buttons">
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
  
      <!-- Lista de usuários -->
      <div class="usuario-table" v-if="usuarios.length > 0">
        <div class="usuario-header">
          <span>Nome</span>
          <span>E-mail</span>
          <span>Tipo</span>
          <span>Status</span>
          <span>Ações</span>
        </div>
  
        <div class="usuario-row" v-for="u in usuarios" :key="u.UserId">
          <span>{{ u.nomeUser }}</span>
          <span>{{ u.email }}</span>
          <span>{{ u.tipo }}</span>
          <span :class="u.ativo ? 'ativo' : 'inativo'">
            [{{ u.ativo ? 'Ativo' : 'Inativo' }}]
          </span>
          <span>
            <button @click="editarUsuario(u)" title="Editar">✏️</button>
            <button @click="removerUsuarioHandler(u.UserId)" title="Remover">🗑️</button>
          </span>
        </div>
      </div>
      <p v-else>Nenhum usuário cadastrado.</p>
    </main>
  </template>
  

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useUsuarios, type Usuario } from '~/composables/useUsuarios'

const { usuarios, carregarUsuarios, salvarUsuario, removerUsuario } = useUsuarios()

const usuario = ref<Usuario>({
  UserId: 0,
  nomeUser: '',
  email: '',
  senha: '',
  tipo: '',
  ativo: true
})
const editando = ref(false)

onMounted(() => {
  carregarUsuarios()
})

async function onSalvarUsuario() {
  try {
    await salvarUsuario(usuario.value)
    editando.value = false
    resetForm()
  } catch (error) {
    alert('Erro ao salvar usuário: ' + error)
  }
}

async function removerUsuarioHandler(UserId: number) {
  if (!confirm('Tem certeza que deseja remover este usuário?')) return
  try {
    await removerUsuario(UserId)
    if (editando.value && usuario.value.UserId === UserId) cancelarEdicao()
  } catch (error) {
    alert('Erro ao remover usuário: ' + error)
  }
}

function editarUsuario(u: Usuario) {
  usuario.value = { ...u }
  editando.value = true
}

function cancelarEdicao() {
  resetForm()
  editando.value = false
}

function resetForm() {
  usuario.value = {
    UserId: 0,
    nomeUser: '',
    email: '',
    senha: '',
    tipo: '',
    ativo: true
  }
}
</script>

<style scoped>
  .cadastro-usuario {
    max-width: 900px;
    margin: 2rem auto;
    padding: 1rem;
    font-family: Arial, sans-serif;
  }
  
  .form-title {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  .form {
    background-color: gainsboro;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgb(0 0 0 / 0.1);
  }

  .form-grid {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .form-group {
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
  }
  
  .form-group label {
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  
  input,
  select {
    padding: 0.5rem;
    border-radius: 4px;
    border: 1px solid #ccc;
  }
  
  .switch-group {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .switch {
    position: relative;
    display: inline-block;
    width: 50px;
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
  
  .slider::before {
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
  
  .switch input:checked + .slider {
    background-color: #4caf50;
  }
  
  .switch input:checked + .slider::before {
    transform: translateX(20px);
  }
  
  .form-buttons {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
  }
  
  .btn-save,
  .btn-cancel {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 6px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .btn-save {
    background-color: #f4a261;
    color: white;
  }
  
  .btn-cancel {
    background-color: #f4a261;
    color: white;
  }
  
  .btn-save:hover {
    background-color: darkorange;
  }
  
  .btn-cancel:hover {
    background-color: darkorange;
  }
  
  .usuario-table {
    display: flex;
    flex-direction: column;
    margin-top: 2rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
  }
  
  .usuario-header,
  .usuario-row {
    display: grid;
    grid-template-columns: 2fr 2fr 1fr 1fr 1fr;
    gap: 1rem;
    padding: 0.75rem 1rem;
    align-items: center;
  }
  
  .usuario-header {
    background-color: #f0f0f0;
    font-weight: bold;
    border-bottom: 1px solid #ccc;
  }
  
  .usuario-row:nth-child(even) {
    background-color: #fafafa;
  }
  
  .ativo {
    color: green;
    font-weight: bold;
  }
  
  .inativo {
    color: red;
    font-weight: bold;
  }
  
  .usuario-row button {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.1rem;
    margin-right: 0.5rem;
  }
  
  .usuario-row button:hover {
    color: darkorange;
  }
</style>

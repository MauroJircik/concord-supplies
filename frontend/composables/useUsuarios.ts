import { ref } from 'vue'
import { useRuntimeConfig } from '#imports'
import { $fetch } from 'ofetch'

export interface Usuario {
  UserId: number
  nomeUser: string
  email: string
  senha: string
  tipo: string
  ativo: boolean
}

export function useUsuarios() {
  const config = useRuntimeConfig()
  const usuarios = ref<Usuario[]>([])

  async function carregarUsuarios() {
    try {
      usuarios.value = await $fetch<Usuario[]>(`${config.public.apiBase}/usuario`)
    } catch (error) {
      alert('Erro ao carregar usuários: ' + error)
    }
  }

  async function salvarUsuario(u: Usuario) {
    if (u.UserId && u.UserId > 0) {
      // Atualizar
      await $fetch(`${config.public.apiBase}/usuario/${u.UserId}`, {
        method: 'PUT',
        body: u,
      })
      const index = usuarios.value.findIndex(user => user.UserId === u.UserId)
      if (index !== -1) usuarios.value[index] = { ...u }
    } else {
      // Criar
      const novoUsuario = await $fetch<Usuario>(`${config.public.apiBase}/usuario`, {
        method: 'POST',
        body: u,
      })
      usuarios.value.push(novoUsuario)
    }
  }

  async function removerUsuario(id: number) {
    await $fetch(`${config.public.apiBase}/usuario/${id}`, {
      method: 'DELETE'
    })
    usuarios.value = usuarios.value.filter(u => u.UserId !== id)
  }

  return {
    usuarios,
    carregarUsuarios,
    salvarUsuario,
    removerUsuario
  }
}


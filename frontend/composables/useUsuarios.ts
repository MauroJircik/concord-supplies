import { ref } from 'vue'
import { useRuntimeConfig } from '#imports'
import { $fetch } from 'ofetch'

//atributos Usuário:
export interface Usuario {
  UserId: number
  nomeUser: string
  email: string
  senha: string
  tipo: string
  ativo: boolean
}

//função Usuários:
export function useUsuarios() {
  const config = useRuntimeConfig()
  const usuarios = ref<Usuario[]>([])

  //- carregar Usuário:
  async function carregarUsuarios() {
    try {
      usuarios.value = await $fetch<Usuario[]>(`${config.public.apiBase}/usuario`)
    } catch (error) {
      alert('Erro ao carregar usuários: ' + error)
    }
  }
  //- salvar Usuário:
  async function salvarUsuario(u: Usuario) {
    if (u.UserId && u.UserId > 0) {
      //- atualizar:
      await $fetch(`${config.public.apiBase}/usuario/${u.UserId}`, {
        method: 'PUT',
        body: u,
      })
      const index = usuarios.value.findIndex(user => user.UserId === u.UserId)
      if (index !== -1) usuarios.value[index] = { ...u }
    } else {
      //- criar:
      const novoUsuario = await $fetch<Usuario>(`${config.public.apiBase}/usuario`, {
        method: 'POST',
        body: u,
      })
      usuarios.value.push(novoUsuario)
    }
  }

  //- remover Usuário:
  async function removerUsuario(id: number) {
    await $fetch(`${config.public.apiBase}/usuario/${id}`, {
      method: 'DELETE'
    })
    usuarios.value = usuarios.value.filter(u => u.UserId !== id)
  }

  //- retornos:
  return {
    usuarios,
    carregarUsuarios,
    salvarUsuario,
    removerUsuario
  }
}


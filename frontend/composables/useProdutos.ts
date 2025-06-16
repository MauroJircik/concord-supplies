import { ref } from 'vue'
import { useRuntimeConfig } from '#imports'
import { $fetch } from 'ofetch'

export interface Produto {
  ProductId: number
  nomeProduct: string
  descricao: string
  preco_unitario: number
  unidade: string
  ativo: boolean
}

export function useProdutos() {
  const config = useRuntimeConfig()
  const produtos = ref<Produto[]>([])

  // Carrega todos os produtos do backend
  async function carregarProdutos() {
    produtos.value = await $fetch<Produto[]>(`${config.public.apiBase}/produto`)
  }

  // Salva um produto: cria se não tem id, atualiza se tem id
  async function salvarProduto(p: Produto) {
    if (p.ProductId && p.ProductId > 0) {
      // Atualizar
      await $fetch(`${config.public.apiBase}/produto/${p.ProductId}`, {
        method: 'PUT',
        body: p,
      })
      const index = produtos.value.findIndex(prod => prod.ProductId === p.ProductId)
      if (index !== -1) produtos.value[index] = { ...p }
    } else {
      // Criar
      const novoProduto = await $fetch<Produto>(`${config.public.apiBase}/produto`, {
        method: 'POST',
        body: p,
      })
      produtos.value.push(novoProduto)
    }
  }

  // Remove produto pelo id
  async function removerProduto(id: number) {
    await $fetch(`${config.public.apiBase}/produto/${id}`, {
      method: 'DELETE'
    })
    produtos.value = produtos.value.filter(p => p.ProductId !== id)
  }

  return {
    produtos,
    carregarProdutos,
    salvarProduto,
    removerProduto
  }
}

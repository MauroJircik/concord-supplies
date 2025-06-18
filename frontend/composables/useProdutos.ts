import { ref } from 'vue'
import { useRuntimeConfig } from '#imports'
import { $fetch } from 'ofetch'

//atributos Produto:
export interface Produto {
  ProductId: number
  nomeProduct: string
  descricao: string
  preco_unitario: number
  unidade: string
  ativo: boolean
}

//função Produtos:
export function useProdutos() {
  const config = useRuntimeConfig()
  const produtos = ref<Produto[]>([])

  //- carregar Produtos:
  async function carregarProdutos() {
    produtos.value = await $fetch<Produto[]>(`${config.public.apiBase}/produto`)
  }

  //- salvar Produto:
  async function salvarProduto(p: Produto) {
    if (p.ProductId && p.ProductId > 0) {
      //- atualizar:
      await $fetch(`${config.public.apiBase}/produto/${p.ProductId}`, {
        method: 'PUT',
        body: p,
      })
      const index = produtos.value.findIndex(prod => prod.ProductId === p.ProductId)
      if (index !== -1) produtos.value[index] = { ...p }
    } else {
      //- criar:
      const novoProduto = await $fetch<Produto>(`${config.public.apiBase}/produto`, {
        method: 'POST',
        body: p,
      })
      produtos.value.push(novoProduto)
    }
  }

  //- remover Produto:
  async function removerProduto(id: number) {
    await $fetch(`${config.public.apiBase}/produto/${id}`, {
      method: 'DELETE'
    })
    produtos.value = produtos.value.filter(p => p.ProductId !== id)
  }

  //- retornos:
  return {
    produtos,
    carregarProdutos,
    salvarProduto,
    removerProduto
  }
}

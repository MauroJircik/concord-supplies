import { ref, toRaw } from 'vue'
import { useRuntimeConfig } from '#imports'

export interface ProdutoItem {
  ProductId: number
  nomeProduct: string
  quantidade: number
  preco_unitario: number
}

export interface Usuario {
  UserId: number
  nomeUser: string
  email: string
}

export interface Order {
  OrderId: number
  UserId: number
  data_criacao: string
  status: string
  valor_total: number
  forma_pagamento: string
  produtos: ProdutoItem[]
}

export function userOrders() {
  const config = useRuntimeConfig()
  const orders = ref<Order[]>([])

  async function carregarOrders() {
    try {
      const data = await $fetch<Order[]>(`${config.public.apiBase}/order`)
      orders.value = data || []
      console.log('Pedidos carregados:', data)
    } catch (err) {
      alert('Erro ao carregar pedidos: ' + err)
    }
  }

  async function salvarOrder(order: Order, editando: boolean) {
    order.data_criacao = new Date(order.data_criacao).toISOString()
    const orderPlain = {
      ...order,
      produtos: toRaw(order.produtos)
    }

    try {
      console.log('Order que será enviada:', toRaw(orderPlain))
      if (editando) {
        await $fetch(`${config.public.apiBase}/order/${order.OrderId}`, {
          method: 'PUT',
          body: orderPlain,
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const index = orders.value.findIndex(o => o.OrderId === order.OrderId)
        if (index !== -1) orders.value[index] = { ...orderPlain }
      } else {
        const novoPedido = await $fetch<Order>(`${config.public.apiBase}/order`, {
          method: 'POST',
          body: orderPlain,
          headers: {
            'Content-Type': 'application/json'
          }
        })
        if (novoPedido) orders.value.push(novoPedido)
      }
    } catch (err) {
      alert('Erro ao salvar pedido: ' + err)
    }
  }

  async function removerOrder(id: number) {
    if (!confirm('Tem certeza que deseja remover este pedido?')) return
    try {
      await $fetch(`${config.public.apiBase}/order/${id}`, {
        method: 'DELETE'
      })
      orders.value = orders.value.filter(o => o.OrderId !== id)
    } catch (err) {
      alert('Erro ao remover pedido: ' + err)
    }
  }

  return {
    orders,
    carregarOrders,
    salvarOrder,
    removerOrder
  }
}

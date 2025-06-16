<template>
  <main class="cadastro-order">
    <!--<h2 class="form__title">Cadastro de Pedido</h2>-->
    <h2 class="form__title">
      {{ editando ? "Editar Pedido #" + order.OrderId : "Cadastro de Pedido" }}
    </h2>

    <form class="form" @submit.prevent="salvarOrderHandler">
      <div class="form__grid">
        <div class="form__col">
          <div class="form__group">
            <label>ID do Usuário</label>
            <select v-model.number="order.UserId" required>
              <option value="" disabled>Selecione um usuário</option>
              <option v-for="u in usuarios" :key="u.UserId" :value="u.UserId">
                  {{ u.nomeUser }} (ID: {{ u.UserId }})
              </option>
            </select>
          </div>

          <div class="form__group">
            <label>Forma de Pagamento</label>
            <select v-model="order.forma_pagamento" required>
              <option value="">Selecione</option>
              <option value="Cartão de Crédito">Cartão de Crédito</option>
              <option value="Boleto">Boleto</option>
              <option value="Pix">Pix</option>
            </select>
          </div>

          <div class="form__group">
            <label>Data do Pedido</label>
            <input v-model="order.data_criacao" type="date" required />
          </div>

          <div class="form__group">
            <label>Status do Pedido</label>
            <select v-model="order.status" required>
              <option value="">Selecione</option>
              <option value="Em andamento">Em andamento</option>
              <option value="Concluído">Concluído</option>
              <option value="Cancelado">Cancelado</option>
            </select>
          </div>

          <div class="form__group">
            <label>Produtos</label>
            <div v-for="(p, index) in order.produtos" :key="index" class="produto-item">
              <select v-model="p.ProductId" @change="atualizarProdutoSelecionado(p.ProductId, p)" required>
                <option value="" disabled>Selecione um produto</option>
                <option v-for="prod in produtos" :key="prod.ProductId" :value="prod.ProductId">
                  {{ prod.nomeProduct }}
                </option>
              </select>
              <input v-model.number="p.quantidade" type="number" placeholder="Qtd" min="1" required />
              <input v-model.number="p.preco_unitario" type="number" placeholder="Preço" step="0.01" min="0" readonly />
              <button type="button" @click="removerProduto(index)">❌</button>
            </div>
            <button type="button" @click="adicionarProduto">➕ Adicionar Produto</button>
          </div>

          <div class="form__group">
            <label>Valor Total</label>
            <input :value="total.toFixed(2).replace('.',',')" readonly />
          </div>

          <button type="submit" class="btn-save">
            {{ editando ? "Atualizar" : "Cadastrar" }}
          </button>
          <button v-if="editando" type="button" @click="cancelarEdicao" class="btn-cancel">
            Cancelar
          </button>
        </div>
      </div>
    </form>

    <div class="order-table" v-if="orders.length > 0">
      <div class="order-header">
        <span>ID</span>
        <span>Usuário</span>
        <span>Status</span>
        <span>Data</span>
        <span>Pagamento</span>
        <span>Valor</span>
        <span>Ações</span>
      </div>

      <div class="order-row" v-for="o in orders" :key="o.OrderId">
        <span>{{ o.OrderId }}</span>
        <span>{{ nomeUsuarioPorId(o.UserId) }}</span>
        <span :class="statusClass(o.status)">{{ o.status }}</span>
        <span>{{ formatarData(o.data_criacao) }}</span>
        <span>{{ o.forma_pagamento }}</span>
        <span>R$ {{ o.valor_total.toFixed(2).replace('.', ',') }}</span>
        <span>
          <button @click="editarOrder(o)" title="Editar">✏️</button>
          <button @click="removerOrderHandler(o.OrderId)" title="Remover">🗑️</button>
        </span>
      </div>
    </div>
    <p v-else>Nenhum pedido cadastrado.</p>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useUsuarios, type Usuario } from '~/composables/useUsuarios'
import { useProdutos, type Produto as ProdutoCadastrado } from '~/composables/useProdutos'
import { userOrders, type Order, type ProdutoItem } from '~/composables/useOrders'

const { orders, carregarOrders, salvarOrder, removerOrder } = userOrders()
const { usuarios, carregarUsuarios } = useUsuarios()
const { produtos, carregarProdutos } = useProdutos()

const order = ref<Order>({
  OrderId: 0,
  UserId: 0,
  status: '',
  data_criacao: '',
  valor_total: 0,
  forma_pagamento: '',
  produtos: [] as ProdutoItem[]
})

const editando = ref(false)

function nomeUsuarioPorId(id: number) {
  const user = usuarios.value.find(u => u.UserId === id)
  return user ? user.nomeUser : 'Desconhecido'
}

function atualizarProdutoSelecionado(productId: number, p: ProdutoItem) {
  const prodSelecionado = produtos.value.find(prod => prod.ProductId === productId)
  if (prodSelecionado) {
    p.nomeProduct = prodSelecionado.nomeProduct
    p.preco_unitario = prodSelecionado.preco_unitario
  } else {
    Object.assign(p, {
      nomeProduct: '',
      preco_unitario: 0
    })
  }
}

function resetForm() {
  order.value = {
    OrderId: 0,
    UserId: 0,
    status: '',
    data_criacao: '',
    valor_total: 0,
    forma_pagamento: '',
    produtos: []
  }
}

function statusClass(status: string) {
  switch (status) {
    case 'Em andamento': return 'status-pendente'
    case 'Concluído': return 'status-concluido'
    case 'Cancelado': return 'status-cancelado'
    default: return ''
  }
}

const total = computed(() => {
  return order.value.produtos.reduce((acc, p) => {
    return acc + (p.quantidade * parseFloat(p.preco_unitario.toString() || '0'))
  }, 0)
})

function adicionarProduto() {
  order.value.produtos.push({ ProductId: 0, nomeProduct: '', quantidade: 1, preco_unitario: 0 })
}

function removerProduto(index: number) {
  order.value.produtos.splice(index, 1)
}

const editarOrder = (pedido: any) => {
  console.log('Pedido para edição:', pedido);
  order.value.OrderId = pedido.OrderId;
  order.value.UserId = pedido.UserId;
  order.value.forma_pagamento = pedido.forma_pagamento || '';
  order.value.data_criacao = toInputDateFormat(pedido.data_criacao || '');
  order.value.status = pedido.status || '';
  order.value.valor_total = pedido.valor_total ?? 0;
  order.value.produtos = [];


  if (Array.isArray(pedido.products)) {
    order.value.produtos = pedido.products.map((prod: any) => ({
      ProductId: prod.ProductId ?? prod.produtoId,
      nomeProduct: prod.nomeProduct ?? '',
      quantidade: prod.OrderProduct?.quantidade ?? prod.quantidade ?? 1,
      preco_unitario: prod.preco_unitario ?? 0
    }));
  }
  editando.value = true;
}

function cancelarEdicao() {
  resetForm()
  editando.value = false
}

function formatarData(data: string) {
  if (!data) return ''
  const dt = new Date(data)
  return dt.toLocaleDateString()
}

function toInputDateFormat(data: string) {
  if (!data) return ''
  const dt = new Date(data)
  return dt.toISOString().split('T')[0]
}

async function salvarOrderHandler() {
  order.value.valor_total = total.value
  const orderParaSalvar = {
    ...order.value,
    data_criacao: new Date(order.value.data_criacao).toISOString()
  }
  await salvarOrder(orderParaSalvar, editando.value)
  if (editando.value) editando.value = false
  console.log("Produtos do pedido:", orderParaSalvar.produtos);
  resetForm()
}

async function removerOrderHandler(id: number) {
  await removerOrder(id)
  if (editando.value && order.value.OrderId === id) {
    cancelarEdicao()
  }
}

onMounted(() => {
  carregarOrders()
  carregarUsuarios()
  carregarProdutos()
})
</script>

<style scoped>
.produto-item {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  align-items: center;
}
.produto-item input {
  flex: 1;
}
.produto-item button {
  background-color: #e53935;
  color: white;
  border: none;
  padding: 0.2rem 0.5rem;
  border-radius: 3px;
  cursor: pointer;
}
.produto-item button:hover {
  background-color: #c62828;
}

.cadastro-order {
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

/* Lista de pedidos como tabela */

.order-table {
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
}

.order-header,
.order-row {
  display: grid;
  grid-template-columns: 1fr 1fr 2fr 2fr 1fr;
  gap: 1rem;
  padding: 0.75rem 1rem;
  align-items: center;
  background-color: white;
}

.order-header {
  background-color: #f0f0f0;
  font-weight: bold;
  border-bottom: 1px solid #ccc;
}

.order-row:nth-child(even) {
  background-color: #fafafa;
}

.status-pendente {
  color: orange;
  font-weight: bold;
}

.status-concluido {
  color: green;
  font-weight: bold;
}

.status-cancelado {
  color: red;
  font-weight: bold;
}

.order-row button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.1rem;
  margin-right: 0.5rem;
}

.order-row button:hover {
  color: darkorange;
}
</style>


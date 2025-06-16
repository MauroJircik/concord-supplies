import { Router } from 'express'
import { Order, User, Product, OrderProduct } from '../models/index.js'

const router = Router()

// Middleware para validar o parâmetro :id
const validateIdParam = (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ message: 'ID inválido' });
  }
  req.params.id = id;
  next();
};

const orderIncludes = [
  { model: User, as: 'user', attributes: ['UserId', 'nomeUser'] },
  {
    model: Product,
    as: 'products',
    attributes: ['ProductId', 'nomeProduct', 'preco_unitario'],
    through: { attributes: ['quantidade'] },
  },
];

// Listar todos os pedidos com usuário e produtos
router.get('/', async (req, res) => {
  try {
    const orders = await Order.findAll({ include: orderIncludes });
    res.json(orders);
  } catch (error) {
    console.error('Erro ao buscar pedidos:', error);
    res.status(500).json({ message: 'Erro ao buscar pedidos', detalhes: error.message });
  }
});

// Obter pedido por ID
router.get('/:id', validateIdParam, async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id, {include: orderIncludes });

    if (!order) {
      return res.status(404).json({ message: 'Pedido não encontrado' });
    };
    res.json(order);
  } catch (error) {
    console.error('Erro ao buscar pedido:', error);
    res.status(500).json({ message: 'Erro ao buscar pedido', detalhes: error.message });
  }
});

// Criar novo pedido
router.post('/', async (req, res) => {
  try {
    const { UserId, status, valor_total, forma_pagamento, produtos, data_criacao } = req.body;

    // Validação básica
    if (!UserId || !status || !valor_total || !forma_pagamento || !Array.isArray(produtos)) {
      return res.status(400).json({ message: 'Dados inválidos para criar pedido' });
    }

    // Validação da data_criacao, se enviada
    let dataCriacaoFinal;
    if (data_criacao) {
      const data = new Date(data_criacao);
      if (isNaN(data.getTime())) {
        return res.status(400).json({ message: 'data_criacao inválida' });
      }
      dataCriacaoFinal = data;
    }

    // Criar pedido
    const order = await Order.create({
      UserId,
      status,
      valor_total,
      forma_pagamento,
      data_criacao: dataCriacaoFinal,
    });

    // Associar produtos ao pedido
    for (const produto of produtos) {
      const { ProductId, quantidade } = produto;
      if (typeof ProductId !== 'number' || typeof quantidade !== 'number') {
        return res.status(400).json({ message: 'Produto com campos inválidos' });
      }
      await order.addProduct(ProductId, { through: { quantidade } });
    }

    // Retornar pedido criado com dados completos
    const novoPedido = await Order.findByPk(order.OrderId, {include: orderIncludes });
    res.status(201).json(novoPedido);
  } catch (error) {
    console.error('Erro ao criar pedido:', error);
    res.status(500).json({ message: 'Erro ao criar pedido' });
  }
})

// Atualizar pedido e seus produtos
router.put('/:id', validateIdParam, async (req, res) => {
  try {
    const { id } = req.params;
    const { status, valor_total, forma_pagamento, produtos } = req.body

    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ message: 'Pedido não encontrado' });
    }

    // Atualiza apenas os campos do pedido (sem UserId)
    await order.update({ status, valor_total, forma_pagamento });

    if (Array.isArray(produtos)) {
      // Remove associações antigas
      await OrderProduct.destroy({ where: { OrderId: id } });

      // Insere novas associações
      for (const produto of produtos) {
        const { ProductId, quantidade } = produto;
        if (typeof ProductId !== 'number' || typeof quantidade !== 'number') {
          return res.status(400).json({ error: 'Produto inválido no array' });
        }
        await OrderProduct.create({ OrderId: id, ProductId, quantidade });
      }
    }

    // Retorna pedido atualizado com detalhes
    const pedidoAtualizado = await Order.findByPk(id, {include: orderIncludes });
    res.json(pedidoAtualizado);
  } catch (error) {
    console.error('Erro ao atualizar pedido com produtos:', error);
    res.status(500).json({ message: 'Erro ao atualizar pedido com produtos', detalhes: error.message });
  }
});

// Deletar pedido e associações
router.delete('/:id', validateIdParam, async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ message: 'Pedido não encontrado' });
    }

    // Remove associações na tabela OrderProduct para evitar órfãos
    await OrderProduct.destroy({ where: { OrderId: id } });
    await order.destroy();

    res.json({ message: 'Pedido removido com sucesso' });
  } catch (error) {
    console.error('Erro ao remover pedido:', error);
    res.status(500).json({ message: 'Erro ao remover pedido', detalhes: error.message });
  }
})

export default router;



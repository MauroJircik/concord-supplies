import { Router } from 'express'
import { OrderProduct, Order, Product } from '../models/index.js'

const router = Router()

//- rota para buscar os itens de Order:
router.get('/', async (req, res) => {
  try {
    const orderProdutos = await OrderProduct.findAll({
      include: [
        { model: Order, attributes: ['OrderId', 'status', 'valor_total', 'forma_pagamento'] },
        { model: Product, attributes: ['ProductId', 'nomeProduct', 'preco_unitario'] },
      ],
    });
    res.json(orderProdutos)
  } catch (error) {
    console.error('Erro ao buscar itens do pedido:', error)
    res.status(500).json({ message: 'Erro ao buscar itens do pedido', detalhes: error.message });
  }
});

//- rota para criar item de Order:
router.post('/', async (req, res) => {
  try {
    const { orderId, productId, quantidade } = req.body;

    if (!orderId || !productId || !quantidade === undefined) {
      return res.status(400).json({ message: 'OrderId, ProductId e quantidade são obrigatórios' });
    }

    const novoItem = await OrderProduct.create({ OrderId: orderId, ProductId: productId, quantidade });
    res.status(201).json(novoItem);
  } catch (error) {
    console.error('Erro ao adicionar item ao pedido:', error)
    res.status(400).json({ message: 'Erro ao adicionar item ao pedido', detalhes: error.message })
  }
});

//- rota para atualizar quantidade do item de Order por id:
router.put('/:orderId/:productId', async (req, res) => {
  try {
    const { orderId, productId } = req.params;
    const { quantidade } = req.body;
    
    const item = await OrderProduct.findOne({ where: { OrderId: orderId, ProductId: productId } })

    if (!item) return res.status(404).json({ message: 'Item do pedido não encontrado' });

    await item.update({ quantidade })
    res.json(item);

  } catch (error) {
    console.error('Erro ao atualizar item do pedido:', error);
    res.status(400).json({ message: 'Erro ao atualizar item do pedido', detalhes:error.message });
  }
});

//- rota para remover item de Order por id:
router.delete('/:orderId/:productId', async (req, res) => {
  try {
    const { orderId, productId } = req.params

    const item = await OrderProduct.findOne({ where: { OrderId: orderId, ProductId: productId } });
    
    if (!item) return res.status(404).json({ message: 'Item do pedido não encontrado' })

    await item.destroy();
    res.json({ message: 'Item do pedido removido com sucesso' });

  } catch (error) {
    console.error('Erro ao remover item do pedido:', error);
    res.status(400).json({ message: 'Erro ao remover item do pedido' });
  }
});

export default router

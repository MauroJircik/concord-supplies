import { Router } from 'express';
import { Product } from '../models/index.js';

const router = Router();
// Listar todos os produtos
router.get('/', async (req, res) => {
  try {
    const produtos = await Product.findAll();
    res.json(produtos);
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    res.status(500).json({ message: 'Erro ao buscar produtos' });
  }
});

// Cadastrar novo produto
router.post('/', async (req, res) => {
  try {
    const { nomeProduct, preco_unitario, descricao, unidade, ativo } = req.body;
    const produto = await Product.create({ nomeProduct, preco_unitario, descricao, unidade, ativo });
    res.status(201).json(produto);
  } catch (error) {
    console.error('Erro ao cadastrar produto:', error);
    res.status(400).json({ message: 'Erro ao cadastrar produto' });
  }
});

// Atualizar produto
router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const produto = await Product.findByPk(id);
    if (!produto) return res.status(404).json({ message: 'Produto não encontrado' });

    const { nomeProduct, preco_unitario, descricao, unidade, ativo } = req.body;

    await produto.update({ nomeProduct, preco_unitario, descricao, unidade, ativo });
    res.json(produto);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao atualizar produto', detalhes: error.message });
  }
});

// Remover produto
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const produto = await Product.findByPk(id);
    if (!produto) return res.status(404).json({ message: 'Produto não encontrado' });

    await produto.destroy();
    res.json({ message: 'Produto removido com sucesso' });
  } catch (error) {
    console.error('Erro ao remover produto:', error);
    res.status(400).json({ message: 'Erro ao remover produto', detalhes: error.message });
  }
});

export default router;


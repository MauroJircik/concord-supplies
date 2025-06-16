// routes/usuario.js
import { Router } from 'express';
import { User } from '../models/index.js';  // Importa o modelo User explicitamente

const router = Router();
// Rota para listar todos os usuários
router.get('/', async (req, res) => {
    try {
        const usuarios = await User.findAll();
        res.json(usuarios);
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
});

// Rota para buscar um usuário por ID
router.get('/:id', async (req, res) => {
    try {
        const usuario = await User.findByPk(req.params.id);
        if (!usuario) {
            return res.status(404).json({ erro: 'Usuário não encontrado' });
        }
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar usuário', detalhes: error.message });
    }
});

// Rota para criar um novo usuário
router.post('/', async (req, res) => {
    try {
        const { nomeUser, email, senha, tipo, ativo } = req.body;
        const novoUsuario = await User.create({ nomeUser, email, senha, tipo, ativo });
        res.status(201).json(novoUsuario);
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        res.status(500).json({ message: 'Erro ao criar usuário' });
    }
});

// Rota para atualizar um usuário existente
router.put('/:id', async (req, res) => {
    try {
        //const id = req.params.id;
        //const { nomeUser, email, senha, tipo, ativo } = req.body;
        const usuario = await User.findByPk(req.params.id);
        if (!usuario) return res.status(404).json({ error: 'Usuário não encontrado' });

        await usuario.update(req.body);
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao atualizar usuário' });
    }
});

// Rota para deletar um usuário
router.delete('/:id', async (req, res) => {
    try {
        //const id = req.params.id;
        const usuario = await User.findByPk(req.params.id);
        if (!usuario) return res.status(404).json({ error: 'Usuário não encontrado' });

        await usuario.destroy();
        res.json({ mensagem: 'Usuário deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao deletar usuário' });
    }
});

export default router;

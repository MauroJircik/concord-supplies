import { Router } from 'express';
import { User } from '../models/index.js';

const router = Router();
//- rota para buscar Usuários:
router.get('/', async (req, res) => {
    try {
        const usuarios = await User.findAll();
        res.json(usuarios);
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
});

//- rota para buscar Usuário por id:
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

//- rota para criar Usuário:
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

//- rota para atualizar Usuário:
router.put('/:id', async (req, res) => {
    try {
        const usuario = await User.findByPk(req.params.id);
        if (!usuario) return res.status(404).json({ error: 'Usuário não encontrado' });

        await usuario.update(req.body);
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao atualizar usuário' });
    }
});

//- rota para deletar Usuário:
router.delete('/:id', async (req, res) => {
    try {
        const usuario = await User.findByPk(req.params.id);
        if (!usuario) return res.status(404).json({ error: 'Usuário não encontrado' });

        await usuario.destroy();
        res.json({ mensagem: 'Usuário deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao deletar usuário' });
    }
});

export default router;

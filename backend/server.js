import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { sequelize } from './models/index.js';

dotenv.config()

// Importa as rotas
import produtoRouter from './routes/produto.js';
import usuarioRouter from './routes/usuario.js';
import orderRouter from './routes/order.js';
import orderProdutoRouter from './routes/orderproduto.js';

const app = express();
app.use(cors());
app.use(express.json());

// Usa as rotas com prefixo de URL
app.use('/produto', produtoRouter);
app.use('/usuario', usuarioRouter);
app.use('/order', orderRouter);
app.use('/orderproduto', orderProdutoRouter);

sequelize.authenticate()
  .then(() => console.log('Conexão com o banco feita com sucesso!'))
  .catch(err => console.error('Erro na conexão:', err));

sequelize.sync({ force: false }).then(() => {
  app.listen(process.env.PORT || 3001, () => {
    console.log('Servidor backend iniciado na porta 3001');
  });
}).catch((error) => {
  console.error('Erro ao conectar no banco:', error);
});


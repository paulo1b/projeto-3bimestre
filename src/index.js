// Importar as bibliotecas necessárias
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const userRoutes = require('./routes/userRoutes');
const storeRoutes = require('./routes/storeRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();
app.use(express.json());
app.use(cors());

// Rota de health check
app.get('/', (req, res) => {
  res.json({ message: 'API Marketplace - AV2 funcionando!', timestamp: new Date().toISOString() });
});

app.use('/users', userRoutes);
app.use('/stores', storeRoutes);
app.use('/products', productRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📍 http://localhost:${PORT}`);
});

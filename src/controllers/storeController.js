// src/controllers/storeController.js
const prisma = require('../db');

// Cria loja (userId único)
exports.create = async (req, res) => {
  try {
    const { name, userId } = req.body;
    
    // Validação básica
    if (!name || !userId) {
      return res.status(400).json({ success: false, error: 'Nome e userId são obrigatórios.' });
    }
    
    const existing = await prisma.store.findUnique({ where: { userId } });
    if (existing) {
      return res.status(400).json({ success: false, error: 'Usuário já possui uma loja.' });
    }
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ success: false, error: 'Usuário não encontrado.' });
    }
    const store = await prisma.store.create({ 
      data: { name, userId },
      include: {
        user: true,
        products: true
      }
    });
    res.status(201).json({ success: true, message: 'Loja criada com sucesso.', data: store });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Lista todas lojas
exports.getAll = async (req, res) => {
  try {
    const stores = await prisma.store.findMany({
      include: {
        user: true,
        products: true
      }
    });
    res.json({ success: true, message: 'Lojas encontradas.', data: stores });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Busca loja por ID
exports.getById = async (req, res) => {
  try {
    const store = await prisma.store.findUnique({ 
      where: { id: Number(req.params.id) },
      include: {
        user: true,
        products: true
      }
    });
    if (!store) return res.status(404).json({ success: false, error: 'Loja não encontrada.' });
    res.json({ success: true, message: 'Loja encontrada.', data: store });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Atualiza loja
exports.update = async (req, res) => {
  try {
    const { name } = req.body;
    const id = Number(req.params.id);
    const store = await prisma.store.update({ where: { id }, data: { name } });
    res.json({ success: true, message: 'Loja atualizada.', data: store });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Deleta loja
exports.delete = async (req, res) => {
  try {
    await prisma.store.delete({ where: { id: Number(req.params.id) } });
    res.json({ success: true, message: 'Loja deletada.' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

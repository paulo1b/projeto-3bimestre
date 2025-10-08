// src/controllers/userController.js
const prisma = require('../db');

// Cria usuário (valida e-mail único)
exports.create = async (req, res) => {
  try {
    const { email, name } = req.body;
    
    // Validação básica
    if (!email || !name) {
      return res.status(400).json({ success: false, error: 'Nome e e-mail são obrigatórios.' });
    }
    
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(400).json({ success: false, error: 'E-mail já cadastrado.' });
    }
    const user = await prisma.user.create({ data: { email, name } });
    res.status(201).json({ success: true, message: 'Usuário criado com sucesso.', data: user });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Lista todos usuários
exports.getAll = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        store: {
          include: {
            products: true
          }
        }
      }
    });
    res.json({ success: true, message: 'Usuários encontrados.', data: users });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Busca usuário por ID
exports.getById = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({ 
      where: { id: Number(req.params.id) },
      include: {
        store: {
          include: {
            products: true
          }
        }
      }
    });
    if (!user) return res.status(404).json({ success: false, error: 'Usuário não encontrado.' });
    res.json({ success: true, message: 'Usuário encontrado.', data: user });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Atualiza usuário
exports.update = async (req, res) => {
  try {
    const { email, name } = req.body;
    const id = Number(req.params.id);
    if (email) {
      const existing = await prisma.user.findUnique({ where: { email } });
      if (existing && existing.id !== id) {
        return res.status(400).json({ success: false, error: 'E-mail já cadastrado.' });
      }
    }
    const user = await prisma.user.update({ where: { id }, data: { email, name } });
    res.json({ success: true, message: 'Usuário atualizado.', data: user });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Deleta usuário
exports.delete = async (req, res) => {
  try {
    await prisma.user.delete({ where: { id: Number(req.params.id) } });
    res.json({ success: true, message: 'Usuário deletado.' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

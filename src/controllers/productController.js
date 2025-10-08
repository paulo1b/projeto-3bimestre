// src/controllers/productController.js
const prisma = require('../db');

// Cria produto (vinculado a Store existente)
exports.create = async (req, res) => {
  try {
    const { name, price, storeId } = req.body;
    
    // Validação básica
    if (!name || !price || !storeId) {
      return res.status(400).json({ success: false, error: 'Nome, preço e storeId são obrigatórios.' });
    }
    
    const store = await prisma.store.findUnique({ where: { id: storeId } });
    if (!store) {
      return res.status(404).json({ success: false, error: 'Loja não encontrada.' });
    }
    
    const product = await prisma.product.create({ 
      data: { name, price: parseFloat(price), storeId },
      include: {
        store: {
          include: {
            user: true
          }
        }
      }
    });
    res.status(201).json({ success: true, message: 'Produto criado com sucesso.', data: product });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Lista todos produtos
exports.getAll = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        store: {
          include: {
            user: true
          }
        }
      }
    });
    res.json({ success: true, message: 'Produtos encontrados.', data: products });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Busca produto por ID
exports.getById = async (req, res) => {
  try {
    const product = await prisma.product.findUnique({ 
      where: { id: Number(req.params.id) },
      include: {
        store: {
          include: {
            user: true
          }
        }
      }
    });
    if (!product) return res.status(404).json({ success: false, error: 'Produto não encontrado.' });
    res.json({ success: true, message: 'Produto encontrado.', data: product });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Atualiza produto
exports.update = async (req, res) => {
  try {
    const { name, price, storeId } = req.body;
    const id = Number(req.params.id);
    if (storeId) {
      const store = await prisma.store.findUnique({ where: { id: storeId } });
      if (!store) {
        return res.status(404).json({ success: false, error: 'Loja não encontrada.' });
      }
    }
    const product = await prisma.product.update({ where: { id }, data: { name, price, storeId } });
    res.json({ success: true, message: 'Produto atualizado.', data: product });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Deleta produto
exports.delete = async (req, res) => {
  try {
    await prisma.product.delete({ where: { id: Number(req.params.id) } });
    res.json({ success: true, message: 'Produto deletado.' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

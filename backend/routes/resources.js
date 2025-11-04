const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const SECRET = 'mysecretkey';

let resources = [
  { id: 1, name: 'Água', description: 'Água potável', quantity: 100 },
  { id: 2, name: 'Máscaras', description: 'Máscaras cirúrgicas', quantity: 200 }
];

// Middleware de autenticação
const authenticate = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token não fornecido' });

  try {
    jwt.verify(token, SECRET);
    next();
  } catch {
    res.status(403).json({ message: 'Token inválido' });
  }
};

// Listar todos os recursos
router.get('/resources', authenticate, (req, res) => {
  res.json(resources);
});

// Detalhes de um recurso específico
router.get('/resources/:id', authenticate, (req, res) => {
  const resource = resources.find(r => r.id == req.params.id);
  if (!resource) return res.status(404).json({ message: 'Recurso não encontrado' });
  res.json(resource);
});

// Adicionar um novo recurso
router.post('/resources', authenticate, (req, res) => {
  const { name, description, quantity } = req.body;
  const newResource = { id: resources.length + 1, name, description, quantity };
  resources.push(newResource);
  res.json(newResource);
});

module.exports = router;


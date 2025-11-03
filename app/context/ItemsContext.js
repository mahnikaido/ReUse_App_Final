// app/context/ItemsContext.js
import React, { createContext, useState } from 'react';

// 🔹 Cria o contexto global para os itens
export const ItemsContext = createContext();

export const ItemsProvider = ({ children }) => {
  // 🔸 Estado inicial com alguns itens de exemplo
  const [items, setItems] = useState([
    {
      id: '1',
      name: 'Cadeira de Escritório',
      description: 'Cadeira confortável, em bom estado.',
      image: null,
    },
    {
      id: '2',
      name: 'Monitor Samsung 24"',
      description: 'Tela Full HD, ótimo para estudos e trabalho.',
      image: null,
    },
  ]);

  // ✅ Adiciona um novo item (com ou sem imagem)
  const addItem = (newItem) => {
    setItems((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        name: newItem.name || 'Sem nome',
        description: newItem.description || 'Sem descrição',
        image: newItem.image || null,
      },
    ]);
  };

  // 🗑️ Remove um item
  const removeItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  // ✏️ Atualiza um item existente
  const updateItem = (id, updatedFields) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, ...updatedFields } : item
      )
    );
  };

  return (
    <ItemsContext.Provider value={{ items, addItem, removeItem, updateItem }}>
      {children}
    </ItemsContext.Provider>
  );
};






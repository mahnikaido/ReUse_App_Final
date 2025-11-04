const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Rota de teste
app.get('/', (req, res) => {
  res.send('🚀 Backend do ReUseApp rodando!');
});

app.listen(3000, '0.0.0.0', () => {
  console.log('✅ Server running on http://192.168.15.7:3000');
});







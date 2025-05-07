const express = require('express');
const fs = require('fs');
const path = require('path');
const swaggerUi = require('swagger-ui-express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Swagger dokümantasyonu için JSON dosyasını yükle
let swaggerDocument;
try {
  const swaggerPath = path.join(__dirname, 'docs', 'swagger.json');
  swaggerDocument = JSON.parse(fs.readFileSync(swaggerPath, 'utf8'));
} catch (error) {
  console.error('swagger.json yüklenirken hata oluştu:', error);
  swaggerDocument = {
    openapi: '3.0.0',
    info: {
      title: 'nodejs_hw_07',
      version: '1.0.0',
      description: 'API dokümantasyonu oluşturuluyor...'
    }
  };
}

// Swagger UI için API Dökümantasyonu
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// ReDoc statik dosyaları
app.use('/docs', express.static(path.join(__dirname, 'docs')));
app.get('/docs', (req, res) => {
  res.sendFile(path.join(__dirname, 'docs', 'index.html'));
});

// Ana sayfa
app.get('/', (req, res) => {
  res.send(`
    <h1>Rehber API - Swagger Dokümantasyon Ödevi</h1>
    <p>API dokümantasyonuna aşağıdaki bağlantılardan ulaşabilirsiniz:</p>
    <ul>
      <li><a href="/api-docs">Swagger UI</a></li>
      <li><a href="/docs">ReDoc</a></li>
    </ul>
  `);
});

// Contacts API rotaları
const contacts = [
  { id: "1", name: "John Doe", email: "john@example.com", phone: "555-1234" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", phone: "555-5678" }
];

// GET /contacts - Tüm kişileri listeleme
app.get('/contacts', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  
  const paginatedContacts = contacts.slice(startIndex, endIndex);
  
  res.json(paginatedContacts);
});

// GET /contacts/:contactId - Belirli bir kişiyi getirme
app.get('/contacts/:contactId', (req, res) => {
  const contact = contacts.find(c => c.id === req.params.contactId);
  if (!contact) {
    return res.status(404).json({ message: "Kişi bulunamadı" });
  }
  res.json(contact);
});

// POST /contacts - Yeni kişi ekleme
app.post('/contacts', (req, res) => {
  const newContact = {
    id: Date.now().toString(),
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone
  };
  contacts.push(newContact);
  res.status(201).json(newContact);
});

// PATCH /contacts/:contactId - Kişi bilgilerini güncelleme
app.patch('/contacts/:contactId', (req, res) => {
  const contact = contacts.find(c => c.id === req.params.contactId);
  if (!contact) {
    return res.status(404).json({ message: "Kişi bulunamadı" });
  }
  
  if (req.body.name) contact.name = req.body.name;
  if (req.body.email) contact.email = req.body.email;
  if (req.body.phone) contact.phone = req.body.phone;
  
  res.json(contact);
});

// DELETE /contacts/:contactId - Kişi silme
app.delete('/contacts/:contactId', (req, res) => {
  const contactIndex = contacts.findIndex(c => c.id === req.params.contactId);
  if (contactIndex === -1) {
    return res.status(404).json({ message: "Kişi bulunamadı" });
  }
  
  contacts.splice(contactIndex, 1);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Swagger UI: http://localhost:${PORT}/api-docs`);
  console.log(`ReDoc: http://localhost:${PORT}/docs`);
});
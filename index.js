import express from 'express';
import cors from 'cors'
import { a } from 'framer-motion/client';
import morgan from 'morgan'

const app = express();


app.use(express.json()); // Middleware para parsear JSON
app.use(cors()); // Middleware para habilitar CORS
app.use(morgan('tiny')) // Middleware para registrar solicitudes HTTP

morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


app.use(express.static('dist')) // Servir archivos estáticos desde la carpeta 'dist'





// Datos iniciales.
let persons = [
  { id: 1, name: "Arto Hellas", number: "040-123456" },
  { id: 2, name: "Ada Lovelace", number: "39-44-5323523" },
  { id: 3, name: "Dan Abramov", number: "12-43-234345" },
  { id: 4, name: "Mary Poppendieck", number: "39-23-6423122" }
];

// Generar un id nuevo
const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(n => n.id))
    : 0;
  return maxId + 1;
};

// Rutas
app.get('/api/persons', (req, res) => { // Obtiene todos los contactos desde el servidor y devuelve los datos
  res.json(persons);
});

app.get('/info', (req, res) => {  // Muestra información sobre el número de contactos y la fecha actual
  const info = `<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`;
  res.send(info);
});

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find(p => p.id === id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter(p => p.id !== id);
  res.status(204).end();
});

app.post('/api/persons', (req, res) => { // Crea un nuevo contacto con el objeto proporcionado
  const request = req.body;

  // Validar que el nombre esté presente
  if (!request.name) {
    return res.status(400).json({ error: 'name is missing' });
  }

  // Validar que el número esté presente
  if (!request.number) {
    return res.status(400).json({ error: 'number is missing' });
  }

  // Validar que el nombre sea único
  if (persons.find(p => p.name === request.name)) {
    return res.status(400).json({ error: 'name must be unique' });
  }

  // Generar una persona + id nuevo
  const person = {
    id: generateId(),
    name: request.name,
    number: request.number
  };

  persons = persons.concat(person);
  res.json(person);
});


app.put('/api/persons/:id', (req, res) => { // Actualiza el contacto con el id especificado
  const id = Number(req.params.id)
  const { name, number } = req.body

  const personIndex = persons.findIndex(p => p.id === id)
  if (personIndex === -1) {
    return res.status(404).json({ error: 'Person not found' })
  }

  // Validar que el nombre sea único (excluyendo el contacto actual)
const nameExists = persons.some(p => p.name === name && p.id !== id);
  if (nameExists) {
    return res.status(400).json({ error: 'name must be unique' });
  }

  const updatedPerson = { ...persons[personIndex], name, number };
  persons[personIndex] = updatedPerson;
  res.json(updatedPerson);
});

const unknownEndpoint = (request, response) => { // Middleware para manejar endpoints desconocidos
  response.status(404).send({ error: 'unknown endpoint' })
}

app.get('/api/persons', (req, res) => { // Obtiene todos los contactos desde el servidor y devuelve los datos
  res.json(persons);
});

app.use(unknownEndpoint)

 

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
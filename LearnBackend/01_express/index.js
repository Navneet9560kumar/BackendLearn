import express from 'express';

const app = express();

const port = 3000;

app.use(express.json());

let tapdata = [];
let nextId = 1;

app.post('/mag', (req, res) => {
  const { name, price } = req.body;
  const newMas = { id: nextId++, name, price };
  tapdata.push(newMas);
  res.status(201).send(newMas);
});

app.get('/mag', (req, res) => {
  res.status(200).send(tapdata);
});

app.get('/teas/:id', (req, res) => {
  const tea = tapdata.find(t => t.id === parseInt(req.params.id));

  if (!tea) {
    return res.status(400).send('Tea is not found');
  }
  res.status(200).send(tea);
});

// update
app.put('/teas/:id', (req, res) => {
  const tea = tapdata.find(t => t.id === parseInt(req.params.id));

  if (!tea) {
    return res.status(400).send('Tea is not found');
  }

  const { name, price } = req.body;
  tea.name = name;
  tea.price = price;
  res.status(200).send(tea);  // Corrected this line
});

// delete tea
app.delete('/teas/:id', (req, res) => {
  const index = tapdata.findIndex(t => t.id === parseInt(req.params.id));
  
  if (index === -1) {
    return res.status(404).send('Tea not found');
  }
  
  tapdata.splice(index, 1);
  return res.status(204).send();  // Corrected this line
});

app.listen(port, () => {
  console.log(`Server is running at port: ${port}...`);
});

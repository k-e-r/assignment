const express = require('express');
const app = express();

const PORT = 5000;

const studentInfo = [
  {
    id: 1,
    name: 'name1',
    age: 12,
  },
  {
    id: 2,
    name: 'name2',
    age: 14,
  },
];

app.get('/', (req, res) => {
  res.send('<h1>Hello!</h1>');
});

app.get('/students', (req, res) => {
  res.send(studentInfo);
});

app.get('/students/:id', (req, res) => {
  const findStudent = studentInfo.find(
    (student) => student.id.toString() === req.params.id
  );
  res.send(findStudent);
});

app.listen(PORT);

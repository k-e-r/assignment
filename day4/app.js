const express = require('express');
const app = express();

// This middleware converts incoming data to json format
app.use(express.json());

const PORT = 5000;

const studentInfo = [
  {
    name: 'name1',
    college: 'CICCC',
    age: 22,
    number: Math.floor(Math.random() * 100),
  },
  {
    name: 'name2',
    college: 'langara',
    age: 24,
    number: Math.floor(Math.random() * 100),
  },
  {
    name: 'name3',
    college: 'BCIT',
    age: 26,
    number: Math.floor(Math.random() * 100),
  },
];

app.get('/', (req, res) => {
  res.send('<h1>Hello!</h1>');
});

app.get('/students', (req, res) => {
  res.send(studentInfo);
});

app.post('/students', (req, res) => {
  console.log(req.body);
  const incomingData = req.body;

  if (!incomingData.name || !incomingData.college || !incomingData.age) {
    return res.status(500).json({
      message: 'One of the information is missing!',
    });
  }

  studentInfo.push({
    ...incomingData,
    number: Math.floor(Math.random() * 100),
  });

  return res.status(201).json({
    message: 'Succesfully created a studentInfo!',
    data: incomingData,
  });
});

app.get('/students/:id', (req, res) => {
  const findStudent = studentInfo.find(
    (student) => student.number === +req.params.id
  );
  res.send(findStudent);
});

app.put('/students/:id', (req, res) => {
  const incomingData = req.body;
  const number = req.params.id;

  if (!incomingData.name || !incomingData.college || !incomingData.age) {
    return res.status(500).json({
      message: 'One of the information is missing!',
    });
  }

  let updatedStudents = studentInfo.map((student) => {
    if (student.number === +number) {
      student = incomingData;
    }
    return student;
  });

  return res.status(200).json({
    message: 'Succesfully updated the studentInfo!',
    data: updatedStudents,
  });
});

// DELETE API
app.delete('/students/:id', (req, res) => {
  const number = req.params.id;

  let index = studentInfo.findIndex((student) => student.number == number);

  if (index === -1) {
    return res.status(404).json({
      message: 'Given post not found!',
    });
  } else {
    studentInfo.splice(index, 1);
  }

  return res.status(200).json({
    message: 'Succesfully deleted',
    data: studentInfo,
  });
});

app.listen(PORT);

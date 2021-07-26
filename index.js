const { response } = require('express');
const express = require('express');
const app = express();
const port = process.env.PORT;

//---Added to work with body of request---//
const bodyParser = require('body-parser');
app.use(bodyParser.json());
//---Added to work with body of request---//

const models = require('./models');
// const User = models.User;
const Todo = models.Todo;

////////////////////////
const Sequelize = require('sequelize');
const sequelize = new Sequelize('dev_test_db', 'student', '', {
  dialect: 'postgres',
});
////////////////////////

app.get('/', (req, res) => {
  res.send('Hello from EXPRESS!');
});

//--- Getting todos from my database ---//
// app.get('/users', async (req, res) => {
app.get('/todos', async (req, res) => {
  //   const users = await User.findAll();
  const todos = await Todo.findAll();

  //   res.json({ users });
  res.json({ todos });

  console.log(todos);
});
//--- Getting todos from my database ---//

app.listen(port, () => {
  console.log(`App is listening at http://localhost:${port}`);
});

//--- Adding todos to my database ---//
// app.post('/todos', (req, res) => {
//   Todo.create({
//     name: req.body.name,
//     isDone: false,
//     // }).then((todo) => {
//   }).then((todo) => {
//     res.json(todo);
//   });
// });
//--- Adding todos to my database ---//

app.delete('/todos/:id', async (req, res) => {
  try {
    await Todo.destroy({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (e) {
    res.status(500).send({ message: 'Something wrong!' });
  }
});

// const jane = await User.create({ name: 'Jane' });
// console.log(jane.name); // "Jane"
// await jane.destroy();
// // Now this entry was removed from the database

// app.patch('/todos/:id', bodyParser.json(), async (req, res) => {
//   try {
//     const todo = await Todo.findOne({ id: req.params.id });

//     if (req.body.name) {
//       todo.name = req.body.name;
//       await todo.save();
//     }

//     res.send(todo);
//   } catch (e) {
//     console.log(e);
//     res.status(404).send({ message: "Todo doesn't exist!" });
//   }
// });

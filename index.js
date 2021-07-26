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

//--- Getting all todos from my database ---//
// app.get('/users', async (req, res) => {
app.get('/todos', async (req, res) => {
  //   const users = await User.findAll();
  const todos = await Todo.findAll();

  //   res.json({ users });
  res.json({ todos });

  console.log(todos);
});
//--- Getting all todos from my database ---//

app.listen(port, () => {
  console.log(`App is listening at http://localhost:${port}`);
});

//--- Adding a todo to my database ---//
app.post('/todos', (req, res) => {
  Todo.create({
    name: req.body.name,
    isDone: false,
  }).then((todo) => {
    res.json(todo);
  });
});
//--- Adding a todo to my database ---//

//--- Deleting the certain todo by it's id ---//
app.delete('/todos/:id', async (req, res) => {
  try {
    await Todo.destroy({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (e) {
    res.status(500).send({ message: 'Something wrong!' });
  }
});
//--- Deleting the certain todo by it's id ---//

// app.patch('/todos/:id', bodyParser.json(), async (req, res) => {
app.patch('/todos/:id', async (req, res) => {
  try {
    const todo = await Todo.findByPk(req.params.id);

    //     if (req.body.name) {
    if (todo) {
      todo.name = req.body.name;
      await todo.save().then((todo) => {
        res.json(todo);
      });
    }

    res.send(todo);
  } catch (e) {
    console.log(e);
    res.status(404).send({ message: "Todo doesn't exist!" });
  }
});

/////////
// If you change the value of some field of an instance, calling save again will update it accordingly:

// const jane = await User.create({ name: "Jane" });
// console.log(jane.name); // "Jane"
// jane.name = "Ada";
// // the name is still "Jane" in the database
// await jane.save();
// // Now the name was updated to "Ada" in the database!
// /////////

const { response } = require('express');
const express = require('express');
const app = express();
const port = process.env.PORT;

//---Added to work with body of request---//
const bodyParser = require('body-parser');
app.use(bodyParser.json());
//---Added to work with body of request---//

const models = require('./models');
const Todo = models.Todo;

const Sequelize = require('sequelize');
const sequelize = new Sequelize('dev_test_db', 'student', '', {
  dialect: 'postgres',
});

app.listen(port, () => {
  console.log(`App is listening at http://localhost:${port}`);
});

app.get('/', (req, res) => {
  res.send('Hello from EXPRESS!');
});

//--- Getting all todos from my database ---//
app.get('/todos', async (req, res) => {
  const todos = await Todo.findAll();
  res.json({ todos });

  console.log(todos);
});
//--- Getting all todos from my database ---//

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

////////////////////////////////////////////////
//--- Deleting all todos ---//
app.delete('/todos', async (req, res) => {
  try {
    if (Todo) {
      await Todo.destroy({
        where: {},
        // truncate: true,
      });

      // res.json({ todos });

      res.status(204).send();
    }
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: 'Something wrong!' });
  }
});

// db.User.destroy({
//   where: {},
//   truncate: true,
// });
//--- Deleting all todos ---//
////////////////////////////////////////////////

//--- Updating the certain todo by it's id ---//
app.patch('/todos/:id', async (req, res) => {
  try {
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
//--- Updating the certain todo by it's id ---//

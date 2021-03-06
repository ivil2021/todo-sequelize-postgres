// 1. npm init -y
// 2. npm i express body-parser dotenv sequelize pg
// 3. npm i -D nodemon sequelize-cli
// 4. Create .env file (do not commit this file!)
// 5. ./node_modules/.bin/sequelize-cli init //sequelize-cli is not a global package, so run it from node_modules folder or use 'npx sequelize-cli init'
//    - config — contains config file, which tells CLI how to connect with database
//    - migrations — contains all migration files
//    - models — contains all models for your project
//    - seeders — contains all seed files
// 6. rename config/config.json to config/config.js and update the code
// 7. create package.json scripts:
//    - "start:dev": "nodemon -r dotenv/config index.js",
//    - "db:create": "sequelize-cli db:create"
// 7. npm run db:create //creates development database
//    - ./node_modules/.bin/sequelize-cli --env test db:create //creates test database
//    - ./node_modules/.bin/sequelize-cli --env production db:create //creates production database
// 8. DUMP:
//    - pg_dump --help
//    - pg_dump -f sequelize_database_development.sql sequelize_database_development
// 9. Model: ./node_modules/.bin/sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string
//    - creates models/user.js
//    - creates migrations/XXXXXXXXXXXXXX-create-user.js (Treat migrations like a log of changes in the database.)
// 10. create package.json scripts:
//    - "db:migrate": "sequelize-cli db:migrate",
//    - "db:g:migration": "sequelize-cli migration:generate --name"
// 11. npm run db:migrate
//    - Users table is created (note that id is generated by default)
//    - SequelizeMeta table is created (contains migrations info)
// 12. Seeders (Seed files are used to populate database tables with sample data)
//    - add package.json scripts: "db:seeds": "sequelize-cli db:seed:all", "db:g:seed": "sequelize-cli seed:generate --name" (db:g:seed generates a migration file template)
//    - npm run db:g:seed sample-users (creates a seed file seeders/XXXXXXXXXXXXXX-sample-users.js)
//    - update the seeder file (The up() and down() functions are included in every migration file, allowing us to define our desired database changes. The up() function defines the new change, and the down() function defines how to undo the change)
//    - npm run db:seed:all (inserts data in to the Users table)
// 13. Updating Model
//    - npm run db:g:migration addPassword (migrations/XXXXXXXXXXXXXX-addPassword.js is created)
//    - update models/user.js to contain password attribute
// 14. Get data:
//    - update models/index.js: const config = require(__dirname + "/../config/config")[env]; (remove 'json' because our config file is a js file)
//    - const models = require("./models"); //loads models to the app
//    - const User = models.User;
// 15. nodejs app debugger: https://github.com/microsoft/vscode-recipes/tree/main/nodemon
//    - npm run debug
//    - launch.json
//      {
//        "version": "0.2.0",
//        "configurations": [
//            {
//                "type": "node",
//                "request": "attach",
//                "name": "Node: Nodemon",
//                "processId": "${command:PickProcess}",
//               "restart": true,
//                "protocol": "inspector",
//            },
//        ]
//      }
// 16. pg_dump -f sequelize_database_development.sql sequelize_database_development

const express = require('express');
const app = express();
const port = process.env.PORT;

const models = require('./models');
// const User = models.User;
const Todo = models.Todo;

app.get('/', (req, res) => {
  res.send('Hello from EXPRESS!');
});

app.get('/todos', async (req, res) => {
  //   const users = await User.findAll();
  if (todos) {
    console.log(todos);
    const users = await Todo.findAll();
  }

  //   res.json({ users });
  res.json({ todos });
});

app.listen(port, () => {
  console.log(`App is listening at http://localhost:${port}`);
});

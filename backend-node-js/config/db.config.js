const path = require('path');

//require('dotenv').config(); // this is important!

module.exports = {
  "development": {
    // "username": "root",
    // "password": null,
    // "database": "database_development",
    // "host": "127.0.0.1",
    // "dialect": "mysql"
    "dialect": "sqlite",
    "storage": path.join(__dirname, '/../dbfile/database.sqlite')
  },
  "test": {
    // "username": "root",
    // "password": null,
    // "database": "database_test",
    // "host": "127.0.0.1",
    // "dialect": "mysql"
    "dialect": "sqlite",
    "storage": path.join(__dirname, '/../dbfile/database.sqlite')
  },
  "production": {
    // "username": "root",
    // "password": null,
    // "database": "database_production",
    // "host": "127.0.0.1",
    // "dialect": "mysql"
    "dialect": "sqlite",
    "storage": path.join(__dirname, '/../dbfile/database.sqlite')
  }
}

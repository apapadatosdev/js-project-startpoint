const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * removeColumn(host) => "events"
 * createTable() => "categories", deps: []
 * createTable() => "taskassignees", deps: []
 * createTable() => "eventattendees", deps: [events, users]
 * addColumn(hostId) => "events"
 * addColumn(categoryId) => "events"
 *
 */

const info = {
  revision: 6,
  name: "foreignrelationships",
  created: "2022-08-04T15:34:58.641Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "removeColumn",
    params: ["events", "host", { transaction }],
  },
  {
    fn: "createTable",
    params: [
      "categories",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        title: { type: Sequelize.STRING, field: "title", allowNull: false },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "taskassignees",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "eventattendees",
      {
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
        eventId: {
          type: Sequelize.INTEGER,
          field: "eventId",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "events", key: "id" },
          primaryKey: true,
        },
        userId: {
          type: Sequelize.INTEGER,
          field: "userId",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "users", key: "id" },
          primaryKey: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "addColumn",
    params: [
      "events",
      "hostId",
      {
        type: Sequelize.INTEGER,
        field: "hostId",
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
        references: { model: "users", key: "id" },
        allowNull: true,
      },
      { transaction },
    ],
  },
  {
    fn: "addColumn",
    params: [
      "events",
      "categoryId",
      {
        type: Sequelize.INTEGER,
        field: "categoryId",
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
        references: { model: "categories", key: "id" },
        allowNull: true,
      },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "removeColumn",
    params: ["events", "hostId", { transaction }],
  },
  {
    fn: "removeColumn",
    params: ["events", "categoryId", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["categories", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["eventattendees", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["taskassignees", { transaction }],
  },
  {
    fn: "addColumn",
    params: [
      "events",
      "host",
      { type: Sequelize.STRING, field: "host", allowNull: true },
      { transaction },
    ],
  },
];

const pos = 0;
const useTransaction = true;

const execute = (queryInterface, sequelize, _commands) => {
  let index = pos;
  const run = (transaction) => {
    const commands = _commands(transaction);
    return new Promise((resolve, reject) => {
      const next = () => {
        if (index < commands.length) {
          const command = commands[index];
          console.log(`[#${index}] execute: ${command.fn}`);
          index++;
          queryInterface[command.fn](...command.params).then(next, reject);
        } else resolve();
      };
      next();
    });
  };
  if (useTransaction) return queryInterface.sequelize.transaction(run);
  return run(null);
};

module.exports = {
  pos,
  useTransaction,
  up: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, migrationCommands),
  down: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, rollbackCommands),
  info,
};

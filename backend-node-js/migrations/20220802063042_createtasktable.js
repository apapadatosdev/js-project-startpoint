const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * createTable() => "events", deps: []
 * createTable() => "tasks", deps: []
 *
 */

const info = {
  revision: 1,
  name: "createtasktable",
  created: "2022-08-02T06:30:42.013Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "createTable",
    params: [
      "events",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        title: { type: Sequelize.STRING, field: "title", allowNull: false },
        description: {
          type: Sequelize.STRING,
          field: "description",
          allowNull: true,
        },
        created_by: {
          type: Sequelize.STRING,
          field: "created_by",
          allowNull: false,
        },
        updated_by: {
          type: Sequelize.STRING,
          field: "updated_by",
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
      "tasks",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        title: { type: Sequelize.STRING, field: "title", allowNull: false },
        description: {
          type: Sequelize.STRING,
          field: "description",
          allowNull: true,
        },
        created_by: {
          type: Sequelize.STRING,
          field: "created_by",
          allowNull: false,
        },
        updated_by: {
          type: Sequelize.STRING,
          field: "updated_by",
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
];

const rollbackCommands = (transaction) => [
  {
    fn: "dropTable",
    params: ["events", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["tasks", { transaction }],
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

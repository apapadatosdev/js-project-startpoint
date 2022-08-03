const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * createTable() => "users", deps: []
 * addColumn(host) => "events"
 * addColumn(start_time) => "events"
 * addColumn(duration) => "events"
 * addColumn(status) => "tasks"
 * addColumn(public) => "tasks"
 * addColumn(deadline) => "tasks"
 *
 */

const info = {
  revision: 2,
  name: "usertable",
  created: "2022-08-03T06:52:14.609Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "createTable",
    params: [
      "users",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING,
          field: "email",
          unique: true,
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING,
          field: "password",
          allowNull: false,
        },
        firstname: {
          type: Sequelize.STRING,
          field: "firstname",
          allowNull: true,
        },
        lastname: {
          type: Sequelize.STRING,
          field: "lastname",
          allowNull: true,
        },
        provider: {
          type: Sequelize.STRING,
          field: "provider",
          allowNull: false,
        },
        providerId: {
          type: Sequelize.STRING,
          field: "providerId",
          allowNull: false,
        },
        profilePhoto: {
          type: Sequelize.STRING,
          field: "profilePhoto",
          allowNull: false,
        },
        activationCode: {
          type: Sequelize.STRING,
          field: "activationCode",
          allowNull: false,
        },
        isActivated: {
          type: Sequelize.BOOLEAN,
          field: "isActivated",
          allowNull: false,
        },
        activationDate: {
          type: Sequelize.BOOLEAN,
          field: "activationDate",
          allowNull: true,
        },
        passwordResetCode: {
          type: Sequelize.STRING,
          field: "passwordResetCode",
          allowNull: true,
        },
        passwordResetCodeCreationDate: {
          type: Sequelize.STRING,
          field: "passwordResetCodeCreationDate",
          allowNull: true,
        },
        passwordResetDate: {
          type: Sequelize.DATE,
          field: "passwordResetDate",
          allowNull: true,
        },
        isDisabled: {
          type: Sequelize.BOOLEAN,
          field: "isDisabled",
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
    fn: "addColumn",
    params: [
      "events",
      "host",
      { type: Sequelize.STRING, field: "host", allowNull: true },
      { transaction },
    ],
  },
  {
    fn: "addColumn",
    params: [
      "events",
      "start_time",
      { type: Sequelize.DATE, field: "start_time", allowNull: false },
      { transaction },
    ],
  },
  {
    fn: "addColumn",
    params: [
      "events",
      "duration",
      { type: Sequelize.INTEGER, field: "duration", allowNull: false },
      { transaction },
    ],
  },
  {
    fn: "addColumn",
    params: [
      "tasks",
      "status",
      { type: Sequelize.STRING, field: "status", allowNull: false },
      { transaction },
    ],
  },
  {
    fn: "addColumn",
    params: [
      "tasks",
      "public",
      { type: Sequelize.BOOLEAN, field: "public", allowNull: false },
      { transaction },
    ],
  },
  {
    fn: "addColumn",
    params: [
      "tasks",
      "deadline",
      { type: Sequelize.DATEONLY, field: "deadline", allowNull: true },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "removeColumn",
    params: ["events", "host", { transaction }],
  },
  {
    fn: "removeColumn",
    params: ["events", "start_time", { transaction }],
  },
  {
    fn: "removeColumn",
    params: ["events", "duration", { transaction }],
  },
  {
    fn: "removeColumn",
    params: ["tasks", "status", { transaction }],
  },
  {
    fn: "removeColumn",
    params: ["tasks", "public", { transaction }],
  },
  {
    fn: "removeColumn",
    params: ["tasks", "deadline", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["users", { transaction }],
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

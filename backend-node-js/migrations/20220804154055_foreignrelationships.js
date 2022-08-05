const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * removeColumn(id) => "taskassignees"
 * addColumn(categoryId) => "tasks"
 * addColumn(userId) => "taskassignees"
 * addColumn(taskId) => "taskassignees"
 *
 */

const info = {
  revision: 7,
  name: "foreignrelationships",
  created: "2022-08-04T15:40:55.211Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "removeColumn",
    params: ["taskassignees", "id", { transaction }],
  },
  {
    fn: "addColumn",
    params: [
      "tasks",
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
  // {
  //   fn: "addColumn",
  //   params: [
  //     "taskassignees",
  //     "userId",
  //     {
  //       type: Sequelize.INTEGER,
  //       field: "userId",
  //       onUpdate: "CASCADE",
  //       onDelete: "CASCADE",
  //       references: { model: "users", key: "id" },
  //       primaryKey: true,
  //     },
  //     { transaction },
  //   ],
  // },
  // {
  //   fn: "addColumn",
  //   params: [
  //     "taskassignees",
  //     "taskId",
  //     {
  //       type: Sequelize.INTEGER,
  //       field: "taskId",
  //       onUpdate: "CASCADE",
  //       onDelete: "CASCADE",
  //       references: { model: "tasks", key: "id" },
  //       primaryKey: true,
  //     },
  //     { transaction },
  //   ],
  // },
];

const rollbackCommands = (transaction) => [
  {
    fn: "removeColumn",
    params: ["tasks", "categoryId", { transaction }],
  },
  {
    fn: "removeColumn",
    params: ["taskassignees", "userId", { transaction }],
  },
  {
    fn: "removeColumn",
    params: ["taskassignees", "taskId", { transaction }],
  },
  {
    fn: "addColumn",
    params: [
      "taskassignees",
      "id",
      {
        type: Sequelize.INTEGER,
        field: "id",
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
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

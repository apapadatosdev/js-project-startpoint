const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * changeColumn(updated_by) => "tasks"
 * changeColumn(created_by) => "tasks"
 *
 */

const info = {
  revision: 8,
  name: "useraudtointeger",
  created: "2022-08-05T15:37:04.814Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "changeColumn",
    params: [
      "tasks",
      "updated_by",
      { type: Sequelize.INTEGER, field: "updated_by", allowNull: true },
      { transaction },
    ],
  },
  {
    fn: "changeColumn",
    params: [
      "tasks",
      "created_by",
      { type: Sequelize.INTEGER, field: "created_by", allowNull: true },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "changeColumn",
    params: [
      "tasks",
      "updated_by",
      { type: Sequelize.STRING, field: "updated_by", allowNull: false },
      { transaction },
    ],
  },
  {
    fn: "changeColumn",
    params: [
      "tasks",
      "created_by",
      { type: Sequelize.STRING, field: "created_by", allowNull: false },
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

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
  revision: 8,
  name: "relationshipsrecover",
  created: "2022-08-04T16:40:55.211Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "dropTable",
    params: ["taskassignees", { transaction }],
  },
];

const rollbackCommands = (transaction) => [
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

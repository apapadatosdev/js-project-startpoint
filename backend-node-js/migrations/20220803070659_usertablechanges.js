const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * changeColumn(profilePhoto) => "users"
 * changeColumn(providerId) => "users"
 *
 */

const info = {
  revision: 3,
  name: "usertablechanges",
  created: "2022-08-03T07:06:59.410Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "changeColumn",
    params: [
      "users",
      "profilePhoto",
      { type: Sequelize.STRING, field: "profilePhoto", allowNull: true },
      { transaction },
    ],
  },
  {
    fn: "changeColumn",
    params: [
      "users",
      "providerId",
      { type: Sequelize.STRING, field: "providerId", allowNull: true },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "changeColumn",
    params: [
      "users",
      "profilePhoto",
      { type: Sequelize.STRING, field: "profilePhoto", allowNull: false },
      { transaction },
    ],
  },
  {
    fn: "changeColumn",
    params: [
      "users",
      "providerId",
      { type: Sequelize.STRING, field: "providerId", allowNull: false },
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

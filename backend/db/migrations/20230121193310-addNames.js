'use strict';

/** @type {import('sequelize-cli').Migration} */

// Define the schema name for the Postgres production database in the options object
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('Users', 'firstName', {

      type: Sequelize.STRING(15),
      allowNull: false
    }, options)

    await queryInterface.addColumn('Users', 'lastName', {

      type: Sequelize.STRING(15),
      allowNull: false
    }, options)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    options.tableName = "Users";

    await queryInterface.removeColumn(options, 'firstName')
    await queryInterface.removeColumn(options, 'lastName')
  }
};

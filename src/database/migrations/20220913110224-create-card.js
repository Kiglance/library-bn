const { add } = require('date-fns');
const { generateIDS } = require('../../helpers/generateIDS');

module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('Cards', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      card_number: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue() {
          return generateIDS('L', 6);
        }
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'active'
      },
      creation_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue() {
          return new Date();
        }
      },
      due_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue() {
          return add(new Date(), { years: 1 });
        }
      },
      member_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Cards');
  }
};

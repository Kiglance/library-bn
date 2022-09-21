const { add } = require('date-fns');
const { generateIDS } = require('../../helpers/generateIDS');

module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('CheckOuts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      check_out_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue() {
          return new Date();
        }
      },
      deadline: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue() {
          return add(new Date(), { days: 4 });
        }
      },
      returned_date: DataTypes.DATE,
      check_out_num: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        defaultValue() {
          return generateIDS('N', 6);
        }
      },
      member_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'Members',
          key: 'id',
          as: 'member_id'
        }
      },
      book_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'Books',
          key: 'id',
          as: 'book_id'
        }
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
    await queryInterface.dropTable('CheckOuts');
  }
};

const { generateIDS } = require('../../helpers/generateIDS');

module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('Reservations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      reservation_num: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue() {
          return generateIDS('R', 6);
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
    await queryInterface.dropTable('Reservations');
  }
};

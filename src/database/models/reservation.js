const { Model } = require('sequelize');
const { generateIDS } = require('../../helpers/generateIDS');

module.exports = (sequelize, DataTypes) => {
  class Reservation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Member, Book }) {
      this.belongsTo(Member, {
        as: 'member_reservations',
        foreignKey: 'member_id',
        onDelete: 'CASCADE',
        hooks: true
      });
      this.belongsTo(Book, {
        as: 'book_reservations',
        foreignKey: 'book_id',
        onDelete: 'CASCADE',
        hooks: true
      });
      // define association here
    }
  }
  Reservation.init(
    {
      reservation_num: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue() {
          return generateIDS('R', 6);
        }
      }
    },
    {
      sequelize,
      modelName: 'Reservation'
    }
  );
  return Reservation;
};

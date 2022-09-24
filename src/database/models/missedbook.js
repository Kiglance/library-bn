const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class MissedBook extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ CheckOut }) {
      this.belongsTo(CheckOut, {
        as: 'missed_book',
        foreignKey: 'check_out_id'
      });
    }
  }
  MissedBook.init(
    {
      period: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      payed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    },
    {
      sequelize,
      modelName: 'MissedBook'
    }
  );
  return MissedBook;
};

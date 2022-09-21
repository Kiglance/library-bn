const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class FinePayment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Member }) {
      // define association here
      this.belongsTo(Member, { as: 'payments', foreignKey: 'member_id' });
    }
  }
  FinePayment.init(
    {
      amount: {
        type: DataTypes.DOUBLE,
        allowNull: false
      },
      payment_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue() {
          return new Date();
        }
      }
    },
    {
      sequelize,
      modelName: 'FinePayment'
    }
  );
  return FinePayment;
};

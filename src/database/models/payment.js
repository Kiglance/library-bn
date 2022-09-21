const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
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
  Payment.init(
    {
      card_number: DataTypes.STRING,
      expire_date: DataTypes.STRING,
      card_holder: DataTypes.STRING,
      ccv: DataTypes.STRING,
      amount: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'Payment'
    }
  );
  return Payment;
};

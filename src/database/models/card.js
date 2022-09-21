const { add } = require('date-fns');
const { Model } = require('sequelize');
const { generateIDS } = require('../../helpers/generateIDS');

module.exports = (sequelize, DataTypes) => {
  class Card extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Member }) {
      // define association here
      this.belongsTo(Member, {
        as: 'card',
        foreignKey: 'member_id',
        onDelete: 'CASCADE'
      });
    }
  }
  Card.init(
    {
      card_number: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue() {
          return generateIDS('L', 6);
        }
      },
      creation_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue() {
          return new Date();
        }
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'active'
      },
      due_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue() {
          return add(new Date(), { years: 1 });
        }
      }
    },
    {
      sequelize,
      modelName: 'Card'
    }
  );
  return Card;
};

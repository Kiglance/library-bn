const { add } = require('date-fns');
const { Model } = require('sequelize');
const { generateIDS } = require('../../helpers/generateIDS');

module.exports = (sequelize, DataTypes) => {
  class CheckOut extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Member, Book, MissedBook }) {
      // define association here

      this.belongsTo(Member, {
        as: 'check_out_members',
        foreignKey: 'member_id',
        onDelete: 'CASCADE',
        hooks: true
      });
      this.belongsTo(Book, {
        as: 'check_out_books',
        foreignKey: 'book_id',
        onDelete: 'CASCADE',
        hooks: true
      });
      this.hasOne(MissedBook, {
        as: 'missed_book',
        foreignKey: 'check_out_id',
        onDelete: 'CASCADE'
      });
    }
  }
  CheckOut.init(
    {
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
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        defaultValue() {
          return generateIDS('N', 6);
        }
      }
    },
    {
      sequelize,
      modelName: 'CheckOut'
    }
  );
  return CheckOut;
};

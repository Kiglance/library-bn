const { Model } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ CheckOut, Reservation }) {
      // define association here
      this.hasMany(CheckOut, {
        as: 'check_out_books',
        foreignKey: 'book_id',
        onDelete: 'CASCADE',
        hooks: true
      });
      this.hasMany(Reservation, {
        as: 'book_reservations',
        foreignKey: 'book_id',
        onDelete: 'CASCADE',
        hooks: true
      });
    }
  }
  Book.init(
    {
      ISBN: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      publisher: {
        type: DataTypes.STRING,
        allowNull: false
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      language: {
        type: DataTypes.STRING,
        allowNull: false
      },
      pages: {
        type: DataTypes.NUMBER,
        allowNull: false
      },
      author: {
        type: DataTypes.STRING,
        allowNull: false
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false
      },
      about: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      cover: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: `${process.env.BASE_URL}/images/No_image.svg`
      }
    },
    {
      sequelize,
      modelName: 'Book',
      tableName: 'Books'
    }
  );
  return Book;
};

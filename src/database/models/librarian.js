const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Librarian extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }

    toJSON() {
      return { ...this.get(), password: undefined };
    }
  }
  Librarian.init(
    {
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'librarian'
      },
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      phone: {
        type: DataTypes.STRING
      }
    },
    {
      sequelize,
      modelName: 'Librarian',
      tableName: 'Librarians'
    }
  );
  return Librarian;
};

const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('Books', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
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
        type: DataTypes.INTEGER,
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
        // allowNull: false,
        defaultValue: `${process.env.BASE_URL}/images/No_image.svg`
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
    await queryInterface.dropTable('Books');
  }
};

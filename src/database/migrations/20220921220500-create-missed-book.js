module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('MissedBooks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      period: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      payed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      check_out_id: {
        type: DataTypes.INTEGER,
        allowNull: false
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
    await queryInterface.dropTable('MissedBooks');
  }
};

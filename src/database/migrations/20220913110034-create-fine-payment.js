module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('FinePayments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
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
      },
      member_id: {
        type: DataTypes.STRING,
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
    await queryInterface.dropTable('FinePayments');
  }
};

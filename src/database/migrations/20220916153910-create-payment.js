module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('Payments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      card_number: {
        type: DataTypes.STRING
      },
      expire_date: {
        type: DataTypes.STRING
      },
      card_holder: {
        type: DataTypes.STRING
      },
      ccv: {
        type: DataTypes.STRING
      },
      amount: {
        type: DataTypes.INTEGER
      },
      member_id: {
        type: DataTypes.STRING
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
    await queryInterface.dropTable('Payments');
  }
};

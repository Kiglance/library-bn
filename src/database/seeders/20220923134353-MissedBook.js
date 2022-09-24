module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('MissedBooks', [
      {
        period: 3,
        payed: true,
        check_out_id: 12,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        period: 1,
        payed: false,
        check_out_id: 13,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        period: 1,
        payed: false,
        check_out_id: 14,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('MissedBooks', null, {});
  }
};

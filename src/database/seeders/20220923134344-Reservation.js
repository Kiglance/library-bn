module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Reservations', [
      {
        reservation_num: 'R000001',
        member_id: 1,
        book_id: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        reservation_num: 'R000002',
        member_id: 2,
        book_id: 2,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        reservation_num: 'R000003',
        member_id: 3,
        book_id: 3,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        reservation_num: 'R000004',
        member_id: 4,
        book_id: 4,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        reservation_num: 'R000005',
        member_id: 5,
        book_id: 5,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Reservations', null, {});
  }
};

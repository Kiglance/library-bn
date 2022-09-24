const { add } = require('date-fns');
const { generateIDS } = require('../../helpers/generateIDS');

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Cards', [
      {
        member_id: 1,
        card_number: generateIDS('L', 6),
        status: 'active',
        creation_date: new Date().toISOString(),
        due_date: add(new Date(), { years: 1 }),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        member_id: 2,
        card_number: generateIDS('L', 6),
        status: 'active',
        creation_date: new Date().toISOString(),
        due_date: add(new Date(), { years: 1 }),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        member_id: 3,
        card_number: generateIDS('L', 6),
        status: 'active',
        creation_date: new Date().toISOString(),
        due_date: add(new Date(), { years: 1 }),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        member_id: 4,
        card_number: generateIDS('L', 6),
        status: 'active',
        creation_date: new Date().toISOString(),
        due_date: add(new Date(), { years: 1 }),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        member_id: 5,
        card_number: generateIDS('L', 6),
        status: 'active',
        creation_date: new Date().toISOString(),
        due_date: add(new Date(), { years: 1 }),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Cards', null, {});
  }
};

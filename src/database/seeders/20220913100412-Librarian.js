/* eslint-disable no-unused-vars */
const dotenv = require('dotenv');
const { hashPassword } = require('../../helpers/user.helpers');

dotenv.config();

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'Librarians',
      JSON.parse(process.env.LIBRARIAN_FIRST_NAME).map((_, i) => ({
        userName: JSON.parse(process.env.LIBRARIAN_USERNAME)[i],
        email: JSON.parse(process.env.LIBRARIAN_EMAIL)[i],
        name: [
          JSON.parse(process.env.LIBRARIAN_FIRST_NAME)[i],
          JSON.parse(process.env.LIBRARIAN_LAST_NAME)[i]
        ].join(' '),
        phone: JSON.parse(process.env.LIBRARIAN_PHONE)[i],
        password: hashPassword(JSON.parse(process.env.LIBRARIAN_PASSWORD)[i]),
        createdAt: new Date(),
        updatedAt: new Date()
      }))
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Librarians', null, {});
  }
};

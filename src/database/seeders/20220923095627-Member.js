const { hashSync } = require('bcryptjs');

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Members', [
      {
        userName: 'User1@gmail.com',
        name: 'User 1',
        password: hashSync('User1@gmail.com'),
        email: 'User1@gmail.com',
        phone: '0123456789',
        gender: 'male',
        occupation: 'IT & Networking',
        birthDate: '2002-09-23T13:31:38.353Z',
        isVerified: true,
        fine: 10,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        userName: 'User2@gmail.com',
        name: 'User 2',
        password: hashSync('User2@gmail.com'),
        email: 'User2@gmail.com',
        phone: '0123456789',
        gender: 'female',
        occupation: 'Education',
        birthDate: '1980-01-23T13:31:38.353Z',
        isVerified: true,
        fine: 10,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        userName: 'User3@gmail.com',
        name: 'User 3',
        password: hashSync('User3@gmail.com'),
        email: 'User3@gmail.com',
        phone: '0133456789',
        gender: 'female',
        occupation: 'Data Science & Analytics',
        birthDate: '1980-05-23T13:31:38.353Z',
        isVerified: true,
        fine: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        userName: 'User4@gmail.com',
        name: 'User 4',
        password: hashSync('User4@gmail.com'),
        email: 'User4@gmail.com',
        phone: '0133456789',
        gender: 'male',
        occupation: 'Data Science & Analytics',
        birthDate: '1930-01-23T13:31:38.353Z',
        isVerified: true,
        fine: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        userName: 'User5@gmail.com',
        name: 'User 5',
        password: hashSync('User5@gmail.com'),
        email: 'User5@gmail.com',
        phone: '0133456789',
        gender: 'female',
        occupation: 'Data Science & Analytics',
        birthDate: '2021-10-23T13:31:38.353Z',
        isVerified: true,
        fine: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Members', null, {});
  }
};

const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Books', [
      {
        ISBN: '123-451',
        publisher: 'publisher1',
        title: 'book 1',
        language: 'english',
        pages: '233',
        author: 'author 1',
        category: 'category 1',
        about: 'none',
        cover: `${process.env.BASE_URL}/images/No_image.svg`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        ISBN: '123-452',
        publisher: 'publisher2',
        title: 'book 2',
        language: 'english',
        pages: '233',
        author: 'author 2',
        category: 'category 2',
        about: 'none',
        cover: `${process.env.BASE_URL}/images/No_image.svg`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        ISBN: '123-453',
        publisher: 'publisher3',
        title: 'book 3',
        language: 'english',
        pages: '333',
        author: 'author 3',
        category: 'category 3',
        about: 'none',
        cover: `${process.env.BASE_URL}/images/No_image.svg`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        ISBN: '123-454',
        publisher: 'publisher4',
        title: 'book 4',
        language: 'english',
        pages: '433',
        author: 'author 4',
        category: 'category 4',
        about: 'none',
        cover: `${process.env.BASE_URL}/images/No_image.svg`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        ISBN: '123-455',
        publisher: 'publisher5',
        title: 'book 5',
        language: 'english',
        pages: '533',
        author: 'author 5',
        category: 'category 5',
        about: 'none',
        cover: `${process.env.BASE_URL}/images/No_image.svg`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        ISBN: '123-456',
        publisher: 'publisher6',
        title: 'book 6',
        language: 'english',
        pages: '633',
        author: 'author 6',
        category: 'category 6',
        about: 'none',
        cover: `${process.env.BASE_URL}/images/No_image.svg`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        ISBN: '123-457',
        publisher: 'publisher7',
        title: 'book 7',
        language: 'english',
        pages: '733',
        author: 'author 7',
        category: 'category 7',
        about: 'none',
        cover: `${process.env.BASE_URL}/images/No_image.svg`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        ISBN: '123-458',
        publisher: 'publisher8',
        title: 'book 8',
        language: 'english',
        pages: '833',
        author: 'author 8',
        category: 'category 8',
        about: 'none',
        cover: `${process.env.BASE_URL}/images/No_image.svg`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        ISBN: '123-459',
        publisher: 'publisher9',
        title: 'book 9',
        language: 'english',
        pages: '933',
        author: 'author 9',
        category: 'category 9',
        about: 'none',
        cover: `${process.env.BASE_URL}/images/No_image.svg`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        ISBN: '123-4510',
        publisher: 'publisher10',
        title: 'book 10',
        language: 'english',
        pages: '1033',
        author: 'author 10',
        category: 'category 10',
        about: 'none',
        cover: `${process.env.BASE_URL}/images/No_image.svg`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Books', null, {});
  }
};

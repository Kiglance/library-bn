const { add } = require('date-fns');

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('CheckOuts', [
      {
        check_out_date: '2022-08-23T13:31:38.353Z',
        deadline: '2023-09-23T13:31:38.353Z',
        returned_date: null,
        check_out_num: 'N000001',
        member_id: 1,
        book_id: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        check_out_date: '2020-01-23T13:31:38.353Z',
        deadline: '2023-09-23T13:31:38.353Z',
        returned_date: null,
        check_out_num: 'N000002',
        member_id: 2,
        book_id: 2,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        check_out_date: '2018-05-23T13:31:38.353Z',
        deadline: '2023-09-23T13:31:38.353Z',
        returned_date: null,
        check_out_num: 'N000003',
        member_id: 3,
        book_id: 3,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        check_out_date: '2010-09-23T13:31:38.353Z',
        deadline: '2023-09-23T13:31:38.353Z',
        returned_date: null,
        check_out_num: 'N000004',
        member_id: 4,
        book_id: 4,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        check_out_date: '2002-12-23T13:31:38.353Z',
        deadline: '2023-09-23T13:31:38.353Z',
        returned_date: null,
        check_out_num: 'N000005',
        member_id: 5,
        book_id: 5,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        check_out_date: '2002-06-23T13:31:38.353Z',
        deadline: '2023-09-23T13:31:38.353Z',
        returned_date: null,
        check_out_num: 'N000006',
        member_id: 1,
        book_id: 6,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        check_out_date: '2002-06-23T13:31:38.353Z',
        deadline: '2003-09-23T13:31:38.353Z',
        returned_date: '2003-09-23T13:31:38.353Z',
        check_out_num: 'N000008',
        member_id: 1,
        book_id: 2,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        check_out_date: '2005-07-23T13:31:38.353Z',
        deadline: '2006-10-23T13:31:38.353Z',
        returned_date: '2007-12-23T13:31:38.353Z',
        check_out_num: 'N000009',
        member_id: 2,
        book_id: 3,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        check_out_date: '2009-02-23T13:31:38.353Z',
        deadline: '2010-01-23T13:31:38.353Z',
        returned_date: '2011-05-23T13:31:38.353Z',
        check_out_num: 'N000010',
        member_id: 3,
        book_id: 4,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        check_out_date: '2011-11-23T13:31:38.353Z',
        deadline: '2012-09-23T13:31:38.353Z',
        returned_date: '2013-01-23T13:31:38.353Z',
        check_out_num: 'N000011',
        member_id: 5,
        book_id: 6,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        check_out_date: '2014-03-23T13:31:38.353Z',
        deadline: '2015-08-23T13:31:38.353Z',
        returned_date: '2016-06-23T13:31:38.353Z',
        check_out_num: 'N000012',
        member_id: 1,
        book_id: 7,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        check_out_date: '2014-03-23T13:31:38.353Z',
        deadline: new Date().toISOString(),
        returned_date: add(new Date(), { days: 3 }),
        check_out_num: 'N000013',
        member_id: 1,
        book_id: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        check_out_date: '2015-03-23T13:31:38.353Z',
        deadline: new Date().toISOString(),
        returned_date: add(new Date(), { days: 1 }),
        check_out_num: 'N000014',
        member_id: 2,
        book_id: 2,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        check_out_date: '2015-03-23T13:31:38.353Z',
        deadline: new Date().toISOString(),
        returned_date: add(new Date(), { days: 1 }),
        check_out_num: 'N000015',
        member_id: 1,
        book_id: 3,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('CheckOuts', null, {});
  }
};

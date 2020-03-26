'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
    return queryInterface.bulkInsert('Products', [
      {
        name: "Coffee Arabica",
        stock: 12,
        urlImage: 'https://s0.bukalapak.com/img/0065315813/w-1000/Bawadi_Coffee_Arabica_200g.jpg',
        price: 120000,
        UserId: 1,
        createdAt: new Date,
        updatedAt: new Date,
      },
      {
        name: "Coffee Arabica",
        stock: 20,
        urlImage: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2018/9/7/3181863/3181863_79a08390-9d73-41a0-858f-fe340db90ac0_2048_2730.jpg',
        price: 100000,
        UserId: 1,
        createdAt: new Date,
        updatedAt: new Date,
      },
      {
        name: "Coffee Arabica",
        stock: 15,
        urlImage: 'https://cf.shopee.co.id/file/99e52417161ca27d0e56109b77e6f138',
        price: 150000,
        UserId: 1,
        createdAt: new Date,
        updatedAt: new Date,
      },
      {
        name: "Coffee Arabica",
        stock: 12,
        urlImage: 'https://s0.bukalapak.com/img/0065315813/w-1000/Bawadi_Coffee_Arabica_200g.jpg',
        price: 120000,
        UserId: 1,
        createdAt: new Date,
        updatedAt: new Date,
      },
      {
        name: "Coffee Arabica",
        stock: 12,
        urlImage: 'https://s0.bukalapak.com/img/0065315813/w-1000/Bawadi_Coffee_Arabica_200g.jpg',
        price: 120000,
        UserId: 1,
        createdAt: new Date,
        updatedAt: new Date,
      },
      {
        name: "Coffee Arabica",
        stock: 12,
        urlImage: 'https://s0.bukalapak.com/img/0065315813/w-1000/Bawadi_Coffee_Arabica_200g.jpg',
        price: 120000,
        UserId: 1,
        createdAt: new Date,
        updatedAt: new Date,
      },
      {
        name: "Coffee Arabica",
        stock: 12,
        urlImage: 'https://s0.bukalapak.com/img/0065315813/w-1000/Bawadi_Coffee_Arabica_200g.jpg',
        price: 120000,
        UserId: 1,
        createdAt: new Date,
        updatedAt: new Date,
      },
      {
        name: "Coffee Arabica",
        stock: 12,
        urlImage: 'https://s0.bukalapak.com/img/0065315813/w-1000/Bawadi_Coffee_Arabica_200g.jpg',
        price: 120000,
        UserId: 1,
        createdAt: new Date,
        updatedAt: new Date,
      },
      {
        name: "Coffee Arabica",
        stock: 12,
        urlImage: 'https://s0.bukalapak.com/img/0065315813/w-1000/Bawadi_Coffee_Arabica_200g.jpg',
        price: 120000,
        UserId: 1,
        createdAt: new Date,
        updatedAt: new Date,
      },
      {
        name: "Coffee Arabica",
        stock: 12,
        urlImage: 'https://s0.bukalapak.com/img/0065315813/w-1000/Bawadi_Coffee_Arabica_200g.jpg',
        price: 120000,
        UserId: 1,
        createdAt: new Date,
        updatedAt: new Date,
      },
      {
        name: "Coffee Arabica",
        stock: 12,
        urlImage: 'https://s0.bukalapak.com/img/0065315813/w-1000/Bawadi_Coffee_Arabica_200g.jpg',
        price: 120000,
        UserId: 1,
        createdAt: new Date,
        updatedAt: new Date,
      },
      {
        name: "Coffee Arabica",
        stock: 12,
        urlImage: 'https://s0.bukalapak.com/img/0065315813/w-1000/Bawadi_Coffee_Arabica_200g.jpg',
        price: 120000,
        UserId: 1,
        createdAt: new Date,
        updatedAt: new Date,
      },
      {
        name: "Coffee Arabica",
        stock: 12,
        urlImage: 'https://s0.bukalapak.com/img/0065315813/w-1000/Bawadi_Coffee_Arabica_200g.jpg',
        price: 120000,
        UserId: 1,
        createdAt: new Date,
        updatedAt: new Date,
      },
      {
        name: "Coffee Arabica",
        stock: 12,
        urlImage: 'https://s0.bukalapak.com/img/0065315813/w-1000/Bawadi_Coffee_Arabica_200g.jpg',
        price: 120000,
        UserId: 1,
        createdAt: new Date,
        updatedAt: new Date,
      },
      {
        name: "Coffee Arabica",
        stock: 12,
        urlImage: 'https://s0.bukalapak.com/img/0065315813/w-1000/Bawadi_Coffee_Arabica_200g.jpg',
        price: 120000,
        UserId: 1,
        createdAt: new Date,
        updatedAt: new Date,
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
    */
  }
};

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Products', [{
      name: 'Product 1',
      image_url: 'https://www.products.com/image/1.jpg',
      price: 10000,
      stock: 10,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Product 2',
      image_url: 'https://www.products.com/image/2.jpg',
      price: 20000,
      stock: 20,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Product 3',
      image_url: 'https://www.products.com/image/3.jpg',
      price: 30000,
      stock: 30,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Product 4',
      image_url: 'https://www.products.com/image/4.jpg',
      price: 40000,
      stock: 40,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Product 5',
      image_url: 'https://www.products.com/image/5.jpg',
      price: 50000,
      stock: 50,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Products', null, {});
  }
};

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
      name: 'V-Gen Sodimm',
      image_url: 'https://static.bmdstatic.com/pk/product/medium/5d49047985140.jpg',
      price: 368000,
      stock: 10,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Corsair ValueSelect',
      image_url: 'https://static.bmdstatic.com/pk/product/medium/5b6bf40a76aa7.jpg',
      price: 430000,
      stock: 10,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Memory Elite Plus',
      image_url: 'https://static.bmdstatic.com/pk/product/medium/5992974e16cfd.jpg',
      price: 509000,
      stock: 10,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Corsair Vengeance',
      image_url: 'https://static.bmdstatic.com/pk/product/medium/CORSAIR-Memory-PC-2x-4GB-DDR3-PC-12800-[Vengeance-CMZ8GX3M2A1600C9]-SKU00611333_0-20140422100506.jpg',
      price: 825000,
      stock: 10,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'T-Force Dark',
      image_url: 'https://static.bmdstatic.com/pk/product/medium/TEAM-T-Force-Dark-2x4GB-DDR4-PC4-19200-Red-SKU15416770-20161227115329.jpg',
      price: 1145000,
      stock: 10,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Kingston HyperX Fury',
      image_url: 'https://static.bmdstatic.com/pk/product/medium/KINGSTON-Memory-PC-2x-4GB-DDR3-HyperX-Fury-KHX21C11T2K2-8X--SKU00716000-20162314321.jpg',
      price: 1530000,
      stock: 10,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'GSkill Trident Z',
      image_url: 'https://static.bmdstatic.com/pk/product/medium/59b363a60f117.jpg',
      price: 5930000,
      stock: 10,
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

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', [
    {
      name: 'risol',
      price: 2000,
      stocks: 5,
      imageURL: 'https://craftlog.com/m/i/5214819=s1280=h960',
      createdAt: new Date (),
      updatedAt: new Date (),
    },
    {
      name: 'lemper',
      price: 2000,
      stocks: 5,
      imageURL: 'https://asset-a.grid.id/crop/0x0:0x0/700x465/photo/sasefoto/original/22659-arem-arem-ayam.jpg',
      createdAt: new Date (),
      updatedAt: new Date (),
    },
    {
      name: 'tahu isi',
      price: 2000,
      stocks: 5,
      imageURL: 'https://i.ytimg.com/vi/juJCrwm-NJ8/maxresdefault.jpg',
      createdAt: new Date (),
      updatedAt: new Date (),
    },
    {
      name: 'pisang goreng',
      price: 2000,
      stocks: 5,
      imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSuclaC_2mSE3vU9Gvkyc30ir9ZzMxxCKC339FhHKLAVujldz6N',
      createdAt: new Date (),
      updatedAt: new Date (),
    },
    {
      name: 'pisang goreng',
      price: 2000,
      stocks: 5,
      imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSuclaC_2mSE3vU9Gvkyc30ir9ZzMxxCKC339FhHKLAVujldz6N',
      createdAt: new Date (),
      updatedAt: new Date (),
    },
    {
      name: 'pisang goreng',
      price: 2000,
      stocks: 5,
      imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSuclaC_2mSE3vU9Gvkyc30ir9ZzMxxCKC339FhHKLAVujldz6N',
      createdAt: new Date (),
      updatedAt: new Date (),
    },
    {
      name: 'pisang goreng',
      price: 2000,
      stocks: 5,
      imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSuclaC_2mSE3vU9Gvkyc30ir9ZzMxxCKC339FhHKLAVujldz6N',
      createdAt: new Date (),
      updatedAt: new Date (),
    },
    {
      name: 'pisang goreng',
      price: 2000,
      stocks: 5,
      imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSuclaC_2mSE3vU9Gvkyc30ir9ZzMxxCKC339FhHKLAVujldz6N',
      createdAt: new Date (),
      updatedAt: new Date (),
    }
  ],{})
    
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
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

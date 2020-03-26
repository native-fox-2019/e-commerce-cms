'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Banners', [{
      title: "Kopi",
      urlImage: "https://www.dailynewsindonesia.com/files/2019/12/Coffee-Roasted-Beans.jpg",
      createdAt: new Date,
      updatedAt: new Date
    },
    {
      title: "Kopi2",
      urlImage: "https://www.gwigwi.com/wp-content/uploads/2017/01/gwigwi_5-rekomendasi-coffee-shop-di-tokyo-untuk-para-traveler.jpg",
      createdAt: new Date,
      updatedAt: new Date
    },
    {
      title: "Kopi3",
      urlImage: "https://www.nadipos.com/blog/wp-content/uploads/2017/07/biji-kopi.jpg",
      createdAt: new Date,
      updatedAt: new Date
    },
    {
      title: "Kopi4",
      urlImage: "https://cdn1-production-images-kly.akamaized.net/nm-WgH7TWWGt5CSp99b2apfSM7U=/673x379/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/1706641/original/005955300_1505121617-Biji-Kopi7.jpg",
      createdAt: new Date,
      updatedAt: new Date
    },
    {
      title: "Kopi5",
      urlImage: "https://d22ir9aoo7cbf6.cloudfront.net/wp-content/uploads/sites/4/2019/10/Revolver-Espresso-cafe-in-Seminyak-best-coffee-in-Bali-Indonesia-1.jpg",
      createdAt: new Date,
      updatedAt: new Date
    }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Banners', null, {});

  }
};

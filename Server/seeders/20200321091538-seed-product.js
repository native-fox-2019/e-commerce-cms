'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
        return queryInterface.bulkInsert('Products', 
        [
          {
            name: "Nike Tiempo Legend VII Academy TF - White/Black",
            image_url: "https://ecs7.tokopedia.net/img/cache/700/product-1/2018/12/6/495517/495517_26e3335a-b260-440f-81d0-ae8bba947ae7_768_768.jpg",
            price: 500000,
            stock: 5,
            createdAt: new Date(),
            updatedAt: new Date ()
          },
          {
            name: "NIKE MERCURIAL VAPORX VII 12 PRO NEYMAR AMARILLO IC",
            image_url: "https://ecs7.tokopedia.net/img/cache/700/product-1/2018/11/20/20305009/20305009_b74ac120-e407-4ba0-8463-906822114b2c_700_700.jpg",
            price: 700000,
            stock: 3,
            createdAt: new Date(),
            updatedAt: new Date ()
          },
          {
            name: "Nike Tiempo Legend VII Academy TF - Black/Pure Platinum/Light Crimson",
            image_url: "https://www.prodirectsoccer.com/us/productimages/V3_1_Gallery_1/187874.jpg",
            price: 650000,
            stock: 7,
            createdAt: new Date(),
            updatedAt: new Date ()
          },
          {
            name: "Nike Tiempo X Legend VII White Blue IC",
            image_url: "https://ecs7.tokopedia.net/img/cache/700/product-1/2019/7/21/6447204/6447204_1c190f51-7813-42c0-ac7d-00537b8eae5d_768_768.jpg",
            price: 500000,
            stock: 5,
            createdAt: new Date(),
            updatedAt: new Date ()
          },
          {
            name: "Nike Tiempo genio V ic / Gato II",
            image_url: "https://s.kaskus.id/r480x480/images/fjb/2016/07/11/wtb_sepatu_futsal_nike_tiempo_genio_v_ic___gato_ii_size_45_3306122_1468219855.jpg",
            price: 500000,
            stock: 9,
            createdAt: new Date(),
            updatedAt: new Date ()
          },
        ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
     return queryInterface.bulkDelete('Products', null, {});
  }
};

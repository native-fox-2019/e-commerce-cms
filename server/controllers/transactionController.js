const { Transaction, Product, User } = require('../models')

class TransactionController {
  static getAll(req, res, next) {
    Transaction
      .findAll({ include: [Product] })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        next(err)
      })
  }

  static getOne(req, res, next) {
    Transaction
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        next(err)
      })
  }
  static add(req, res, next) {
    const { ProductId, quantity } = req.body
    console.log(ProductId);
    Product
      .findOne({
        where: {
          id: ProductId
        }
      })
      .then(data => {
        if (data.stock < quantity) {
          throw {
            status: 400,
            msg: 'Stock has not enough.'
          }
        } else if (data.stock > quantity) {
          Transaction
            .findAll({
              where: {
                ProductId,
                UserId: req.user.id
              }
            })
            .then(data => {
              // console.log(data, "masuk kah?");
              // res.send(data)
              if (data.length > 1) {
                console.log('test');
                throw {
                  status: 400,
                  msg: 'You added the product already.'
                }
              } else {
                console.log('test1');

                Transaction
                  .create({
                    quantity,
                    ProductId,
                    UserId: req.user.id
                  })
                  .then(data => {
                    res.status(201).json(data)
                  })
                  .catch(err => {
                    next(err)
                  })
              }
            })
            .catch(err => {
              next(err)
            })
        }
      })
      .catch(err => {
        next(err)
      })
  }
  static destroy(req, res, next) {
    const id = req.params.id
    Transaction
      .destroy({
        where: {
          id: id
        }
      })
      .then(data => {
        if (!data) {
          throw {
            status: 404,
            msg: "Data not found."
          }
        } else {
          res.status(200).json("Successfully Delete a data.")
        }
      })
      .catch(err => {
        next(err)
      })
  }

  static updateQuantity(req, res, next) {

    Product
      .findOne({

      })
  }
}

module.exports = TransactionController
const { Banner } = require('../models')

class BannerController {
  static getAll(req, res, next) {
    Banner
      .findAll()
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        next(err)
      })
  }
  static getOne(req, res, next) {
    Banner
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(data => {
        if (!data) {
          throw {
            status: 404,
            msg: 'Data not found!'
          }
        } else if (data) {
          res.status(200).json(data)
        }
      })
      .catch(err => {
        next(err)
      })
  }
  static update(req, res, next) {
    let { title, urlImage } = req.body
    Banner
      .update({
        title,
        urlImage
      }, { where: { id: req.params.id }, returning: true })
      .then(data => {
        if (!data) {
          throw {
            status: 404,
            msg: 'Data not found.'
          }
        } else {
          res.status(200).json(data)
        }
      })
      .catch(err => {
        next(err)
      })
  }
  static create(req, res, next) {
    let { title, urlImage } = req.body
    Banner
      .create({
        title,
        urlImage
      })
      .then(data => {
        res.status(201).json(data)
      })
      .catch(err => {
        next(err)
      })
  }
  static destroy(req, res, next) {
    Banner
      .destroy({
        where: {
          id: req.params.id
        }
      })
      .then(data => {
        if (!data) {
          throw {
            status: 404,
            msg: 'Data not found!'
          }
        } else {
          res.status(200).json('Success delete the data.')
        }
      })
      .catch(err => {
        next(err)
      })
  }

}

module.exports = BannerController
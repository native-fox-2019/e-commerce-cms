const { Banner } = require('../models')

class BannerController {
    
    static async addBanner (req, res, next) {
        try {
            const createBanner = await Banner.create({
                name: req.body.name,
                url: req.body.url
            })
            res.status(201).json({
                name: req.body.name,
                url: req.body.url
            })
        } catch (error) {
            next(error)
        }
    }

    static async getBanner (req, res, next) {
        try {
            const banners = await Banner.findAll()
            res.status(200).json({banners})
        } catch (error) {
            next(error)
        }
    }

    static async deleteBanner (req, res, next) {
        try {
            const deleted = await Banner.destroy({where:{id:req.params.id}})
            res.status(200).json('Delete succesfull')
        } catch (error) {
            next(err)
        }
    }
}

module.exports = BannerController
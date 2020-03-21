const { Campaign, User } = require("../models");
const createError = require("http-errors");

class Controller {
  static async get(req, res, next) {
    try {
      let condition = {
        include: User
      };
      let data = await Campaign.findAll(condition);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  static async getOne(req, res, next) {
    try {
      let condition = {
        where: {
          id: req.params.id
        },
        include: User
      };
      let found = await Campaign.findOne(condition);
      if (found) {
        res.status(200).json(found);
      } else {
        throw createError(404, "Campaign not found !");
      }
    } catch (error) {
      next(error);
    }
  }
  static async create(req, res, next) {
    try {
      let input = {
        image: req.body.file || null,
        name: req.body.name,
        status: req.body.status,
        placement: req.body.placement,
        UserId: req.user.id
      };
      let created = await Campaign.create(input);
      res
        .status(200)
        .json({ Message: "Campaign created succesfully.", Data: created });
    } catch (error) {
      next(error);
    }
  }
  static async delete(req, res, next) {
    try {
      let condition = {
        where: {
          id: req.params.id
        }
      };
      let deleted = await Campaign.destroy(condition);
      res.status(200).json({ Message: "Campaign deleted succesfully" });
    } catch (error) {
      next(error);
    }
  }
  static async update(req, res, next) {
    try {
      let condition = {
        where: {
          id: req.params.id
        }
      };
      let input = {
        image: req.body.file !== "null" ? req.body.file : req.body.image,
        name: req.body.name,
        status: req.body.status,
        placement: req.body.placement
      };
      let findOne = await Campaign.findOne(condition);
      if (findOne) {
        let updated = await Campaign.update(input, condition);
        res.status(200).json({ Message: "Campaign updated succesfully" });
      } else {
        throw createError(404);
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;

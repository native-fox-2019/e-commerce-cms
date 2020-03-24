const models = require('../models');
const Product = models.Product;

/**
 * @swagger
 * tags:
 *  name: Product
 *  description: Product management
 */

/**
 * @swagger
 * components:
 *  securitySchemes:
 *    BearerAuth:
 *      type: http
 *      scheme: bearer
 */
class ProductController{
    /**
     * @swagger
     * path:
     *  /todos/:
     *    get:
     *      summary: Get all todos
     *      tags: [ToDo]
     *      security:
     *        - BearerAuth: []
     *      responses:
     *        "200":
     *          description: Array of ToDo
     *          content:
     *            application/json:
     *              schema:
     *                type: array
     *                items:
     *                  $ref: "#/components/schemas/ToDo"
     *        "500":
     *          description: Internal Server Error
     *    
     */
    static getProducts(req, res, next){
        Product.findAll()
            .then(products => res.status(200).json(products))
            .catch(err => next(err));
    }
            /**
     * @swagger
     * path:
     *  /products/{id}:
     *    get:
     *      summary: Get todo by id
     *      tags: [ToDo]
     *      parameters:
     *        - in: path
     *          name: id
     *          schema:
     *            type: integer
     *          required: true
     *          description: Numeric ID of the todo
     *      security:
     *        - BearerAuth: []
     *      responses:
     *        "200":
     *          description: Object of ToDo
     *          content:
     *            application/json:
     *              schema:
     *                $ref: "#/components/schemas/ToDo"
     *        "500":
     *          description: Internal Server Error
     *    
     */

    static getProduct(req, res, next){
        const id = req.params.id;
        Product.findByPk(id)
            .then(product=>{
                if (product) {
                    res.status(200).json(product);
                } else {
                    res.status(404).json({
                        message: "Product not found"
                    });
                }
            })
            .catch(err => next(err));
    }
            /**
     * @swagger
     * path:
     *  /todos/:
     *    post:
     *      summary: Create todo
     *      tags: [ToDo]
     *      responses:
     *        "201":
     *          description: Object of ToDo
     *          content:
     *            application/json:
     *              schema:
     *                type: object
     *                items:
     *                  $ref: "#/components/schemas/ToDo"
     *        "500":
     *          description: Internal Server Error
     *    
     */

    static addProduct(req, res, next){
        const name = req.body.name;
        const category = req.body.category;
        const image_url = req.body.image_url;
        const price = req.body.price;
        const stock = req.body.stock;
        Product.create({
            name,
            category,
            image_url,
            price,
            stock
        })
            .then(product => res.status(201).json(product))
            .catch(err => next(err));
    }
                /**
     * @swagger
     * path:
     *  /todos/{id}:
     *    put:
     *      summary: Update todo by id
     *      tags: [ToDo]
     *      parameters:
     *        - in: path
     *          name: id
     *          schema:
     *            type: integer
     *          required: true
     *          description: Update from numeric ID of the todo
     *      security:
     *        - BearerAuth: []
     *      responses:
     *        "200":
     *          description: Object of ToDo
     *          content:
     *            application/json:
     *              schema:
     *                $ref: "#/components/schemas/ToDo"
     *        "500":
     *          description: Internal Server Error
     *    
     */
    static updateProduct(req, res, next){
        const id = req.params.id;
        const name = req.body.name;
        const category = req.body.category;
        const image_url = req.body.image_url;
        const price = req.body.price;
        const stock = req.body.stock;
        Product.findByPk(id)
            .then(product => {
                if (product) {
                    product.name = name;
                    product.category = category;
                    product.image_url = image_url;
                    product.price = price;
                    product.stock = stock;
                    product.save()
                        .then(product => {
                            res.status(200).json(product);
                        })
                        .catch(err => next(err));
                } else {
                    res.status(404).json({
                        message: "Product not found"
                    });
                }
            })
            .catch(err => next(err));
        // Product.update({
        //     name,
        //     category,
        //     image_url,
        //     price,
        //     stock
        // },{
        //     where:{id}
        // })
        //     .then(product => {
        //         if (product) {
        //             res.status(200).json(product)
        //         } else {
        //             next({
        //                 status: 404,
        //                 message: "Product not found"
        //             })
        //         }
        //     })
        //     .catch(err => next(err));
    }

    /**
     * @swagger
     * path:
     *  /todos/{id}:
     *    delete:
     *      summary: Delete todo by id
     *      tags: [ToDo]
     *      parameters:
     *        - in: path
     *          name: id
     *          schema:
     *            type: integer
     *          required: true
     *          description: Delete from numeric ID of the todo
     *      security:
     *        - BearerAuth: []
     *      responses:
     *        "200":
     *          description: Object of ToDo
     *          content:
     *            application/json:
     *              schema:
     *                $ref: "#/components/schemas/ToDo"
     *        "500":
     *          description: Internal Server Error
     *    
     */
    static deleteProduct(req, res, next){
        const id = req.params.id;
        Product.findByPk(id)
            .then(product => {
                if (product) {
                    product.destroy()
                        .then(() =>{
                            res.status(202).json({
                                message: "Product deleted"
                            });
                        })
                        .catch(err => {
                            next(err);
                        });
                } else {
                    res.status(404).json({
                        message: "Product not found"
                    });
                }
            })
            .catch(err => {
                next(err);
            });
    }
}

module.exports = ProductController;
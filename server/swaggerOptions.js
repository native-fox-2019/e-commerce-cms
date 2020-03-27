module.exports = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "E-Commerce API Documentation",
            version: "1.0.0",
            description: "JSON API for E-Commerce app",
            license: {
                name: "MIT"
            },
            contact: {
                name: "Rofandi"
            }
        },
        servers: [
            {
                url: "http://localhost:3000/"
            }
        ]
    },
    apis: [
        "./models/product.js",
        "./controllers/ProductController.js"
    ]
};
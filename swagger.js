const swaggerJsDoc = require('swagger-jsdoc');
require("dotenv").config();

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Perusahaan A API',
            version: '1.0.0',
            description: 'API documentation for the Perusahaan A service',
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT}/api/v1`,
            },
        ],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                BearerAuth: [],
            },
        ],
    },
    apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = swaggerDocs;
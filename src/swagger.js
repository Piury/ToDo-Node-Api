var swaggerAutogen = require("swagger-autogen");
var doc = {
    info: {
        version: 'v1.0.0',
        title: 'ToDo Api Propyect',
        description: 'Implementation of Swagger with TypeScript'
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: ''
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: '',
            }
        }
    }
};
var outputFile = './swagger_output.json';
var endpointsFiles = ['./src/routes/index.ts'];
swaggerAutogen({ openapi: '3.1.0' })(outputFile, endpointsFiles, doc);

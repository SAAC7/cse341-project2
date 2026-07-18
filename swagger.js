import swaggerautogen from 'swagger-autogen';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;


const doc = {
  info: {
    title: 'CSE341 Project API',
    description: 'This is the API documentation for the CSE341 Project. It provides information about the available endpoints, request parameters, and response formats.',
  },
  host: 'localhost:${PORT}',
  schemes: ['http','https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerautogen(outputFile, endpointsFiles, doc);
                                               
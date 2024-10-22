const Joi = require('joi');
const httpStatus = require('http-status');
const pickObject = require('../utils/pickObject');

const validate = (schema) => (req, res, next) => {
   // Extract relevant parts from schema and request object
   const validSchema = pickObject(schema, ['params', 'query', 'body']);
   const objectToValidate = pickObject(req, Object.keys(validSchema));
 
   // Perform validation using Joi
   const { value, error } = Joi.compile(validSchema)
     .prefs({ errors: { label: 'key' }, abortEarly: false })
     .validate(objectToValidate);
 
   // Handle validation error
   if (error) {
     const errorMessage = error.details.map(({ message }) => message).join(', ');
     return next(new Error(httpStatus.BAD_REQUEST, errorMessage));
   }
 
   // Merge the validated values into the request object
   Object.assign(req, value);
   return next();
};

module.exports = validate;

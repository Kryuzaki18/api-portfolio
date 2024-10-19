const renameFields = { _id: 'id' } // Rename _id to id
const removeFields = ['__v']; // Remove __v
const keepFields = []; // Optionally keep only specific fields

// Function to dynamically set transformation for any schema
const transformSchema = (schema) => {
  schema.set('toJSON', {
    transform: (doc, ret) => {

      // Dynamically rename fields as specified
      Object.keys(renameFields).forEach((oldKey) => {
        const newKey = renameFields[oldKey];
        ret[newKey] = ret[oldKey];
        delete ret[oldKey];
      });

      // Dynamically remove fields as specified
      removeFields.forEach((field) => {
        delete ret[field];
      });

      // Keep only specified fields (optional)
      if (keepFields.length > 0) {
        Object.keys(ret).forEach((key) => {
          if (!keepFields.includes(key)) {
            delete ret[key];
          }
        });
      }

      // Return transformed object
      return ret;
    }
  });
}

module.exports = transformSchema;
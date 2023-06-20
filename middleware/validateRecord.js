const Joi = require('joi');
const client = require('../config/dbcon.js');

const recordSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.number().integer().max(9999999999).required(),
});

module.exports = {
    async validateRecord(req, res, next) {
      const { email, phone } = req.body;
  
      // check for existing record
      const existingRecord = await checkExistingRecord(email, phone);
  
      if (existingRecord) {
        let errorMessage = 'Record already exists';
  
        if (existingRecord.email === email) {
          errorMessage += ` with the email: ${email}`;
        }
  
        if (existingRecord.phone === phone) {
          errorMessage += ` with the phone number: ${phone}`;
        }
  
        return res.status(409).json({ error: errorMessage });
      }
  
      const { error } = recordSchema.validate(req.body);
  
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
  
      next();
    },
  };
  


// function to check for existing record
async function checkExistingRecord(email, phone) {
    try {
        const query = 'SELECT * FROM userdetails WHERE email = $1 OR phone = $2';
        const values = [email, phone];
        const result = await client.query(query, values);
        return result.rows.length > 0;
    } catch (error) {
        throw new Error(error.message);
    }
}

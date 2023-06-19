const client = require('../config/dbcon.js');

const appController = {
  async createRecord(req, res) {
    const { name, email, phone } = req.body;

    try {
      const query = 'INSERT INTO userdetails (name, email, phone) VALUES ($1, $2, $3) RETURNING *';
      const values = [name, email, phone];
      const result = await client.query(query, values);
      res.status(201).json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getAllRecords(req, res) {
    try {
      const query = 'SELECT * FROM userdetails';
      const result = await client.query(query);
      res.json(result.rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getRecordById(req, res) {
    const { id } = req.params;

    try {
      const query = 'SELECT * FROM userdetails WHERE id = $1';
      const values = [id];
      const result = await client.query(query, values);

      if (result.rows.length === 0) {
        res.status(404).json({ error: 'Record not found' });
      } else {
        res.json(result.rows[0]);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async updateRecord(req, res) {
    const { id } = req.params;
    const { name, email, phone } = req.body;

    try {
      const query = 'UPDATE userdetails SET name = $1, email = $2, phone = $3 WHERE id = $4 RETURNING *';
      const values = [name, email, phone, id];
      const result = await client.query(query, values);

      if (result.rows.length === 0) {
        res.status(404).json({ error: 'Record not found' });
      } else {
        res.json(result.rows[0]);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async deleteRecord(req, res) {
    const { id } = req.params;

    try {
      const query = 'DELETE FROM userdetails WHERE id = $1 RETURNING *';
      const values = [id];
      const result = await client.query(query, values);

      if (result.rows.length === 0) {
        res.status(404).json({ error: 'Record not found' });
      } else {
        res.json(result.rows[0]);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = appController;

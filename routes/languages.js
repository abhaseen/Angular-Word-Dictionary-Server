const express = require('express');
const router = express.Router();

const Language = require('../models/Language');

/**
 * Get all terms
 * @route GET api/languages
 */
router.get('/', async (req, res) => {
  try {
    const results = await Language.find()
      .collation({ locale: 'en' })
      .sort({ name: 'asc' });

    return res.status(200).json(results);
  } catch (error) {
    return res.status(400).json(error);
  }
});

module.exports = router;

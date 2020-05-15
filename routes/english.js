const express = require('express');
const router = express.Router();

const TermEnglish = require('../models/TermEnglish');

/**
 * Get all terms
 * @route GET api/terms/english
 */
router.get('/', async (req, res) => {
  try {
    const results = await TermEnglish.find()
      .collation({ locale: 'en' })
      .sort({ wordEnglish: 'asc' });

    return res.status(200).json(results);
  } catch (error) {
    return res.status(400).json(error);
  }
});

/**
 * Search for a term
 * Must be defined before /:id
 * @route GET api/terms/english/search
 */
router.get('/search', async (req, res) => {
  const searchTerm = req.query.q;

  try {
    const results = await TermEnglish.find({
      wordEnglish: { $regex: searchTerm, $options: 'i' },
    })
      .collation({ locale: 'en' })
      .sort({ wordEnglish: 'asc' });

    return res.status(200).json(results);
  } catch (error) {
    return res.status(400).json(error);
  }
});

/**
 * Get one term
 * @route GET api/terms/english/:id
 */
router.get('/:id', async (req, res) => {
  try {
    const result = await TermEnglish.findById(req.params.id);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json(error);
  }
});

/**
 * Add a new term
 * @route POST api/terms/english
 */
router.post('/', async (req, res) => {
  const newTerm = new TermEnglish(req.body);

  try {
    await newTerm.save();

    return res.status(200).json({ msg: 'Item added' });
  } catch (error) {
    return res.status(400).json(error);
  }
});

/**
 * Update an existing term to add a new definition
 * @route PUT api/terms/english/:id/add-definition
 */
router.put('/:id/add-definition', async (req, res) => {
  try {
    const termToUpdate = await TermEnglish.findById(req.params.id);

    termToUpdate.definitions.push(req.body);

    await termToUpdate.save();

    return res.status(200).json({ msg: 'Definition added.' });
  } catch (error) {
    return res.status(400).json(error);
  }
});

/**
 * Increment helpYes
 * @route PUT api/terms/english/helpyes/:id
 */
router.put('/helpyes/:id', async (req, res) => {
  try {
    const termToUpdate = await TermEnglish.findById(req.params.id);

    termToUpdate.helpYes++;

    await termToUpdate.save();

    return res.status(200).json({ msg: 'This term was helpful.' });
  } catch (error) {
    return res.status(400).json(error);
  }
});

/**
 * Increment helpNo
 * @route PUT api/terms/english/helpno/:id
 */
router.put('/helpno/:id', async (req, res) => {
  try {
    const termToUpdate = await TermEnglish.findById(req.params.id);

    termToUpdate.helpNo++;

    await termToUpdate.save();

    return res.status(200).json({ msg: 'This term was not helpful.' });
  } catch (error) {
    return res.status(400).json(error);
  }
});

/**
 * Increment likes of a definition
 * Takes the definition ID from the req.body
 * @route PUT api/terms/english/definition-like/:id
 */
router.put('/definition-like/:id', async (req, res) => {
  const definitionId = req.body.defId;

  try {
    const termToUpdate = await TermEnglish.findById(req.params.id);

    const defToUpdate = termToUpdate.definitions.id(definitionId);
    defToUpdate.likes++;

    await termToUpdate.save();

    return res.status(200).json({ msg: 'Definition was liked.' });
  } catch (error) {
    return res.status(400).json(error);
  }
});

module.exports = router;

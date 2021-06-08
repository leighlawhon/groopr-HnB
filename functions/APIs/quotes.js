const express = require('express');
const router = express.Router();
const { db } = require('../util/admin');
const { v4: uuidv4 } = require('uuid');
const auth = require('../util/auth');

const quoteKeys = [
  'sheet_dc',
  'sheet_balt',
  'equip_dc',
  'equip_balt',
  'pipe',
  'atc',
  'notes',
  'total',
];

router.use(auth);

/**
 * Get all the quotes from the 'quotes' collection
 */
router.get('/', async (request, response) => {
  try {
    // Get all the documents from the quotes collection
    const quotes = await db.collection('quotes').get();

    let allQuotes = [];
    quotes.forEach((qt) => allQuotes.push(qt.data()));

    return response.json({ data: { quotes: allQuotes }, error: null });
  } catch (error) {
    console.log(error);
    return response.json({
      data: null,
      error: { message: 'Error happened when retreiving Quotes.', error },
    });
  }
});

/**
 * Get a single quote from the 'quotes' collection with the quote ID.
 */
router.get('/:id', async (request, response) => {
  const quoteId = request.params.id;

  try {
    // Get a single document with the quoteId from the 'quotes' collection.
    const quote = await db.collection('quotes').doc(quoteId).get();

    return response.json({
      data: { quote: quote.exists ? quote.data() : null },
      error: null,
    });
  } catch (error) {
    console.log(error);
    return response.json({
      data: null,
      error: { message: 'Error happened while retreiving Quotes.', error },
    });
  }
});

/**
 * Create a new quote with a new ID and the value sent through the request body.
 */
router.post('/', async (request, response) => {
  let newQuote = request.body;

  // Create a new UUID for this quote
  let quoteId = uuidv4();

  // Check if all the fields are present
  let allKeysPresent = true;
  let missingKeys = [];
  quoteKeys.forEach(
    // Check if incoming body has all the required fields, if not present set 'allKeysPresent' to false.
    (qk) => {
      if (!Object.keys(newQuote).includes(qk)) {
        allKeysPresent = false;
        missingKeys.push(qk);
      }
    }
  );

  // If all keys are present, store it to database
  if (allKeysPresent) {
    try {
      await db.collection('quotes').doc(quoteId).set(newQuote);
      return response.json({
        data: { created: true },
        error: null,
      });
    } catch (error) {
      console.log(error);
      return response.json({
        data: { created: false },
        error: { message: 'Error happened while saving Quotes.', error },
      });
    }
  }

  // Reject the request and send the missing fields
  else {
    return response.json({
      data: { created: false },
      error: { message: `Missing fields ${missingKeys.join(', ')}.` },
    });
  }
});

/**
 * Edit a quote with the value sent through the request body.
 */
router.put('/:id', async (request, response) => {
  const quoteId = request.params.id;
  const updatedQuote = request.body;

  try {
    // Update the quote with the quoteId
    await db.collection('quotes').doc(quoteId).update(updatedQuote);

    return response.json({
      data: { updated: true },
      error: null,
    });
  } catch (error) {
    console.log(error);
    return response.json({
      data: { updated: false },
      error: { message: 'Error happened while updating Quote.', error },
    });
  }
});

/**
 * Delete a quote with a Quote ID provided.
 */
router.delete('/:id', async (request, response) => {
  const quoteId = request.params.id;

  try {
    // Delete the quote with the quoteId
    await db.collection('quotes').doc(quoteId).delete();

    return response.json({
      data: { deleted: true },
      error: null,
    });
  } catch (error) {
    console.log(error);
    return response.json({
      data: { deleted: false },
      error: { message: 'Error happened while deleting Quotes.', error },
    });
  }
});

module.exports = router;

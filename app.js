const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1.js');
const path = require('path');
const express = require('express');
const app = express();
require('./config/express')(app);

// Create Text to Speech client.
let client;
try {
  client = new TextToSpeechV1({});
} catch (err) {
  console.error('Error creating service client: ', err);
}

app.get('/', (_, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/health', (_, res) => {
  res.json({ status: 'UP' });
});

app.get('/api/voices', async (_, res, next) => {
  try {
    const { result } = await client.listVoices();
    return res.json(result);
  } catch (err) {
    console.error(err);
    if (!client) {
      err.statusCode = 401;
      err.description =
        'Could not find valid credentials for the Text to Speech service.';
      err.title = 'Invalid credentials';
    }
    next(err);
  }
});

app.get('/api/synthesize', async (req, res, next) => {
  try {
    const { result } = await client.synthesize(req.query);
    result.pipe(res);
  } catch (err) {
    console.error(err);
    if (!client) {
      err.statusCode = 401;
      err.description =
        'Could not find valid credentials for the Text to Speech service.';
      err.title = 'Invalid credentials';
    }
    next(err);
  }
});

// error-handler settings for all other routes
require('./config/error-handler')(app);

module.exports = app;

const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1.js');
const path = require('path');
const express = require('express');
const app = express();
require('./config/express')(app);

// For starter kit env.
require('dotenv').config({
  silent: true
});
const pEnv = process.env;
const skitJson = JSON.parse(process.env.service_watson_text_to_speech || "{}");

// Look for credentials in all the places
const apikey = process.env.TEXT_TO_SPEECH_APIKEY || process.env.TEXTTOSPEECH_APIKEY || skitJson?.apikey;
const url = process.env.TEXT_TO_SPEECH_URL ||
process.env.TEXTTOSPEECH_URL || skitJson?.url;

// A null/undefined service env var would actually cause
// the core SDK to throw an error in integration tests
// and fail the test, but if the env var is left unset
// it won't
if (apikey) {
  process.env.TEXT_TO_SPEECH_APIKEY = apikey;
}

if (url) {
  process.env.TEXT_TO_SPEECH_URL = url;
}

// Create Text to Speech client.
let client;
try {
  client = new TextToSpeechV1({ version: '2020-06-02' });
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
    if (client) {
      const { result } = await client.listVoices();
      return res.json(result);
    } else {
      // Return Allison for testing and user still gets creds pop-up.
      return res.json(
        { voices: [
          { name: 'en-US_AllisonV3Voice',
            description: 'Allison: American English female voice. Dnn technology.',
          }]
        });
    }
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

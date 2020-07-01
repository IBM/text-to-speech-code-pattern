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

if (pEnv.service_watson_text_to_speech && !pEnv.VCAP_SERVICES && !pEnv.TEXT_TO_SPEECH_APIKEY && !pEnv.TEXT_TO_SPEECH_URL && !pEnv.TEXT_TO_SPEECH_USERNAME) {
  // If we don't have the expected environment variables, use the starter kit apikey and url.
  let skitJson = JSON.parse(pEnv.service_watson_text_to_speech);
  process.env.TEXT_TO_SPEECH_APIKEY = skitJson.apikey;
  process.env.TEXT_TO_SPEECH_URL = skitJson.url;
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

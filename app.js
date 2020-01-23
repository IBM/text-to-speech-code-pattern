const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1.js');
const {
  BearerTokenAuthenticator,
  CloudPakForDataAuthenticator,
  Cp4dTokenManager,
  IamAuthenticator,
  IamTokenManager,
} = require('ibm-watson/auth');
const path = require('path');
const express = require('express');
const vcapServices = require('vcap_services');
const app = express();
require('./config/express')(app);

let url = process.env.TEXT_TO_SPEECH_URL;
let authUrl = process.env.TEXT_TO_SPEECH_AUTH_URL;

// Supply the API key for IAM authentication.
let apikey = process.env.TEXT_TO_SPEECH_APIKEY;

// Supply the bearer token + URL for an instance on CPD (see the README for more details).
let bearerToken = process.env.TEXT_TO_SPEECH_BEARER_TOKEN;

// Supply the username + password + URL as an alternative for an instance on CPD.
let username = process.env.TEXT_TO_SPEECH_USERNAME;
let password = process.env.TEXT_TO_SPEECH_PASSWORD;

// On Cloud Foundry, we'll have a VCAP_SERVICES environment variable with credentials.
let vcapCredentials = vcapServices.getCredentials('speech_to_text');

// Create appropriate token manager and client.
let client;
let tokenManager;
if (vcapCredentials || apikey) {
  // Choose credentials from VCAP if they exist.
  apikey = (vcapCredentials && vcapCredentials.apikey) || apikey;
  url = (vcapCredentials && vcapCredentials.url) || url;

  try {
    tokenManager = new IamTokenManager({ apikey });
    client = new TextToSpeechV1({
      serviceUrl: url,
      authenticator: new IamAuthenticator({ apikey }),
    });
  } catch (err) {
    console.error('Error creating IAM token manager and client: ', err);
  }
} else if (username && password && url) {
  try {
    tokenManager = new Cp4dTokenManager({ username, password, url: authUrl });
    client = new TextToSpeechV1({
      serviceUrl: url,
      disableSslVerification: true,
      authenticator: new CloudPakForDataAuthenticator({
        username,
        password,
        url: authUrl,
        disableSslVerification: true,
      }),
    });
  } catch (err) {
    console.error('Error creating CP4D token manager: ', err);
  }
} else if (bearerToken) {
  client = new TextToSpeechV1({
    serviceUrl: url,
    disableSslVerification: true,
    authenticator: new BearerTokenAuthenticator({ bearerToken }),
  });
}

const getToken = async () => {
  let tokenResponse = {};

  try {
    if (tokenManager) {
      const token = await tokenManager.getToken();
      tokenResponse = {
        ...tokenResponse,
        accessToken: token,
        url,
      };
    } else if (bearerToken && url) {
      tokenResponse = {
        ...tokenResponse,
        accessToken: bearerToken,
        url,
      };
    } else {
      tokenResponse = {
        ...tokenResponse,
        error: {
          title: 'No valid credentials found',
          description:
            'Could not find valid credentials for the Text to Speech service.',
          statusCode: 401,
        },
      };
    }
  } catch (err) {
    tokenResponse = {
      ...tokenResponse,
      error: {
        title: 'Authentication error',
        description:
          'There was a problem authenticating with the Text to Speech service.',
        statusCode: 400,
      },
    };
  }

  return tokenResponse;
};

app.get('/', (_, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/health', (_, res) => {
  res.json({ status: 'UP' });
});

app.get('/api/auth', async (_, res, next) => {
  const token = await getToken();

  if (token.error) {
    console.error(token.error);
    next(token.error);
  } else {
    return res.json(token);
  }
});

app.get('/api/voices', async (_, res, next) => {
  try {
    const { result } = await client.listVoices();
    return res.json(result);
  } catch (error) {
    console.error(error);
    if (!client) {
      error.statusCode = 401;
      error.description =
        'Could not find valid credentials for the Text to Speech service.';
      error.title = 'Invalid credentials';
    }
    next(error);
  }
});

app.pos;

// error-handler settings for all other routes
require('./config/error-handler')(app);

module.exports = app;

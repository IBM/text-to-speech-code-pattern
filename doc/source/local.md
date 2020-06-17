# Run locally

This document shows how to run the application on your local machine.

## Steps

1. [Clone the repo](#clone-the-repo)
1. [Configure credentials](#configure-credentials)
1. [Start the server](#start-the-server)

### Clone the repo

Clone the repo locally. In a terminal, run:

```bash
git clone https://github.com/IBM/text-to-speech-code-pattern
cd text-to-speech-code-pattern
```

### Configure credentials

Copy the `env.sample` file to `.env`.

```bash
cp env.sample .env
```

Edit the `.env` file to configure credentials before starting the Node.js server.
The credentials to configure will depend on whether you are provisioning services using IBM Cloud Pak for Data or on IBM Cloud.
 
Click to expand one:

<details><summary><b>IBM Cloud Pak for Data</b></summary>
<p>

For the **Text to Speech** service, the following settings are needed:

* Set <b>TEXT_TO_SPEECH_AUTH_TYPE</b> to <b>cp4d</b>
* Provide the <b>TEXT_TO_SPEECH_URL</b>, <b>TEXT_TO_SPEECH_USERNAME</b> and <b>TEXT_TO_SPEECH_PASSWORD</b> collected in the previous step.
* For the <b>TEXT_TO_SPEECH_AUTH_URL</b> use the base fragment of your URL including the host and port. <i>I.e. https://{cpd_cluster_host}{:port}</i>.
* If your CPD installation is using a self-signed certificate, you need to disable SSL verification with <b>both</b> <b>TEXT_TO_SPEECH_DISABLE_SSL</b> and <b>TEXT_TO_SPEECH_AUTH_DISABLE_SSL</b> set to true. You might also need to use browser-specific steps to ignore certificate errors (try browsing to the AUTH_URL). Disable SSL only if absolutely necessary, and take steps to enable SSL as soon as possible.
* Make sure the examples for IBM Cloud and bearer token auth are commented out (or removed).

```bash
#----------------------------------------------------------
# IBM Cloud Pak for Data (username and password)
#
# If your services are running on IBM Cloud Pak for Data,
# uncomment and configure these.
# Remove or comment out the IBM Cloud section.
#----------------------------------------------------------

TEXT_TO_SPEECH_AUTH_TYPE=cp4d
TEXT_TO_SPEECH_URL=https://{cpd_cluster_host}{:port}/text-to-speech/{release}/instances/{instance_id}/api
TEXT_TO_SPEECH_AUTH_URL=https://{cpd_cluster_host}{:port}
TEXT_TO_SPEECH_USERNAME=<add_text-to-speech_username>
TEXT_TO_SPEECH_PASSWORD=<add_text-to-speech_password>
# # If you use a self-signed certificate, you need to disable SSL verification.
# # This is not secure and not recommended.
# TEXT_TO_SPEECH_DISABLE_SSL=true
# TEXT_TO_SPEECH_AUTH_DISABLE_SSL=true
```

</p>
</details>

<details><summary><b>IBM Cloud</b></summary>
<p>

For the Text to Speech service, the following settings are needed:

* Set <b>TEXT_TO_SPEECH_AUTH_TYPE</b> to <b>iam</b>
* Provide the <b>TEXT_TO_SPEECH_URL</b> and <b>TEXT_TO_SPEECH_APIKEY</b> collected in the previous step.
* Make sure the examples for IBM Cloud Pak for Data and bearer token auth are commented out (or removed).
<p>

```bash
# Copy this file to .env and replace the credentials with
# your own before starting the app.

#----------------------------------------------------------
# IBM Cloud
#
# If your services are running on IBM Cloud,
# uncomment and configure these.
# Remove or comment out the IBM Cloud Pak for Data sections.
#----------------------------------------------------------

TEXT_TO_SPEECH_AUTH_TYPE=iam
TEXT_TO_SPEECH_APIKEY=<add_text-to-speech_apikey>
TEXT_TO_SPEECH_URL=<add_text-to-speech_url>
```

</p>
</details>

> Need more information? See the [authentication wiki](https://github.com/IBM/node-sdk-core/blob/master/AUTHENTICATION.md).

### Start the server

```bash
npm install
npm start
```

The application will be available in your browser at http://localhost:5000.  Return to the README.md for instructions on how to use the app.

[![return](https://raw.githubusercontent.com/IBM/pattern-utils/master/deploy-buttons/return.png)](../../README.md#3-use-the-web-app)
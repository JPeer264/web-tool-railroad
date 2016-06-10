# Guide to publish the frontend

> **IMPORTANT** This installation guide requires specific components on the terminal. Please make sure that you are familiar with the terminal.

## Installation

> **Note:** make sure NodeJS and NPM (v3+) are installed. You can find further information [here](https://docs.npmjs.com/getting-started/installing-node)

> **Note:** make sure `bower` is globally installed. You can find further information [here](http://bower.io/#install-bower)

Go in the terminal, navigate to the project root and run following command `npm install`, this will automatically execute `bower install`.

## Prepare for publish

### Change necessary variables

To make sure the frontend will get all the information from the right server, you have to change the first two variables in the `.src/assets/js/app.js` folder, called `SERVERPATH` and `APIPATH`.

**SERVERPATH**. The variable `SERVERPATH` is for the URL where the backend (Lumen) is placed. It will be used for getting the uploaded pictures or extending the variable `APIPATH`

**APIPATH**. The variable `APIPATH` is for the folder where the frontend has to make the API requests. With the used Lumen framework it is usually in the `public/api/v1` folder

### Make the application production ready

> **Note:** make sure `grunt-cli` is globally installed. You can find further information [here](https://www.npmjs.com/package/grunt-cli)

In order to make the application production ready, you have to go in the terminal and navigate to the project root. In the project root execute following command: `grunt build:prod`

This will generate new directives. The most important one is `./dist`, where the optimized code is ready for production. Do not delete it... **yet**

## Publish the frontend

### STEP 1
Prepare your server that your domain will point to a folder of your choice.

**Example:**

Your domain `www.elephorum.com` point at the server on the folder `/var/www/elephorum.com/`.

### STEP 2
Copy/Upload the content of the `./dist` folder into the folder where the domain will point to.

Check if the folder structure looks like following:

```
YOUR_CHOSEN_DIR_ON_THE_SERVER
└─── index.html
    ├─── assets/
    │   ├─── js/
    │   └─── ...
    └─── i18n/
        └─── ...

```

> **Important:** it should not look like this: `/var/www/elephorum.com/dist/`

### STEP 3

Congrantulations your frontend is ready on your server.



# COMP 426 Final Project: Express Yourself

## Getting Started

Clone the repository into VSCode, and use `npm install` to install dependencies.

Similar to A05, use `node setup_db.mjs` to set up the database. This should create a file called `db.sqlite` which holds the initial values. You are free to do whatever you want with this file; it is included in `.gitignore`, meaning your changes won't be pushed up to GitHub. To reset the database, simply delete the `db.sqlite` file and run `node setup_db.mjs` again.

Use `node app.mjs` to run the backend application. Open the `index.html` file with Live Server to interact with the frontend.

## Getting an API Key

This application utilizes an API from [TextCortex](https://textcortex.com/) that will automatically generate Twitter-like posts based on one or more keywords. To use the API, though, you will need to create a free account and generate your own key, and then incorporate the key into the project. I've wrote some steps on how to do this below.

1. Go to [TextCortex's Text Generation API website](https://textcortex.com/text-generation-api) and create an account.
2. Once you log in to your account, navigate to your [dashboard](https://app.textcortex.com/user/dashboard) (if you aren't redirected there automatically). 
3. Click on your account name in the bottom right to expand the options, and click on "API Key."
4. Underneath the "API Settings" section, click "Generate New API Key" and copy it.
5. Create a new file in the project directory called `api_key.js`. This file should be included in `.gitignore`, so it won't be pushed up to GitHub.
6. Define a new string variable called `apiKey` and initialize it to be your newly-generated API key. Be sure to export it also.

Once you've done all that, everything should work properly and you should be able to use the API to generate posts.
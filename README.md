# COMP 426 Final Project

To get started, clone the repository into VSCode, and use `npm install` to install dependencies.

Similar to A05, use `node setup_db.mjs` to set up the database. This should create a file called `db.sqlite` which holds the initial values. You are free to do whatever you want with this file; it is included in `.gitignore`, meaning your changes won't be pushed up to GitHub. To reset the database, simply delete the `db.sqlite` file and run `node setup_db.mjs` again.

Use `node app.mjs` to run the backend application. Open the `index.html` file with Live Server to interact with the frontend.
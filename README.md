# COMP 426 Final Project: ExpressYourself

## Authors

- [Matthew Reddy](https://github.com/matthewreddy)
- [Ryan Sabo](https://github.com/RyanSabo)
- [Joe Sachtleben](https://github.com/jbsacht)

## Overview

This full-stack web application allows users to "express themselves" by creating posts about anything they want. Similar to a message board or a blog website, each user has the ability to register for an account, sign in, and then create a post by providing a title and some content. Users can also see everyone else's posts and interact with them by liking them, and they have the ability to edit and delete their own posts.

In addition to creating posts by specifying their own content, users have the option to automatically generate the content of a post based on keywords using artifical intelligence. They are also able to observe the weather in the Chapel Hill area. See [Third-Party APIs](https://github.com/matthewreddy/comp426-final-project/blob/main/README.md#third-party-apis) for more details on how these were implemented.

Certain users can be designated as administrative users and have special permissions to help moderate the website. For example, if a post is deemed inappropriate for whatever reason, an admin has the ability to delete any post. They may also view a list of all users that have been registered. For each user, an admin has the ability to promote them to an admin or demote them back to a regular user. They may also delete the account of a specific user.

## Demonstration Video

A video demonstrating all features of the application at a more in-depth level can be found [here](https://youtube.com) (link pending).

## Running the Application

Clone the repository and use `npm install` in the terminal to install dependencies.

Move your cursor into the backend directory using `cd backend`. Similar to A05, use `node setup_db.mjs` to set up the database. This should create a file called `db.sqlite` which holds the initial values. You are free to do whatever you want with this file; it is included in `.gitignore`, meaning your changes won't be pushed up to GitHub. To reset the database, simply delete the `db.sqlite` file and run `node setup_db.mjs` again.

Use `node app.mjs` to run the backend application. Open the `frontend/login/login.html` file with Live Server (or anything else that can load dynamic pages) to interact with the frontend.

## Third-Party APIs

### Using AI to Generate Posts

This application utilizes an API from [TextCortex](https://textcortex.com/) that will automatically generate Twitter-like posts based on one or more keywords. To use the API, though, you will need to create a free account and generate your own key, and then incorporate the key into the project. Below are some steps to accomplish this.

1. Go to [TextCortex's Text Generation API website](https://textcortex.com/text-generation-api) and create an account.
2. Once you log in to your account, navigate to your [dashboard](https://app.textcortex.com/user/dashboard) (if you aren't redirected there automatically). 
3. Click on your account name in the bottom right to expand the options, and click on **API Key**.
4. Underneath the **API Settings** section, click **Generate New API Key** and copy it.
5. Create a new file in the project directory at the top level called `api_key.js`. This file should be included in `.gitignore`, so it won't be tracked by Git.
6. Define a new string variable called `apiKey` and initialize it to be your newly-generated API key. Be sure to export it also. Once complete, `api_key` should have one line that looks like this:
    ```javascript
    export const apiKey = "YOUR API KEY";
    ```

Once you've done all that, everything should work properly and you should be able to use the API to generate posts.

### Observing the Weather


import {db} from "./db.mjs";

/*
This module sets up the database. I am creating two initial users for now -- "super" (which is an admin) and "averagejoe." Both users have one post each.
You can log in as either of the users; their information is given below.
*/

await db.run("CREATE TABLE User (id INTEGER PRIMARY KEY, username TEXT(100) NOT NULL UNIQUE, password TEXT(100) NOT NULL, isAdmin INTEGER NOT NULL)");
await db.run("INSERT INTO User VALUES (?, ?, ?, ?)", 1, "super", "super", 1);
await db.run("INSERT INTO User Values (?, ?, ?, ?)", 2, "averagejoe", "123", 0);

await db.run("CREATE TABLE Post (id INTEGER PRIMARY KEY, title TEXT(100) NOT NULL, content TEXT(100) NOT NULL, timestamp INTEGER NOT NULL, user_id INTEGER NOT NULL, " + 
             "FOREIGN KEY (user_id) REFERENCES User(id))");
await db.run("INSERT INTO Post VALUES (?, ?, ?, ?, ?)", 1, "Welcome!", "Welcome to ExpressYourself, where you can talk about... well, anything!", Date.now(), 1);
await db.run("INSERT INTO Post VALUES (?, ?, ?, ?, ?)", 2, "Average Joe makes a post", 
             "I was walking down the street the other day when I thought to myself: 'I should make a post!' Then I realized how average I am!",
             Date.now(), 2);

await db.run("CREATE TABLE Like (post_id INTEGER NOT NULL, user_id INTEGER NOT NULL, " +
             "FOREIGN KEY (post_id) REFERENCES User(id), FOREIGN KEY (user_id) REFERENCES Post(id))");

db.close();
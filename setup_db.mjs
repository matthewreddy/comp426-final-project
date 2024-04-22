import {db} from "./db.mjs";

await db.run("CREATE TABLE User (id INTEGER PRIMARY KEY, username TEXT(100) NOT NULL UNIQUE, password TEXT(100) NOT NULL, isAdmin INTEGER NOT NULL)");
await db.run("INSERT INTO User VALUES (?, ?, ?, ?)", 1, "super", "super", 1);

await db.run("CREATE TABLE Post (id INTEGER PRIMARY KEY, title TEXT(100) NOT NULL, content TEXT(100) NOT NULL, user_id INTEGER NOT NULL, " + 
             "FOREIGN KEY (user_id) REFERENCES User(id))");
await db.run("INSERT INTO Post VALUES (?, ?, ?, ?)", 1, "Test", "Test content.", 1);

db.close();
import {db} from "./db.mjs";

await db.run("CREATE TABLE User (id INTEGER PRIMARY KEY, username TEXT(100) NOT NULL, password TEXT(100) NOT NULL, isAdmin INTEGER NOT NULL)");
await db.run("INSERT INTO User VALUES (?, ?, ?, ?)", 1, "super", "super", 1);

db.close();
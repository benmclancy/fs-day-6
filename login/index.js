const express = require("express");
const router = express.Router();
const fs = require("fs");

router.post("/", (req, res) => {
    const user = req.body;
    fs.readFile("./src/data/data.json", function(err, data) {
        var error = false;
        var errMsg = "";
        if (err) {
            error = true;
            throw err;
        } else {
            var count = 0;

            if (data.length > 0) {
                var parseData = JSON.parse(data);
                parseData.users.forEach(existingUser => {
                    if (existingUser.email === user.email) {
                        if (existingUser.password === user.password) {
                            console.log("Successful Login");
                        }
                    }
                    count++;
                });
            } else {
                throw new Error("Invalid Account Information.");
            }
        }
    });
});
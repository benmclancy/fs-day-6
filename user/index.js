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
                        throw new Error("This email address already been used");
                    }
                    count++;
                });
            } else {
                parseData = {
                    users: []
                };
            }

            const newUser = {
                id: (count + 1).toString(),
                name: user.name,
                surname: user.surname,
                cellPhone: user.cellPhone,
                email: user.email,
                password: user.password,
                role: user.role
            };
            console.log(newUser);
            parseData.users.push(newUser);
            fs.writeFile("./src/data/data.json", JSON.stringify(parseData), function(
            err
            ) {
                if (err) {
                    error = true;
                    throw err;
                }
                res.json(newUser);
            });

        }

        if (error) {
            res.status(400).json({ msg: errMsg });
        }
    });
});



module.exports = router;
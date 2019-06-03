const express = require('express');

const app = express();

var properties = new Array();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req,res) => {
    console.log(req.headers);
    res.send('<h1>Hello World!</h1>');
});
 
const PORT = process.env.PORT || 5000;

app.get("/properties", (req, res) => {
    // var properties = new Array();
    // properties.push({
    //     id: 1,
    //     name: "One",
    //     location: "Lisbon"
    // });
    res.json(properties);
});

app.post("/properties", (req, res) => {
    const property = req.body;
    properties.push(property);
    res.json(property);
});

app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));


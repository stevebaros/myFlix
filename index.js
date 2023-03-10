const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(morgan("common"));

let topMovies = [{
        title: "Toylar Muborak",
        author: "Erkin Komilov"
    },
    {
        title: "Mahallada duv duv gap",
        author: "Shokir Adhamov"
    },
    {
        title: "Toylar Muborak",
        author: "Erkin Komilov"
    },
    {
        title: "Mahallada duv duv gap",
        author: "Shokir Adhamov"
    },
    {
        title: "Toylar Muborak",
        author: "Erkin Komilov"
    },
    {
        title: "Mahallada duv duv gap",
        author: "Shokir Adhamov"
    }
];
/* Middleware functions */
let myLogger = (req, res, next)=>{
    console.log(req.url);
    next();
};

let requestedTime = (req, res, next)=>{
    req.requestTime = Date.now();
    next();
};

app.use(myLogger);
app.use(requestedTime);
app.use(express.static('public'));



/* Checking the url path according to the request, then responding */
app.get("/", (req, res)=>{
    let res_Text = "Welcome!!!";
    res_Text += "Requested: " + req.requestTime;
    res.send(res_Text);
});

app.get("/documentation", (req, res)=>{
   /*  res.sendFile("public/documentation.html", {root: __dirname}); */
});

app.get("/movies", (req, res)=>{
    res.json(topMovies);
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(8080, ()=>{
    console.log("Server is listening on port 8080");
});

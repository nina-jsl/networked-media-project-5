const express = require("express");
const multer = require("multer");
const bodyParser = require("body-parser");
const nedb = require("@seald-io/nedb");

const expressSession = require('express-session');
const nedbSessionStore = require('nedb-promises-session-store');
const bcrypt = require('bcrypt');

let database = new nedb({
    filename: "database.txt",
    autoload: true,
});

const urlEncodedParser = bodyParser.urlencoded({
    extended: true
});

const upload = multer({
    dest: "public/uploads",
});

const nedbSessionInit = nedbSessionStore({
    connect: expressSession,
    filename: 'sessions.txt'
})

let userDatabase = new nedb({
    filename: 'userdb.txt',
    autoload: true
})

const app = express();
app.use(express.static("public"));
app.use(urlEncodedParser);
app.set("view engine", "ejs");

app.use(expressSession({
    store: nedbSessionInit,
    secret: "supersecret123"
}))

app.get("/", (req, res) => {
    res.render("start.ejs")
})

app.get("/login", (req, res) => {
    res.render("login.ejs");
})

app.get("/register", (req, res) => {
    res.render("register.ejs");
})

app.post("/signup", upload.single('profilePicture'), (req, res) => {
    //encrpting password so plain text is not stored in db
    let hashedPassword = bcrypt.hashSync(req.body.password, 10)

    //local variable that holds my data object to be inserted into userdb 
    let data = {
        username: req.body.username,
        password: hashedPassword
    }
    userDatabase.insert(data, (err, dataInserted) => {
        console.log(dataInserted),
            res.redirect('/login')
    })
})

app.post("/authenticate", (req, res) => {
    let attemptLogin = {
        username: req.body.username,
        password: req.body.password
    }

    let searchQuery = {
        username: attemptLogin.username
    }

    userDatabase.findOne(searchQuery, (err, user) => {
        console.log("login attempted");
        if (err || user == null) {
            res.redirect("/login");
        } else {
            console.log("found user")
            //encode the password to see whether or not the password is valid + stored in db
            let encPass = user.password;
            //using bcrypt to get the stored password, decrpt it and compare to attempted login password
            var result = bcrypt.compareSync(attemptLogin.password, encPass);
            if (result) {
                let session = req.session;
                session.loggedInUser = attemptLogin.username;
                console.log("successful login");
                res.redirect("/home");
            } else {
                res.redirect("/");
            }
        }
    })
})

app.get("/home", (req, res) => {
    let query = {};
    database.find(query, (err, data) => {
        res.render("home.ejs", { posts: data });
    });
})

app.get("/about", (req, res) => {
    res.render("about.ejs")
})

app.post("/upload", upload.single("theimage"), (req, res) => {
    console.log(req.body);

    let currDate = new Date();

    let data = {
        text: req.body.text,
        date: currDate.toLocaleString(),
        timestamp: currDate.getTime(),
        positionData: req.body.positionData
    };

    if (req.file) {
        data.imgSrc = "/uploads/" + req.file.filename;
    }

    database.insert(data, (err, newData) => {
        console.log(newData);
        res.redirect("/home");
    });
});

app.listen(2000, () => {
    console.log("server starts");
})
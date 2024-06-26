const express = require("express");
const multer = require("multer");
const bodyParser = require("body-parser");
const nedb = require("@seald-io/nedb");
const expressSession = require('express-session');
const nedbSessionStore = require('nedb-promises-session-store');
const bcrypt = require('bcryptjs'); // Updated here

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
});

let userDatabase = new nedb({
    filename: 'userdb.txt',
    autoload: true
});

const app = express();
app.use(express.static("public"));
app.use(urlEncodedParser);
app.set("view engine", "ejs");

app.use(expressSession({
    store: nedbSessionInit,
    secret: "supersecret123"
}));

app.get("/", (req, res) => {
    res.render("start.ejs")
});

app.get("/login", (req, res) => {
    res.render("login.ejs");
});

app.get("/register", (req, res) => {
    res.render("register.ejs");
});

app.post("/signup", upload.single('profilePicture'), (req, res) => {
    let hashedPassword = bcrypt.hashSync(req.body.password, 10);

    let data = {
        username: req.body.username,
        password: hashedPassword
    };
    userDatabase.insert(data, (err, dataInserted) => {
        console.log(dataInserted);
        res.redirect('/login');
    });
});

app.post("/authenticate", (req, res) => {
    let attemptLogin = {
        username: req.body.username,
        password: req.body.password
    };

    let searchQuery = {
        username: attemptLogin.username
    };

    userDatabase.findOne(searchQuery, (err, user) => {
        console.log("login attempted");
        if (err || user == null) {
            res.redirect("/login");
        } else {
            console.log("found user");
            let encPass = user.password;
            var result = bcrypt.compareSync(attemptLogin.password, encPass);
            if (result) {
                let session = req.session;
                session.loggedInUser = attemptLogin.username;

                console.log("successful login");
                res.redirect("/home?showAbout=true");
            } else {
                res.redirect("/");
            }
        }
    });
});

app.get("/home", (req, res) => {
    if (!req.session.loggedInUser) {
        return res.redirect("/login");
    }
    database.find({ username: req.session.loggedInUser }, (err, data) => {
        if (err) {
            console.error("Error fetching data:", err);
            return res.status(500).send("Error fetching data");
        }

        res.render("home.ejs", { posts: data, showAbout: req.query.showAbout });
        req.body.showAbout = false;
    });
});

app.get("/about", (req, res) => {
    res.render("about.ejs");
});

app.post("/upload", upload.single("theimage"), (req, res) => {
    console.log(req.body);

    let currDate = new Date();

    let data = {
        username: req.session.loggedInUser,
        text: req.body.text,
        date: currDate.toLocaleString(),
        timestamp: currDate.getTime(),
        x: req.body.x,
        y: req.body.y,
        showAbout: req.body.showAbout
    };

    if (req.file) {
        data.imgSrc = "/uploads/" + req.file.filename;
    }

    database.insert(data, (err, newData) => {
        if (err) {
            console.error("Error inserting data:", err);
            res.status(500).send("Error inserting data");
        } else {
            res.redirect("/home?showAbout=false");
        }
    });
});

app.listen(2000, () => {
    console.log("server starts");
});

// const express = require("express");
// const multer = require("multer");
// const bodyParser = require("body-parser");
// const nedb = require("@seald-io/nedb");

// const expressSession = require('express-session');
// const nedbSessionStore = require('nedb-promises-session-store');
// const bcrypt = require('bcrypt');

// let database = new nedb({
//     filename: "database.txt",
//     autoload: true,
// });

// const urlEncodedParser = bodyParser.urlencoded({
//     extended: true
// });

// const upload = multer({
//     dest: "public/uploads",
// });

// const nedbSessionInit = nedbSessionStore({
//     connect: expressSession,
//     filename: 'sessions.txt'
// })

// let userDatabase = new nedb({
//     filename: 'userdb.txt',
//     autoload: true
// })

// const app = express();
// app.use(express.static("public"));
// app.use(urlEncodedParser);
// app.set("view engine", "ejs");

// app.use(expressSession({
//     store: nedbSessionInit,
//     secret: "supersecret123"
// }))

// app.get("/", (req, res) => {
//     res.render("start.ejs")
// })

// app.get("/login", (req, res) => {
//     res.render("login.ejs");
// })

// app.get("/register", (req, res) => {
//     res.render("register.ejs");
// })

// app.post("/signup", upload.single('profilePicture'), (req, res) => {
//     //encrpting password so plain text is not stored in db
//     let hashedPassword = bcrypt.hashSync(req.body.password, 10)

//     //local variable that holds my data object to be inserted into userdb 
//     let data = {
//         username: req.body.username,
//         password: hashedPassword
//     }
//     userDatabase.insert(data, (err, dataInserted) => {
//         console.log(dataInserted),
//             res.redirect('/login')
//     })
// })

// app.post("/authenticate", (req, res) => {
//     let attemptLogin = {
//         username: req.body.username,
//         password: req.body.password
//     }

//     let searchQuery = {
//         username: attemptLogin.username
//     }

//     userDatabase.findOne(searchQuery, (err, user) => {
//         console.log("login attempted");
//         if (err || user == null) {
//             res.redirect("/login");
//         } else {
//             console.log("found user")
//             //encode the password to see whether or not the password is valid + stored in db
//             let encPass = user.password;
//             //using bcrypt to get the stored password, decrpt it and compare to attempted login password
//             var result = bcrypt.compareSync(attemptLogin.password, encPass);
//             if (result) {
//                 let session = req.session;
//                 session.loggedInUser = attemptLogin.username;

//                 console.log("successful login");
//                 res.redirect("/home?showAbout=true");
//             } else {
//                 res.redirect("/");
//             }
//         }
//     })
// })

// app.get("/home", (req, res) => {
    
//     if (!req.session.loggedInUser) {
//         return res.redirect("/login");
//     }
//     database.find({ username: req.session.loggedInUser }, (err, data) => {
//         if (err) {
//             console.error("Error fetching data:", err);
//             return res.status(500).send("Error fetching data");
//         }
        
//         res.render("home.ejs", { posts: data, showAbout: req.query.showAbout });
//         req.body.showAbout = false;
//     });
// });




// app.get("/about", (req, res) => {
//     res.render("about.ejs")
// })

// app.post("/upload", upload.single("theimage"), (req, res) => {
//     console.log(req.body);

//     let currDate = new Date();

//     let data = {
//         username: req.session.loggedInUser, // Associate div with the logged-in user
//         text: req.body.text,
//         date: currDate.toLocaleString(),
//         timestamp: currDate.getTime(),
//         x: req.body.x,
//         y: req.body.y,
//         showAbout: req.body.showAbout
//     };

//     if (req.file) {
//         data.imgSrc = "/uploads/" + req.file.filename;
//     }

//     database.insert(data, (err, newData) => {
//         if (err) {
//             console.error("Error inserting data:", err);
//             res.status(500).send("Error inserting data");
//         } else {
//             // console.log("Data inserted successfully:", newData);
//             res.redirect("/home?showAbout=false");
            
//         }
//     });
// });


// app.listen(2000, () => {
//     console.log("server starts");
// })
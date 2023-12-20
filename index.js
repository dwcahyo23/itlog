const path = require("path");
const express = require("express");
const hbs = require("hbs");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const myConnection = require("express-myconnection");
const app = express();
var favicon = require("serve-favicon");

const macaddress = require("macaddress");

const arp = require("@network-utils/arp-lookup");

//Create Connection
const conn = {
  host: "192.168.192.7", // database host
  user: "admin", // your database username
  password: "secretkey", // your database password
  port: 3307, // default MySQL port
  database: "loginregistry", // your database name
};

app.use(myConnection(mysql, conn, "pool"));
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/assets", express.static(__dirname + "/public"));

//route for homepage
app.get("/:name", (req, res) => {
  let data = { _ip: req.ip, name: req.params.name };
  req.getConnection(function (error, conn) {
    var sql = "INSERT INTO log_ip SET ?";
    conn.query(sql, data, function (err, rows) {
      if (err) throw err;
      console.log(req.ip);
      res.render("it", {
        ip: req.ip,
        name: req.params.name,
      });
    });
  });
});

//   let data = {
//     nik: req.body.nik,
//     firstName: req.body.firstName,
//     lastName: req.body.lastName,
//     email: req.body.email,
//     password: req.body.password,
//     departement: req.body.departement,
//   };
//   req.getConnection(function (error, conn) {
//     var sql = "INSERT INTO data SET ?";
//     conn.query(sql, data, function (err, rows) {
//       if (err) throw err;
//       res.render("exitend", {
//         firstName: req.body.firstName,
//         lastName: req.body.lastName,
//       });
//     });
//   });
// });

// app.get("/env", (req, res) => {
//   // var source = req.headers['user-agent']
//   // var ua = useragent.parse(source)

//   macaddress.all().then((result) => {
//     res.send({ result });
//   });
// });

//server listening
app.listen(2332, () => {
  console.log("Server is running at port 2332");
});

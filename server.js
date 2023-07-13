// let express = require("express");
// let app = express();
// app.express(express.static(__dirname + ));

// app.get('/*', (req,resp)=>{
//     resp.sendFile(__dirname + "/dist/team35-hackathon2023/index.html")
// })

// app.listen(process.env.PORT || 8800);

const express = require("express");
const path = require("path");
const app = express();
app.use(express.static(__dirname + "/dist/team35-hackathon2023"));
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname + "/dist/team35-hackathon2023/index.html"));
});

app.listen(process.env.PORT || 8080);

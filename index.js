const express = require('express');
const path = require('path');
const { exec } = require("child_process");

const app = express();
app.listen(80, () => console.log('Server running on port 3000'));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "/src/index.html"));
});
app.get('/script.js', (req, res) => {
  res.sendFile(path.join(__dirname, "/src/script.js"));
});
app.get('/style.css', (req, res) => {
  res.sendFile(path.join(__dirname, "/src/style.css"));
});
app.get("/test", (req, res) => {
  res.status(200).send(Date.now().toString());
});
app.get("/test/adguard", (req, res) => {
  exec("systemctl status AdGuardHome.service", (error, stdout, stderr) => {

    // if (error) {
    //   console.log(`exec error: ${error}`);
    //   return res.status(500).send(error.message);
    // }

    // if (stderr) {
    //   console.log(`stderr: ${stderr}`);
    //   return res.status(500).send(stderr);
    // }

    // if (stdout.includes("Active: active (running)")) {
    //   return res.status(200).send(stdout);
    // }


    res.status(500).send("t")//(stdout);
  });
})
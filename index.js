const express = require("express");
const speakeasy = require("speakeasy");
const qrcode = require("qrcode");
const fs = require("fs");

const app = express();

app.listen(3000, () => {
  console.log("server is starting");
});

app.get("/api/register", (req, res) => {
  const secret = speakeasy.generateSecret({
    name: "pos@pospos.co",
  });
  console.log(secret);
  const temp_secret = secret.base32;

  qrcode.toDataURL(secret.otpauth_url, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      fs.writeFileSync("qrcode.html", `<img src="${data}">`);
      console.log(data);
    }
  });
});

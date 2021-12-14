const express = require("express");
const speakeasy = require("speakeasy");
const qrcode = require("qrcode");
const fs = require("fs");

const app = express();

app.use(express.json());

app.listen(3000, () => {
  console.log("server is running http://localhost:3000");
});

app.get("/register", (req, res) => {
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

app.post("/login", (req, res) => {
  const { id, token } = req.body;

  const verified = speakeasy.totp.verify({
    secret: id,
    encoding: "base32",
    token,
  });

  if (verified) {
    res.status(200).json({
      result: "good",
    });
  } else {
    res.status(400).json({
      result: "bad",
    });
  }
});

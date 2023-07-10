const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const admin = require("firebase-admin");

const serviceaccount = require("../chatter-c981a-firebase-adminsdk-u0w8w-dcb31e2f06.json"); // get json file from firebase console
admin.initializeApp({
  projectId: serviceaccount.project_id,
  credential: admin.credential.cert(serviceaccount),
  serviceAccountId: serviceaccount.client_email, //Tt is used for creating firebase auth credentials
});
exports.auth = admin.auth();

router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      fullname: req.body.fullname,
      occupation: req.body.occupation,
      password: hashedPassword,
    });
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

//check username
router.get("/register/:username", async (req, res) => {
  const { username } = req.params;

  try {
    // Perform a database query to check if the username exists
    const user = await User.findOne({ userName: username });
    const isAvailable = !user;

    res.json({ available: isAvailable });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
//login

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(404).json("User not found");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !validPassword && res.status(400).json("wrong password");

    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;

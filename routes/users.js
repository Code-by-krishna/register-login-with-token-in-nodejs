var express = require('express');
var router = express.Router();
const User = require("../controller/user.controller");
// const user = new User(); 
const { body, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');


/* GET users listing. */
// router.post('/', User.registration);
router.post('/register',
  body('name').notEmpty().withMessage("Name is Required"),
  body('email').isEmail().withMessage("Enter valid email"),
  body('passwd').notEmpty().withMessage("Password is required"),
  (req,res,next) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    return next();
  }
  res.send({ errors: result.array() });
}, User.registration);

router.post('/login',
  body('email').isEmail().withMessage("Enter valid email"),
  body('passwd').notEmpty().withMessage("Password is required"),
  (req,res,next) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
      return next();
    }
    res.send({ errors: result.array() });
  } ,User.login);

router.post("/setaddress",User.SetAddress);
  //(req,res,next) => {
//    let token = req.headers.authorization;
//   //  console.log(token);
//    let payload = jwt.verify(token,'amit');
//    console.log(req.body);
//    User.SetAddress(req.body,payload.id)

// });

router.get("/getaddress",User.GetAddress);
router.patch("/updateaddress",User.UpdateAddress);
router.delete("/deleteaddress",User.DeleteAddress);


module.exports = router;

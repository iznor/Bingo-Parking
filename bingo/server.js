const express = require("express");
const app = express();
const router = express.Router();
const port = process.env.PORT || 3000;
const cors = require('cors')

app.use(express.json());
app.use(cors());
const { parkingsRouter } = require("./routers/parkingsRouter");
const { personsRouter } = require("./routers/personsRouter");
const { usersRouter } = require("./routers/usersRouter");
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header('Access-Control-Allow-Headers', "*");
  // res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.set('Content-Type', 'application/json; charset=utf-8');
  next();
});
app.use('/api/parkings', parkingsRouter);
app.use('/api/persons', personsRouter);
app.use('/api/users', usersRouter);

app.use(express.urlencoded({ extended: true }));
router.use((req,res,next) =>{
  console.log("/", req.method);
  next();
});


router.get("/", (req,res) => {
  res.json({"message" : "Please use /api"});

});

app.listen(port, () => console.log('Express server is running on port', port));

// const { authRouter } = require("./routers/authRouter");
// const authenticator = require("./middlewares/authenticator");
/*TODO: auth middleware =>
    app.use('/api/auth/', authRouter);
    app.use(authenticator.authenticator);
*/
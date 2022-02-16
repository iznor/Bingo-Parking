const express = require("express");
const userAuth = require("./middleware/userAuth");
const app = express();
const cors = require("cors");
const router = express.Router();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
const { parkingsRouter }  = require("./routers/parkingsRouter");
const { personsRouter }   = require("./routers/personsRouter");
const { userRouter }      = require("./routers/usersRouter");

app.use('/api/parkings', parkingsRouter);
app.use('/api/persons', personsRouter);
app.use('/api/user',  userRouter);

app.use(express.urlencoded({ extended: true }));
router.use((req,res,next) =>{
  console.log("/", req.method);
  next();
});

router.get("/", (req,res) => {
  res.json({"message" : "Please use /api"});

});

app.listen(port, () => console.log('Express server is running on port', port));
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json({ limit: "10mb" }));

const PORT = process.env.PORT || 8080;
//mongodb connection
console.log(process.env.MONGODB_URL);
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("connect to Database"))
  .catch((err) => console.log(err));

//schema
const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  confirmPassword: String,
  image: String,
});

//
const userModel = mongoose.model("user", userSchema);

//api
app.get("/", (req, res) => {
  res.send("server is running");
});
//sign up
app.post("/signup", async (req, res) => {
  console.log(req.body);
  const { email } = req.body;

  const result = await userModel.findOne({ email: email });
  console.log(result);
  if (result) {
    res.send({ message: "Email id is already register", alert: false });
  } else {
    const data = userModel(req.body);
    const save = data.save();
    res.send({ message: "successfully sign up ", alert: true });
  }
});

//login
app.post("/login", async (req, res) => {
  console.log(req.body);
  const { email } = req.body;
  const result = await userModel.findOne({ email: email });
  if (result) {
    const dataSend = {
      _id: result._id,
      firstName: result.firstName,
      lastName: result.lastName,
      email: result.email,
      image: result.image,
    };
    console.log(dataSend);
    res.send({
      message: "Logged in successfully",
      alert: true,
      data: dataSend,
    });
  } else {
    res.send({
      message: "Email is not avaliable,Please Sign Up",
      alert: false,
    });
  }
});

//product section
const schemaProduct = mongoose.Schema({
  name: String,
  category: String,
  image: String,
  price: String,
  description: String,
});
const productModel= mongoose.model("product",schemaProduct)

//save product in database
//api
app.post("/uploadProduct",async(req,res)=>{
  console.log(req.body)
  const data = await productModel(req.body)
  const datasave = await data.save()
  res.send({message:'Upload successfully'})
})
//
app.get('/product', async (req,res)=>{
  const data = await productModel.find({})
  res.send(JSON.stringify(data))
})

app.listen(PORT, () => console.log("server i running at port : " + PORT));

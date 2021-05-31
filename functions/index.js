const functions = require("firebase-functions");
const app = require("express")();
const cors = require("cors");

app.use(cors());

const auth = require("./util/auth");

const {
  getAllItems,
  postOneItem,
  deleteItem,
  editItem,
} = require("./APIs/items");

app.post("/item", auth, postOneItem);

app.get("/items", auth, getAllItems);

app.delete("/item/:itemId", auth, deleteItem);

app.put("/item/:itemId", auth, editItem);

const {
  loginUser,
  signUpUser,
  uploadProfilePhoto,
  getUserDetail,
  updateUserDetails,
} = require("./APIs/users");

// Users
app.post("/login", loginUser);

app.post("/signup", signUpUser);

app.post("/user/image", auth, uploadProfilePhoto);

app.get("/user", auth, getUserDetail);

app.post("/user", auth, updateUserDetails);

exports.api = functions.https.onRequest(app);

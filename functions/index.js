const functions = require("firebase-functions");
const app = require("express")();

const auth = require('./util/auth');

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
} = require("./APIs/users")

// Users
app.post("/api/login", loginUser);

app.post("/api/signup", signUpUser);

app.post('/api/user/image', auth, uploadProfilePhoto);

app.get('/api/user', auth, getUserDetail);

app.post('/api/user', auth, updateUserDetails);

exports.api = functions.https.onRequest(app);

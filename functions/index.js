const functions = require("firebase-functions");
const app = require("express")();
const cors = require("cors");

app.use(cors());

const auth = require("./util/auth");

const {
  getAllProjects,
  postOneProject,
  deleteProject,
  editProject,
} = require("./APIs/projects");

app.post("/project", auth, postOneProject);

app.get("/projects", auth, getAllProjects);

app.delete("/project/:projectId", auth, deleteProject);

app.put("/project/:projectId", auth, editProject);

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

const { db } = require("../util/admin");

exports.getAllProjects = (request, response) => {
  db
    .collection("projects")
    .where('username', '==', request.user.username)
    .orderBy("createdAt", "desc")
    .get()
    .then((data) => {
      let projects = [];
      data.forEach((doc) => {
        projects.push({
          projectId: doc.id,
          title: doc.data().title,
          body: doc.data().body,
          createdAt: doc.data().createdAt,
        });
      });
      return response.json(projects);
    })
    .catch((err) => {
      console.error(err);
      return response.status(500).json({ error: err.code });
    });
};

exports.postOneProject = (request, response) => {
  if (request.body.body.trim() === "") {
    return response.status(400).json({ body: "Must not be empty" });
  }

  if (request.body.title.trim() === "") {
    return response.status(400).json({ title: "Must not be empty" });
  }

  const newProject = {
    title: request.body.title,
    body: request.body.body,
    createdAt: new Date().toISOString(),
    username: request.user.username,
  }
  db
    .collection("projects")
    .add(newProject)
    .then((doc) => {
      const responseProject = newProject;
      responseProject.id = doc.id;
      return response.json(responseProject);
    })
    .catch((err) => {
      response.status(500).json({ error: "Something went wrong" });
      console.error(err);
    });
};

exports.deleteProject = (request, response) => {
  const document = db.doc(`/projects/${request.params.projectId}`);
  document
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return response.status(404).json({ error: "Project not found" })
      }
      if (doc.data().username !== request.user.username) {
        return response.status(403).json({ error: "UnAuthorized" })
      }
      return document.delete();
    })
    .then(() => {
      response.json({ message: "Delete successfull" });
    })
    .catch((err) => {
      console.error(err);
      return response.status(500).json({ error: err.code });
    });
};

exports.editProject = (request, response) => {
  if (request.body.projectId || request.body.createdAt) {
    response.status(403).json({ message: "Not allowed to edit" });
  }
  let document = db.collection("projects").doc(`${request.params.projectId}`);
  document.update(request.body)
    .then(() => {
      response.json({ message: "Updated successfully" });
    })
    .catch((err) => {
      console.error(err);
      return response.status(500).json({
        error: err.code
      });
    });
};
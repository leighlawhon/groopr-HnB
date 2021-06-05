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
          architect: doc.data().architect,
          bidDate: doc.data().bidDate,
          createdAt: doc.data().createdAt,
          dwgDate: doc.data().dwgDate,
          location: doc.data().location,
          notes: doc.data().notes,
          projectName: doc.data().projectName,
          quotedBy: doc.data().quotedBy,
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
  if (request.body.location.trim() === "") {
    return response.status(400).json({ body: "Must not be empty" });
  }

  if (request.body.projectName.trim() === "") {
    return response.status(400).json({ projectName: "Must not be empty" });
  }

  const newProject = {
    architect: request.body.architect,
    bidDate: request.body.bidDate,
    createdAt: new Date().toISOString(),
    dwgDate: request.body.dwgDate,
    location: request.body.location,
    notes: request.body.notes,
    projectName: request.body.projectName,
    quotedBy: request.body.quotedBy,
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
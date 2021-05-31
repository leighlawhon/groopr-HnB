const { db } = require("../util/admin");

exports.getAllItems = (request, response) => {
  db
    .collection("items")
    .where('username', '==', request.user.username)
    .orderBy("createdAt", "desc")
    .get()
    .then((data) => {
      let items = [];
      data.forEach((doc) => {
        items.push({
          itemId: doc.id,
          title: doc.data().title,
          body: doc.data().body,
          createdAt: doc.data().createdAt,
        });
      });
      return response.json(items);
    })
    .catch((err) => {
      console.error(err);
      return response.status(500).json({ error: err.code });
    });
};

exports.postOneItem = (request, response) => {
  if (request.body.body.trim() === "") {
    return response.status(400).json({ body: "Must not be empty" });
  }

  if (request.body.title.trim() === "") {
    return response.status(400).json({ title: "Must not be empty" });
  }

  const newItem = {
    title: request.body.title,
    body: request.body.body,
    createdAt: new Date().toISOString(),
    username: request.user.username,
  }
  db
    .collection("items")
    .add(newItem)
    .then((doc) => {
      const responseItem = newItem;
      responseItem.id = doc.id;
      return response.json(responseItem);
    })
    .catch((err) => {
      response.status(500).json({ error: "Something went wrong" });
      console.error(err);
    });
};

exports.deleteItem = (request, response) => {
  const document = db.doc(`/items/${request.params.itemId}`);
  document
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return response.status(404).json({ error: "Item not found" })
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

exports.editItem = (request, response) => {
  if (request.body.itemId || request.body.createdAt) {
    response.status(403).json({ message: "Not allowed to edit" });
  }
  let document = db.collection("items").doc(`${request.params.itemId}`);
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
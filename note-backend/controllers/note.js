const notesRouter = require("express").Router();
const Note = require("../models/note");
const logger = require("../utils/logger");

notesRouter.get("/", (req, res) => {
  Note.find({})
    .then((notes) => res.json(notes))
    .catch((error) => logger.error(error));
});

notesRouter.get("/:id", (req, res) => {
  Note.findById(req.params.id)
    .then((note) => {
      if (note) {
        res.json(note);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => logger.error(error));
});

notesRouter.post("/", (req, res, next) => {
  const body = req.body;

  const note = new Note({
    content: body.content,
    important: body.important || false,
  });
  note
    .save()
    .then((savedNote) => res.json(savedNote))
    .catch((error) => logger.error(error));
});

notesRouter.delete("/:id", (req, res, next) => {
  Note.findByIdAndRemove(req.params.id)
    .then(() => res.status(204).end())
    .catch((error) => logger.error(error));
});

notesRouter.put("/:id", (req, res, next) => {
  const body = req.body;

  const note = {
    content: body.content,
    important: body.important,
  };

  Note.findByIdAndUpdate(req.params.id, note, { new: true })
    .then((updatedNote) => res.json(updatedNote))
    .catch((error) => logger.error(error));
});

module.exports = notesRouter;

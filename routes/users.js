import express from "express";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

let users = [];

// all routes in here are starting with /users
// GET
router.get("/", (req, res) => {
  res.send(users);
});

// CREATE
router.post("/", (req, res) => {
  const user = req.body;

  users.push({...user, id: uuidv4()});

  res.send(`User with the name ${user.firstName} added to the database`);
});

// GET by Id
router.get("/:id", (req, res) => {
  const { id } = req.params;

  const foundUser = users.find((user) => user.id === id);

  res.send(foundUser);
});

// DELETE by Id
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  
  const user = users.filter((user) => user.id !== id);

  res.send(`Use with id ${id} deleted`);
});

// UPDATE by Id
router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, age } = req.body;
  const user = users.find((user) => user.id === id);

  if (firstName) {
    user.firstName = firstName;
  }
  if (lastName) {
    user.lastName = lastName;
  }
  if (age) {
    user.age = age;
  }

  res.send(`Use with the id ${id} has been updated`);
});

export default router;

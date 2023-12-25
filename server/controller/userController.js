import multer from "multer";
import User from "../model/userModal.js";
import { promises as fspromises } from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import Tesseract from "tesseract.js";

//controller for creating new data and storing in the DB
export const create = async (req, res) => {
  try {
    const userData = new User(req.body);

    if (!userData) {
      return res.status(404).json({ msg: "User data not found" });
    }

    const savedData = await userData.save();
    res.status(200).json(savedData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

//controller to get all data from DB and provide as a response
export const getAll = async (req, res) => {
  try {
    const userData = await User.find();
    if (!userData) {
      return res.status(404).json({ msg: "No Data Found" });
    }
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

//controller to get one data of user with given id and provide as a response
export const getOne = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await User.findById(id);
    if (!userExist) {
      return res.status(404).json({ msg: "User not Found" });
    }
    res.status(200).json(userExist);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

//controller to update the data of a user with given ID
export const update = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await User.findById(id);
    if (!userExist) {
      return res.status(401).json({ msg: "User not Found" });
    }

    const updatedData = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

//controller to delete the user data based on ID
export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await User.findById(id);
    if (!userExist) {
      return res.status(401).json({ msg: "User not Found" });
    }

    await User.findByIdAndDelete(id);
    res.status(200).json({ msg: "User Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

//-----------------------------------------------

var Storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "/images");
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

var upload = multer({
  storage: Storage,
}).single("image", 1);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

var image = await fspromises.readFile(__dirname + "/images/1.png", {
  encoding: null,
});

console.log(image);

Tesseract.recognize(image)
  .progress((p) => {
    console.log("progress", p);
  })
  .then((result) => {
    res.send(result.html);
  });

export const uploadImage = async (req, res) => {
  console.log(req.body);
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
      return res.send("Something went wrong");
    }
    return res.send("File Uploaded");
  });
};

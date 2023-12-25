import User from "../model/userModal.js";
import tesseract from "node-tesseract-ocr";

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

export const ocrdata = async (req, res) => {
  try {
    let result = {};
    const image = req.body.link;
    const config = {
      lang: "eng",
      oem: 1,
      psm: 3,
    };
    console.log(image);
    tesseract
      .recognize(image, config)
      .then((text) => {
        console.log("Result:", text);
        result = JSON.stringify(text);
        res.send(result);
      })
      .catch((error) => {
        console.log(error.message);
        res.send("something went wrong");
      });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

//-----------------------------------------------

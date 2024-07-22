const express = require("express");
const router = express.Router();
const Person = require("./../models/Person");

//POST rout to add
router.post("/", async (req, res) => {
  try {
    const data = req.body; //Assuming the request body containes the person data

    //create a new person document using the mongoose model
    const newPerson = new Person(data);

    //save the new person to the database
    const response = await newPerson.save();
    console.log("data saved to database");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//GET method to get person
router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("data fetch");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// to get specific worktype data
router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType; // Extract the work type from the url parameter

    if (workType == "chef" || workType == "manager" || workType == "waiter") {
      const response = await Person.findOne({ work: workType });
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid work type" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id; //extract the id from the url parameter
    const updatedPersonData = req.body; //updated data for the person

    const response = await Person.findByIdAndUpdate(
      personId,
      updatedPersonData,
      {
        new: true, //return the updated document
        runValidators: true, //run mongoose validation
      }
    );

    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }

    console.log("Data updated");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id; //extract the id from the url parameter

    //Assuming ypu have a person model
    const response = await Person.findByIdAndDelete(personId);
    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }
    console.log("Data Deleted");
    res.status(200).json({ message: "Person deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

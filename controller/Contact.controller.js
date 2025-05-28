// const Contact = require('../model/Contact.model');

// exports.createContact = async (req, res) => {
//   try {
//     const { name, email, message } = req.body;
//     const contact = new Contact({ name, email, message });
//     await contact.save();
//     res.status(201).json({ message: "Contact saved!" });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };
const Contact = require('../model/Contact.model'); // adjust path if needed

// Create new contact
exports.createContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Please provide name, email, and message" });
    }

    const newContact = new Contact({ name, email, message });
    await newContact.save();

    res.status(201).json({ message: "Contact saved successfully", contact: newContact });
  } catch (error) {
    console.error("Error creating contact:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

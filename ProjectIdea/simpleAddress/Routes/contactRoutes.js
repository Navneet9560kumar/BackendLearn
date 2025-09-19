import express from "express";
import Contact from "../MODEL/Contact.js";

const routes = express.Router();

// ➤ Create (Add Contact)
routes.post("/", async (req, res) => {
  try {
    const { name, phone, email } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ message: "Name and phone are required" });
    }

    const newContact = new Contact({ name, phone, email });
    await newContact.save();
    res.status(201).json(newContact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ➤ Read (Get All Contacts)
routes.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ➤ Update Contact
routes.put("/:id", async (req, res) => {
  try {
    const updated = await Contact.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updated) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ➤ Delete Contact
routes.delete("/:id", async (req, res) => {
  try {
    const deleted = await Contact.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.json({ message: "Contact Deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default routes;

// Note: Make sure to import and use this router in your main server file (e.g., index.js) with app.use('/contacts', contactRoutes);      
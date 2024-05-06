const fs = require("fs").promises;
const path = require("node:path");

const contactsPath = path.resolve("./db/contacts.json");

const { v4: uuidv4 } = require('uuid');

const fetchContacts = async () => {
    const contacts = await fs.readFile(contactsPath);
    return JSON.parse(contacts);
  };
  
  const listContacts = async () => {
    const contacts = await fetchContacts();
    console.table(contacts);
    return; 
  };
    
  const getContactById = async (contactId) => {
    const contacts = await fetchContacts();
    const contact = contacts.find((contact) => contact.id === contactId);
    console.log(contact);
    return;
  };
    
  const removeContact = async (contactId) => {
    try {
      const contacts = await fetchContacts();
      const updatedContacts = contacts.filter(contact => contact.id !== contactId);
      await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));
      console.log(`Contact with id ${contactId} has been removed.`);
    } catch (error) {
      console.error(error);
    }
  }

const addContact = async (name, email, phone) => {
  try {
    const contacts = await fetchContacts();
    const id = uuidv4(); // Generar un ID único
    const newContact = { id, name, email, phone };
    const updatedContacts = [...contacts, newContact];
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));
    console.log(`Contact "${name}" with id ${id} has been added.`);
  } catch (error) {
    console.error(error);
  }
}
  
  
  module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
  };
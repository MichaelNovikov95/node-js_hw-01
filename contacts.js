const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(`${__dirname}/db`, "contacts.json");

const updateContacts = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

const listContacts = async () => {
  const result = await fs.readFile(contactsPath);
  return JSON.parse(result);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const stringId = String(contactId);
  const contact = contacts.find((contact) => contact.id === stringId);
  return contact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const stringId = String(contactId);
  const index = contacts.findIndex((contact) => contact.id === stringId);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await updateContacts(contacts);
  return result;
};

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newContact = {
    id: "11",
    ...name,
    ...email,
    ...phone,
  };

  contacts.push(newContact);
  await updateContacts(contacts);

  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

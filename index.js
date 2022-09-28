const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);
const argv = program.opts();

const contacts = require("./contacts");

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "getContacts":
      const allContacts = await contacts.listContacts();
      console.log(allContacts);
      break;

    case "getOneContact":
      const contact = await contacts.getContactById(id);
      console.log(contact);
      break;

    case "removeContact":
      const removedConctact = await contacts.removeContact(id);
      console.log(removedConctact);
      break;

    case "addContact":
      const newContact = await contacts.addContact({ name, email, phone });
      console.log(newContact);
      break;

    default:
      console.log("\x1B[31m Unknown action type!");
      break;
  }
};

invokeAction(argv);

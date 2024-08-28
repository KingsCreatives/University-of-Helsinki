const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("Please provide the password as an argument.");
  process.exit(1);
}

const [password, contactName, contactNumber] = process.argv.slice(2);

const url = `mongodb+srv://kings:${password}@fullstack.bxq3y.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=fullstack`;

mongoose.set("strictQuery", false);

 const phonebookSchema = new mongoose.Schema({
   name: String,
   telephone: String,
 });

 const Contact = mongoose.model("Contact", phonebookSchema);

async function connectToDatabase() {
  try {
    await mongoose.connect(url);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}

async function saveContact(name, number) {

  const contact = new Contact({ name, telephone: number });

  try {
    await contact.save();
    console.log(`Added ${name} with number ${number} to phonebook.`);
  } catch (error) {
    console.error("Error saving contact:", error);
  }
}

async function listContacts() {
  
  try {
    const contacts = await Contact.find({});
    const message = contacts.reduce((msg, contact) => {
      return `${msg}\n${contact.name} ${contact.telephone}`;
    }, "Phonebook:");
    console.log(message);
  } catch (error) {
    console.error("Error fetching contacts:", error);
  }
}

(async () => {
  await connectToDatabase();

  if (contactName && contactNumber) {
    await saveContact(contactName, contactNumber);
  } else {
    await listContacts();
  }

  mongoose.connection.close();
})();

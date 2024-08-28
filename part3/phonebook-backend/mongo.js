const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];
const contactName = process.argv[3];
const contactNumber = process.argv[4];

const url = `mongodb+srv://kings:${password}@fullstack.bxq3y.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=fullstack`;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const phonebookSchema = new mongoose.Schema({
  name: String,
  telephone: String,
});

const Contact = mongoose.model("Contact", phonebookSchema);

const phonebook = new Contact({
  name: contactName,
  telephone: contactNumber,
});

if (contactName && contactNumber) {
  phonebook.save().then((result) => {
    mongoose.connection.close();
    console.log(`added ${contactName} number ${contactNumber} to phonebook`);
  });
} else {
  Contact.find({}).then((persons) => {
    let message = "phonebook:";
    persons.forEach((person) => {
      message += `\n ${person.name} ${person.telephone}`;
    });
    console.log(message);
    mongoose.connection.close()
  })
}

require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Succesed.")
  })
  .catch((e) => {
    console.log(e)
  });

const personSchema = new mongoose.Schema({
  name:{ 
    type: String,
    required: true
  },
  age: Number,
  favoriteFoods: [String]
});

const Person = mongoose.model("Person", personSchema)

//let Person;

const createAndSavePerson = (done) => {
  const document = new Person({
    name: "Nayan Bagale",
    age: 23,
    favoriteFoods: ["Bhendi","Vange"]
  });
  // console.log("donecreate")
  document.save(function(err, data) {
  if (err) return console.error(err);
    done(null, data)
  });
  // console.log("donesave")
};

arrayOfPeople = [
  { name: "Nayan", age: 23, favoriteFoods: ["Bhendi","Vange"] },
  { name: "Suyash", age: 23, favoriteFoods: ["Mutton","Aloo"] },
  { name: "Sonu", age: 22, favoriteFoods: ["Ginger","Karle"] }
]

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function (err, people) {
    if (err) return console.log(err);
    done(null, people);
  });
};

personName = "Nayan"
const findPeopleByName = (personName, done) => {
  Person.find({ name: personName}, function (err, people) {
    if (err) return console.log(err);
    done(null, people);
  });
};

food = "Vange"
const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food}, function (err, people) {
    if (err) return console.log(err);
    done(null, people);
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, function (err, people) {
    if (err) return console.log(err);
    done(null, people);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  
  Person.findById(personId, function (err, Person) {
    if (err) return console.log(err);

    Person.favoriteFoods.push(foodToAdd);

    Person.save(function(err, data) {
      if (err) return console.error(err);
      done(null, data)
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate(
    {name: personName},
    {age: ageToSet},
    { new: true },
    function(err, data) {
      if (err) return console.error(err);
      done(null, data)
    })
};

const removeById = (personId, done) => {
  Person.findOneAndRemove(
    personId,
    function(err, data) {
      if (err) return console.error(err);
      done(null, data)
    })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove(
    {name: nameToRemove},
    (err, data) => {
      if (err) return console.error(err);
      data.ok = true;
      data.n = data.deletedCount;
      done(null, data)
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person
    .find({favoriteFoods: foodToSearch})
    .sort({name: 1})
    .limit(2)
    .select("-age")
    .exec((err, data) => {
      if (err) return console.error(err);
      data.ok = true;
      data.n = data.deletedCount;
      done(null, data)
  })
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;

const people = [
  {
    id: 1,
    name: "Evan Spiegel",
    company: "Snap",
    value: "15B",
    role: "user"
  },
  {
    id: 2,
    name: "Elon Musk",
    company: ["SpaceX", "The Boring Company", "Solar City", "HyperLoop"],
    value: "12B",
    role: "admin"
  },
  {
    id: 3,
    name: "Peter Thiel",
    company: "Palantir",
    value: "9B",
    role: "advisor"
  }
];

const getPeople = (req, res) => {
  if (req.query.value) {
    const filtered = people.filter(
      person => parseInt(person.value, 10) > parseInt(req.query.value)
    );
    return res.status(200).json(filtered);
  }
  res.status(200).json(people);
};

const addPerson = (req, res) => {
  people.push(req.body);
  res.status(200).json(people);
};

module.exports = {
  getPeople,
  addPerson
};

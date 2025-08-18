const Persons = ({ persons, }) => (
  <div>
         {persons.map((person, index) => (
            <div key={person.name}> {person.name} {person.number}</div>))}
        </div>)

export default Persons;
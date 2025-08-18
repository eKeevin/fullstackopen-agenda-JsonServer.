import { useState } from 'react'
import Filter from './components/filter.jsx'
import AddPersonForm from './components/AddPersonForm.jsx'
import Persons from './components/Persons.jsx'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterText, setFilterText] = useState('')


  const handleAddButton = (event) => { //captura el evento del formulario evita recargar y // crea un nuevo objeto con el nombre y número
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }
   if (persons.find(person => person.name === newName)) {
    alert(`${newName} is already added to phonebook`)
    return
  }

  if (persons.find(person => person.number === newNumber)) {
    alert(`${newNumber} is already added to phonebook`)
    return
  }
    setPersons(persons.concat(nameObject))
    setNewName('')
    setNewNumber('')}

const filteredPersons = persons.filter(person =>
  person.name.toLowerCase().includes(filterText.toLowerCase()) // logica del filtro
)


const handleNameChange = (event) => {
    setNewName(event.target.value)}
const  handleNumberChange = (event) => {
    setNewNumber(event.target.value)}
const handleFilterChange = (event) => setFilterText(event.target.value) //1  captura el texto y lo guarda en un estado



  return (
    <div>
      <h2>Phonebook</h2>
      
       <p> filtrar por nombre: </p>
        <Filter // pasa el valor del filtro y la función al componente Filter
  value={filterText} 
  onChange={handleFilterChange}  
/> 
      <AddPersonForm //   pasa los valores y funciones como props para que el componente pueda usarlos
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        handleAddButton={handleAddButton}
      />
        <h2>Contactos</h2>
      <Persons //* pasa los contactos filtrados al componente Persons */
      persons={filteredPersons} /> 
     
    </div>
  )
}

export default App
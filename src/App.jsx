import { useState, useEffect   } from 'react'
import Filter from './components/filter.jsx'
import AddPersonForm from './components/AddPersonForm.jsx'
import Persons from './components/Persons.jsx'
import personsService from './services/persons.js'
import styles from "./App.module.css"

const App = () => {
  const [persons, setPersons] = useState([]) // Estado inicial vacío

  useEffect(() => { personsService.getAll() // Llama al servicio para obtener los datos
    .then(initialPersons => { // Cuando se obtienen los datos, actualiza el estado
      setPersons(initialPersons)
    }) // Maneja la promesa y actualiza el estado con los datos obtenidos
    
  }, [])

const handleDelete = (id) =>{  
  if (!id) return // Verifica si el id es válido
  if (window.confirm("Are you sure you want to delete this contact?")) {
    personsService.deletePerson(id) // Llama al servicio para eliminar el contacto
    .then(() => {
      setPersons(persons.filter(person => person.id !== id))
    })
    .catch(error => {
        console.error("Error al borrar el contacto:", error)
      })
 }
  }

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterText, setFilterText] = useState('')


  const handleAddButton = (event) => { //captura el evento del formulario evita recargar y // crea un nuevo objeto con el nombre y número
    event.preventDefault()
    const existingPerson = persons.find(person => person.name === newName)
    const nameObject = {
      name: newName,
      number: newNumber
    }
  if (existingPerson) {
    if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) { // Si el contacto ya existe, pregunta si se quiere actualizar
      personsService.update(existingPerson.id, nameObject)
      .then(updatedPerson => {
          setPersons(persons.map(p => p.id === existingPerson.id ? updatedPerson : p))
          setNewName('')
          setNewNumber('')
         })
        .catch(error => {
          console.error("Error al actualizar:", error)
          alert("Error al actualizar el contacto. Quizás ya fue eliminado.")
        })
    }
    return // si ya existía, cortamos acá
  }

      if (persons.find(person => person.name === newName)) {
    alert(`${newName} is already added to phonebook`)
    return
  }

  
    personsService.create(nameObject) // llama al servicio para crear un nuevo contacto
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        console.error("Error al crear el contacto:", error) // Maneja el error si ocurre
        alert("Error al crear el contacto. Por favor, intenta de nuevo.")
      })
  } 

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(filterText.toLowerCase()) // logica del filtro
  )

const handleNameChange = (event) => {
    setNewName(event.target.value)}
const  handleNumberChange = (event) => {
    setNewNumber(event.target.value)}
const handleFilterChange = (event) => setFilterText(event.target.value) //1  captura el texto y lo guarda en un estado



  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Agenda de contactos</h2>
      
       <div className={styles.filterBox}>
        <p>Filtrar por nombre:</p>
        <Filter value={filterText} onChange={handleFilterChange} />
      </div>
      <AddPersonForm //   pasa los valores y funciones como props para que el componente pueda usarlos
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        handleAddButton={handleAddButton}
      />
        <h2 className={styles.subtitle}>Contactos</h2>
      <Persons //* pasa los contactos filtrados al componente Persons */
      persons={filteredPersons} handleDelete={handleDelete} /> 
     
    </div>
  )
}

export default App

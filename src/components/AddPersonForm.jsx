const AddPersonForm = ({ 
    newName,
    newNumber, 
    handleNameChange, 
    handleNumberChange, 
    handleAddButton 
}) => (
  


<form>
        <div>
          <h2>Agrega un contacto</h2>
          name: 
          <input  onChange={handleNameChange} value={newName} placeholder='agrega un nombre'/>
        </div>
        <div>
          number: 
          <input  onChange={handleNumberChange} value={newNumber} placeholder='agrega un numero'/>
        </div>
        <div>
          <button type="submit" onClick={handleAddButton}>add</button>
        </div>
          </form> );

          export default AddPersonForm
import { Link } from "react-router-dom";
import { useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";  // Custom hook for accessing the global state.

export const Demo = () => {
  // Accedemos al estado global si lo necesitas
  const { store, dispatch } = useGlobalReducer();

  // Estado para almacenar los datos del formulario
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: ""
  });

  // Estado para controlar el mensaje de contacto creado
  const [contactCreated, setContactCreated] = useState(false);

  // Función para actualizar el estado según el input modificado
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

  // Función que hace el POST a la API utilizando los datos del formulario
  const createContact = async (contactData) => {
    try {
      const response = await fetch("https://playground.4geeks.com/contact/agendas/damian/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactData)
      });
      
      if (!response.ok) {
        throw new Error("Error en la creación del contacto");
      }
      
      const data = await response.json();
      console.log("Contacto creado:", data);
      // Retornamos true para indicar que se creó el contacto
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  // Al enviar el formulario, se llama a createContact pasando los datos ingresados.
  const handleSubmit = async (event) => {
    event.preventDefault();
    const created = await createContact(formData);
    if (created) {
      // Mostramos el mensaje de éxito
      setContactCreated(true);
      // Limpiamos los inputs volviendo a los valores iniciales
      setFormData({
        name: "",
        phone: "",
        email: "",
        address: ""
      });
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1 className="addNewContact">Add a new contact</h1>
        {contactCreated && (
          <h3 style={{ color: "green" }}>tu contacto ha sido creado</h3>
        )}
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Full Name</label>
          <input 
            type="text" 
            className="form-control" 
            id="name" 
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Phone</label>
          <input 
            type="text" 
            className="form-control" 
            id="phone" 
            placeholder="Enter Phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input 
            type="text" 
            className="form-control" 
            id="email" 
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">Address</label>
          <input 
            type="text" 
            className="form-control" 
            id="address" 
            placeholder="Enter address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary form-control">Enviar</button>
        <Link to="/">
          <span>go back to the contacts</span>
        </Link>
      </form>
    </div>
  );
};

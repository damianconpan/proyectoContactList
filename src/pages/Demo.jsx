import { Link } from "react-router-dom";
import { useState } from "react";

export const Demo = () => {

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: ""
  });

  const [contactCreated, setContactCreated] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

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
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const created = await createContact(formData);
    if (created) {
      setContactCreated(true);
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

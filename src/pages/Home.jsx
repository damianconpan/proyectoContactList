import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useEffect } from "react";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();

  const postAgenda = async () => {
    try {
      const response = await fetch("https://playground.4geeks.com/contact/agendas/damian", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
      });
      const data = await response.json();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteContact = async (contactId) => {
    try {
      const response = await fetch(`https://playground.4geeks.com/contact/agendas/damian/contacts/${contactId}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
      });
      if (response.ok) {
        await getAgenda();
        

      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAgenda = async () => {
    try {
      const response = await fetch("https://playground.4geeks.com/contact/agendas/damian", {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      });
      const data = await response.json();

      if (data.contacts) {
        dispatch({ type: "SET_CONTACTS", payload: data.contacts });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const createAndFetch = async () => {
      await postAgenda(); 
      await getAgenda();  
    };
    createAndFetch();
  }, []);

  return (
    <div className="container mt-5">
      {store.contacts && store.contacts.length > 0 ? (
        store.contacts.map((contact) => (
          <div key={contact.id} className="d-flex justify-content-center align-items-center text-center mt-3">
            <div className="card mb-3" style={{ maxWidth: "540px" }}>
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src="src/assets/img/m101.jpg"
                    className="img-fluid rounded-start"
                    alt="contact"
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body position-relative">
                    
                    <button
                      onClick={() => deleteContact(contact.id)}
                      className="btn btn-danger btn-sm position-absolute top-0 end-0 m-2"
                    >
                      x
                    </button>
                    <h5 className="card-title">{contact.name}</h5>
                    <p className="card-text">{contact.phone}</p>
                    <p>{contact.email}</p>
                    <p className="card-text">
                      <small>{contact.address}</small>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center">No hay contactos disponibles</p>
      )}
    </div>
  );
};

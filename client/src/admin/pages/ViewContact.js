import { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from '../layout/AdminLayout';
import { toast } from 'react-hot-toast';

function ViewContact() {
    const [contacts, setContacts] = useState([]);
    const API_URL = `${process.env.REACT_APP_BACKEND_API_URL}/api/contact`;
    useEffect(() => {
      axios.get(API_URL)
        .then(response => {
          setContacts(response.data);
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }, []);
  
    const handleDelete = (id) => {
      axios.delete(`${process.env.REACT_APP_BACKEND_API_URL}/api/contact/${id}`)
        .then(response => {
          toast.success("Contact Deleted Successfuly", {
            position: 'top-right',
          })
          setContacts(contacts.filter(contact => contact._id !== id));
        })
        .catch(error => {
          console.log(error);
          toast.error("Error", {
            position: 'top-right',
          });
        });
    };
  
    return (
      <AdminLayout title="Admin Contact-List">
        <div className="w-full max-w-4xl mx-auto my-4 bg-white shadow flex justify-center items-center">
          <table className="table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Message</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map(contact => (
                <tr key={contact._id}>
                  <td className="border px-4 py-2">{contact.name}</td>
                  <td className="border px-4 py-2">{contact.email}</td>
                  <td className="border px-4 py-2">{contact.message}</td>
                  <td className="border px-4 py-2">
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleDelete(contact._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminLayout>
    );
  }
  

export default ViewContact;

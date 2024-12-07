import { useState, useEffect } from 'react';
import PhoneList from './PhoneList.js';
import CompanyList from './CompanyList.js'; 

function Contact(props) {
    const {contact, contacts, setContacts} = props;
    const [expanded, setExpanded] = useState(false);
    const [phones, setPhones] = useState([]); 
    const [companies, setCompanies] = useState([]);  // Added new state for managing companies

    // Fetch phones for the contact
    useEffect(() => {
        fetch(`http://localhost/api/contacts/${contact.id}/phones`)
            .then(response => response.json())
            .then(data => setPhones(data))
            .catch((error) => {
                console.error('Error fetching phones:', error);
            });
    }, [contact.id]);

    // Fetch companies for the contact
    useEffect(() => {
        fetch(`http://localhost/api/contacts/${contact.id}/companies`) 
            .then(response => response.json())
            .then(data => setCompanies(data))
            .catch((error) => {
                console.error('Error fetching companies:', error);
            });
    }, [contact.id]);

    const expandStyle = {
        display: expanded ? 'block' : 'none'
    };

    // Function to delete a contact
    async function doDelete(e) {
        e.stopPropagation();

        const response = await fetch(`http://localhost/api/contacts/${contact.id}`, {
            method: 'DELETE',
        });

        let newContacts = contacts.filter((c) => {
            return c.id !== contact.id;
        });

        setContacts(newContacts);
    }

    return (
        <div key={contact.id} className='contact' onClick={() => setExpanded(!expanded)}>
            <div className='title'>
                <h3>{contact.name}</h3>  {/* Display contact's name */}
                <p>{contact.address}</p>  {/* Display contact's address */}
                <button className='button red' onClick={doDelete}>Delete Contact</button>
            </div>

            {/* Expandable section for phones and companies */}
            <div style={expandStyle}>
                <hr />
                {/* Display the PhoneList component */}
                <PhoneList phones={phones} setPhones={setPhones} contact={contact} />

                <hr />
                {/* Display the CompanyList component */}
                <CompanyList companies={companies} setCompanies={setCompanies} contact={contact} />
            </div>
        </div>
    );
}

export default Contact;

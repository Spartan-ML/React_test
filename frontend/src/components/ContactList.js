import Contact from './Contact.js';
import NewContact from './NewContact.js';

function ContactList(props) {
    const { contacts = [], setContacts } = props;

    if (!Array.isArray(contacts)) {
        return <div>No contacts available</div>;
    }

    return (
        <div className='contact-list'>
            <h2>Contacts</h2>

            <NewContact contacts={contacts} setContacts={setContacts} />

            <hr />

            {
                contacts.length > 0 ? (
                    contacts.map((contact) => {
                        return (
                            <Contact 
                                key={contact.id} 
                                contact={contact} 
                                contacts={contacts} 
                                setContacts={setContacts} 
                            />
                        );
                    })
                ) : (
                    <div>No contacts to display</div>
                )
            }
        </div>
    );
}

export default ContactList;

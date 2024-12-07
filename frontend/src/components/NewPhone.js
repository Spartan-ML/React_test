import { useState } from 'react';

function NewPhone(props) {
    const { contact, phones, setPhones } = props;
    const [number, setNumber] = useState('');
    const [phoneType, setPhoneType] = useState(''); 

    async function createPhone(e) {
        e.preventDefault();

        const response = await fetch('http://localhost/api/contacts/' + contact.id + '/phones', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                number,
                phoneType,
                contactId: contact.id
            })
        });

        const data = await response.json();

        if (data.id) {
            setPhones([...phones, data]);
        }

        setNumber('');      // Reset the phone number
        setPhoneType('');    // Reset the dropdown for phone type
    }

    return (
        <form onSubmit={createPhone} onClick={(e) => e.stopPropagation()} className='new-phone'>
            {/* Dropdown menu for phone type */}
            <select onChange={(e) => setPhoneType(e.target.value)} value={phoneType} required>
                <option value="" disabled>Select phone type</option>
                <option value="Mobile">Mobile</option>
                <option value="Home">Home</option>
                <option value="Work">Work</option>
                <option value="Other">Other</option>
            </select>

            <input 
                type='text' 
                placeholder='Phone Number' 
                onChange={(e) => setNumber(e.target.value)} 
                value={number} 
                required 
            />

            {/* Use the contact's name in the button */}
            <button className='button green' type='submit'>Add {contact.name}'s phone</button>
        </form>
    );
}

export default NewPhone;

import { useState } from 'react';

function NewCompany(props) {
    const { contact, companies, setCompanies } = props;
    const [companyName, setCompanyName] = useState('');
    const [companyAddress, setCompanyAddress] = useState('');

    // Function to create a new company
    async function createCompany(e) {
        e.preventDefault(); // Prevent form from refreshing the page

        const response = await fetch('http://localhost/api/contacts/' + contact.id + '/companies', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                company_name: companyName,
                company_address: companyAddress,
                contactId: contact.id // Pass the contactId to link the company with the contact
            })
        });

        const data = await response.json();

        if (data.company_id) {
            setCompanies([...companies, data]); // Update companies state to include the new company
        }

        // Clear input fields after submission
        setCompanyName('');
        setCompanyAddress('');
    }

    return (
        <form onSubmit={createCompany} onClick={(e) => e.stopPropagation()} className='new-company'>
            <input 
                type='text' 
                placeholder='Company Name'
                value={companyName} 
                onChange={(e) => setCompanyName(e.target.value)} // Set onChange handler
                required 
            />

            <input 
                type='text' 
                placeholder='Company Address'
                value={companyAddress}  
                onChange={(e) => setCompanyAddress(e.target.value)} // Set onChange handler
                required 
            />

            {/* Submit button */}
            <button className='button green' type='submit'>Add {contact.name}'s Company</button>
        </form>
    );
}

export default NewCompany;

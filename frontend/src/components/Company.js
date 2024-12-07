import React from 'react';

function Company(props) {
    const { contact, company, companies, setCompanies } = props;

    // Function to delete a company
    async function deleteCompany() {
        const response = await fetch(`http://localhost/api/contacts/${contact.id}/companies/${company.company_id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            // Remove the deleted company from the state
            const updatedCompanies = companies.filter(c => c.company_id !== company.company_id);
            setCompanies(updatedCompanies);
        } else {
            console.error("Failed to delete company.");
        }
    }

    return (
        <tr>
            <td>{company.company_name}</td>
            <td>{company.company_address}</td>
            <td style={{ width: '14px' }}>
                <button className="button red" onClick={deleteCompany}>Delete</button>
            </td>
        </tr>
    );
}

export default Company;

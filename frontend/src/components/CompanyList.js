import Company from './Company';
import NewCompany from './NewCompany';

function CompanyList(props) {
    const { contact, companies, setCompanies } = props;

    return (
        <div className="company-list">
            {/* Component to add a new company */}
            <NewCompany contact={contact} companies={companies} setCompanies={setCompanies} />

            {/* List of companies */}
            <table onClick={(e) => e.stopPropagation()}>
                <thead>
                    <tr>
                        <th>Company Name</th>
                        <th>Company Address</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(companies) && companies.length > 0 ? (
                        companies.map((company) => (
                            <Company 
                                key={company.company_id} 
                                contact={contact} 
                                company={company} 
                                companies={companies} 
                                setCompanies={setCompanies} 
                            />
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3">No companies available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default CompanyList;

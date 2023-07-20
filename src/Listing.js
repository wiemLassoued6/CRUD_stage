import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './App.css';

const Listing = () => {
    const [prodata, datachange] = useState(null);
    const [searchQuery, setSearchQuery] = useState(""); // Step 1
    const navigate = useNavigate();

    const LoadDetail = (id) => {
        navigate("/produit/detail/" + id);
    };

    const LoadEdit = (id) => {
        navigate("/produit/edit/" + id);
    };

    const Removefunction = (id) => {
        if (window.confirm('Do you want to remove?')) {
            fetch("http://localhost:8000/produit/" + id, {
                method: "DELETE"
            }).then((res) => {
                alert('Removed successfully.');
                window.location.reload();
            }).catch((err) => {
                console.log(err.message);
            });
        }
    };

    useEffect(() => {
        // Step 2: Fetch filtered data based on searchQuery
        fetch("http://localhost:8000/produit?q=" + searchQuery).then((res) => {
            return res.json();
        }).then((resp) => {
            datachange(resp);
        }).catch((err) => {
            console.log(err.message);
        });
    }, [searchQuery]); // Only refetch when searchQuery changes

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value); // Step 3: Update the searchQuery state
    };

    return (
        <div className="container">
            <div className="card">
                <div id="titre" className="card-title">
                    <h2>Liste des produits</h2>
                </div>
                <div className="card-body">
                    <div className="divbtn">
                        <Link to="produit/create" id="ajout" className="btn btn">Ajouter (+)</Link>
                    </div>
                    <div className="search-container"> {/* Step 4: Add search input field */}
                        <input
                            type="text"
                            placeholder="Rechercher un produit..."
                            value={searchQuery}
                            onChange={handleSearchInputChange}
                        />
                    </div>
                    <table className="table table-bordered">
                        <thead className="bg-dark text-white">
                            <tr>
                                <td>ID</td>
                                <td>Nom</td>
                                <td>Prix</td>
                                <td>Quantite</td>
                                <td>Action</td>
                            </tr>
                        </thead>
                        <tbody>
                            {prodata &&
                                prodata.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.nom}</td>
                                        <td>{item.prix}</td>
                                        <td>{item.quantite}</td>
                                        <td>
                                            <a onClick={() => { LoadEdit(item.id) }} className="btn btn-success">Modifier</a>
                                            <a onClick={() => { Removefunction(item.id) }} className="btn btn-danger">Supprimer</a>
                                            <a onClick={() => { LoadDetail(item.id) }} className="btn btn-primary">Détails</a> {/* "Details" in French */}
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Listing;

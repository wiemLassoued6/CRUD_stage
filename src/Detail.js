import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";


const Detail = () => {
    const { pid } = useParams();

    const [prodata, datachange] = useState({});

    useEffect(() => {
        fetch("http://localhost:8000/produit/" + pid).then((res) => {
            return res.json();
        }).then((resp) => {
            datachange(resp);
        }).catch((err) => {
            console.log(err.message);
        })
    }, []);
    return (
        <div>
            {/* <div className="row">
                <div className="offset-lg-3 col-lg-6"> */}

               <div className="container">
                
            <div className="card row" style={{ "textAlign": "left" }}>
                <div className="card-title">
                    <h2>Produit Create</h2>
                </div>
                <div className="card-body"></div>

                {prodata &&
                    <div>
                        <h2>Lenom de Produit : <b>{prodata.name}</b>  ({prodata.id})</h2>
                        <h3>Coordonnees</h3>
                        <h3>Le prix est: {prodata.prix}</h3>
                        <h3>La quantite est: {prodata.quantite}</h3>
                        <Link className="btn btn-danger" to="/">Retour a la liste</Link>
                    </div>
                }
            </div>
            </div>
            {/* </div>
            </div> */}
        </div >
    );
}

export default Detail;
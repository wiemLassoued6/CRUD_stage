import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const Edit = () => {
    const { pid } = useParams();

    //const [empdata, empdatachange] = useState({});

    useEffect(() => {
        fetch("http://localhost:8000/produit/" + pid).then((res) => {
            return res.json();
        }).then((resp) => {
            idchange(resp.id);
            nomchange(resp.nom);
            prixchange(resp.prix);
            quantitechange(resp.quantite);
            activechange(resp.isactive);
        }).catch((err) => {
            console.log(err.message);
        })
    }, []);

    const[id,idchange]=useState("");
    const[nom,nomchange]=useState("");
    const[prix,prixchange]=useState("");
    const[quantite,quantitechange]=useState("");
    const[active,activechange]=useState(true);
    const[validation,valchange]=useState(false);


    const navigate=useNavigate();

    const handlesubmit=(e)=>{
      e.preventDefault();
      const prodata={id,nom,prix,quantite,active};
      

      fetch("http://localhost:8000/produit/"+pid,{
        method:"PUT",
        headers:{"content-type":"application/json"},
        body:JSON.stringify(prodata)
      }).then((res)=>{
        alert('enregistrée avec succès.')
        navigate('/');
      }).catch((err)=>{
        console.log(err.message)
      })

    }
    return ( 
        <div>

        <div className="row">
            <div className="offset-lg-3 col-lg-6">
                <form className="container" onSubmit={handlesubmit}>

                    <div className="card" style={{"textAlign":"left"}}>
                        <div className="card-title">
                            <h2>Modification de produit</h2>
                        </div>
                        <div className="card-body">

                            <div className="row">

                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>ID</label>
                                        <input value={id} disabled="disabled" className="form-control"></input>
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Nom</label>
                                        <input required value={nom} onMouseDown={e=>valchange(true)} onChange={e=>nomchange(e.target.value)} className="form-control"></input>
                                    {nom.length==0 && validation && <span className="text-danger">Entrer le nom de produit</span>}
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Prix</label>
                                        <input value={prix} onChange={e=>prixchange(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Quantite</label>
                                        <input value={quantite} onChange={e=>quantitechange(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>

                               
                                <div className="col-lg-12">
                                    <div className="form-group">
                                       <button className="btn btn-success" type="submit">enregistrer</button>
                                       <Link to="/" className="btn btn-danger">Retour</Link>
                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>

                </form>

            </div>
        </div>
    </div>
     );
}
 
export default Edit;
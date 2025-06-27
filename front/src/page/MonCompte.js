import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { api } from '../services/api';

function MonCompte() {
    const [user, setUser] = useState(null);
    const [form, setForm] = useState({
        modele: '',
        immatriculation: '',
        couleur: '',
        prix_jour: '',
        carburant: '',
        boite: '',
        portes: '',
        places: '',
        volume_coffre: '',
        puissance: '',
        description: '',
        lieu_depart: '',
        image: null
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const [mesVoitures, setMesVoitures] = useState([]);
    const [editId, setEditId] = useState(null);
    const [editForm, setEditForm] = useState({});

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        } else {
            navigate('/connexion');
        }
    }, [navigate]);

    useEffect(() => {
        // Récupère les véhicules du client connecté
        const token = localStorage.getItem('token');
        if (token) {
            fetch('http://localhost:8000/api/mes-voitures', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res => res.json())
            .then(data => setMesVoitures(Array.isArray(data) ? data : []))
            .catch(() => setMesVoitures([]));
        }
    }, []);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: type === 'file' ? files[0] : value
        }));
    };

    const fetchMesVoitures = () => {
        const token = localStorage.getItem('token');
        if (token) {
            fetch('http://localhost:8000/api/mes-voitures', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res => res.json())
            .then(data => setMesVoitures(Array.isArray(data) ? data : []))
            .catch(() => setMesVoitures([]));
        }
    };

    useEffect(() => {
        fetchMesVoitures();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        const token = localStorage.getItem('token');
        const formData = new FormData();
        Object.entries(form).forEach(([key, value]) => {
            if (value) formData.append(key, value);
        });
        formData.append('proprietaire_id', user.id);
        try {
            const response = await fetch('http://localhost:8000/api/voitures', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });
            if (response.ok) {
                setMessage('Véhicule ajouté avec succès !');
                setForm({ modele: '', immatriculation: '', couleur: '', prix_jour: '', carburant: '', boite: '', portes: '', places: '', volume_coffre: '', puissance: '', description: '', lieu_depart: '', image: null });
                fetchMesVoitures();
            } else {
                const data = await response.json();
                setMessage(data.message || 'Erreur lors de l\'ajout du véhicule');
            }
        } catch (err) {
            setMessage('Erreur serveur');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Supprimer ce véhicule ?')) return;
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`http://localhost:8000/api/voitures/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.ok) {
                setMessage('Véhicule supprimé !');
                fetchMesVoitures();
            } else {
                setMessage('Erreur lors de la suppression');
            }
        } catch (err) {
            setMessage('Erreur serveur');
        }
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditForm(prev => ({ ...prev, [name]: value }));
    };

    const handleEdit = (v) => {
        setEditId(v.id);
        setEditForm({
            modele: v.modele,
            immatriculation: v.immatriculation,
            couleur: v.couleur,
            prix_jour: v.prix_jour,
            carburant: v.carburant,
            boite: v.boite,
            portes: v.portes,
            places: v.places,
            volume_coffre: v.volume_coffre,
            puissance: v.puissance,
            description: v.description,
            lieu_depart: v.lieu_depart
        });
    };

    const handleEditSubmit = async (id) => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`http://localhost:8000/api/voitures/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(editForm)
            });
            if (response.ok) {
                setMessage('Véhicule modifié !');
                setEditId(null);
                fetchMesVoitures();
            } else {
                setMessage('Erreur lors de la modification');
            }
        } catch (err) {
            setMessage('Erreur serveur');
        }
    };

    if (!user) return null;

    return (
        <div className="produits-container">
            <Header />
            <div className="produits-content">
                <h1>Mon compte</h1>
                <div className="account-info">
                    <h2>Mes informations</h2>
                    <p><strong>Nom :</strong> {user.prenom || user.firstName} {user.nom || user.lastName}</p>
                    <p><strong>Email :</strong> {user.email}</p>
                    <p><strong>Type :</strong> {user.type || (user.roles && user.roles[0])}</p>
                </div>
                <div style={{maxWidth: 700, margin: '2rem auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #eee', padding: '2rem'}}>
                    <h2 style={{textAlign: 'center'}}>Mes véhicules à louer</h2>
                    {mesVoitures.length === 0 ? (
                        <p style={{textAlign: 'center', color: '#888'}}>Aucun véhicule enregistré.</p>
                    ) : (
                        <div style={{display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center'}}>
                            {mesVoitures.map(v => (
                                <div key={v.id} style={{background: '#f9f9f9', borderRadius: 8, boxShadow: '0 1px 4px #eee', padding: 16, minWidth: 220, maxWidth: 250, textAlign: 'center'}}>
                                    <img src={v.image && v.image !== 'default.jpg' ? v.image : '/MayRent/back/public/uploads/voitures/default.jpg'} alt={v.modele} style={{width: '100%', height: 100, objectFit: 'cover', borderRadius: 6, marginBottom: 8, background: '#f0f0f0'}} />
                                    {editId === v.id ? (
                                        <>
                                            <input type="text" name="modele" value={editForm.modele || ''} onChange={handleEditChange} placeholder="Modèle" style={{width: '100%', marginBottom: 4}} />
                                            <input type="text" name="immatriculation" value={editForm.immatriculation || ''} onChange={handleEditChange} placeholder="Immatriculation" style={{width: '100%', marginBottom: 4}} />
                                            <input type="text" name="couleur" value={editForm.couleur || ''} onChange={handleEditChange} placeholder="Couleur" style={{width: '100%', marginBottom: 4}} />
                                            <input type="number" name="prix_jour" value={editForm.prix_jour || ''} onChange={handleEditChange} placeholder="Prix par jour" style={{width: '100%', marginBottom: 4}} />
                                            <input type="text" name="carburant" value={editForm.carburant || ''} onChange={handleEditChange} placeholder="Carburant" style={{width: '100%', marginBottom: 4}} />
                                            <input type="text" name="boite" value={editForm.boite || ''} onChange={handleEditChange} placeholder="Boîte" style={{width: '100%', marginBottom: 4}} />
                                            <input type="number" name="portes" value={editForm.portes || ''} onChange={handleEditChange} placeholder="Nombre de portes" style={{width: '100%', marginBottom: 4}} />
                                            <input type="number" name="places" value={editForm.places || ''} onChange={handleEditChange} placeholder="Nombre de places" style={{width: '100%', marginBottom: 4}} />
                                            <input type="text" name="volume_coffre" value={editForm.volume_coffre || ''} onChange={handleEditChange} placeholder="Volume coffre" style={{width: '100%', marginBottom: 4}} />
                                            <input type="number" name="puissance" value={editForm.puissance || ''} onChange={handleEditChange} placeholder="Puissance" style={{width: '100%', marginBottom: 4}} />
                                            <input type="text" name="lieu_depart" value={editForm.lieu_depart || ''} onChange={handleEditChange} placeholder="Lieu de départ" style={{width: '100%', marginBottom: 4}} />
                                            <textarea name="description" value={editForm.description || ''} onChange={handleEditChange} placeholder="Description" style={{width: '100%', marginBottom: 4}} />
                                            <button onClick={() => handleEditSubmit(v.id)} className="nav-button" style={{marginRight: 8}}>Valider</button>
                                            <button onClick={() => setEditId(null)} className="nav-button">Annuler</button>
                                        </>
                                    ) : (
                                        <>
                                            <div style={{fontWeight: 600, fontSize: 16, marginBottom: 4}}>{v.modele}</div>
                                            <div style={{color: '#007bff', fontWeight: 500, marginBottom: 4}}>{v.prix_jour} € / jour</div>
                                            <div style={{color: '#666', fontSize: 14}}>{v.categorie?.nom}</div>
                                            <button onClick={() => handleEdit(v)} className="nav-button" style={{marginTop: 8, marginRight: 8}}>Modifier</button>
                                            <button onClick={() => handleDelete(v.id)} className="nav-button" style={{marginTop: 8, background: '#b30000'}}>Supprimer</button>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="add-car-section" style={{maxWidth: 700, margin: '2rem auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #eee', padding: '2rem'}}>
                    <h2 style={{textAlign: 'center'}}>Ajouter un véhicule à louer</h2>
                    <form onSubmit={handleSubmit} encType="multipart/form-data" style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                        <div style={{display: 'flex', gap: '1rem'}}>
                            <input type="text" name="modele" placeholder="Modèle" value={form.modele} onChange={handleChange} required style={{flex: 1}} />
                            <input type="text" name="immatriculation" placeholder="Immatriculation" value={form.immatriculation} onChange={handleChange} required style={{flex: 1}} />
                            <input type="text" name="couleur" placeholder="Couleur" value={form.couleur} onChange={handleChange} required style={{flex: 1}} />
                        </div>
                        <div style={{display: 'flex', gap: '1rem'}}>
                            <input type="number" name="prix_jour" placeholder="Prix par jour" value={form.prix_jour} onChange={handleChange} required style={{flex: 1}} />
                            <input type="text" name="carburant" placeholder="Carburant" value={form.carburant} onChange={handleChange} required style={{flex: 1}} />
                            <input type="text" name="boite" placeholder="Boîte" value={form.boite} onChange={handleChange} required style={{flex: 1}} />
                        </div>
                        <div style={{display: 'flex', gap: '1rem'}}>
                            <input type="number" name="portes" placeholder="Nombre de portes" value={form.portes} onChange={handleChange} required style={{flex: 1}} />
                            <input type="number" name="places" placeholder="Nombre de places" value={form.places} onChange={handleChange} required style={{flex: 1}} />
                            <input type="text" name="volume_coffre" placeholder="Volume coffre" value={form.volume_coffre} onChange={handleChange} required style={{flex: 1}} />
                        </div>
                        <div style={{display: 'flex', gap: '1rem'}}>
                            <input type="number" name="puissance" placeholder="Puissance" value={form.puissance} onChange={handleChange} required style={{flex: 1}} />
                            <input type="text" name="lieu_depart" placeholder="Lieu de départ" value={form.lieu_depart} onChange={handleChange} required style={{flex: 1}} />
                        </div>
                        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required style={{width: '100%', minHeight: 60, resize: 'vertical'}} />
                        <input type="file" name="image" accept="image/*" onChange={handleChange} required style={{marginTop: 8}} />
                        <button type="submit" className="nav-button" style={{alignSelf: 'center', marginTop: 16}}>Ajouter le véhicule</button>
                    </form>
                    {message && <p style={{textAlign: 'center', color: message.includes('succès') ? 'green' : 'red'}}>{message}</p>}
                </div>
            </div>
        </div>
    );
}

export default MonCompte; 
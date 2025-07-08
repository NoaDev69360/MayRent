import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { api, API_URL } from '../services/api';

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
        image: null,
        categorie_id: ''
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const [mesVoitures, setMesVoitures] = useState([]);
    const [editId, setEditId] = useState(null);
    const [editForm, setEditForm] = useState({});
    const [categories, setCategories] = useState([]);
    const [mesLocations, setMesLocations] = useState([]);
    const [editLocationId, setEditLocationId] = useState(null);
    const [editLocationForm, setEditLocationForm] = useState({});
    const IMGUR_CLIENT_ID = "e1f5c2368bbdb59";

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        } else {
            navigate('/connexion');
        }
    }, [navigate]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            api.get('/mes-voitures')
            .then(data => setMesVoitures(Array.isArray(data) ? data : []))
            .catch(() => setMesVoitures([]));
        }
    }, []);

    useEffect(() => {
        api.get('/categories')
            .then(data => setCategories(data))
            .catch(() => setCategories([]));
    }, []);

    useEffect(() => {
        // Récupère les locations du client connecté
        const token = localStorage.getItem('token');
        if (token) {
            api.get('/mes-locations')
            .then(data => setMesLocations(Array.isArray(data) ? data : []))
            .catch(() => setMesLocations([]));
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
            api.get('/mes-voitures')
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
        const formData = new FormData();
        Object.entries(form).forEach(([key, value]) => {
            if (value) formData.append(key, value);
        });
        formData.append('proprietaire_id', user.id);
        if (form.categorie_id) formData.append('categorie_id', form.categorie_id);
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/voitures`, {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': token ? `Bearer ${token}` : undefined
                }
            });
            if (response.ok) {
                setMessage('Véhicule ajouté avec succès !');
                setForm({ modele: '', immatriculation: '', couleur: '', prix_jour: '', carburant: '', boite: '', portes: '', places: '', volume_coffre: '', puissance: '', description: '', lieu_depart: '', image: null, categorie_id: '' });
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
        try {
            await api.delete(`/voitures/${id}`);
            setMessage('Véhicule supprimé !');
            fetchMesVoitures();
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
        try {
            await api.put(`/voitures/${id}`, editForm, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setMessage('Véhicule modifié !');
            setEditId(null);
            fetchMesVoitures();
        } catch (err) {
            setMessage('Erreur serveur');
        }
    };

    // Handler pour la suppression du compte
    const handleDeleteAccount = async () => {
        if (!window.confirm('Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.')) return;
        try {
            const response = await api.delete('/delete-account');
            if (response.success) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                alert('Votre compte a été supprimé.');
                navigate('/connexion');
            } else {
                alert(response.message || 'Erreur lors de la suppression du compte.');
            }
        } catch (err) {
            alert('Erreur serveur lors de la suppression du compte.');
        }
    };

    const fetchMesLocations = () => {
        const token = localStorage.getItem('token');
        if (token) {
            api.get('/mes-locations')
            .then(data => setMesLocations(Array.isArray(data) ? data : []))
            .catch(() => setMesLocations([]));
        }
    };

    const handleDeleteLocation = async (id) => {
        if (!window.confirm('Supprimer cette location ?')) return;
        try {
            await api.delete(`/locations/${id}`);
            setMessage('Location supprimée !');
            fetchMesLocations();
        } catch (err) {
            setMessage('Erreur serveur');
        }
    };

    const handleEditLocation = (loc) => {
        setEditLocationId(loc.id);
        setEditLocationForm({
            date_debut: loc.date_debut,
            date_fin: loc.date_fin,
            lieu_depart: loc.lieu_depart || '',
        });
    };

    const handleEditLocationChange = (e) => {
        const { name, value } = e.target;
        setEditLocationForm(prev => ({ ...prev, [name]: value }));
    };

    const handleEditLocationSubmit = async (id) => {
        try {
            await api.put(`/locations/${id}`, editLocationForm, {
                headers: { 'Content-Type': 'application/json' }
            });
            setMessage('Location modifiée !');
            setEditLocationId(null);
            fetchMesLocations();
        } catch (err) {
            setMessage('Erreur serveur');
        }
    };

    if (!user) return null;

    const isLocataire = (user.type && user.type.toLowerCase() === 'locataire') || (user.roles && user.roles.includes('ROLE_LOCATAIRE'));

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
                {!isLocataire && (
                    <div style={{maxWidth: 700, margin: '2rem auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #eee', padding: '2rem'}}>
                        <h2 style={{textAlign: 'center'}}>Mes véhicules à louer</h2>
                        {mesVoitures.length === 0 ? (
                            <p style={{textAlign: 'center', color: '#888'}}>Aucun véhicule enregistré.</p>
                        ) : (
                            <div style={{display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center'}}>
                                {mesVoitures.map(v => (
                                    <div key={v.id} style={{background: '#f9f9f9', borderRadius: 8, boxShadow: '0 1px 4px #eee', padding: 16, minWidth: 220, maxWidth: 250, textAlign: 'center'}}>
                                        <img
                                            src={
                                                v.image_url
                                                    ? v.image_url // Cas Imgur ou URL externe
                                                    : (v.image
                                                        ? (v.image.startsWith('http')
                                                            ? v.image // Cas URL complète (ex: Imgur)
                                                            : `http://localhost:8080/uploads/voitures/${v.image}` // Cas image locale
                                                          )
                                                        : '/MayRent/back/public/uploads/voitures/default.jpg' // Cas image par défaut
                                                      )
                                            }
                                            alt={v.modele || v.name}
                                            style={{ width: '100%', height: 100, objectFit: 'cover', borderRadius: 6, marginBottom: 8, background: '#f0f0f0' }}
                                        />
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
                )}
                {!isLocataire && (
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
                            <select name="categorie_id" value={form.categorie_id || ''} onChange={handleChange} required style={{width: '100%', marginBottom: 8}}>
                                <option value="">Sélectionner une catégorie</option>
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.nom}</option>
                                ))}
                            </select>
                            <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required style={{width: '100%', minHeight: 60, resize: 'vertical'}} />
                            <input type="file" name="image" accept="image/*" onChange={handleChange} required style={{marginTop: 8}} />
                            {form.image && (
                                <img src={URL.createObjectURL(form.image)} alt="Aperçu" style={{width: '400px', height: '300px', objectFit: 'cover', marginTop: 8}} />
                            )}
                            <button type="submit" className="nav-button" style={{alignSelf: 'center', marginTop: 16}}>Ajouter le véhicule</button>
                        </form>
                        {message && <p style={{textAlign: 'center', color: message.includes('succès') ? 'green' : 'red'}}>{message}</p>}
                    </div>
                )}
                <div style={{marginTop: 40}}>
                    <h2>Mes locations</h2>
                    {mesLocations.length === 0 ? (
                        <p style={{color: '#888'}}>Aucune location enregistrée.</p>
                    ) : (
                        <div style={{display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center'}}>
                            {mesLocations.map(loc => (
                                <div key={loc.id} style={{background: '#f9f9f9', borderRadius: 8, boxShadow: '0 1px 4px #eee', padding: 16, minWidth: 220, maxWidth: 250, textAlign: 'center'}}>
                                    <img
                                        src={
                                            loc.voiture.image_url
                                                ? loc.voiture.image_url
                                                : (loc.voiture.image
                                                    ? (loc.voiture.image.startsWith('http')
                                                        ? loc.voiture.image
                                                        : `http://localhost:8080/uploads/voitures/${loc.voiture.image}`
                                                      )
                                                    : '/MayRent/back/public/uploads/voitures/default.jpg'
                                                  )
                                        }
                                        alt={loc.voiture.modele || loc.voiture.name}
                                        style={{ width: '100%', height: 100, objectFit: 'cover', borderRadius: 6, marginBottom: 8, background: '#f0f0f0' }}
                                    />
                                    <div style={{fontWeight: 600, fontSize: 16, marginBottom: 4}}>{loc.voiture.modele}</div>
                                    <div style={{color: '#007bff', fontWeight: 500, marginBottom: 4}}>{loc.prix_totale} €</div>
                                    <div style={{color: '#666', fontSize: 14}}>Du {loc.date_debut} au {loc.date_fin}</div>
                                    {editLocationId === loc.id ? (
                                        <div style={{marginTop: 8}}>
                                            <input type="date" name="date_debut" value={editLocationForm.date_debut || ''} onChange={handleEditLocationChange} style={{marginBottom: 4, width: '100%'}} />
                                            <input type="date" name="date_fin" value={editLocationForm.date_fin || ''} onChange={handleEditLocationChange} style={{marginBottom: 4, width: '100%'}} />
                                            <input type="text" name="lieu_depart" value={editLocationForm.lieu_depart || ''} onChange={handleEditLocationChange} placeholder="Lieu de départ" style={{marginBottom: 4, width: '100%'}} />
                                            <button onClick={() => handleEditLocationSubmit(loc.id)} className="nav-button" style={{marginRight: 8}}>Valider</button>
                                            <button onClick={() => setEditLocationId(null)} className="nav-button">Annuler</button>
                                        </div>
                                    ) : (
                                        <div style={{marginTop: 8, display: 'flex', gap: 8, justifyContent: 'center'}}>
                                            <button onClick={() => handleEditLocation(loc)} className="nav-button">Modifier</button>
                                            <button onClick={() => handleDeleteLocation(loc.id)} className="nav-button" style={{background: '#b30000'}}>Supprimer</button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div style={{ marginTop: 40, textAlign: 'center' }}>
                    <button onClick={handleDeleteAccount} style={{ background: '#b30000', color: '#fff', padding: '12px 32px', borderRadius: 8, border: 'none', fontWeight: 600, fontSize: 18, cursor: 'pointer' }}>
                        Supprimer mon compte
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MonCompte; 
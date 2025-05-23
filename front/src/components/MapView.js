import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const MapView = ({ vehicles }) => {
    const [selectedVehicle, setSelectedVehicle] = useState(null);

    // Position par défaut (Paris)
    const defaultCenter = {
        lat: 48.8566,
        lng: 2.3522
    };

    const mapContainerStyle = {
        width: '100%',
        height: '500px'
    };

    const mapOptions = {
        disableDefaultUI: false,
        zoomControl: true,
        streetViewControl: true,
        scaleControl: true,
        mapTypeControl: true,
        fullscreenControl: true
    };

    return (
        <LoadScript googleMapsApiKey="VOTRE_CLE_API_GOOGLE_MAPS">
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={defaultCenter}
                zoom={12}
                options={mapOptions}
            >
                {vehicles && vehicles.map((vehicle) => (
                    <Marker
                        key={vehicle.id}
                        position={vehicle.location}
                        onClick={() => setSelectedVehicle(vehicle)}
                    />
                ))}

                {selectedVehicle && (
                    <InfoWindow
                        position={selectedVehicle.location}
                        onCloseClick={() => setSelectedVehicle(null)}
                    >
                        <div className="info-window">
                            <h3>{selectedVehicle.name}</h3>
                            <p>{selectedVehicle.description}</p>
                            <p>Prix: {selectedVehicle.price}€/jour</p>
                            <button onClick={() => window.location.href = `/vehicle/${selectedVehicle.id}`}>
                                Voir les détails
                            </button>
                        </div>
                    </InfoWindow>
                )}
            </GoogleMap>
        </LoadScript>
    );
};

export default MapView; 
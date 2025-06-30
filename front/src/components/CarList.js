import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../services/api';

function CarList() {
  const queryClient = useQueryClient();

  // Récupérer la liste des voitures
  const { data: cars, isLoading, error } = useQuery({
    queryKey: ['cars'],
    queryFn: api.getCars,
  });

  // Mutation pour supprimer une voiture
  const deleteCarMutation = useMutation({
    mutationFn: api.deleteCar,
    onSuccess: () => {
      // Invalider et recharger la liste des voitures
      queryClient.invalidateQueries({ queryKey: ['cars'] });
    },
  });

  if (isLoading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error.message}</div>;

  return (
    <div>
      <h2>Liste des voitures</h2>
      <div className="car-grid">
        {cars?.map((car) => (
          <div key={car.id} className="car-card">
            <img
              src={car.image_url ? car.image_url : (car.image && car.image !== 'default.jpg' ? car.image : '/MayRent/back/public/uploads/voitures/default.jpg')}
              alt={car.modele || car.name}
              style={{ width: '100%', height: 100, objectFit: 'cover', borderRadius: 6, marginBottom: 8, background: '#f0f0f0' }}
            />
            <h3>{car.name}</h3>
            <p>{car.description}</p>
            <button
              onClick={() => deleteCarMutation.mutate(car.id)}
              disabled={deleteCarMutation.isPending}
            >
              {deleteCarMutation.isPending ? 'Suppression...' : 'Supprimer'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CarList; 
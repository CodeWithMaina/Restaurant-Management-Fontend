import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import Swal from 'sweetalert2';
import { Plus, Search, Edit, Trash2, Save, X } from 'lucide-react';
import { citiesApi } from "../../features/api/citiesApi";
import { statesApi } from "../../features/api/statesApi";
import type { TCity } from '../../types/city.types';

type CityFormData = {
  name: string;
  stateId: number;
};

export const Cities = () => {
  const { data: cities = [], error, isLoading } = citiesApi.useFetchCitiesQuery();
  const { data: states = [] } = statesApi.useFetchStatesQuery();
  const [createCity] = citiesApi.useCreateCityMutation();
  const [updateCity] = citiesApi.useUpdateCityMutation();
  const [deleteCity] = citiesApi.useDeleteCityMutation();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  
  const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm<CityFormData>();

  const filteredCities = cities.filter(city => 
    city.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (states.find(s => s.id === city.stateId)?.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (states.find(s => s.id === city.stateId)?.code.toLowerCase().includes(searchTerm.toLowerCase()))
  ));

  const handleCreate = async (data: CityFormData) => {
    try {
      await createCity(data).unwrap();
      toast.success('City created successfully!');
      reset();
    } catch (err) {
      toast.error('Failed to create city');
    }
  };

  const handleUpdate = async (id: number, data: CityFormData) => {
    try {
      await updateCity({ id, ...data }).unwrap();
      toast.success('City updated successfully!');
      setEditingId(null);
    } catch (err) {
      toast.error('Failed to update city');
    }
  };

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });
    
    if (result.isConfirmed) {
      try {
        await deleteCity(id).unwrap();
        toast.success('City deleted successfully!');
      } catch (err) {
        toast.error('Failed to delete city');
      }
    }
  };

  const startEditing = (city: TCity) => {
    setEditingId(city.id);
    setValue('name', city.name);
    setValue('stateId', city.stateId);
  };

  const cancelEditing = () => {
    setEditingId(null);
  };

  if (isLoading) return <div className="text-center py-8">Loading cities...</div>;
  if (error) return <div className="text-center py-8 text-error">Error loading cities</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Cities Management</h1>
      
      {/* Search and Create Form */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="join flex-1">
          <input
            type="text"
            placeholder="Search cities..."
            className="input input-bordered join-item w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btn join-item">
            <Search size={18} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit(handleCreate)} className="flex gap-2">
          <div className="flex gap-2 flex-wrap">
            <input
              type="text"
              placeholder="City Name"
              className="input input-bordered"
              {...register('name', { required: 'Name is required' })}
            />
            <select
              className="select select-bordered"
              {...register('stateId', { required: 'State is required', valueAsNumber: true })}
            >
              <option value="">Select State</option>
              {states.map(state => (
                <option key={state.id} value={state.id}>
                  {state.name} ({state.code})
                </option>
              ))}
            </select>
            <button type="submit" className="btn btn-primary">
              <Plus size={18} className="mr-1" /> Add City
            </button>
          </div>
        </form>
      </div>
      
      {/* Error Messages */}
      {(errors.name || errors.stateId) && (
        <div className="alert alert-error mb-4">
          <span>{errors.name?.message || errors.stateId?.message}</span>
        </div>
      )}
      
      {/* Cities Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>State</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCities.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-4">No cities found</td>
              </tr>
            ) : (
              filteredCities.map((city) => (
                <tr key={city.id}>
                  <td>{city.id}</td>
                  <td>
                    {editingId === city.id ? (
                      <input
                        type="text"
                        className="input input-bordered input-sm"
                        {...register('name', { required: true })}
                      />
                    ) : (
                      city.name
                    )}
                  </td>
                  <td>
                    {editingId === city.id ? (
                      <select
                        className="select select-bordered select-sm"
                        {...register('stateId', { required: true, valueAsNumber: true })}
                      >
                        {states.map(state => (
                          <option key={state.id} value={state.id}>
                            {state.name} ({state.code})
                          </option>
                        ))}
                      </select>
                    ) : (
                      `${states.find(s => s.id === city.stateId)?.name || 'Unknown'} (${states.find(s => s.id === city.stateId)?.code || '?'})`
                    )}
                  </td>
                  <td className="flex gap-2">
                    {editingId === city.id ? (
                      <>
                        <button
                          onClick={handleSubmit((data) => handleUpdate(city.id, data))}
                          className="btn btn-success btn-sm"
                        >
                          <Save size={16} />
                        </button>
                        <button
                          onClick={cancelEditing}
                          className="btn btn-warning btn-sm"
                        >
                          <X size={16} />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => startEditing(city)}
                          className="btn btn-info btn-sm"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(city.id)}
                          className="btn btn-error btn-sm"
                        >
                          <Trash2 size={16} />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import Swal from 'sweetalert2';
import { Plus, Search, Edit, Trash2, Save, X } from 'lucide-react';
import { statesApi } from "../../features/api/statesApi";

type StateFormData = {
  code: string;
  name: string;
};

export const States = () => {
  const { data: states = [], error, isLoading } = statesApi.useFetchStatesQuery();
  const [createState] = statesApi.useCreateStateMutation();
  const [updateState] = statesApi.useUpdateStateMutation();
  const [deleteState] = statesApi.useDeleteStateMutation();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  
  const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm<StateFormData>();

  const filteredStates = states.filter(state => 
    state.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    state.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreate = async (data: StateFormData) => {
    try {
      await createState(data).unwrap();
      toast.success('State created successfully!');
      reset();
    } catch (err) {
      toast.error('Failed to create state');
    }
  };

  const handleUpdate = async (id: number, data: StateFormData) => {
    try {
      await updateState({ id, ...data }).unwrap();
      toast.success('State updated successfully!');
      setEditingId(null);
    } catch (err) {
      toast.error('Failed to update state');
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
        await deleteState(id).unwrap();
        toast.success('State deleted successfully!');
      } catch (err) {
        toast.error('Failed to delete state');
      }
    }
  };

  const startEditing = (state: TState) => {
    setEditingId(state.id);
    setValue('code', state.code);
    setValue('name', state.name);
  };

  const cancelEditing = () => {
    setEditingId(null);
  };

  if (isLoading) return <div className="text-center py-8">Loading states...</div>;
  if (error) return <div className="text-center py-8 text-error">Error loading states</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">States Management</h1>
      
      {/* Search and Create Form */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="join flex-1">
          <input
            type="text"
            placeholder="Search states..."
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
              placeholder="Code (e.g., CA)"
              className="input input-bordered"
              {...register('code', { required: 'Code is required' })}
            />
            <input
              type="text"
              placeholder="State Name"
              className="input input-bordered"
              {...register('name', { required: 'Name is required' })}
            />
            <button type="submit" className="btn btn-primary">
              <Plus size={18} className="mr-1" /> Add State
            </button>
          </div>
        </form>
      </div>
      
      {/* Error Messages */}
      {(errors.code || errors.name) && (
        <div className="alert alert-error mb-4">
          <span>{errors.code?.message || errors.name?.message}</span>
        </div>
      )}
      
      {/* States Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>ID</th>
              <th>Code</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStates.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-4">No states found</td>
              </tr>
            ) : (
              filteredStates.map((state) => (
                <tr key={state.id}>
                  <td>{state.id}</td>
                  <td>
                    {editingId === state.id ? (
                      <input
                        type="text"
                        className="input input-bordered input-sm"
                        {...register('code', { required: true })}
                      />
                    ) : (
                      state.code
                    )}
                  </td>
                  <td>
                    {editingId === state.id ? (
                      <input
                        type="text"
                        className="input input-bordered input-sm"
                        {...register('name', { required: true })}
                      />
                    ) : (
                      state.name
                    )}
                  </td>
                  <td className="flex gap-2">
                    {editingId === state.id ? (
                      <>
                        <button
                          onClick={handleSubmit((data) => handleUpdate(state.id, data))}
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
                          onClick={() => startEditing(state)}
                          className="btn btn-info btn-sm"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(state.id)}
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
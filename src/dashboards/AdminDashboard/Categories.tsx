import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import Swal from 'sweetalert2';
import { Plus, Search, Edit, Trash2, Save, X } from 'lucide-react';
import { categoryApi } from "../../features/api/categoryApi";
import type { TCategory } from '../../types/category.types';

type CategoryFormData = {
  name: string;
};

export const Categories = () => {
  const { data: categories = [], error, isLoading } = categoryApi.useFetchCategoriesQuery();
  const [createCategory] = categoryApi.useCreateCategoryMutation();
  const [updateCategory] = categoryApi.useUpdateCategoryMutation();
  const [deleteCategory] = categoryApi.useDeleteCategoryMutation();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  
  const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm<CategoryFormData>();

  const filteredCategories = categories.filter(category => 
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreate = async (data: CategoryFormData) => {
    try {
      await createCategory(data).unwrap();
      toast.success('Category created successfully!');
      reset();
    } catch (err) {
      toast.error('Failed to create category');
    }
  };

  const handleUpdate = async (id: number, data: CategoryFormData) => {
    try {
      await updateCategory({ id, ...data }).unwrap();
      toast.success('Category updated successfully!');
      setEditingId(null);
    } catch (err) {
      toast.error('Failed to update category');
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
        await deleteCategory(id).unwrap();
        toast.success('Category deleted successfully!');
      } catch (err) {
        toast.error('Failed to delete category');
      }
    }
  };

  const startEditing = (category: TCategory) => {
    setEditingId(category.id);
    setValue('name', category.name);
  };

  const cancelEditing = () => {
    setEditingId(null);
  };

  if (isLoading) return <div className="text-center py-8">Loading categories...</div>;
  if (error) return <div className="text-center py-8 text-error">Error loading categories</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Categories Management</h1>
      
      {/* Search and Create Form */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="join flex-1">
          <input
            type="text"
            placeholder="Search categories..."
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
              placeholder="Category Name"
              className="input input-bordered"
              {...register('name', { required: 'Name is required' })}
            />
            <button type="submit" className="btn btn-primary">
              <Plus size={18} className="mr-1" /> Add Category
            </button>
          </div>
        </form>
      </div>
      
      {/* Error Messages */}
      {errors.name && (
        <div className="alert alert-error mb-4">
          <span>{errors.name.message}</span>
        </div>
      )}
      
      {/* Categories Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCategories.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center py-4">No categories found</td>
              </tr>
            ) : (
              filteredCategories.map((category) => (
                <tr key={category.id}>
                  <td>{category.id}</td>
                  <td>
                    {editingId === category.id ? (
                      <input
                        type="text"
                        className="input input-bordered input-sm w-full"
                        {...register('name', { required: true })}
                      />
                    ) : (
                      category.name
                    )}
                  </td>
                  <td className="flex gap-2">
                    {editingId === category.id ? (
                      <>
                        <button
                          onClick={handleSubmit((data) => handleUpdate(category.id, data))}
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
                          onClick={() => startEditing(category)}
                          className="btn btn-info btn-sm"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(category.id)}
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
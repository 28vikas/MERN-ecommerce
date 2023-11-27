import { useState } from 'react';
import AdminLayout from '../layout/AdminLayout';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

function AddProduct() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);


  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };
const API_URL = 'http://localhost:5000/api/products';
console.log("API_URL:", API_URL);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('image', image);
    console.log(formData);
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      console.log(data);
      // Clear form values
      setTitle('');
      setDescription('');
      setImage(null);
      toast.success("Product Added Succeesfully!", {
        position: 'top-right',
      });
      navigate('/admin/products')
    } catch (error) {
      console.error(error);
      toast.error("Product not added", {
        position: 'top-right',
      })
    }
  };
  

  return (
    <AdminLayout>
    <div className="w-full max-w-2xl mx-auto my-4">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            placeholder="Enter project title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />
        </div>
        <div className='mb-4'>
          <label className='' htmlFor='price'>Price</label>
          <input className='px-2 w-100' id='price'
          placeholder='Enter Product Price'
          value={price}
          onChange={(event) => setPrice(event.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            placeholder="Enter project description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="image">
            Image
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </div>

        <div className="d-flex items-center justify-between">
          <button
            className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
    </AdminLayout>
  );
}

export default AddProduct;

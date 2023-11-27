import {useState, useEffect} from 'react';
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';
import AdminLayout from '../layout/AdminLayout';
import { toast } from 'react-hot-toast';

function EditProduct() {
    const [product, setProduct] = useState({
        title: '',
        description: '',
        price: '',
        image: '',
    });
    const [imageFile, setImageFile] = useState(null);
    const {id} = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`http://localhost:5000/api/products/${id}`);
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setProduct(data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, [id]);

    const handleInputChange = (event) => {
        setProduct({
            ...product,
            [event.target.name]: event.target.value
        });
    };

    const handleImageChange = (event) => {
        setImageFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Product ID:', id); 
        const formData = new FormData();
        formData.append('title', product.title);
        formData.append('description', product.description);
        formData.append('price', product.price);
        if (imageFile) {
            formData.append('image', imageFile);
        }

        try {
            const response = await axios.patch(`http://localhost:5000/api/products/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            toast.success("Product Updated Successfully!", {
                position: 'top-right',
            });
            navigate('/admin/products');
        } catch (error) {
            console.log(error);
            toast.error("Error", {
                position: 'top-right',
            })
        }
    };

    return (
        <AdminLayout>
            <div className="w-100 max-w-4xl mx-auto my-4">
                <form onSubmit={handleSubmit}
                    encType="multipart/form-data">
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="title">
                            Title
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" name="title" type="text" placeholder="Enter project title"
                            value={
                                product.title
                            }
                            onChange={handleInputChange}/>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="description">
                            Description
                        </label>
                        <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="description" name="description" placeholder="Enter product description"
                            value={
                                product.description
                            }
                            onChange={handleInputChange}/>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="price">
                            Price
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="price" name="price" type="text" placeholder="Enter price"
                            value={
                                product.price
                            }
                            onChange={handleInputChange}/>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="image">
                            Image
                        </label>
                        <input className="block" id="image" name="image" type="file"
                            onChange={handleImageChange}/>
                    </div>
                   

                    <button className="bg-primary  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Save Changes
                    </button>
                </form>
            </div>
        </AdminLayout>
    );
}

export default EditProduct;

import {useEffect, useState} from 'react';
import AdminLayout from '../layout/AdminLayout';
import axios from 'axios';
import { toast } from 'react-hot-toast';

function ViewProduct() {
    const [products, setProducts] = useState([]);
    
    const API_URL = 'http://localhost:5000/api/products';
    // console.log("The url is: ", API_URL);
    useEffect(() => {
        fetch(API_URL).then(res => res.json()).then(data => setProducts(data)).catch(err => console.log(err));
    }, []);
    
    

    const handleDelete = (id) => {
        axios.delete(`http://localhost:5000/api/products/${id}`).then(response => {
            setProducts(products.filter(product => product._id !== id));
            toast.success("Product Deleted Successfully!", {
                position: 'top-right',
            });
        }).catch(error => {
            console.log(error);
            toast.error("Product Not Deleted", {
                position: 'top-right',
            })
        });
    };

    return (
        <AdminLayout title="Admin-All Product">

            <div className='w-100 max-w-4xl mx-auto my-4 bg-white shadow-sm d-flex justify-content-center align-items-center'>
                
                <table className="table-auto">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Title</th>
                            <th className="px-4 py-2">Description</th>
                            <th className="px-4 py-2">Price</th>
                            <th className="px-4 py-2">Image</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody> {
                        products.map(product => (
                            <tr key={
                                product._id
                            }>
                                <td className="border px-4 py-2">
                                    {
                                    product.title
                                }</td>
                                <td className="border px-4 py-2">
                                    {
                                    product.description
                                }</td>
                                <td className="border px-4 py-2">
                                    {
                                    product.price
                                }</td>
                                <td className="border px-4 py-2">
                                    <img src={
                                            `http://localhost:5000//images/${
                                                product.image
                                            }`
                                        }
                                        width="45px"/>
                                </td>
                               
                                <td className="border px-4 py-2 d-flex justify-content-between mx-auto">
                                    <button className="bg-primary hover:bg-blue-700 mx-1  text-white font-bold py-2 px-4 rounded"
                                        onClick={
                                            (event) => {
                                                event.preventDefault();
                                                window.location.href = `/admin/products/edit/${
                                                    product._id
                                                }`;
                                            }
                                    }>Edit</button>
                                    <button className="bg-danger  hover:bg-red-700  mx-1 text-white font-bold py-2 px-4 rounded"
                                        onClick={
                                            () => handleDelete(product._id)
                                    }>Delete</button>
                                </td>
                            </tr>
                        ))
                    } </tbody>
                </table>
            </div>
        </AdminLayout>
    );
}

export default ViewProduct;

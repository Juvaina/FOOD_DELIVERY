import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { assets } from '../../../assets/assets';
import './FoodFormModal.css';

const FoodFormModal = ({ url, food, onClose, onSuccess }) => {
  const [image, setImage] = useState(false);

  const [data, setData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Salad'
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  useEffect(() => {
    if (food) {
      setData({
        name: food.name,
        description: food.description,
        price: food.price,
        category: food.category
      });
    }
  }, [food]);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', Number(data.price));
    formData.append('category', data.category);
    if (image) formData.append('image', image);
    if (food) formData.append('id', food._id);

    try {
      const endpoint = food ? 'edit' : 'add';
      const response = await axios.post(
        `${url}/api/food/${endpoint}`,
        formData
      );

      if (response.data.success) {
        toast.success(response.data.message);
        onSuccess();
        onClose();
      } else {
        toast.error('Something went wrong');
      }
    } catch (error) {
      console.log(error);
      toast.error('Server error');
    }
  };

  return (
    <div className='modal-overlay' onClick={onClose}>
      <div className='add' onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <span className='close-btn' onClick={onClose}>
          ×
        </span>

        <form className='flex-col' onSubmit={onSubmitHandler}>
          <div className='add-img-upload flex-col'>
            <p>Upload Image</p>
            <label htmlFor='image'>
              <img
                src={image ? URL.createObjectURL(image) : assets.upload_area}
                alt='Upload Preview'
              />
            </label>
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type='file'
              id='image'
              hidden
              {...(!food && { required: true })}
            />
          </div>

          <div className='add-product-name flex-col'>
            <p>Product Name</p>
            <input
              onChange={onChangeHandler}
              value={data.name}
              type='text'
              name='name'
              placeholder='Type here'
              required
            />
          </div>

          <div className='add-product-description flex-col'>
            <p>Product Description</p>
            <textarea
              onChange={onChangeHandler}
              value={data.description}
              name='description'
              rows='6'
              placeholder='Write content here'
              required
            />
          </div>

          <div className='add-category-price'>
            <div className='add-category flex-col'>
              <p>Product Category</p>
              <select
                onChange={onChangeHandler}
                name='category'
                value={data.category}
              >
                <option value='Salad'>Salad</option>
                <option value='Rolls'>Rolls</option>
                <option value='Deserts'>Deserts</option>
                <option value='Sandwich'>Sandwich</option>
                <option value='Cake'>Cake</option>
                <option value='Pure Veg'>Pure Veg</option>
                <option value='Pasta'>Pasta</option>
                <option value='Noodles'>Noodles</option>
              </select>
            </div>

            <div className='add-price flex-col'>
              <p>Product Price</p>
              <input
                onChange={onChangeHandler}
                value={data.price}
                type='number'
                name='price'
                placeholder='$20'
                required
              />
            </div>
          </div>

          <button type='submit' className='add-btn'>
            {food ? 'UPDATE' : 'ADD'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FoodFormModal;

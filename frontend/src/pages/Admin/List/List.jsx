import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import FoodFormModal from '../Add/FoodFormModal.jsx';
import './List.css';

const List = ({ url }) => {
  const [list, setList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editFood, setEditFood] = useState(null);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) setList(response.data.data);
      else toast.error('Error fetching data');
    } catch {
      toast.error('Server error');
    }
  };

  const removeFood = async (foodId) => {
    const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
    await fetchList();
    if (response.data.success) toast.success(response.data.message);
    else toast.error('Error deleting');
  };

  const handleEdit = (item) => {
    setEditFood(item);
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditFood(null);
    setShowModal(true);
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className='list add flex-col'>
      <p>All Foods List</p>
      <button onClick={handleAdd} className='add-btn'>
        Add New Food
      </button>
      <div className='list-table'>
        <div className='list-table-format title'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => (
          <div key={index} className='list-table-format'>
            <img src={`${url}/images/${item.image}`} alt='' />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>${item.price}</p>
            <p>
              <span onClick={() => handleEdit(item)} className='cursor'>
                ✏️
              </span>
              &nbsp;|&nbsp;
              <span onClick={() => removeFood(item._id)} className='cursor'>
                ❌
              </span>
            </p>
          </div>
        ))}
      </div>

      {showModal && (
        <FoodFormModal
          url={url}
          food={editFood}
          onClose={() => setShowModal(false)}
          onSuccess={fetchList}
        />
      )}
    </div>
  );
};

export default List;

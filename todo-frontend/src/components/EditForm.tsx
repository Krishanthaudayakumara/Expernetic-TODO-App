import React, { useState, useEffect, ChangeEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getTodoById, updateTodo } from '../services/api';

const EditForm: React.FC = () => {
  const { id }: any = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    isCompleted: false,
  });

  useEffect(() => {
    const fetchTodo = async () => {
      const response = await getTodoById(id);
      setFormData(response.data);
    };

    fetchTodo();
  }, [id]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateTodo(id, formData);
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Title:</label>
      <input type="text" name="title" value={formData.title} onChange={handleChange} />
      <label>Description:</label>
      <textarea name="description" value={formData.description} onChange={handleChange} />
      <label>Status:</label>
      <select
        name="isCompleted"
        value={formData.isCompleted ? 'true' : 'false'}
        onChange={handleChange}
      >
        <option value="true">Completed</option>
        <option value="false">To Do</option>
      </select>
      <button type="submit">Update</button>
    </form>
  );
};

export default EditForm;

// services/api.ts
import axios from 'axios';

const apiUrl = 'http://localhost:5045';

export const getTodos = () => axios.get(`${apiUrl}/api/Todo`);

export const createTodo = (data: any) => axios.post(`${apiUrl}/api/Todo`, data);

export const getTodoById = (id: number) => axios.get(`${apiUrl}/api/Todo/${id}`);

export const updateTodo = (id: number, data: any) =>
  axios.put(`${apiUrl}/api/Todo/${id}`, data);

export const deleteTodo = (id: number) => axios.delete(`${apiUrl}/api/Todo/${id}`);

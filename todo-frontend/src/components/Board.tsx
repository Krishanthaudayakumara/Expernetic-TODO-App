// components/Board.tsx
import React, { useState, useEffect } from 'react';
import Card from './Card';
import CreateEditModal from './CreateEditModal';
import { getTodos } from '../services/api';
import { FaPlus, FaEdit } from 'react-icons/fa';

const Board: React.FC = () => {
  const [todos, setTodos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'create' | 'edit'>('create'); // 'create' or 'edit'
  const [selectedTodo, setSelectedTodo] = useState(null);

  const fetchTodos = async () => {
    const response = await getTodos();
    setTodos(response.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []); // Removed the fetchTodos dependency from the dependency array

  const handleCreate = () => {
    setModalType('create');
    setShowModal(true);
    setSelectedTodo(null);
  };

  const handleEdit = (todo: any) => {
    setModalType('edit');
    setShowModal(true);
    setSelectedTodo(todo);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTodo(null);
  };

  const handleTaskUpdated = () => {
    fetchTodos(); // Now it should work
  };

  return (
    <div>
      <h1 style={
        {
          textAlign: 'center',
          margin: '20px 0 20px 0'
        }
      }>ToDo List</h1>
      <button className="create-button" onClick={handleCreate}>
        <FaPlus /> Create To-Do
      </button>

      <div className="tasks">
        {todos.map((todo: any) => (
          <Card key={todo.id} todo={todo} handleEdit={() => handleEdit(todo)} />
        ))}
      </div>

      <CreateEditModal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        modalType={modalType}
        selectedTodo={selectedTodo}
        handleTaskUpdated={handleTaskUpdated}
      />
    </div>
  );
};

export default Board;

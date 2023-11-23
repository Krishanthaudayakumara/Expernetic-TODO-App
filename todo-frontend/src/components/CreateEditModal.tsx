import React, { useState, useEffect, ChangeEvent } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getTodoById, createTodo, updateTodo } from '../services/api';

interface CreateEditModalProps {
  showModal: boolean;
  handleCloseModal: () => void;
  modalType: 'create' | 'edit';
  selectedTodo: any;
  handleTaskUpdated: () => void;
}

const CreateEditModal: React.FC<CreateEditModalProps> = ({
  showModal,
  handleCloseModal,
  modalType,
  selectedTodo,
  handleTaskUpdated,
}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    isCompleted: false,
  });
  const [todoId, setTodoId] = useState<number | null>(null);

  useEffect(() => {
    if (modalType === 'edit' && selectedTodo) {
      setFormData(selectedTodo);
    } else {
      setFormData({
        title: '',
        description: '',
        isCompleted: false,
      });
    }
  }, [modalType, selectedTodo]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (modalType === 'create') {
      await createTodo({
        ...formData,
        isCompleted: Boolean(formData.isCompleted),
      });
    } else if (modalType === 'edit' && selectedTodo) {
      await updateTodo(selectedTodo.id, {
        ...formData,
        isCompleted: Boolean(formData.isCompleted),
      });
    }

    handleTaskUpdated();
    handleCloseModal();
  };

  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>{modalType === 'create' ? 'Create' : 'Edit'} To-Do</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="title">
            <Form.Label>Title:</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="description">
            <Form.Label>Description:</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </Form.Group>
          <Button type="submit">Save</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateEditModal;

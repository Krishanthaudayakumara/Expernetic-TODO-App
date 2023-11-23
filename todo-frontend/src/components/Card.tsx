import React, { ChangeEvent } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { updateTodo, deleteTodo } from "../services/api";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

interface Todo {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
}

interface CardProps {
  todo: Todo;
  handleEdit: () => void;
}

const Card: React.FC<CardProps> = ({ todo, handleEdit }) => {
  const handleDelete = async () => {
    await deleteTodo(todo.id);
    window.location.reload();
  };

  const handleStatusChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const updatedTodo = { ...todo, isCompleted: e.target.checked };
    await updateTodo(todo.id, updatedTodo);
    window.location.reload();
  };

  return (
    <div className={`card ${todo.isCompleted ? "completed" : ""}`}>
      <div className="card-body">
        <Row className="align-items-center">
          <Col xs="auto">
            <Form.Check
              type="checkbox"
              checked={todo.isCompleted}
              onChange={handleStatusChange}
            />
          </Col>
          <Col md={9}>
            <h3 className="card-title">{todo.title}</h3>
          </Col>
          <Col md={2}>
            {" "}
            <div className="actions">
              <Button
                variant="success"
                className="action-btn"
                onClick={handleEdit}
              >
                <FaEdit />
              </Button>
              <Button
                variant="danger"
                className="action-btn"
                onClick={handleDelete}
              >
                <FaTrash />
              </Button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={1}>   </Col>
          <Col md={10}>
            {" "}
            <p className="card-text">{todo.description}</p>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Card;

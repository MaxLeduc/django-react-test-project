import React, { ChangeEvent } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label
} from "reactstrap";

import { Todo } from '../../types'

interface CustomModalProps {
  activeItem: Todo | null
  setActiveItem: (item: Todo) => void
  toggleModal: () => void
  onSave: (item: Todo) => void
}

const CustomModal = ({activeItem, setActiveItem, toggleModal, onSave}: CustomModalProps) => {
  const handleChange = (e: ChangeEvent<any>) => {
    if (!activeItem) return
  
    let { name, value } = e.target;
    if (e.target.type === "checkbox") {
      value = e.target.checked;
    }

    const updatedActiveItem: Todo = { ...activeItem, [name]: value };
    setActiveItem(updatedActiveItem);
  };

  return (
    <Modal isOpen={true} toggle={toggleModal}>
      <ModalHeader toggle={toggleModal}> Todo Item </ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="title">Title</Label>
            <Input
              type="text"
              name="title"
              value={activeItem ? activeItem.title : ''}
              onChange={handleChange}
              placeholder="Enter Todo Title"
            />
          </FormGroup>
          <FormGroup>
            <Label for="description">Description</Label>
            <Input
              type="text"
              name="description"
              value={activeItem ? activeItem.description : ''}
              onChange={handleChange}
              placeholder="Enter Todo description"
            />
          </FormGroup>
          <FormGroup check>
            <Label for="completed">
              <Input
                type="checkbox"
                name="completed"
                checked={activeItem ? activeItem.completed: false}
                onChange={handleChange}
              />
              Completed
            </Label>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="success" onClick={() => { if(activeItem) onSave(activeItem) }}>
          Save
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default CustomModal

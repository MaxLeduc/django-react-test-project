import React from 'react'

import { Todo } from '../../../../types'

interface ItemProps {
  todoList: Todo[]
  viewCompleted: boolean
  editItem: (item: Todo) => void
  handleDelete: (item: Todo) => void
}

export const Items = ({todoList, viewCompleted, editItem, handleDelete}: ItemProps) => {
  const newItems = todoList.filter(
    item => item.completed === viewCompleted
  );

  return <>
      {newItems.map(item => (
        <li
          key={item.id}
          className="list-group-item d-flex justify-content-between align-items-center"
        >
          <span
            className={`todo-title mr-2 ${
              viewCompleted ? "completed-todo" : ""
            }`}
            title={item.description}
          >
            {item.title}
          </span>
          <span>
              <button
                onClick={() => editItem(item)}
                className="btn btn-secondary mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item)}
                className="btn btn-danger"
              >
                Delete
              </button>
            </span>
        </li>
      ))}
    </>
};

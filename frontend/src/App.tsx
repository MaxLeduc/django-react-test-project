import React, { useState, useEffect } from "react";

import Modal from './components/Modal'
import { Todo } from './types'
import { apiClient } from './api/ApiClient'

interface TabListProps {
  viewCompleted: boolean
  setViewCompleted: (viewCompleted: boolean) => void
}

const TabList = ({viewCompleted, setViewCompleted}: TabListProps) => {
  const displayCompleted = (status: boolean) => {
    if (status) {
      return setViewCompleted(true);
    }

    return setViewCompleted(false)
  };

  return (
    <div className="my-5 tab-list">
      <span
        onClick={() => displayCompleted(true)}
        className={viewCompleted ? "active" : ""}
      >
        complete
      </span>
      <span
        onClick={() => displayCompleted(false)}
        className={viewCompleted ? "" : "active"}
      >
        Incomplete
      </span>
    </div>
  );
};

interface ItemProps {
  todoList: Todo[]
  viewCompleted: boolean
  editItem: (item: Todo) => void
  handleDelete: (item: Todo) => void
}

const Items = ({todoList, viewCompleted, editItem, handleDelete}: ItemProps) => {
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

const App = () => {
  const [viewCompleted, setViewCompleted] = useState<boolean>(false)
  const [todoList, setTodoList] = useState<Todo[]>([])
  const [displayModal, setDisplayModal] = useState<boolean>(false)
  const [activeItem, setActiveItem] = useState<Todo | null>(null)

  useEffect(() => {
    getTodos()
  }, [])

  const getTodos = async () => {
    try {
      const { data } = await apiClient.get('todos')

      return setTodoList(data)
    } catch (e) {
      console.log(e)
    }
  }

  const toggleModal = () => {
    setDisplayModal(!displayModal);
  };

  const handleSubmit = async (item: Todo) => {
    toggleModal();
    
    try {
      if (item.id) {
        await apiClient.put(`todos/${item.id}/`, item)
      } else {
        await apiClient.post('todos/', item)
      }

      getTodos()
    } catch (e) {
      console.log(e)
    }
  };

  const handleDelete = async (item: Todo) => {
    try {
      await apiClient.delete(`todos/${item.id}`)

      getTodos()
    } catch (e) {
      console.log(e)
    }
  };

  const editItem = (item: Todo) => {
    setActiveItem(item);
    toggleModal();
  };

  const createItem = () => {
    const item = { title: "", description: "", completed: false };
    editItem(item);
  };

  return (
    <main className="content">
      <h1 className="text-white text-uppercase text-center my-4">Todo app</h1>
      <div className="row ">
        <div className="col-md-6 col-sm-10 mx-auto p-0">
          <div className="card p-3">
            <div className="">
              <button onClick={createItem} className="btn btn-primary">
                Add task
              </button>
            </div>
            <TabList viewCompleted={viewCompleted} setViewCompleted={setViewCompleted}/>
            <ul className="list-group list-group-flush">
              <Items 
                todoList={todoList}
                viewCompleted={viewCompleted}
                editItem={editItem}
                handleDelete={handleDelete}
              />
            </ul>
          </div>
        </div>
      </div>
      {displayModal ? (
        <Modal
          activeItem={activeItem}
          toggleModal={toggleModal}
          onSave={handleSubmit}
          setActiveItem={setActiveItem}
        />
      ) : null}
    </main>
  );
}

export default App;

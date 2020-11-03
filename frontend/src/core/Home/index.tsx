import React, { useState, useEffect } from 'react'
import { useQuery, useMutation } from 'urql';

import Modal from '../../components/Modal'
import { Todo } from '../../types'

import { TabList, Items } from './components'
import { GetAllTodos, CreateTodo, UpdateTodo, DeleteTodo } from './queries'

const Home = () => {
  const [viewCompleted, setViewCompleted] = useState<boolean>(false)
  const [todoList, setTodoList] = useState<Todo[]>([])
  const [displayModal, setDisplayModal] = useState<boolean>(false)
  const [activeItem, setActiveItem] = useState<Todo | null>(null)
  const [createTodoResult, createTodo] = useMutation(CreateTodo);
  const [updateTodoResult, updateTodo] = useMutation(UpdateTodo);
  const [deleteTodoResult, deleteTodo] = useMutation(DeleteTodo);
  const [result, reexecuteQuery] = useQuery({
    query: GetAllTodos,
  });
  const { data, fetching, error } = result;
  const { allTodos } = data || {}

  useEffect(() => {
    if (allTodos)
      setTodoList(allTodos)
  }, [allTodos])

  const toggleModal = () => {
    setDisplayModal(!displayModal);
  };

  const handleSubmit = async (item: Todo) => {
    toggleModal();
    
    try {
      if (item.id) {
        updateTodo(item)
      } else {
        createTodo(item)
      }

      reexecuteQuery()
    } catch (e) {
      console.log(e)
    }
  };

  const handleDelete = async (item: Todo) => {
    try {
      const { data } = await deleteTodo({id: item.id})
      setTodoList(todoList.filter(todo => Number(todo.id) !== data.deleteTodo.id))
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

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

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

export default Home

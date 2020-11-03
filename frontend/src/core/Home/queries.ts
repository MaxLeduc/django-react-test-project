export const GetAllTodos = `
  query {
    allTodos {
      id
      title
      description
      completed
      category {
        id
        name
      }
    }
  }
`;

export const CreateTodo = `
  mutation createTodo ($title: String!, $description: String!, $completed: Boolean!) {
    createTodo(input: {
      title: $title,
      description: $description,
      completed: $completed
    }) {
      ok,
      todo {
        title,
        description,
        completed
      }
    }
  }
`

export const UpdateTodo = `
  mutation updateTodo ($id: Int!, $title: String!, $description: String!, $completed: Boolean!) {
    updateTodo(input: {
      id: $id,
      title: $title,
      description: $description,
      completed: $completed
    }) {
      ok,
      todo {
        title,
        description,
        completed
      }
    }
  }
`

export const DeleteTodo = `
  mutation deleteTodo ($id: Int!) {
    deleteTodo(id: $id) {
      ok,
      id
    }
  }
`

import { createClient } from 'urql';

export const ApiClient = createClient({
  url: 'http://localhost:8000/graphql',
});

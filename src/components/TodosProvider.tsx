import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react';

// import { useLocalStorage } from '#/hooks/useLocalStorage';

export type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

const TodosContext = createContext<{
  todos: Todo[];
  addTodo: (todo: Omit<Todo, 'id'>) => void;
  removeTodo: (id: Todo['id']) => void;
}>(null!);

export const TodosProvider = ({ children }: { children: ReactNode }) => {
  // const [todos, setTodos] = useLocalStorage<Todo[]>('TODOS', []);
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = useCallback((todo: Omit<Todo, 'id'>) => {
    const newTodo = { ...todo, id: Date.now() };

    setTodos((prev) => [newTodo, ...prev]);
  }, []);

  const removeTodo = useCallback((id: Todo['id']) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }, []);

  // const markAsCompleted = useCallback((id: Todo['id']) => {
  //   setTodos((prev) =>
  //     prev.map((todo) => (todo.id === id ? { ...todo, completed: true } : todo))
  //   );
  // });

  return (
    <TodosContext.Provider value={{ todos, addTodo, removeTodo }}>
      {children}
    </TodosContext.Provider>
  );
};

export const useTodos = () => useContext(TodosContext)!;

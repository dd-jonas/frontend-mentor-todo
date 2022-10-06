import { TodoList } from '#/components/TodoList';
import { TodosProvider } from '#/components/TodosProvider';

function App() {
  return (
    <TodosProvider>
      <TodoList />
    </TodosProvider>
  );
}

export default App;

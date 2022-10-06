import { KeyboardEventHandler, useState } from 'react';

import { TodoListItem } from './TodoListItem';
import { useTodos } from './TodosProvider';

type Filter = 'all' | 'active' | 'completed';

export function TodoList() {
  const { todos, addTodo } = useTodos();
  const [activeFilter, setActiveFilter] = useState<Filter>('all');

  const handleNewTodo: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === 'Enter') {
      if (event.currentTarget.value.trim() === '') return;

      addTodo({
        text: event.currentTarget.value,
        completed: false,
      });

      event.currentTarget.value = '';
    }
  };

  const setFilter = (filter: Filter) => () => setActiveFilter(filter);

  const filteredTodos = todos.filter((todo) => {
    switch (activeFilter) {
      case 'all':
        return true;
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
    }
  });

  return (
    <main className="todos">
      <h1>Todo</h1>

      <input
        type="text"
        placeholder="Create a new todo"
        onKeyDown={handleNewTodo}
      />

      <ul>
        {filteredTodos.map((todo) => (
          <TodoListItem key={todo.id} todo={todo} />
        ))}
        <li className="todos__actions">
          <p>{todos.length} items left</p>

          <div className="todos__filters">
            <p onClick={setFilter('active')}>All</p>
            <p onClick={setFilter('active')}>Active</p>
            <p onClick={setFilter('completed')}>Complete</p>
          </div>

          <p>Clear completed</p>
        </li>
      </ul>
    </main>
  );
}

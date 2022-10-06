import { Todo, useTodos } from './TodosProvider';

type Props = { todo: Todo };

export function TodoListItem({ todo }: Props) {
  const { removeTodo } = useTodos();

  return (
    <li className="todos__item" onClick={() => removeTodo(todo.id)}>
      {todo.text}
    </li>
  );
}

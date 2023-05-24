import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import TodoItem from "./todoItem";
import { fetchTodos } from "../store/todoSlice";
const TodoList = () => {
	const { todos, status, error } = useSelector((state) => {
		return state.todos;
	});
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchTodos());
	}, [dispatch]);

	return (
		<>
			{status === "loading" && <h4>Загрузка...</h4>}
			{status === "error" && <h4>Error occurred: {error}</h4>}
			<ul>
				{todos.map((todo) => (
					<TodoItem
						key={todo.id}
						{...todo}
					/>
				))}
			</ul>
		</>
	);
};

export default TodoList;

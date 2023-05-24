import { useDispatch } from "react-redux";
import { deleteTodo, toggleCompleteTodo } from "../store/todoSlice";

const TodoItem = ({ id, title, completed }) => {
	const dispatch = useDispatch();

	return (
		<li>
			<input
				type="checkbox"
				checked={completed}
				onChange={() =>
					dispatch(toggleCompleteTodo({ id: id, completed: !completed }))
				}
			/>
			<span>{title}</span>
			<span
				className="delete"
				onClick={() => dispatch(deleteTodo(id))}
			>
				&times;
			</span>
		</li>
	);
};

export default TodoItem;

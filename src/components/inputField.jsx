import { useDispatch } from "react-redux";
import { createTodo } from "../store/todoSlice";

const InputField = () => {
	const dispatch = useDispatch();

	const addTodo = (text) => {
		dispatch(createTodo(text));
	};

	return (
		<label>
			<input
				onKeyUp={(e) => {
					if (e.code === "Enter" && e.target.value) {
						addTodo(e.target.value);
						e.target.value = "";
					}
				}}
			/>
		</label>
	);
};

export default InputField;

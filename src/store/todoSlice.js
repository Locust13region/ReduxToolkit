import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchTodos = createAsyncThunk(
	"todo/fetchTodos",
	async (_, { rejectWithValue }) => {
		try {
			const response = await fetch(
				"https://jsonplaceholder.typicode.com/todos?_limit=10"
			);
			if (!response.ok) {
				throw new Error(`fetch failured whis status ${response.status}`);
			}
			const result = await response.json();
			return result;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const deleteTodo = createAsyncThunk(
	"todo/deleteTodo",
	async (id, { rejectWithValue, dispatch }) => {
		try {
			const response = await fetch(
				`https://jsonplaceholder.typicode.com/todos/${id}`,
				{ method: "DELETE" }
			);
			dispatch(removeTodo(id));

			if (!response.ok) {
				throw new Error("Can't delete, fetch failured");
			}
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const toggleCompleteTodo = createAsyncThunk(
	"todo/toggleCompleteTodo",
	async ({ id, completed }, { rejectWithValue, dispatch }) => {
		try {
			const response = await fetch(
				`https://jsonplaceholder.typicode.com/todos/${id}`,
				{
					method: "PATCH",
					body: JSON.stringify({ completed: completed }),
					headers: { "Content-type": "application/json" },
				}
			);
			dispatch(toggleCheckbox(id));

			if (!response.ok) {
				throw new Error(`Can't complit task ${id}`);
			}
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const createTodo = createAsyncThunk(
	"todo/createTodo",
	async (title, { rejectWithValue, dispatch }) => {
		try {
			const response = await fetch(
				`https://jsonplaceholder.typicode.com/todos/`,
				{
					method: "POST",
					body: JSON.stringify({
						title: title,
						completed: false,
						userId: 1,
					}),
					headers: { "Content-type": "application/json" },
				}
			);
			const result = await response.json();
			dispatch(addTodo(result));
			if (!response.ok) {
				throw new Error(`Can't add task`);
			}
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

const setError = (state, action) => {
	console.log(action);
	state.status = "error";
	state.error = action.payload;
};
const initialState = {
	todos: [],
	status: null,
	error: null,
};

const todoSlice = createSlice({
	name: "todo",
	initialState,
	reducers: {
		addTodo(state, action) {
			const { userId, id, title, completed } = action.payload;
			if (!action.payload) return;
			state.todos.push({
				userId,
				id,
				title,
				completed,
			});
		},
		removeTodo(state, action) {
			state.todos = state.todos.filter((todo) => todo.id !== action.payload);
		},
		toggleCheckbox(state, action) {
			state.todos = state.todos.map((todo) => {
				if (todo.id !== action.payload) {
					return todo;
				}
				todo.completed = !todo.completed;
				return todo;
			});
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchTodos.pending, (state, action) => {
				state.status = "loading";
				state.error = null;
			})
			.addCase(fetchTodos.fulfilled, (state, action) => {
				state.status = "resolved";
				state.todos = action.payload;
			})
			.addCase(fetchTodos.rejected, setError)
			.addCase(deleteTodo.rejected, setError)
			.addCase(toggleCompleteTodo.rejected, setError)
			.addCase(createTodo.rejected, setError);
	},
});

export const { addTodo, removeTodo, toggleCheckbox } = todoSlice.actions;
export default todoSlice.reducer;

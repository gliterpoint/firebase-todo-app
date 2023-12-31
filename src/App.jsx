import { useState } from "react";
import { CheckSquare, PenSquare } from "lucide-react";
import { Trash2 } from "lucide-react";
import "./App.css";

function App() {
  const [TodoList, setTodoList] = useState([]);
  const [Todo, setTodo] = useState({
    id: "",
    title: "",
    isCompleted: false,
    isEditing: false,
  });

  // Add Todo Handler
  const AddTodo = (e) => {
    e.preventDefault();
    setTodoList((prev) => [{ ...Todo, id: new Date().getTime().toString() }, ...prev]);
    setTodo({ ...Todo, id: "", title: "" });
  };

  // Edit Todo Handler
  const EditTodo = (id) => {
    setTodoList((prev) => prev.map((todo) => (todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo)));
  };

  // Delete Todo Handler
  const DeleteTodo = (id) => {
    const todoDel = TodoList.filter((todo) => todo.id !== id);
    setTodoList(todoDel);
  };

  return (
    <>
      <div className="bg-slate-500 text-center py-4 text-white font-in text-2xl font-semibold">
        Firebase Todo Application
      </div>
      <div className="max-w-2xl mx-auto my-16 border border-slate-100/10 rounded-md p-6">
        <form onSubmit={AddTodo}>
          <div className="flex item-center justify-between space-x-4">
            <div className="flex-grow">
              <input
                type="text"
                value={Todo.title}
                placeholder="Enter your Todo here"
                className="w-full bg-white/5 outline-none border border-slate-100/10 rounded-md px-4 py-3 font-in text-base placeholder:text-base placeholder:text-slate-300"
                onChange={(e) => setTodo({ ...Todo, title: e.target.value })}
                maxLength={50}
                required
              />
            </div>
            <div>
              <button
                type="submit"
                className="px-4 py-3 border border-slate-500 bg-slate-500 text-white font-medium font-in leading-6 rounded-md text-base focus:outline-none"
              >
                Add Todo
              </button>
            </div>
          </div>
        </form>
        <div className="flex flex-col gap-2 mt-5 font-in">
          {TodoList.length > 0 ? (
            TodoList.map((todo) => {
              return (
                <div key={todo.id}>
                  <div className="flex items-center justify-between space-x-3 rounded-md overflow-hidden pr-3  border border-slate-100/10">
                    <div className="flex-1">
                      <input
                        type="text"
                        value={todo.title}
                        onChange={(e) => {
                          if (todo.isCompleted || !todo.isEditing) return;
                          setTodoList((prev) =>
                            prev.map((item) => (item.id === todo.id ? { ...todo, title: e.target.value } : item))
                          );
                        }}
                        readOnly={!todo.isEditing || todo.isCompleted}
                        className="w-full px-4 py-3 outline-none bg-transparent"
                      />
                    </div>
                    <div className="flex items-center justify-between space-x-2">
                      <button
                        className="bg-orange-400/80 text-white px-3 py-2 rounded-md focus:outline-none outline-line border-none"
                        onClick={() => {
                          EditTodo(todo.id);
                        }}
                        disabled={todo.isCompleted}
                      >
                        {todo.isEditing ? <CheckSquare size={18} /> : <PenSquare size={18} />}
                      </button>
                      <button
                        className="bg-red-500/80 text-white px-3 py-2 rounded-md focus:outline-none outline-line border-none"
                        onClick={() => DeleteTodo(todo.id)}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div>You have not created any todo yet 😐</div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;

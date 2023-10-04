import { useState } from "react";
import { CheckSquare, PenSquare } from "lucide-react";
import { Trash2 } from "lucide-react";

export function App() {
  const [TodoList, setTodoList] = useState([]);
  const [Editable, setEditable] = useState(false);
  const [Todo, setTodo] = useState({
    id: "",
    title: "",
    isCompleted: false,
  });
  const [Todomsg, setTodomsg] = useState(Todo.title);

  // Add Todo Handler
  const AddTodo = (e) => {
    e.preventDefault();
    setTodoList((prev) => [{ ...Todo, id: new Date().getTime().toString() }, ...prev]);
    setTodo({ ...Todo, id: "", title: "" });
  };

  // Edit Todo Handler
  const EditTodo = (id, todo) => {
    console.log(id);
    console.log(todo);
    const todoFilter = TodoList.map((todo) => todo.id === id);
    console.log(todoFilter);
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
            TodoList.map((todo, index) => {
              return (
                <div key={index}>
                  <div className="flex items-center justify-between space-x-3 rounded-md overflow-hidden  border border-slate-100/10">
                    <div>
                      <input
                        type="text"
                        value={todo.title}
                        onChange={() => EditTodo(todo.id, todo.title)}
                        readOnly={!Editable}
                        className="px-4 py-2 outline-none bg-transparent"
                      />
                      {/* <p className="text-base leading-6">{todo.title}</p> */}
                    </div>
                    <div className="flex items-center justify-between space-x-2">
                      <button
                        className="bg-orange-400/80 text-white px-3 py-2 rounded-md focus:outline-none outline-line border-none"
                        onClick={() => {
                          if (todo.isCompleted) return;
                          if (Editable) {
                            setEditable(false);
                          } else {
                            setEditable((prev) => !prev);
                          }
                        }}
                        disabled={todo.isCompleted}
                      >
                        {Editable ? <CheckSquare size={18} /> : <PenSquare size={18} />}
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

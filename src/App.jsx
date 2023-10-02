import { useState } from "react";
import "./App.css";

function App() {
  const [TodoList, setTodoList] = useState([]);
  const [todo, setTodo] = useState({
    id: Math.random().toString(36).substring(2, 10),
    title: "",
    isCompleted: false,
  });

  const handleTodo = (e) => {
    e.preventDefault();
    setTodoList((prev) => [todo, ...prev]);
    setTodo({ id: "", title: "", isCompleted: "" });
  };

  const EditTodo = (id) => {
    console.log(id);
  };
  const DeleteTodo = (id) => {
    console.log(id);
  };

  return (
    <>
      <div className="bg-slate-500 text-center py-4 text-white font-in text-2xl font-semibold">
        Firebase Todo Application
      </div>
      <div className="max-w-2xl mx-auto my-16 border border-slate-200 rounded-md p-6">
        <form onSubmit={handleTodo}>
          <div className="flex item-center justify-between space-x-4">
            <div className="flex-grow">
              <input
                type="text"
                value={todo.title}
                placeholder="Place your Todo here"
                className="w-full outline-none border border-slate-200 rounded-md px-4 py-2 font-in text-base placeholder:text-base placeholder:text-slate-300"
                onChange={(e) => setTodo({ ...todo, title: e.target.value })}
                maxLength={50}
                required
              />
            </div>
            <div>
              <button
                type="submit"
                className="px-4 py-2 border border-slate-500 bg-slate-500 text-white font-medium font-in rounded-md text-base focus:outline-none"
              >
                Add Todo
              </button>
            </div>
          </div>
        </form>
        <div className="flex flex-col gap-2 mt-6 font-in">
          {TodoList.length > 0 ? (
            TodoList.map((todo, index) => {
              return (
                <div key={index}>
                  <div className="flex items-center justify-between space-x-3 rounded-md px-4 py-2 border border-slate-200">
                    <div>
                      <p className="text-base leading-6">{todo.title}</p>
                    </div>
                    <div className="flex items-center justify-between space-x-2">
                      <button
                        className="bg-orange-500 text-white px-3 py-1 rounded-md focus:outline-none outline-line border-none"
                        onClick={() => EditTodo(todo.id)}
                      >
                        E
                      </button>
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded-md focus:outline-none outline-line border-none"
                        onClick={() => DeleteTodo(todo.id)}
                      >
                        D
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

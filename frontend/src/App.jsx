import { useState, useEffect } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { motion } from "framer-motion";
import axios from "axios";
import moment from "moment";

const ItemType = "TASK";
const API_URL = "http://localhost:9000/tasks";

const Task = ({ task, index, moveTask, updateTask, deleteTask }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType,
    item: { index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [, drop] = useDrop(() => ({
    accept: ItemType,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveTask(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  }));

  // Calculate duration if completed
  const duration = task.completed
    ? moment(task.completedAt).diff(moment(task.createdAt), "minutes") + " min"
    : "Pending";

  return (
    <motion.div
      ref={(node) => drag(drop(node))}
      className={`p-4 mb-2 rounded-lg shadow-md flex justify-between items-center ${
        task.completed ? "bg-green-300" : "bg-white"
      } border ${isDragging ? "opacity-50" : "opacity-100"}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      
    >
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() =>
          updateTask(task._id, {
            completed: !task.completed,
            completedAt: task.completed ? null : new Date(),
          })
        }
      />
      <div className="flex-1 ml-2" >
        <span className={task.completed ? "line-through text-gray-500" : ""}>{task.text}</span>
        <div className="text-sm text-gray-500">Added: {moment(task.createdAt).format("LT")}</div>
        <div className="text-xs text-blue-600">{task.completed ? `Completed in ${duration}` : ""}</div>
      </div>
      <button onClick={() => deleteTask(task._id)} className="ml-4 text-red-500">X</button>
    </motion.div>
  );
};

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("");

  useEffect(() => {
    axios.get(API_URL).then((response) => setTasks(response.data));
  }, []);

  const addTask = () => {
    if (!taskText.trim()) return;
    axios.post(API_URL, { text: taskText, createdAt: new Date() }).then((response) => {
      setTasks([...tasks, response.data]);
      setTaskText("");
    });
  };

  const updateTask = (id, updates) => {
    axios.put(`${API_URL}/${id}`, updates).then((response) => {
      setTasks(tasks.map((task) => (task._id === id ? response.data : task)));
    });
  };

  const deleteTask = (id) => {
    axios.delete(`${API_URL}/${id}`).then(() => {
      setTasks(tasks.filter((task) => task._id !== id));
    });
  };

  const moveTask = (fromIndex, toIndex) => {
    const updatedTasks = [...tasks];
    const [movedTask] = updatedTasks.splice(fromIndex, 1);
    updatedTasks.splice(toIndex, 0, movedTask);
    setTasks(updatedTasks);
  };

  return (
    <DndProvider backend={HTML5Backend} >
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-indigo-500">
        <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-xl" >
          <h1 className="text-xl font-bold text-center text-gray-700">Todo App</h1>
          <div className="flex mt-4">
            <input
              type="text"
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
              className="flex-1 p-2 border rounded-l-lg"
              placeholder="Add a new task..."
              style={{background: "linear-gradient(135deg, rgb(59, 130, 246), rgb(147, 51, 234), rgb(236, 72, 153))",color:"whitesmoke"}}
            />
            <button onClick={addTask} className="bg-blue-500 text-white p-2 rounded-r-lg">
              Add
            </button>
          </div>
          <div className="mt-4">
            {tasks.map((task, index) => (
              <Task key={task._id} task={task} index={index} moveTask={moveTask} updateTask={updateTask} deleteTask={deleteTask} />
            ))}
          </div>
        </div>
      </div>
    </DndProvider>
  );
}

export default App;

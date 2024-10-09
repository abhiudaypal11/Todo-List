"use client";
import React, { useState } from "react";
import "./globals.css";

const Page = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [mainTask, setMainTask] = useState([]);

  const submitHandler = (e) => {
    e.preventDefault();
    setMainTask([...mainTask, { title, desc, done: false }]);
    setTitle("");
    setDesc("");
  };

  const deleteHandler = (i) => {
    const updatedTasks = mainTask.filter((_, index) => index !== i);
    setMainTask(updatedTasks);
  };

  const toggleDoneHandler = (i) => {
    const updatedTasks = mainTask.map((task, index) =>
      index === i ? { ...task, done: !task.done } : task
    );
    setMainTask(updatedTasks);
  };

  let renderTask = (
    <h2 className="text-xl text-gray-500 text-center">No Task Available</h2>
  );
  if (mainTask.length > 0) {
    renderTask = mainTask.map((t, i) => (
      <li
        key={i}
        className={`flex items-center justify-between mb-6 p-4 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl ${
          t.done ? "bg-green-100" : "bg-red-100"
        }`}
      >
        <div className="w-3/4">
          <h5 className="text-xl font-bold text-gray-800">{t.title}</h5>
          <h6 className="text-md text-gray-600">{t.desc}</h6>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => toggleDoneHandler(i)}
            className={`px-4 py-2 rounded font-bold text-white transition duration-300 ${
              t.done ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"
            }`}
          >
            {t.done ? "Undo" : "Done"}
          </button>
          <button
            onClick={() => deleteHandler(i)}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded font-bold transition duration-300"
          >
            Delete
          </button>
        </div>
      </li>
    ));
  }

  return (
    <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-2xl max-w-3xl w-full">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
          My To Do List
        </h1>
        <form onSubmit={submitHandler} className="space-y-6">
          <input
            type="text"
            className="block w-full text-lg p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            className="block w-full text-lg p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <button
            type="submit"
            className="w-full text-lg font-semibold text-white bg-indigo-500 hover:bg-indigo-600 px-4 py-3 rounded-lg shadow-md transition duration-300"
          >
            Add Task
          </button>
        </form>
        <hr className="my-8 border-gray-200" />
        <ul className="space-y-6">{renderTask}</ul>
      </div>
    </div>
  );
};

export default Page;

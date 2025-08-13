import React, { useState } from "react";
import FormPreview from "../components/PreviewForm";
import ComprehensionEditor from "../components/ComprehensiveEditor";
import ClozeEditor from "../components/ClozeEditor";
import axios from "axios";
import { useNavigate } from "react-router";
import { FaChevronLeft } from "react-icons/fa";






export default function CreateForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [headerImage, setHeaderImage] = useState("");
  const [questions, setQuestions] = useState([]);
  const [isPreview,setIsPreview] =useState(false)

  const navigation=useNavigate()

  const addQuestion = (type) => {
    setQuestions([
      ...questions,
      {
        id: Date.now(),
        type,
        title: "",
        description: "",
        imageUrl: "",
        payload:
          type === "categorize"
            ? { categories: [""], items: [{ text: "", category: "" }] }
            : type === "cloze"
            ? { text: "", options: [] }
            : type === "comprehension"
            ? { passage: "", questions: [] }
            : {}
      }
    ]);
  };

  const updateQuestion = (id, updated) => {
    setQuestions(questions.map((q) => (q.id === id ? { ...q, ...updated } : q)));
  };

  const updateCategorizeField = (id, field, value) => {
    setQuestions(
      questions.map((q) =>
        q.id === id ? { ...q, payload: { ...q.payload, [field]: value } } : q
      )
    );
  };

  const removeQuestion = (id) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

const handleSubmit = async () => {
  try {
    const token = localStorage.getItem("token");
    const formData = { title, description, headerImage, questions };

    const res = await axios.post(`${import.meta.env.VITE_API_Server}/api/forms/`,formData, {
      headers: {
        "Authorization": `Bearer ${token}`
      },
    });
    if(res.status===200){
      console.log("Form saved:", res.data);
      navigation('/forms')
    }
  } catch (err) {
    console.error(err);
    alert("Error saving form");
  }
};


  return (
    <>
    {isPreview ?
      <div className="max-w-6xl mx-auto p-6 w-full max-h-screen overflow-y-auto space-y-6 text-white">
        <div className="flex justify-between"><h1 className="text-3xl font-bold">Form Preview</h1> 
        <button className="bg-gray-500 p-2 rounded" onClick={()=>{
          setIsPreview(false)
        }}>Back to Edit</button>
        </div>
      <div className="bg-gray-800 p-4 rounded-lg ">
          <FormPreview formData={{ title, description, headerImage, questions }} />
     </div>
     </div>
    :<div className="bg-gray-900 text-white min-h-screen">
      <div className="max-w-6xl mx-auto p-6 max-h-screen overflow-y-auto space-y-6">
        <div className="flex justify-between"><h1 className="text-3xl font-bold items-center gap-2 flex"><FaChevronLeft style={{cursor:'pointer'}} onClick={()=>{
          navigation('/forms')
        }} className="text-md"/> Create Form</h1> 
        <button className="bg-gray-500 p-2 rounded" onClick={()=>{
          setIsPreview(true)
        }}>Preview</button>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">Form Details</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Form Title</label>
              <input
                className="w-full border border-gray-700 bg-gray-900 p-3 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter form title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium mb-1">Description (optional)</label>
              <textarea
                className="w-full border border-gray-700 bg-gray-900 p-3 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter form description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>

            {/* Header image URL */}
            <div>
              <label className="block text-sm font-medium mb-1">Header Image URL (optional)</label>
              <input
                className="w-full border border-gray-700 bg-gray-900 p-3 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter image URL"
                value={headerImage}
                onChange={(e) => setHeaderImage(e.target.value)}
              />
            </div>

            {headerImage && (
              <img
                src={headerImage}
                alt="Header Preview"
                className="w-full h-48 object-cover rounded-lg shadow-lg"
              />
            )}
          </div>
        </div>

        {/* Question list */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Questions</h2>
            
          </div>

          {questions.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p className="mb-4">No questions added yet</p>
              <p>Click on the buttons above to add your first question</p>
            </div>
          ) : (
            questions.map((q) => (
              <div
                key={q.id}
                className="bg-gray-800 border border-gray-700 p-6 rounded-lg shadow-md space-y-4"
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-lg">
                    {q.type.charAt(0).toUpperCase() + q.type.slice(1)} Question
                  </h3>
                  <button
                    className="text-red-500 hover:text-red-400 text-sm flex items-center gap-1"
                    onClick={() => removeQuestion(q.id)}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      ></path>
                    </svg>
                    Remove
                  </button>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Question Title
                    </label>
                    <input
                      className="w-full border border-gray-700 bg-gray-900 p-2 rounded-lg text-white placeholder-gray-400"
                      placeholder="Enter question title"
                      value={q.title}
                      onChange={(e) => updateQuestion(q.id, { title: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Description (Optional)
                    </label>
                    <textarea
                      className="w-full border border-gray-700 bg-gray-900 p-2 rounded-lg text-white placeholder-gray-400"
                      placeholder="Enter description"
                      value={q.description}
                      onChange={(e) =>
                        updateQuestion(q.id, { description: e.target.value })
                      }
                      rows={2}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Image URL (Optional)
                    </label>
                    <input
                      className="w-full border border-gray-700 bg-gray-900 p-2 rounded-lg text-white placeholder-gray-400"
                      placeholder="Enter image URL"
                      value={q.imageUrl}
                      onChange={(e) => updateQuestion(q.id, { imageUrl: e.target.value })}
                    />
                    {q.imageUrl && (
                      <img
                        src={q.imageUrl}
                        alt="Preview"
                        className="w-full h-32 object-contain rounded-lg shadow mt-2 bg-gray-900"
                      />
                    )}
                  </div>
                </div>

                {q.type === "categorize" && (
                  <div className="space-y-3 border-t border-gray-700 pt-3">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Categories
                      </label>
                      {q.payload.categories.map((cat, i) => (
                        <div key={i} className="flex gap-2 mb-2">
                          <input
                            className="w-full border border-gray-700 bg-gray-900 p-2 rounded-lg text-white placeholder-gray-400"
                            placeholder={`Category ${i + 1}`}
                            value={cat}
                            onChange={(e) => {
                              const newCategories = [...q.payload.categories];
                              newCategories[i] = e.target.value;
                              updateCategorizeField(q.id, "categories", newCategories);
                            }}
                          />
                          {q.payload.categories.length > 1 && (
                            <button
                              className="bg-red-600 px-3 rounded text-sm hover:bg-red-700"
                              onClick={() => {
                                const newCategories = [...q.payload.categories];
                                newCategories.splice(i, 1);
                                updateCategorizeField(q.id, "categories", newCategories);
                              }}
                            >
                              ×
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        className="bg-blue-600 px-3 py-1 rounded text-sm hover:bg-blue-700"
                        onClick={() =>
                          updateCategorizeField(q.id, "categories", [
                            ...q.payload.categories,
                            ""
                          ])
                        }
                      >
                        + Add Category
                      </button>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Items
                      </label>
                      {q.payload.items.map((item, i) => (
                        <div
                          key={i}
                          className="flex gap-2 mb-2 items-center flex-wrap"
                        >
                          <input
                            className="flex-1 border border-gray-700 bg-gray-900 p-2 rounded-lg text-white placeholder-gray-400"
                            placeholder={`Item ${i + 1}`}
                            value={item.text}
                            onChange={(e) => {
                              const newItems = [...q.payload.items];
                              newItems[i].text = e.target.value;
                              updateCategorizeField(q.id, "items", newItems);
                            }}
                          />
                          <select
                            className="border border-gray-700 bg-gray-900 p-2 rounded-lg text-white"
                            value={item.category}
                            onChange={(e) => {
                              const newItems = [...q.payload.items];
                              newItems[i].category = e.target.value;
                              updateCategorizeField(q.id, "items", newItems);
                            }}
                          >
                            <option value="">Select category</option>
                            {q.payload.categories.map((cat, idx) => (
                              <option key={idx} value={cat}>
                                {cat}
                              </option>
                            ))}
                          </select>
                          {q.payload.items.length > 1 && (
                            <button
                              className="bg-red-600 px-3 rounded text-sm hover:bg-red-700"
                              onClick={() => {
                                const newItems = [...q.payload.items];
                                newItems.splice(i, 1);
                                updateCategorizeField(q.id, "items", newItems);
                              }}
                            >
                              ×
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        className="bg-green-600 px-3 py-1 rounded text-sm hover:bg-green-700"
                        onClick={() =>
                          updateCategorizeField(q.id, "items", [
                            ...q.payload.items,
                            { text: "", category: "" }
                          ])
                        }
                      >
                        + Add Item
                      </button>
                    </div>
                  </div>
                )}

                {q.type === "cloze" && (
                  <ClozeEditor 
                    payload={q.payload} 
                    onChange={(newPayload) => 
                      updateQuestion(q.id, { payload: newPayload })
                    }
                  />
                )}

                {q.type === "comprehension" && (
                  <ComprehensionEditor
                    payload={q.payload}
                    onChange={(newPayload) =>
                      updateQuestion(q.id, { payload: newPayload })
                    }
                  />
                )}
              </div>
            ))
          )}
        </div>

        <div className="flex flex-wrap gap-2 mb-10">
              <button
                onClick={() => addQuestion("categorize")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg flex items-center gap-2"
              >
                <span>+</span>
                <span>Categorize</span>
              </button>
              <button
                onClick={() => addQuestion("cloze")}
                className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg flex items-center gap-2"
              >
                <span>+</span>
                <span>Cloze</span>
              </button>
              <button
                onClick={() => addQuestion("comprehension")}
                className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-lg flex items-center gap-2"
              >
                <span>+</span>
                <span>Comprehension</span>
              </button>
            </div>

        <div className=" bg-gray-900 py-4 border-t border-gray-800 sm:sticky  sm:bottom-10">
          <button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 text-lg font-semibold shadow-lg"
          >
            Save Form
          </button>
        </div>
      </div>
    </div>}
    </>
  );
}
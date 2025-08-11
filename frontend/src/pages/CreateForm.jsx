import React, { useState } from "react";

// Preview Component
const FormPreview = ({ formData }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      {formData.headerImage && (
        <img
          src={formData.headerImage}
          alt="Form header"
          className="w-full h-48 object-cover mb-4 rounded"
        />
      )}

      <h1 className="text-2xl font-bold mb-2">{formData.title}</h1>
      {formData.description && (
        <p className="text-gray-300 mb-6">{formData.description}</p>
      )}

      <div className="space-y-4">
        {formData.questions.map((q, index) => (
          <div key={q.id} className="bg-gray-700 p-4 rounded-lg">
            <div className="flex gap-2 mb-2">
              <span className="font-semibold">Q{index + 1}:</span>
              <h3 className="font-medium">{q.title || "Untitled Question"}</h3>
            </div>
            
            {q.description && (
              <p className="text-gray-300 text-sm mb-3">{q.description}</p>
            )}
            
            {q.imageUrl && (
              <img
                src={q.imageUrl}
                alt="Question illustration"
                className="w-full h-40 object-contain mb-3 bg-gray-800 rounded"
              />
            )}

            {/* Categorize Preview */}
            {q.type === "categorize" && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 mb-3">
                  {q.payload.categories.map((cat) => (
                    <div
                      key={cat}
                      className="bg-gray-600 px-3 py-1 rounded-md"
                    >
                      {cat}
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  {q.payload.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="bg-gray-600 px-3 py-1 rounded-md flex-1">
                        {item.text || "Item " + (i + 1)}
                      </div>
                      <select
                        className="bg-gray-900 border border-gray-600 rounded-md px-2 py-1"
                        defaultValue={item.category}
                      >
                        {q.payload.categories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Cloze Preview */}
            {q.type === "cloze" && (
              <div className="bg-gray-900 p-3 rounded-md">
                {q.payload.text.split(/({{.*?}})/g).map((part, i) =>
                  part.startsWith("{{") && part.endsWith("}}") ? (
                    <input
                      key={i}
                      type="text"
                      className="inline-block w-24 mx-1 border-b-2 border-gray-500 bg-transparent focus:outline-none"
                      placeholder="______"
                    />
                  ) : (
                    <span key={i}>{part}</span>
                  )
                )}
              </div>
            )}

            {/* Comprehension Preview */}
            {q.type === "comprehension" && (
              <div className="space-y-4">
                <div className="bg-gray-900 p-3 rounded-md">
                  {q.payload.passage || "Reading passage goes here..."}
                </div>
                <div className="space-y-3">
                  {q.payload.questions.map((qa, i) => (
                    <div key={i} className="space-y-1">
                      <p className="font-medium">
                        {i + 1}. {qa.question || "Question " + (i + 1)}
                      </p>
                      <input
                        type="text"
                        className="w-full bg-gray-900 border border-gray-600 rounded-md px-3 py-1"
                        placeholder="Your answer"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default function CreateForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [headerImage, setHeaderImage] = useState("");
  const [questions, setQuestions] = useState([]);

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
    const formData = { title, description, headerImage, questions };
    const res = await fetch("/api/forms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });
    if (res.ok) {
      alert("Form saved!");
      setTitle("");
      setDescription("");
      setHeaderImage("");
      setQuestions([]);
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="max-w-6xl mx-auto p-6 max-h-screen overflow-y-auto space-y-6">
        <h1 className="text-3xl font-bold">Create New Form</h1>

        {/* Title */}
        <input
          className="w-full border border-gray-700 bg-gray-800 p-3 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Form title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Description */}
        <textarea
          className="w-full border border-gray-700 bg-gray-800 p-3 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Form description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* Header image URL */}
        <input
          className="w-full border border-gray-700 bg-gray-800 p-3 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Header image URL"
          value={headerImage}
          onChange={(e) => setHeaderImage(e.target.value)}
        />

        {headerImage && (
          <img
            src={headerImage}
            alt="Header Preview"
            className="w-full h-48 object-cover rounded-lg shadow-lg"
          />
        )}

        {/* Question list */}
        <div className="space-y-4">
          {questions.map((q) => (
            <div
              key={q.id}
              className="bg-gray-800 border border-gray-700 p-4 rounded-lg shadow-md space-y-3"
            >
              <input
                className="w-full border border-gray-700 bg-gray-900 p-2 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Question title"
                value={q.title}
                onChange={(e) => updateQuestion(q.id, { title: e.target.value })}
              />

              <textarea
                className="w-full border border-gray-700 bg-gray-900 p-2 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Question description"
                value={q.description}
                onChange={(e) =>
                  updateQuestion(q.id, { description: e.target.value })
                }
              />

              <input
                className="w-full border border-gray-700 bg-gray-900 p-2 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Question image URL"
                value={q.imageUrl}
                onChange={(e) => updateQuestion(q.id, { imageUrl: e.target.value })}
              />
              {q.imageUrl && (
                <img
                  src={q.imageUrl}
                  alt="Preview"
                  className="w-full h-32 object-cover rounded-lg shadow"
                />
              )}

              <p className="text-sm text-gray-400">Type: {q.type}</p>

              {/* Categorize type extra fields */}
              {q.type === "categorize" && (
                <div className="space-y-3 border-t border-gray-700 pt-3">
                  {/* Categories */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Categories
                    </label>
                    {q.payload.categories.map((cat, i) => (
                      <input
                        key={i}
                        className="w-full border border-gray-700 bg-gray-900 p-2 rounded-lg text-white placeholder-gray-400 mb-2"
                        placeholder={`Category ${i + 1}`}
                        value={cat}
                        onChange={(e) => {
                          const newCategories = [...q.payload.categories];
                          newCategories[i] = e.target.value;
                          updateCategorizeField(q.id, "categories", newCategories);
                        }}
                      />
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

                  {/* Items */}
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

              <button
                className="text-red-400 text-sm mt-2 hover:underline"
                onClick={() => removeQuestion(q.id)}
              >
                Remove question
              </button>
            </div>
          ))}
        </div>

        {/* Add question buttons */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => addQuestion("categorize")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg"
          >
            + Categorize
          </button>
          <button
            onClick={() => addQuestion("cloze")}
            className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg"
          >
            + Cloze
          </button>
          <button
            onClick={() => addQuestion("comprehension")}
            className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-lg"
          >
            + Comprehension
          </button>
        </div>

        {/* Save button */}
        <button
          onClick={handleSubmit}
          className="bg-white text-black px-5 py-2 rounded-lg hover:bg-gray-200"
        >
          Save Form
        </button>
      </div>
    </div>
  );
}

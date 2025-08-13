import React, { useState } from "react";

export default function FormPreview({ formData }) {
  const [categorizeAnswers, setCategorizeAnswers] = useState({});
  const [clozeAnswers, setClozeAnswers] = useState({});
  const [dragData, setDragData] = useState(null);

  const handleDragStart = (data) => {
    setDragData(data);
  };

  const handleDropCategorize = (catName) => {
    if (!dragData) return;
    setCategorizeAnswers((prev) => ({
      ...prev,
      [dragData.itemIndex]: catName
    }));
    setDragData(null);
  };

  const handleDropCloze = (blankIndex) => {
    if (!dragData) return;
    setClozeAnswers((prev) => ({
      ...prev,
      [blankIndex]: dragData.word
    }));
    setDragData(null);
  };

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

            {q.type === "categorize" && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-4">
                  {q.payload.categories.map((cat) => (
                    <div
                      key={cat}
                      className="flex-1 min-w-[150px] bg-gray-600 p-3 rounded-md"
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDropCategorize(cat)}
                    >
                      <p className="font-semibold mb-2">{cat}</p>
                      {Object.entries(categorizeAnswers)
                        .filter(([_, assignedCat]) => assignedCat === cat)
                        .map(([itemIndex]) => (
                          <div
                            key={itemIndex}
                            className="bg-gray-800 px-3 py-1 rounded-md mb-1"
                          >
                            {q.payload.items[itemIndex].text}
                          </div>
                        ))}
                    </div>
                  ))}
                </div>

                {/* Items Pool */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {q.payload.items.map((item, i) =>
                    categorizeAnswers[i] ? null : (
                      <div
                        key={i}
                        draggable
                        onDragStart={() =>
                          handleDragStart({ type: "categorize", itemIndex: i })
                        }
                        className="bg-gray-500 px-3 py-1 rounded-md cursor-move"
                      >
                        {item.text}
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

            {q.type === "cloze" && (
              <div className="space-y-3">
                <div className="bg-gray-900 p-3 rounded-md flex flex-wrap gap-1">
                  {q.payload.text.split(/({{.*?}})/g).map((part, i) =>
                    part.startsWith("{{") && part.endsWith("}}") ? (
                      <span
                        key={i}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => handleDropCloze(i)}
                        className="inline-block min-w-[80px] border-b-2 border-gray-500 bg-gray-800 rounded px-2 py-1 text-center"
                      >
                        {clozeAnswers[i] || "______"}
                      </span>
                    ) : (
                      <span key={i}>{part}</span>
                    )
                  )}
                </div>

                {q.payload.options?.length > 0 && (
                  <div className="bg-gray-800 p-3 rounded-md">
                    <p className="text-sm text-gray-300 mb-2">Word Bank:</p>
                    <div className="flex flex-wrap gap-2">
                      {q.payload.options.map((opt, idx) =>
                        Object.values(clozeAnswers).includes(opt) ? null : (
                          <span
                            key={idx}
                            draggable
                            onDragStart={() =>
                              handleDragStart({ type: "cloze", word: opt })
                            }
                            className="bg-gray-700 px-2 py-1 rounded text-sm cursor-move"
                          >
                            {opt}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {q.type === "comprehension" && (
              <div className="space-y-4">
                <div className="bg-gray-900 p-4 rounded-md mb-4">
                  <p className="font-medium mb-2">Read the passage below:</p>
                  <div className="bg-gray-800 p-3 rounded">
                    {q.payload.passage || "Reading passage goes here..."}
                  </div>
                </div>

                <div className="space-y-4">
                  {q.payload.questions.map((sq, idx) => (
                    <div key={sq.id} className="bg-gray-800 p-4 rounded-md">
                      <div className="flex justify-between items-start mb-3">
                        <p className="font-medium">
                          {idx + 1}. {sq.text || "Question " + (idx + 1)}
                        </p>
                        <span className="text-sm bg-gray-700 px-2 py-1 rounded">
                          {sq.points} point{sq.points !== 1 ? "s" : ""}
                        </span>
                      </div>

                      {sq.type === "mcq" && (
                        <div className="space-y-2">
                          {sq.options.map((opt, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <input
                                type="radio"
                                name={`q${index}-sq${idx}`}
                                className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600"
                              />
                              <label>{opt.text || `Option ${i + 1}`}</label>
                            </div>
                          ))}
                        </div>
                      )}

                      {sq.type === "mcq-multiple" && (
                        <div className="space-y-2">
                          {sq.options.map((opt, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                name={`q${index}-sq${idx}-${i}`}
                                className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded"
                              />
                              <label>{opt.text || `Option ${i + 1}`}</label>
                            </div>
                          ))}
                        </div>
                      )}

                      {sq.type === "short-text" && (
                        <input
                          type="text"
                          className="w-full bg-gray-900 border border-gray-600 rounded-md px-3 py-2"
                          placeholder="Type your answer here..."
                        />
                      )}
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
}

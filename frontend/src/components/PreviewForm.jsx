export default function FormPreview ({ formData }){
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
              <div className="space-y-3">
                <div className="bg-gray-900 p-3 rounded-md">
                  {q.payload.text.split(/({{.*?}})/g).map((part, i) =>
                    part.startsWith("{{") && part.endsWith("}}") ? (
                      <select
                        key={i}
                        className="inline-block mx-1 border-b-2 border-gray-500 bg-gray-800 rounded px-2 py-1"
                      >
                        <option value="">______</option>
                        {q.payload.options?.map((opt, idx) => (
                          <option key={idx} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <span key={i}>{part}</span>
                    )
                  )}
                </div>
                {q.payload.options?.length > 0 && (
                  <div className="bg-gray-800 p-3 rounded-md">
                    <p className="text-sm text-gray-300 mb-2">Word Bank:</p>
                    <div className="flex flex-wrap gap-2">
                      {q.payload.options.map((opt, idx) => (
                        <span key={idx} className="bg-gray-700 px-2 py-1 rounded text-sm">
                          {opt}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Comprehension Preview */}
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
};
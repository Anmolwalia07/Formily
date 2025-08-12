export default function ComprehensionEditor ({ payload, onChange }) {
  const addSubQuestion = (type) => {
    const newQuestions = [
      ...payload.questions,
      {
        id: Date.now(),
        type: type || "mcq",
        text: "",
        points: 1,
        index: payload.questions.length + 1,
        options: type === "short-text" ? [] : [
          { id: Date.now(), text: "", correct: false },
          { id: Date.now() + 1, text: "", correct: false }
        ]
      }
    ];
    onChange({ ...payload, questions: newQuestions });
  };

  const updateSubQuestion = (id, updated) => {
    const newQuestions = payload.questions.map((q) =>
      q.id === id ? { ...q, ...updated } : q
    );
    onChange({ ...payload, questions: newQuestions });
  };

  const removeSubQuestion = (id) => {
    const newQuestions = payload.questions
      .filter((q) => q.id !== id)
      .map((q, idx) => ({ ...q, index: idx + 1 }));
    onChange({ ...payload, questions: newQuestions });
  };

  return (
    <div className="space-y-3 border-t border-gray-700 pt-3">
      <div>
        <label className="block text-sm font-medium mb-1">
          Passage
        </label>
        <textarea
          className="w-full border border-gray-700 bg-gray-900 p-2 rounded-lg text-white placeholder-gray-400"
          value={payload.passage || ""}
          onChange={(e) => onChange({ ...payload, passage: e.target.value })}
          rows={4}
          placeholder="Enter reading passage here..."
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">
          Sub-questions
        </label>
        
        {payload.questions.length === 0 ? (
          <div className="text-center py-6 text-gray-500">
            No sub-questions added yet
          </div>
        ) : (
          <div className="space-y-3">
            {payload.questions.map((q) => (
              <SubQuestionEditor
                key={q.id}
                question={q}
                onChange={(updated) => updateSubQuestion(q.id, updated)}
                onRemove={() => removeSubQuestion(q.id)}
              />
            ))}
          </div>
        )}
      </div>
      
      <div className="flex flex-wrap gap-2">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
          onClick={() => addSubQuestion("mcq")}
        >
          + Add MCQ
        </button>
        <button
          className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-sm"
          onClick={() => addSubQuestion("mcq-multiple")}
        >
          + Add MCA
        </button>
        <button
          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
          onClick={() => addSubQuestion("short-text")}
        >
          + Add Short Answer
        </button>
      </div>
    </div>
  );
};


const SubQuestionEditor = ({ question, onChange, onRemove }) => {
  const [newOption, setNewOption] = useState("");

  const handleOptionChange = (index, value) => {
    const newOptions = [...question.options];
    newOptions[index].text = value;
    onChange({ ...question, options: newOptions });
  };

  const addOption = () => {
    if (newOption.trim()) {
      onChange({
        ...question,
        options: [...question.options, { id: Date.now(), text: newOption }]
      });
      setNewOption("");
    }
  };

  const removeOption = (index) => {
    const newOptions = [...question.options];
    newOptions.splice(index, 1);
    onChange({ ...question, options: newOptions });
  };

  const toggleCorrect = (index) => {
    const newOptions = [...question.options];
    newOptions[index].correct = !newOptions[index].correct;
    onChange({ ...question, options: newOptions });
  };

  return (
    <div className="border border-gray-700 p-4 rounded-lg bg-gray-800 mb-4">
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-medium">Sub-question {question.index}</h4>
        <button
          className="text-red-500 text-sm hover:text-red-400"
          onClick={onRemove}
        >
          Remove
        </button>
      </div>
      
      <div className="flex items-center gap-3 mb-3">
        <label className="text-sm">Type:</label>
        <select
          className="bg-gray-900 border border-gray-700 rounded px-2 py-1 text-sm"
          value={question.type}
          onChange={(e) => onChange({ ...question, type: e.target.value })}
        >
          <option value="mcq">MCQ (Single Answer)</option>
          <option value="mcq-multiple">MCA (Multiple Answers)</option>
          <option value="short-text">Short Text Answer</option>
        </select>
        
        <div className="flex items-center gap-2 ml-4">
          <label className="text-sm">Points:</label>
          <input
            type="number"
            min="1"
            className="w-16 bg-gray-900 border border-gray-700 rounded px-2 py-1 text-sm"
            value={question.points}
            onChange={(e) => onChange({ ...question, points: parseInt(e.target.value) || 1 })}
          />
        </div>
      </div>
      
      <textarea
        className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-sm mb-3"
        placeholder="Question text"
        value={question.text}
        onChange={(e) => onChange({ ...question, text: e.target.value })}
        rows={2}
      />
      
      {(question.type === "mcq" || question.type === "mcq-multiple") && (
        <div className="space-y-2">
          <p className="text-sm text-gray-400">Options:</p>
          {question.options.map((opt, idx) => (
            <div key={opt.id} className="flex items-center gap-2">
              <button
                className={`w-5 h-5 rounded-full flex items-center justify-center ${
                  opt.correct
                    ? "bg-green-500"
                    : "bg-gray-700 border border-gray-600"
                }`}
                onClick={() => toggleCorrect(idx)}
              >
                {opt.correct && (
                  <svg
                    className="w-3 h-3 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                )}
              </button>
              <input
                type="text"
                className="flex-1 bg-gray-900 border border-gray-700 rounded px-2 py-1 text-sm"
                value={opt.text}
                onChange={(e) => handleOptionChange(idx, e.target.value)}
              />
              <button
                className="text-red-500 hover:text-red-400"
                onClick={() => removeOption(idx)}
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
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
          ))}
          
          <div className="flex gap-2 mt-2">
            <input
              type="text"
              className="flex-1 bg-gray-900 border border-gray-700 rounded px-2 py-1 text-sm"
              placeholder="New option"
              value={newOption}
              onChange={(e) => setNewOption(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addOption()}
            />
            <button
              className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded text-sm"
              onClick={addOption}
            >
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
import { useState } from "react";

export default function ClozeEditor ({ payload, onChange }){
  const [newDistractor, setNewDistractor] = useState('');

  const extractBlanks = (text) => {
    const regex = /{{(.*?)}}/g;
    const blanks = new Set();
    let match;
    while ((match = regex.exec(text)) !== null) {
      blanks.add(match[1].trim());
    }
    return Array.from(blanks);
  };

  const handleTextChange = (e) => {
    const newText = e.target.value;
    const newBlanks = extractBlanks(newText);
    
    // Preserve existing distractors
    const currentOptions = payload.options || [];
    const distractors = currentOptions.filter(opt => !newBlanks.includes(opt));
    
    onChange({ 
      ...payload, 
      text: newText, 
      options: [...newBlanks, ...distractors] 
    });
  };

  // Add new distractor
  const addDistractor = () => {
    const distractor = newDistractor.trim();
    if (distractor && !payload.options.includes(distractor)) {
      onChange({
        ...payload,
        options: [...payload.options, distractor]
      });
      setNewDistractor('');
    }
  };

  // Remove option
  const removeOption = (index) => {
    const newOptions = [...payload.options];
    newOptions.splice(index, 1);
    onChange({ ...payload, options: newOptions });
  };

  // Move option position
  const moveOption = (index, direction) => {
    const newOptions = [...payload.options];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (newIndex >= 0 && newIndex < newOptions.length) {
      [newOptions[index], newOptions[newIndex]] = 
      [newOptions[newIndex], newOptions[index]];
      onChange({ ...payload, options: newOptions });
    }
  };

  return (
    <div className="space-y-3 border-t border-gray-700 pt-3">
      <div>
        <label className="block text-sm font-medium mb-1">
          Passage (use &#123;&#123; &#125;&#125; to mark blanks)
        </label>
        <textarea
          className="w-full border border-gray-700 bg-gray-900 p-2 rounded-lg text-white placeholder-gray-400"
          value={payload.text || ""}
          onChange={handleTextChange}
          rows={3}
          placeholder="The {{boy}} under the {{table}}"
        />
        <p className="text-xs text-gray-500 mt-1">
          Wrap keywords in double curly braces:
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Options & Distractors
        </label>
        <div className="mb-2">
          <span className="text-xs text-gray-500">
            Blanks detected: {extractBlanks(payload.text || "").join(", ")}
          </span>
        </div>
        <ul className="space-y-2">
          {payload.options?.map((option, index) => {
            const isBlank = extractBlanks(payload.text || "").includes(option);
            return (
              <li key={index} className="flex items-center gap-2">
                <span className={`flex-1 p-2 rounded ${
                  isBlank ? "bg-green-900/30" : "bg-gray-700"
                }`}>
                  {option}
                  {isBlank && (
                    <span className="ml-2 text-xs text-green-400">
                      (Blank)
                    </span>
                  )}
                </span>
                <button
                  className="text-red-400 hover:text-red-300"
                  onClick={() => removeOption(index)}
                >
                  Remove
                </button>
                <button
                  className="text-gray-400 hover:text-white disabled:opacity-50"
                  disabled={index === 0}
                  onClick={() => moveOption(index, 'up')}
                >
                  ↑
                </button>
                <button
                  className="text-gray-400 hover:text-white disabled:opacity-50"
                  disabled={index === payload.options.length - 1}
                  onClick={() => moveOption(index, 'down')}
                >
                  ↓
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="flex gap-2">
        <input
          className="flex-1 border border-gray-700 bg-gray-900 p-2 rounded-lg text-white placeholder-gray-400"
          placeholder="Add wrong answer/distractor"
          value={newDistractor}
          onChange={(e) => setNewDistractor(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addDistractor()}
        />
        <button
          className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg"
          onClick={addDistractor}
        >
          Add Distractor
        </button>
      </div>
    </div>
  );
};

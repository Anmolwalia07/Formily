import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import FormPreview from "../components/PreviewForm";
import { useUser } from "../UserContext";

export default function SpecificForm() {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const navigation = useNavigate();
  const { user } = useUser();
  const userId = user.id;
  const token=localStorage.getItem("token")

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_Server}/api/forms/${id}`,{
             headers:{
                Authorization:`Bearer ${token}`
            }
          }
        );
        setForm(res.data);
        setLoading(false);

        const initialAnswers = {};
        res.data.questions.forEach((question) => {
          if (question.type === "comprehension") {
            initialAnswers[question.id] = {
              passage: question.payload?.passage || "",
              answers: (question.payload?.questions || []).map(() => "")
            };
          } else if (question.type === "categorize") {
            initialAnswers[question.id] = {
              unassigned: question.payload?.items || [],
            };
            question.payload?.categories?.forEach((cat) => {
              initialAnswers[question.id][cat] = [];
            });
          } else if (question.type === "cloze") {
            const blankCount =
              question.payload?.text?.match(/{{.*?}}/g)?.length || 0;
            initialAnswers[question.id] = Array(blankCount).fill("");
          }
        });
        setAnswers(initialAnswers);
      } catch (err) {
        console.error("Error fetching form:", err);
        setLoading(false);
      }
    };
    fetchForm();
  }, [id]);

  const handleAnswerChange = (questionId, value, index) => {
    setAnswers((prev) => {
      if (
        form.questions.find((q) => q.id === questionId)?.type ===
        "comprehension"
      ) {
        const newAnswers = { ...prev[questionId] };
        newAnswers.answers[index] = value;
        return { ...prev, [questionId]: newAnswers };
      } else {
        const newAnswers = [...prev[questionId]];
        newAnswers[index] = value;
        return { ...prev, [questionId]: newAnswers };
      }
    });
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const responseData = {
        formId: id,
        userId: userId,
        answers: answers
      };

 
      const res = await axios.post(
        `${import.meta.env.VITE_API_Server}/api/forms/response`,
        responseData,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        }
      );

      if (res.status === 201) {
        alert("Response submitted successfully!");
        navigation("/forms");
      }
    } catch (err) {
      console.error("Error submitting response:", err);
      alert("Failed to submit response. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="text-white p-6">Loading form...</div>;
  if (!form) return <div className="text-red-500">Form not found</div>;

  const isAuthor = userId === form?.userId;

  return (
    <div className="max-w-6xl mx-auto p-3 w-full max-h-screen overflow-y-auto space-y-6">
      {isAuthor ? (
        <div className="text-white">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Form Preview</h1>
            <button
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition"
              onClick={() => navigation("/forms")}
            >
              Back to Forms
            </button>
          </div>
          <div className="bg-gray-800 rounded-lg shadow-xl ">
            <FormPreview formData={form} />
          </div>
        </div>
      ) : (
        <div className="text-white">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold">{form.title}</h1>
              {form.description && (
                <p className="text-gray-300 mt-2">{form.description}</p>
              )}
            </div>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
              onClick={handleSubmit}
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Submit Response"}
            </button>
          </div>

          <div className="space-y-8">
            {form.questions.map((question, qIndex) => (
              <div
                key={question.id}
                className="bg-gray-800 rounded-lg shadow-lg p-6"
              >
                <div className="flex items-start gap-3 mb-4">
                  <span className="text-xl font-bold text-blue-400">
                    Q{qIndex + 1}
                  </span>
                  <div>
                    <h2 className="text-xl font-semibold">{question.title}</h2>
                    {question.description && (
                      <p className="text-gray-400 mt-1">
                        {question.description}
                      </p>
                    )}
                  </div>
                </div>

                {question.imageUrl && (
                  <div className="mb-6 flex justify-center">
                    <img
                      src={question.imageUrl}
                      alt="Question illustration"
                      className="max-h-60 object-contain rounded-lg"
                    />
                  </div>
                )}

                {question.type === "comprehension" && (
                  <div className="space-y-6">
                    <div className="bg-gray-900 p-4 rounded-lg">
                      <h3 className="text-lg font-medium mb-3">
                        Reading Passage:
                      </h3>
                      <p className="whitespace-pre-line">
                        {String(question.payload?.passage || "")}
                      </p>
                    </div>

                    <div className="space-y-6 mt-6">
                      <h3 className="text-lg font-medium">Questions:</h3>
                      {question.payload?.questions?.map((subQ, sqIndex) => (
                        <div
                          key={sqIndex}
                          className="bg-gray-900 p-4 rounded-lg"
                        >
                          <p className="font-medium mb-3">
                            {sqIndex + 1}. {String(subQ?.text || "")}
                          </p>

                          {subQ?.type === "mcq" && (
                            <div className="space-y-2">
                              {subQ?.options?.map((option, optIndex) => (
                                <label
                                  key={option.id || optIndex}
                                  className="flex items-center gap-3 p-2 hover:bg-gray-800 rounded cursor-pointer"
                                >
                                  <input
                                    type="radio"
                                    name={`subq-${question.id}-${sqIndex}`}
                                    className="w-5 h-5 text-blue-600 bg-gray-700 border-gray-600"
                                    checked={
                                      answers[question.id]?.answers[
                                        sqIndex
                                      ] === option.text
                                    }
                                    onChange={() =>
                                      handleAnswerChange(
                                        question.id,
                                        option.text,
                                        sqIndex
                                      )
                                    }
                                  />
                                  <span>{String(option.text || option)}</span>
                                </label>
                              ))}
                            </div>
                          )}

                          {subQ?.type === "short-text" && (
                            <input
                              type="text"
                              className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2 mt-2"
                              placeholder="Type your answer here..."
                              value={
                                answers[question.id]?.answers[sqIndex] || ""
                              }
                              onChange={(e) =>
                                handleAnswerChange(
                                  question.id,
                                  e.target.value,
                                  sqIndex
                                )
                              }
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {question.type === "categorize" && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {question.payload?.categories?.map((category, catIndex) => (
                        <div
                          key={catIndex}
                          className="bg-gray-900 p-4 rounded-lg min-h-[150px]"
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={(e) => {
                            const itemIndex = e.dataTransfer.getData("itemIndex");
                            const fromCategory = e.dataTransfer.getData("fromCategory");
                            setAnswers((prev) => {
                              const newAnswers = JSON.parse(JSON.stringify(prev));
                              const item = newAnswers[question.id][fromCategory].splice(itemIndex, 1)[0];
                              newAnswers[question.id][category].push(item);
                              return newAnswers;
                            });
                          }}
                        >
                          <h3 className="text-lg font-medium mb-3">{category}</h3>
                          {answers[question.id]?.[category]?.map((item, index) => (
                            <div
                              key={index}
                              draggable
                              onDragStart={(e) => {
                                e.dataTransfer.setData("itemIndex", index);
                                e.dataTransfer.setData("fromCategory", category);
                              }}
                              className="bg-blue-900/50 px-4 py-2 rounded-lg mb-2 cursor-move"
                            >
                              {typeof item === "string" ? item : String(item?.text || item)}
                            </div>
                          ))}
                        </div>
                      ))}

                      <div
                        className="bg-gray-800 p-4 rounded-lg min-h-[150px] border"
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                          const itemIndex = e.dataTransfer.getData("itemIndex");
                          const fromCategory = e.dataTransfer.getData("fromCategory");
                          setAnswers((prev) => {
                            const newAnswers = JSON.parse(JSON.stringify(prev));
                            const item = newAnswers[question.id][fromCategory].splice(itemIndex, 1)[0];
                            newAnswers[question.id]["unassigned"].push(item);
                            return newAnswers;
                          });
                        }}
                      >
                        <h3 className="text-lg font-medium mb-3">Options</h3>
                        {answers[question.id]?.unassigned?.map((item, index) => (
                          <div
                            key={index}
                            draggable
                            onDragStart={(e) => {
                              e.dataTransfer.setData("itemIndex", index);
                              e.dataTransfer.setData("fromCategory", "unassigned");
                            }}
                            className="bg-gray-700 px-4 py-2 rounded-lg mb-2 cursor-move"
                          >
                            {typeof item === "string" ? item : String(item?.text || item)}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {question.type === "cloze" && (
                <div className="space-y-6">
                    <div className="bg-gray-900 p-4 rounded-lg">
                    <h3 className="text-lg font-medium mb-3">Fill in the blanks:</h3>
                    <div className="text-lg leading-relaxed flex flex-wrap items-center">
                        {question.payload?.text
                        ?.split(/({{.*?}})/g)
                        .map((part, partIndex) => {
                            if (part.startsWith("{{") && part.endsWith("}}")) {
                            const blankIndex = Math.floor(partIndex / 2);
                            const blankValue = answers[question.id][blankIndex] || "";

                            return (
                                <div
                                key={partIndex}
                                onDragOver={(e) => e.preventDefault()}
                               onDrop={(e) => {
                                const draggedWord = e.dataTransfer.getData("word");
                                const fromIndex = e.dataTransfer.getData("wordIndex");

                                setAnswers((prev) => {
                                    const updatedBlanks = [...prev[question.id]];
                                    updatedBlanks[blankIndex] = draggedWord;

                                    const updatedOptions = [...question.payload.options];
                                    updatedOptions.splice(fromIndex, 1);

                                    const updatedForm = { ...form };
                                    updatedForm.questions = updatedForm.questions.map(q =>
                                        q.id === question.id
                                            ? {
                                                ...q,
                                                payload: {
                                                    ...q.payload,
                                                    options: updatedOptions
                                                }
                                            }
                                            : q
                                    );

                                    setForm(updatedForm);

                                    return { ...prev, [question.id]: updatedBlanks };
                                });
                            }}

                                className="min-w-[80px] px-2 py-1 mx-1 bg-gray-800 border border-gray-600 rounded text-center cursor-pointer"
                                >
                                {blankValue || "______"}
                                </div>
                            );
                            } else {
                            return <span key={partIndex}>{String(part)}</span>;
                            }
                        })}
                    </div>
                    </div>

                    <div className="bg-gray-900 p-4 rounded-lg">
                    <h3 className="text-lg font-medium mb-2">Word Bank:</h3>
                    <div className="flex flex-wrap gap-2">
                        {question.payload?.options?.map((option, optIndex) => (
                        <span
                            key={optIndex}
                            draggable
                            onDragStart={(e) => {
                                e.dataTransfer.setData("word", option);
                                e.dataTransfer.setData("wordIndex", optIndex); // so we know which one to remove
                            }}

                            className="bg-blue-900/50 px-3 py-1 rounded-md cursor-move"
                        >
                            {String(option)}
                        </span>
                        ))}
                    </div>
                    </div>
                </div>
                )}

              </div>
            ))}
          </div>

          <div className="sticky bottom-0 bg-gray-900 py-4 border-t border-gray-800 mt-8">
            <div className="flex justify-between items-center">
              <button
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition"
                onClick={() => navigation("/forms")}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition"
                onClick={handleSubmit}
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Submit Response"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

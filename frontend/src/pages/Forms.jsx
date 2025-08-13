import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

export default function Forms() {
  const navigate = useNavigate();
  const [forms, setForms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [formIdInput, setFormIdInput] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    axios
      .get(`${import.meta.env.VITE_API_Server}/api/forms/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data);
        setForms(res.data.forms || []);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching forms:", err);
        setIsLoading(false);
      });
  }, []);

  const filteredForms = forms.filter((form) =>
    form.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 sm:p-8 bg-gray-900 min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-6">Forms</h1>

      <div className="flex flex-wrap gap-3 mb-6 items-center">
        <button
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md shadow"
          onClick={() => {
            navigate("/createform");
          }}
        >
          + New Form
        </button>
        <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md shadow">
          Import Form
        </button>
        <button className="border border-gray-500 text-gray-400 hover:bg-gray-500 hover:text-white px-4 py-2 rounded-md">
          Export Data
        </button>

        <input
          type="text"
          placeholder="Enter Form ID"
          value={formIdInput}
          onChange={(e) => setFormIdInput(e.target.value)}
          className="bg-gray-700 text-white px-3 py-2 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={() => {
            if (formIdInput.trim()) {
              navigate(`/forms/${formIdInput.trim()}`);
            }
          }}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md shadow"
        >
          Fill Form
        </button>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search forms..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="bg-gray-800 shadow-md rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-4">Recent Forms</h2>

        {isLoading ? (
          <p className="text-gray-400">Loading forms...</p>
        ) : filteredForms.length > 0 ? (
          <ul className="space-y-3">
            {filteredForms.map((form) => (
              <div key={form.id}>
                <div
                  className="flex justify-between items-center p-3 bg-gray-700 rounded-md hover:bg-gray-600 transition cursor-pointer"
                  onClick={() => navigate(`/forms/${form.id}`)}
                >
                  <span>{form.title}</span>
                  <span className="text-gray-400 text-sm">
                    Last edited:{" "}
                    {form.updatedAt
                      ? new Date(form.updatedAt).toLocaleDateString()
                      : "N/A"}
                  </span>
                </div>
                <p
                  className="ml-2 mt-1 cursor-pointer underline text-blue-500 overflow-auto"
                  onClick={() => {
                    navigate(`/forms/${form.id}`);
                  }}
                >
                  https://formily.vercel.app/{form.id}
                </p>
              </div>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">No forms found.</p>
        )}
      </div>
    </div>
  );
}

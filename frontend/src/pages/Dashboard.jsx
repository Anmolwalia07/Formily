import { useEffect, useState } from "react";
import { FaChartBar, FaFileAlt, FaUser } from "react-icons/fa";
import axios from "axios";
import DashboardCard from "../components/DashboardCard";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalForms: 0,
    responses: 0,
  });


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    axios
      .get(`${import.meta.env.VITE_API_Server}/api/user/dashboard`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setStats(res.data);
      })
      .catch((err) => {
        console.error("Error fetching dashboard stats:", err);
      });
  }, []);

  return (
    <main className="flex-1 p-6 overflow-y-auto bg-gray-900">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-100">Dashboard Overview</h2>
        <div className="flex gap-2">
          <button className="px-4 py-2 text-sm bg-gray-800 border border-gray-700 text-gray-100 rounded-lg hover:bg-gray-700">
            Last 7 days
          </button>
          <button className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            Download Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <DashboardCard
          title="Total Forms"
          value={stats.totalForms}
          change="+12%"
          icon={<FaFileAlt className="text-white" />}
          color="bg-indigo-800"
        />
        <DashboardCard
          title="Responses"
          value={stats.responses}
          change="+23%"
          icon={<FaChartBar className="text-white" />}
          color="bg-green-800"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-100">Response Activity</h3>
            <button className="text-sm text-indigo-300 hover:text-indigo-500">
              View Details
            </button>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-lg h-64 flex items-center justify-center">
            <div className="text-center text-gray-300">
              <p className="font-medium">Response Chart</p>
              <p className="text-sm mt-2">
                Visualization of form responses over time
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-100">Recent Forms</h3>
            <button className="text-sm text-indigo-300 hover:text-indigo-500">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="flex items-center justify-between p-3 hover:bg-gray-700 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-gray-700 w-10 h-10 rounded-lg flex items-center justify-center">
                    <FaFileAlt className="text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-100">
                      Customer Feedback {item}
                    </p>
                    <p className="text-xs text-gray-300">
                      Last response: 2 hours ago
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-white">1,24{item * 7}</p>
                  <p className="text-xs text-green-300">+{item * 5}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

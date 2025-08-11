export default function Forms() {
  return (
    <div className="p-6 sm:p-8 bg-gray-900 min-h-screen text-white">
      {/* Page Title */}
      <h1 className="text-2xl font-bold mb-6">Forms</h1>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3 mb-6">
        <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md shadow">
          + New Form
        </button>
        <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md shadow">
          Import Form
        </button>
        <button className="border border-gray-500 text-gray-400 hover:bg-gray-500 hover:text-white px-4 py-2 rounded-md">
          Export Data
        </button>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-800 p-4 rounded-lg shadow">
          <p className="text-gray-400 text-sm">Total Forms</p>
          <p className="text-2xl font-bold">42</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg shadow">
          <p className="text-gray-400 text-sm">Total Submissions</p>
          <p className="text-2xl font-bold">1,238</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg shadow">
          <p className="text-gray-400 text-sm">Drafts</p>
          <p className="text-2xl font-bold">5</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search forms..."
          className="w-full bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Forms List */}
      <div className="bg-gray-800 shadow-md rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-4">Recent Forms</h2>
        <ul className="space-y-3">
          <li className="flex justify-between items-center p-3 bg-gray-700 rounded-md hover:bg-gray-600 transition">
            <span>Customer Feedback</span>
            <span className="text-gray-400 text-sm">Last edited: 2 days ago</span>
          </li>
          <li className="flex justify-between items-center p-3 bg-gray-700 rounded-md hover:bg-gray-600 transition">
            <span>Event Registration</span>
            <span className="text-gray-400 text-sm">Last edited: 5 days ago</span>
          </li>
          <li className="flex justify-between items-center p-3 bg-gray-700 rounded-md hover:bg-gray-600 transition">
            <span>Newsletter Signup</span>
            <span className="text-gray-400 text-sm">Last edited: 1 week ago</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

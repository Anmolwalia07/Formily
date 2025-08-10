export default function DashboardCard({ title, value, change, icon, color }) {
  return (
    <div className="bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-700">
      <div className="flex justify-between">
        <div>
          <p className="text-sm text-gray-300">{title}</p>
          <p className="text-2xl font-bold mt-1 text-white">{value}</p>
        </div>
        <div className={`${color} w-12 h-12 rounded-lg flex items-center justify-center`}>
          {icon}
        </div>
      </div>
      <p className="text-xs mt-3 text-green-300 font-medium flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
        {change}
      </p>
    </div>
  );
}
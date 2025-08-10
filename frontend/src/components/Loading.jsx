export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen absolute w-full z-50 bg-opacity-90">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-white text-sm font-medium animate-pulse">
          Loading, please wait...
        </p>
      </div>
    </div>
  );
}

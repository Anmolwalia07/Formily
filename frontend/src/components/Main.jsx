import { FaPlus, FaEye, FaImage, FaMousePointer, FaSync } from 'react-icons/fa';

export function Main() {
  return (
    <main className="bg-gray-900 text-gray-100">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight text-white">
              Build beautiful forms & quizzes in minutes
            </h1>
            <p className="mt-6 text-lg text-gray-300">
              Create Categorize, Cloze and Comprehension questions with images, 
              preview in real-time, and save responses to MongoDB. 
              Tailwind + React for a snappy UI.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap gap-3">
              <a 
                href="#" 
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 transition-colors text-white px-5 py-3 rounded-md font-medium"
              >
                <FaPlus className="text-sm" />
                <span>Create new form</span>
              </a>
              <a 
                href="#" 
                className="flex items-center gap-2 px-5 py-3 rounded-md border border-gray-700 hover:border-gray-500 text-sm transition-colors"
              >
                <FaEye className="text-sm" />
                <span>View demos</span>
              </a>
            </div>

            <div className="mt-8">
              <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                <li className="flex items-center gap-2 p-3 bg-gray-800 rounded-md border border-gray-700">
                  <div className="bg-gray-700 border-2 border-dashed rounded w-6 h-6 flex-shrink-0" />
                  <span>Categorize (drag & drop)</span>
                </li>
                <li className="flex items-center gap-2 p-3 bg-gray-800 rounded-md border border-gray-700">
                  <div className="bg-gray-700 border-2 border-dashed rounded w-6 h-6 flex-shrink-0" />
                  <span>Cloze (fill-in-the-blanks)</span>
                </li>
                <li className="flex items-center gap-2 p-3 bg-gray-800 rounded-md border border-gray-700">
                  <div className="bg-gray-700 border-2 border-dashed rounded w-6 h-6 flex-shrink-0" />
                  <span>Comprehension (passage + sub-questions)</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-700">
            <div className="h-64 flex flex-col items-center justify-center border-2 border-dashed border-gray-600 rounded-lg bg-gray-900">
              <div className="text-center text-gray-400 p-4">
                <div className="mx-auto bg-gray-700 border-2 border-dashed rounded-xl w-16 h-16 flex items-center justify-center mb-4">
                  <FaEye className="text-xl text-gray-300" />
                </div>
                <p className="font-medium text-white">Form preview</p>
                <p className="text-xs mt-2 max-w-xs mx-auto text-gray-400">
                  Preview updates live as you edit questions in the editor
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-white">Key features</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="p-5 border border-gray-700 rounded-lg hover:shadow-md hover:shadow-indigo-500/20 transition-shadow group bg-gray-800">
            <div className="w-12 h-12 rounded-full bg-indigo-900 text-indigo-400 flex items-center justify-center mb-4 group-hover:bg-indigo-800 transition-colors">
              <FaImage className="text-xl" />
            </div>
            <h3 className="font-semibold text-lg text-white">Image support</h3>
            <p className="mt-2 text-gray-300">
              Attach header images or images to individual questions.
            </p>
          </div>
          
          <div className="p-5 border border-gray-700 rounded-lg hover:shadow-md hover:shadow-indigo-500/20 transition-shadow group bg-gray-800">
            <div className="w-12 h-12 rounded-full bg-indigo-900 text-indigo-400 flex items-center justify-center mb-4 group-hover:bg-indigo-800 transition-colors">
              <FaMousePointer className="text-xl" />
            </div>
            <h3 className="font-semibold text-lg text-white">Drag & drop</h3>
            <p className="mt-2 text-gray-300">
              Categorize questions with an intuitive drag-and-drop interface.
            </p>
          </div>
          
          <div className="p-5 border border-gray-700 rounded-lg hover:shadow-md hover:shadow-indigo-500/20 transition-shadow group bg-gray-800">
            <div className="w-12 h-12 rounded-full bg-indigo-900 text-indigo-400 flex items-center justify-center mb-4 group-hover:bg-indigo-800 transition-colors">
              <FaSync className="text-xl" />
            </div>
            <h3 className="font-semibold text-lg text-white">Realtime preview</h3>
            <p className="mt-2 text-gray-300">
              See live changes as you edit the form.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

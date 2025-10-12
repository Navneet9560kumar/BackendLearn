import React from 'react'

const CreateTask = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-blue-100 p-8">
      

      {/* Main Form Container */}
      <div className="max-w-4xl mx-auto mt-10 bg-white shadow-2xl rounded-xl p-10 border border-blue-100">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          🧩 Create a New Task
        </h2>

        <form className="space-y-6">
          {/* Task Title */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700">Task Title</label>
            <input
              type="text"
              placeholder="e.g. Design homepage UI"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700">Description</label>
            <textarea
              rows="5"
              placeholder="Describe the task in detail..."
              className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none transition-all duration-200"
            ></textarea>
          </div>

          {/* Date & Assign To - in a grid layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 font-semibold text-gray-700">Date</label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold text-gray-700">Assign To</label>
              <input
                type="text"
                placeholder="Employee name"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
              />
            </div>
          </div>

          {/* Category with dropdown */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700">Category</label>
            <select
              className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
            >
              <option value="">Select category</option>
              <option value="design">🎨 Design</option>
              <option value="development">💻 Development</option>
              <option value="testing">🧪 Testing</option>
              <option value="content">📝 Content</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-blue-600 active:scale-[0.98] transition-transform duration-150"
            >
              🚀 Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateTask
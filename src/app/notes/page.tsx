export default function Page() {
  return (
    <div className="flex min-h-full">
      <div className="w-64 bg-white my-1 ml-1 py-2 px-4 flex flex-col rounded">
        <h1 className="text-lg mb-4">Your Notes</h1>
        <ul>
          {/* TODO: replace with slugs of user's saved notes */}
          <li className="mb-2">
            <a href="#">Menu Item 1</a>
          </li>
          <li className="mb-2">
            <a href="#">Menu Item 2</a>
          </li>
          <li className="mb-2">
            <a href="#">Menu Item 3</a>
          </li>
          {/* END TODO */}
        </ul>
      </div>
      <div className="flex-grow min-h-full p-1">
        <textarea
          className="w-full min-h-full rounded shadow-sm p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Begin typing your note..."
        ></textarea>
        <button className="absolute bottom-8 right-8 py-2 px-4 bg-blue-500 text-white rounded-full focus:outline-none">
          Save
        </button>
      </div>
    </div>
  );
}

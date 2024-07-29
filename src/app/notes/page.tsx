export default function Page() {
  return (
    <div className="flex h-full max-h-full w-full max-w-full border">
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
      <div className="flex-grow h-full p-1">
        <textarea
          className="w-full h-full rounded shadow-sm p-2 border border-gray-300 focus:outline-none"
          placeholder="Begin typing your note..."
        ></textarea>
        <button className="absolute bottom-8 right-8 py-2 px-4 bg-gray-600 hover:bg-gray-800 text-white rounded-md">
          Save
        </button>
      </div>
    </div>
  );
}

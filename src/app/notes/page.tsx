export default function Page() {
  return (
    <>
      <div className="flex h-screen">
        <div className="w-64 bg-gray-800 text-white px-4 py-2 flex flex-col">
          <h1 className="text-xl font-bold mb-4">Sidebar</h1>
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
        <div className="flex-grow bg-gray-100 p-1">
          <textarea
            className="w-full h-full rounded shadow-sm p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Begin typing your note..."
          ></textarea>
          <button className="absolute bottom-8 right-8 py-2 px-4 bg-blue-500 text-white rounded-full focus:outline-none">
            Save
          </button>
        </div>
      </div>
    </>
  );
}

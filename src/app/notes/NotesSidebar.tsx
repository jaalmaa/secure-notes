export function NotesSidebar() {
  return (
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
  );
}

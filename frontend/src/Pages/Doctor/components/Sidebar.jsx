const Sidebar = () => (
  <aside className="bg-white w-64 hidden md:flex flex-col shadow-md border-r border-gray-200">
    <div className="p-6 border-b">
      <h2 className="text-2xl font-bold text-blue-600">Doctor Panel</h2>
    </div>
    <nav className="flex-1 p-4 space-y-2 text-gray-700">
      <a href="#" className="block px-4 py-2 rounded hover:bg-blue-100">Incoming Patients</a>
      <a href="#" className="block px-4 py-2 rounded hover:bg-blue-100">Medical History</a>
      <a href="#" className="block px-4 py-2 rounded hover:bg-blue-100">Reports</a>
      <a href="#" className="block px-4 py-2 rounded hover:bg-blue-100">Logout</a>
    </nav>
  </aside>
);

export default Sidebar;

const Navbar = () => (
  <header className="bg-white shadow px-6 py-4 flex justify-between items-center border-b border-gray-200">
    <h1 className="text-xl font-semibold text-gray-800">Welcome, Dr. Sushant</h1>
    <div className="flex items-center gap-3">
      <img
        src="https://media.licdn.com/dms/image/v2/D4D03AQHFoX1Xf1oUFg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1724666260778?e=1755129600&v=beta&t=V4nbi1sTlOsD4m1NICW3xTMuNBoYPZ3Ka3OLg7BStWk"
        className="w-10 h-10 rounded-full"
        alt="Doctor Profile"
      />
      <span className="text-sm text-gray-600">dr.sushantraut@hospital.com</span>
    </div>
  </header>
);

export default Navbar;

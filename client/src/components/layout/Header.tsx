import { Menu } from "lucide-react"; 

interface HeaderProps {
  onMenuClick?: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <header className="bg-blue-700 text-white p-4 shadow-md flex items-center justify-between">
      {/* left side */}
      <div className="flex items-center space-x-4">
        {/* toggle side bar button*/}
        <button
          className="md:hidden p-2 rounded hover:bg-blue-600 focus:outline-none"
          onClick={onMenuClick}
          aria-label="Toggle sidebar"
        >
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold">Red White Tech</h1>
      </div>

      {/* right side */}
      <div className="flex justify-end">
        <div className="relative group">
          <button className="focus:outline-none flex items-center">
            <span className="bg-amber-600 w-8 h-8 text-cente rounded-full border-2 border-white flex items-center justify-center">
              {user?.name ? user.name.toUpperCase()[0] : "?"}
            </span>
          </button>
          <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity z-10">
            <div className="px-4 py-2 border-b">
              <div className="font-bold">{user?.name || "Guest"}</div>
              <div className="text-sm text-gray-600">{user?.email || "no email"}</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

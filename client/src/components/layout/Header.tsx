export default function Header() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  return (
    <header className="bg-blue-700 text-white p-4 shadow-md flex items-center justify-between">
      <h1 className="text-xl font-bold">Employee Management System</h1>
      <div className="flex justify-end">
        <span className="mr-4">Welcome, {user.name}</span>
      </div>
    </header>
  );
}

import { useReports } from "../hooks/userReport";
import { ReportsTable } from "../components/tables/ReportsTable";

export default function Reports() {
  const { reports, loading, handleDelete } = useReports();

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Reports</h2>
      <ReportsTable reports={reports} onDelete={handleDelete} />
    </div>
  );
}

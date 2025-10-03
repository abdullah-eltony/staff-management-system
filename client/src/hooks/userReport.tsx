import { useEffect, useState } from "react";
import { getReports, createReport, deleteReport, type Report, type ReportPayload } from "../api/report";

export function useReports() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const data = await getReports();
      setReports(data);
    } catch (err) {
      console.error("Error fetching reports:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteReport(id);
      setReports((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      console.error("Error deleting report:", err);
    }
  };

  const handleCreateReport = async (data: ReportPayload) => {
    try {
      await createReport(data);
    } catch (error) {
      console.error("Error insert report:", error);
    }
  };


  return { reports, loading, fetchReports, handleDelete, handleCreateReport };
}

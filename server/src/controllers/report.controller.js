// controllers/report.controller.js
import reportService from "../services/report.service.js";
import { summarizeText } from "../utils/textSummary.js";

class ReportController {
  constructor(service) {
    this.reportService = service;
  }

  createReport = async (req, res, next) => {
    try {
      const { task_id, employee_id, title, content } = req.body;
      const ai_summary = await summarizeText(content);

      const report = await this.reportService.create({
        task_id,
        employee_id,
        title,
        content,
        ai_summary,
      });
      res.status(201).json(report);
    } catch (err) {
      if (err.code === "23503") {
        // foreign_key_violation
        let error = new Error("Invalid employee or task ID");
        error.status = 400;
        next(error);
      } else {
        next(err);
      }
    }
  };

  getAllReports = async (req, res, next) => {
    const { sub: id, role } = req.user;
    try {
      const reports = await this.reportService.getAll({ employee_id: id, role });
      res.json(reports);
    } catch (err) {
      next(err);
    }
  };

  getReportById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const report = await this.reportService.getById(id);
      if (!report) return res.status(404).json({ message: "Report not found" });
      res.json(report);
    } catch (err) {
      next(err);
    }
  };

  deleteReport = async (req, res, next) => {
    try {
      const { id } = req.params;
      const report = await this.reportService.delete(id);
      if (!report) return res.status(404).json({ message: "Report not found" });
      res.json({ message: "Report deleted" });
    } catch (err) {
      next(err);
    }
  };
}

export default new ReportController(reportService);

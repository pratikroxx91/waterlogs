import express from "express";
import Report from "../models/report.model.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

// GET all pending reports for admin
router.get("/", authMiddleware, adminMiddleware, async (req, res) => {

    try {
        const status = req.query.status;
        const filter = {};
        if (status) {
            filter.status = status;
        }
        const reports = await Report.find(filter).sort({ submittedAt: -1 });
        res.status(200).json(reports);

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch pending reports",
            error: error.message
        });
    }
});

// Pending
router.get("/pending", authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const reports = await Report.find({
            status: "Pending"
        }).sort({ submittedAt: -1 });

        res.status(200).json(reports);

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch pending reports",
            error: error.message
        });
    }
});

// PATCH or Approve a report
router.patch("/:id/approve", authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const report = await Report.findByIdAndUpdate(
            req.params.id,
            {
                status: "Approved"
            },
            {
                new: true
            }
        );

        if (!report) {
            return res.status(404).json({
                message: "Report not found"
            });
        }
        res.status(200).json({
            message: "Report approved successfully",
            report
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to approve report",
            error: error.message
        });
    }
});

// PATCH or Reject a report
router.patch("/:id/reject", authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const report = await Report.findByIdAndUpdate(
            req.params.id,
            {
                status: "Rejected",
                rejectionReason: req.body.rejectionReason
            },
            {
                new: true
            }
        );

        if (!report) {
            return res.status(404).json({
                message: "Report not found"
            });
        }
        res.status(200).json({
            message: "Report rejected successfully",
            report
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to reject report",
            error: error.message
        });
    }
});


export default router;

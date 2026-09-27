// creating routes for report submission

import express from 'express';
import Report from '../models/report.model.js';
import authMiddleware from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';
import uploadToCloudinary from '../config/cloudinaryUpload.js';

const router = express.Router();

// POST or Create a report
router.post("/", authMiddleware, upload.single("images"), async (req, res) => {

    try {
        const {
            waterloggingType,
            pedestrianAdvice,
            description,
        } = req.body;

        const vehicleAdvice = JSON.parse(req.body.vehicleAdvice);
        const location = JSON.parse(req.body.location);

        let imageUrl;

        if (req.file) {
            const result = await uploadToCloudinary(req.file.buffer);
            imageUrl = result.secure_url;
        }

        const newReport = await Report.create({
            userId: req.user.id,
            waterloggingType,
            pedestrianAdvice,
            vehicleAdvice,
            description,
            images: imageUrl || "",
            location,
        });

        res.status(201).json({
            message: "Report created successfully",
            report: newReport
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to create report",
            error: error.message
        });
    }
});

// GET all public reports
router.get("/", async (req, res) => {
    try {
        const reports = await Report.find({
            status: { $in: ["Approved", "Resolved"] }
        }).sort({ submittedAt: -1 });

        res.status(200).json(reports);

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch reports",
            error: error.message
        });
    }
});

// GET the current user's reports
router.get("/my-reports", authMiddleware, async (req, res) => {
    try {
        const reports = await Report.find({
            userId: req.user.id
        }).sort({ submittedAt: -1 });

        res.status(200).json(reports);

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch your reports",
            error: error.message
        });
    }
});

// GET selected public reports (Approved and Resolved)
router.get("/:id", async (req, res) => {
    try {
        const report = await Report.findOne({
            _id: req.params.id,
            status: "Approved"
        });

        if (!report) {
            return res.status(404).json({
                message: "Report not found"
            });
        }

        res.status(200).json(report);

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch report",
            error: error.message
        });
    }
});

export default router;
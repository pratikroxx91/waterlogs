import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    submittedAt: {
        type: Date,
        default: Date.now
    },

    waterloggingType: {
        type: String,
        enum: ["Low", "Moderate", "Severe"],
        required: true
    },

    pedestrianAdvice: {
        type: String,
        enum: ["Passable", "Not Passable"],
        required: true
    },

    vehicleAdvice: {
        twoWheeler: {
            type: String,
            enum: ["Passable", "Not Passable"],
            required: true
        },
        threeWheeler: {
            type: String,
            enum: ["Passable", "Not Passable"],
            required: true
        }
    },

    description: {
        type: String,
        required: true,
        trim: true
    },

    images: {
        type: String,
        required: true
    },

    location: {
        area: {
            type: String,
            required: true
        },
        landmark: {
            type: String,
            trim: true,
            required: true
        }
    },

    status: {
        type: String,
        enum: ["Pending", "Approved", "Rejected"],
        default: "Pending"
    },

    rejectionReason: {
        type: String,
        default: "",
    },
},
    {
        timestamps: true
    }
);

const Report = mongoose.model('Report', reportSchema);

export default Report;
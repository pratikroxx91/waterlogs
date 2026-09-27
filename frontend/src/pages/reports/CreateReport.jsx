import { useState } from 'react'
import { useNavigate } from "react-router";

const CreateReport = () => {

    const [submitting, setSubmitting] = useState(false);

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        waterloggingType: "",
        pedestrianAdvice: "",
        twoWheeler: "",
        threeWheeler: "",
        description: "",
        images: null,
        area: "",
        landmark: "",
    });

    const handleImageChange = (e) => {
        setFormData(prev => ({
            ...prev,
            images: e.target.files[0]
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setSubmitting(true);

        const token = localStorage.getItem("token");

        if (!token) {
            alert("Please login first.");
            return;
        }

        try {
            const formDataToSend = new FormData();

            formDataToSend.append(
                "waterloggingType",
                formData.waterloggingType
            );

            formDataToSend.append(
                "pedestrianAdvice",
                formData.pedestrianAdvice
            );

            formDataToSend.append(
                "vehicleAdvice",
                JSON.stringify({
                    twoWheeler: formData.twoWheeler,
                    threeWheeler: formData.threeWheeler
                })
            );

            formDataToSend.append(
                "description",
                formData.description
            );

            if (formData.images) {
                formDataToSend.append("images", formData.images);
            }

            formDataToSend.append(
                "location",
                JSON.stringify({
                    area: formData.area,
                    landmark: formData.landmark
                })
            );

            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/reports`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    body: formDataToSend
                }
            );

            const data = await response.json();

            console.log("Response status:", response.status);
            console.log("Response data:", data);

            if (!response.ok) {
                throw new Error(data.message || "Failed to submit report");
            }

            console.log(data);
            alert("Report submitted successfully!");
            navigate("/");

        } catch (error) {
            console.error(error);
            alert(error.message);
        } finally {
            setSubmitting(false);
        }
    };
    return (
        <>
            <div className="min-h-screen bg-gray-950 text-white px-4 py-10">


                <div className="max-w-2xl mx-auto">

                    <h1 className="text-3xl font-bold mb-2">
                        Report Waterlogging
                    </h1>

                    <p className="text-gray-400 mb-8">
                        Submit information about a waterlogged area.
                    </p>

                    <form
                        onSubmit={handleSubmit}
                        className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-6"
                    >

                        {/* Waterlogging Type */}
                        <div>
                            <label className="block mb-2 font-medium">
                                Waterlogging Severity
                            </label>

                            <select
                                name="waterloggingType"
                                value={formData.waterloggingType}
                                onChange={handleChange}
                                required
                                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3"
                            >
                                <option value="">Select severity</option>
                                <option value="Low">Low</option>
                                <option value="Moderate">Moderate</option>
                                <option value="Severe">Severe</option>
                            </select>
                        </div>


                        {/* Pedestrian Advice */}
                        <div>
                            <label className="block mb-2 font-medium">
                                Is it passable for pedestrians?
                            </label>

                            <select
                                name="pedestrianAdvice"
                                value={formData.pedestrianAdvice}
                                onChange={handleChange}
                                required
                                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3"
                            >
                                <option value="">Select an option</option>
                                <option value="Passable">Passable</option>
                                <option value="Not Passable">Not Passable</option>
                            </select>
                        </div>


                        {/* Two Wheeler */}
                        <div>
                            <label className="block mb-2 font-medium">
                                Is it passable for two-wheelers?
                            </label>

                            <select
                                name="twoWheeler"
                                value={formData.twoWheeler}
                                onChange={handleChange}
                                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3"
                            >
                                <option value="">Select an option</option>
                                <option value="Passable">Passable</option>
                                <option value="Not Passable">Not Passable</option>
                            </select>
                        </div>


                        {/* Three Wheeler */}
                        <div>
                            <label className="block mb-2 font-medium">
                                Is it passable for three-wheelers?
                            </label>

                            <select
                                name="threeWheeler"
                                value={formData.threeWheeler}
                                onChange={handleChange}
                                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3"
                            >
                                <option value="">Select an option</option>
                                <option value="Passable">Passable</option>
                                <option value="Not Passable">Not Passable</option>
                            </select>
                        </div>


                        {/* Description */}
                        <div>
                            <label className="block mb-2 font-medium">
                                Description
                            </label>

                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                                rows="5"
                                placeholder="Describe the waterlogging situation..."
                                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 resize-none"
                            />
                        </div>


                        {/* Images */}
                        <div>
                            <label className="block mb-2 font-medium">
                                Photos
                            </label>

                            <input
                                type="file"
                                name='images'
                                accept="image/*"
                                onChange={handleImageChange}
                                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3"
                            />

                            <p className="text-sm text-gray-500 mt-2">
                                You can upload up to 3 photos.
                            </p>
                        </div>


                        {/* Location */}
                        <div>
                            <label className="block mb-2 font-medium">
                                Location
                            </label>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                <input
                                    type="string"
                                    name="area"
                                    value={formData.area}
                                    onChange={handleChange}
                                    placeholder="Area / locality"
                                    required
                                    className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3"
                                />

                                <input
                                    type="string"
                                    name="landmark"
                                    value={formData.landmark}
                                    onChange={handleChange}
                                    placeholder="Landmark"
                                    required
                                    className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3"
                                />

                            </div>
                        </div>


                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={submitting}
                            className="w-full bg-blue-500 hover:bg-blue-400 text-gray-950 font-semibold py-3 rounded-lg transition"
                        >
                            {submitting ? (
                                <div className="flex justify-center">
                                    <div className="w-5 h-5 border-2 border-gray-950 border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            ) : (
                                "Submit Report"
                            )}
                        </button>

                    </form>

                </div>

            </div>
        </>
    )
}

export default CreateReport

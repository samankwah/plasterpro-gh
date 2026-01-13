import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, Video, X, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

const MeetingRequest = () => {
  const dialogRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
    topic: "",
  });

  const [formState, setFormState] = useState({
    isSubmitting: false,
    isSubmitted: false,
    error: null,
  });

  const timeSlots = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
  ];

  // Function to open modal
  const handleOpenDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
      // Reset states when opening
      setFormState({ isSubmitting: false, isSubmitted: false, error: null });
    }
  };

  // Function to close modal
  const handleCloseDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
      // Reset form and states
      setFormData({ name: "", email: "", date: "", time: "", topic: "" });
      setFormState({ isSubmitting: false, isSubmitted: false, error: null });
    }
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormState({ isSubmitting: true, isSubmitted: false, error: null });

    const formspreeId = import.meta.env.VITE_FORMSPREE_MEETING_FORM_ID;

    // Check if Formspree ID is configured
    if (!formspreeId || formspreeId === "your_meeting_form_id_here") {
      setFormState({
        isSubmitting: false,
        isSubmitted: false,
        error: "Meeting service not configured. Please contact us via WhatsApp.",
      });
      return;
    }

    try {
      const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormState({ isSubmitting: false, isSubmitted: true, error: null });
        setFormData({ name: "", email: "", date: "", time: "", topic: "" });

        // Close modal after 3 seconds
        setTimeout(() => {
          handleCloseDialog();
        }, 3000);
      } else {
        throw new Error("Failed to submit meeting request");
      }
    } catch (error) {
      setFormState({
        isSubmitting: false,
        isSubmitted: false,
        error: "Failed to schedule meeting. Please try again or contact us via WhatsApp.",
      });
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Request a Meeting
      </h2>
      <p className="text-gray-700 mb-4">
        Fill out the form below to schedule a meeting with Elizabeth Acheampong.
      </p>

      <Link
        to="#"
        onClick={(e) => {
          e.preventDefault();
          handleOpenDialog();
        }}
        className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-md transition-colors duration-200"
      >
        Request a Meeting
      </Link>

      {/* Meeting Request Modal */}
      <dialog
        ref={dialogRef}
        className="p-6 rounded-lg shadow-xl backdrop:bg-black backdrop:bg-opacity-50 w-full max-w-md"
      >
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Video className="w-5 h-5" />
            <h2 className="text-xl font-semibold">Schedule a Zoom Meeting</h2>
          </div>
          <button
            onClick={handleCloseDialog}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {formState.isSubmitted ? (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Meeting Scheduled!
            </h3>
            <p className="text-gray-600 text-center text-sm">
              We've received your meeting request. You'll receive a confirmation email shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {formState.error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start">
                <AlertCircle className="w-5 h-5 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
                <p className="text-red-800 text-sm">{formState.error}</p>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium">Name</label>
              <input
                type="text"
                name="name"
                required
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                onChange={handleInputChange}
                value={formData.name}
                disabled={formState.isSubmitting}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                required
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                onChange={handleInputChange}
                value={formData.email}
                disabled={formState.isSubmitting}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Meeting Topic</label>
              <input
                type="text"
                name="topic"
                required
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                onChange={handleInputChange}
                value={formData.topic}
                disabled={formState.isSubmitting}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Date</label>
                <div className="relative">
                  <Calendar className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                  <input
                    type="date"
                    name="date"
                    required
                    className="w-full pl-8 p-2 border rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    onChange={handleInputChange}
                    value={formData.date}
                    min={new Date().toISOString().split("T")[0]}
                    disabled={formState.isSubmitting}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Time</label>
                <div className="relative">
                  <Clock className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                  <select
                    name="time"
                    required
                    className="w-full pl-8 p-2 border rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    onChange={handleInputChange}
                    value={formData.time}
                    disabled={formState.isSubmitting}
                  >
                    <option value="">Select time</option>
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <button
                type="button"
                className="px-4 py-2 text-gray-500 hover:text-gray-700 transition-colors disabled:opacity-50"
                onClick={handleCloseDialog}
                disabled={formState.isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={formState.isSubmitting}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-md transition-colors flex items-center gap-2 disabled:bg-amber-300 disabled:cursor-not-allowed"
              >
                {formState.isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Scheduling...
                  </>
                ) : (
                  "Schedule Meeting"
                )}
              </button>
            </div>
          </form>
        )}
      </dialog>
    </div>
  );
};

export default MeetingRequest;

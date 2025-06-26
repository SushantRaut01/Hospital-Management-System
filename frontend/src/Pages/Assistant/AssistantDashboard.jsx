// AssistantDashboard.jsx
import React, { useEffect, useState } from "react";
import AddPatientForm from "./AddPatientForm";
import PatientCardMobile from "./PatientCardMobile";
import PatientTableDesktop from "./PatientTableDesktop";

const AssistantDashboard = () => {
  const [patients, setPatients] = useState([]);

  // Initial fetch
  const fetchPatients = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/assistant/patients/");
      const data = await response.json();
      setPatients(data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  // ⬅️ Append new patient to list
  const handlePatientAdded = (newPatient) => {
    setPatients((prev) => [newPatient, ...prev]);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Assistant Dashboard</h1>
          <button
            onClick={() => document.getElementById("popupForm").classList.remove("hidden")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow"
          >
            + Add Patient
          </button>
        </div>

        {/* Filter/Search Bar */}
        <form className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search by name or phone"
            className="w-full md:w-1/3 px-4 py-2 border rounded-lg shadow-sm"
          />
          <select className="w-full md:w-1/4 px-4 py-2 border rounded-lg shadow-sm">
            <option value="">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="In Clinic">In Clinic</option>
            <option value="On Hold">On Hold</option>
            <option value="Emergency">Emergency</option>
          </select>
          <button className="bg-gray-800 text-white px-5 py-2 rounded-lg hover:bg-gray-900">Filter</button>
        </form>

        {/* Patient Table (Desktop) */}
        <PatientTableDesktop patients={patients} />

        {/* Patient Cards (Mobile) */}
        <PatientCardMobile patients={patients} />
      </div>

      {/* Add Patient Popup Form */}
      <AddPatientForm onPatientAdded={handlePatientAdded} />
    </div>
  );
};

export default AssistantDashboard;

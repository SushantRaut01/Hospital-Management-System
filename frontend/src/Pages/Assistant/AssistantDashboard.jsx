// AssistantDashboard.jsx
import React, { useEffect, useState } from "react";
import AddPatientForm from "./AddPatientForm";
import PatientCardMobile from "./PatientCardMobile";
import PatientTableDesktop from "./PatientTableDesktop";
import { apiFetch } from "../../utils/api";

const AssistantDashboard = () => {
  const [patients, setPatients] = useState([]);
  const [editingPatient, setEditingPatient] = useState(null);

  // Fetch patients from API
  const fetchPatients = async () => {
    try {
      const data = await apiFetch("/api/assistant/patients/");
      setPatients(data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handlePatientAdded = () => {
    fetchPatients();
    setEditingPatient(null);
  };

  // Called when user clicks "Edit" in table or card
  const handleEditPatient = (patient) => {
    if (!patient || !patient.id) {
      console.error("Invalid patient to edit:", patient);
      alert("Cannot edit: patient has no ID!");
      return;
    }
    setEditingPatient(patient);
    document.getElementById("popupForm")?.classList.remove("hidden");
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Assistant Dashboard</h1>
          <button
            onClick={() => {
              setEditingPatient(null);  // Reset form to "add" mode
              document.getElementById("popupForm").classList.remove("hidden");
            }}
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
          <button
            type="button"
            className="bg-gray-800 text-white px-5 py-2 rounded-lg hover:bg-gray-900"
          >
            Filter
          </button>
        </form>

        {/* Patient Table (Desktop) */}
        <PatientTableDesktop patients={patients} onEdit={handleEditPatient} />

        {/* Patient Cards (Mobile) */}
        <PatientCardMobile patients={patients} onEdit={handleEditPatient} />
      </div>

      {/* Add/Edit Patient Popup Form */}
      <AddPatientForm
        editingPatient={editingPatient}
        onPatientSaved={handlePatientAdded}
      />
    </div>
  );
};

export default AssistantDashboard;

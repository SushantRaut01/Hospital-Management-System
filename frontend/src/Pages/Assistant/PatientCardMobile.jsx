import React, { useEffect, useState } from "react";
import AddPatientForm from "./AddPatientForm";

const PatientCardMobile = () => {
  const [patients, setPatients] = useState([]);
  const [editingPatient, setEditingPatient] = useState(null);

  const fetchPatients = () => {
    fetch("http://127.0.0.1:8000/api/assistant/patients/")
      .then((res) => res.json())
      .then((data) => setPatients(data))
      .catch((err) => console.error("Fetch error:", err));
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const updateStatus = (id, newStatus) => {
    fetch(`http://127.0.0.1:8000/api/assistant/update-status/${id}/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((res) => {
        if (res.ok) fetchPatients();
      })
      .catch((err) => console.error("Update error:", err));
  };

  const deletePatient = (id) => {
    if (window.confirm("Are you sure you want to delete this patient?")) {
      fetch(`http://127.0.0.1:8000/api/assistant/delete-patient/${id}/`, {
        method: "DELETE",
      })
        .then((res) => {
          if (res.ok) fetchPatients();
        })
        .catch((err) => console.error("Delete error:", err));
    }
  };

  return (
    <>
      <div className="md:hidden space-y-4">
        {patients
            .filter((patient) => patient.status !== "Done")
            .map((patient, index) => (
 
          <div
            key={patient.pid}
            className={`rounded-xl shadow p-5 space-y-2 border transition-all duration-300 ${
              patient.status === "Emergency" ? "bg-red-100" : "bg-white"
            }`}
          >
            <div className="font-bold text-lg text-gray-900">
              {patient.name} {patient.surname}
            </div>
            <div className="text-sm text-gray-500">
              Age: {patient.age}, Weight: {patient.weight} kg
            </div>
            <div className="text-sm text-gray-500">Phone: {patient.phone}</div>
            <div className="text-sm text-gray-500">
              {new Date(patient.created_at).toLocaleDateString()}
            </div>

            <div className="pt-1">
              <span
                className={`inline-block px-3 py-1 text-xs rounded-full font-medium
                ${
                  patient.status === "In Clinic"
                    ? "bg-green-100 text-green-800"
                    : patient.status === "Hold"
                    ? "bg-gray-200 text-gray-800"
                    : patient.status === "Emergency"
                    ? "bg-red-100 text-red-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {patient.status}
              </span>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              <button
                className="bg-yellow-500 text-white px-3 py-1 rounded text-xs"
                onClick={() => setEditingPatient(patient)}
              >
                Edit
              </button>
              <button
                className="bg-green-600 text-white px-3 py-1 rounded text-xs"
                onClick={() => updateStatus(patient.pid, "In Clinic")}
              >
                To Clinic
              </button>
              <button
                className="bg-gray-500 text-white px-3 py-1 rounded text-xs"
                onClick={() => updateStatus(patient.pid, "Hold")}
              >
                Hold
              </button>
              <button
                className="bg-red-200 text-red-800 px-3 py-1 rounded text-xs"
                onClick={() => updateStatus(patient.pid, "Emergency")}
              >
                Emergency
              </button>
              <button
                className="bg-red-600 text-white px-3 py-1 rounded text-xs"
                onClick={() => deletePatient(patient.pid)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Shared Add/Edit Form below - just like desktop */}
      <AddPatientForm
        editingPatient={editingPatient}
        onPatientSaved={() => {
          fetchPatients();
          setEditingPatient(null);
        }}
      />
    </>
  );
};

export default PatientCardMobile;

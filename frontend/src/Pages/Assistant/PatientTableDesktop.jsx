import React, { useEffect, useState } from "react";
import AddPatientForm from "./AddPatientForm";

const PatientTableDesktop = () => {
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
      <div className="hidden md:block bg-white shadow rounded-lg overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-50 text-gray-600 text-sm uppercase">
            <tr>
              <th className="px-6 py-3 text-left">#</th>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Age</th>
              <th className="px-6 py-3 text-left">Weight</th>
              <th className="px-6 py-3 text-left">Phone</th>
              <th className="px-6 py-3 text-left">Date</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700 divide-y">
            {patients
              .filter((patient) => patient.status !== "Done")
              .map((patient, index) => (
 
              <tr
                key={patient.id}
                className={`${
                  patient.status === "Emergency" ? "bg-red-100" : ""
                } transition-all duration-300`}
              >
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4 font-medium">
                  {patient.name} {patient.surname}
                </td>
                <td className="px-6 py-4">{patient.age}</td>
                <td className="px-6 py-4">{patient.weight} kg</td>
                <td className="px-6 py-4">{patient.phone}</td>
                <td className="px-6 py-4">
                  {new Date(patient.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
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
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-2">
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
                      className="bg-yellow-500 text-white px-3 py-1 rounded text-xs"
                      onClick={() => setEditingPatient(patient)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-600 text-white px-3 py-1 rounded text-xs"
                      onClick={() => deletePatient(patient.pid)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AddPatientForm
        onPatientSaved={() => {
          fetchPatients();
          setEditingPatient(null);
        }}
        editingPatient={editingPatient}
      />
    </>
  );
};

export default PatientTableDesktop;

import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import PatientList from "./components/PatientList";
import PatientDetails from "./components/PatientDetails";
import MedicineSuggestions from "./components/MedicineSuggestions";

const DoctorDashboard = () => {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [prescriptions, setPrescriptions] = useState({});

  useEffect(() => {
    const fetchPatients = () => {
      fetch("http://localhost:8000/api/doctor/incoming-patients/")
        .then((res) => res.json())
        .then((data) => setPatients(data))
        .catch((err) => console.error("Fetch error:", err));
    };

    fetchPatients(); // Initial load
    const interval = setInterval(fetchPatients, 3000); // Every 3 sec
    return () => clearInterval(interval); // Clean up
  }, []);

  const handleFormSubmit = (e, patientId) => {
    e.preventDefault();
    const form = e.target;
    const med = form.med.value.trim();
    const dose = form.dose.value.trim();
    const freq = form.freq.value.trim();
    const time = form.time.value.trim();
    const remarks = form.remarks.value.trim();

    if (med && dose && freq && time) {
      const newPrescription = `• ${med} — ${dose}, ${freq}, ${time}${remarks ? " (" + remarks + ")" : ""}`;
      setPrescriptions((prev) => ({
        ...prev,
        [patientId]: [...(prev[patientId] || []), newPrescription],
      }));
      form.reset();
    }
  };

  const fillPrescription = (med, dose, freq, time) => {
    const form = document.querySelector("#selectedPatient form");
    if (form) {
      form.med.value = med;
      form.dose.value = dose;
      form.freq.value = freq;
      form.time.value = time;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex flex-1 overflow-hidden">
          <PatientList patients={patients} setSelectedPatient={setSelectedPatient} />
          <section className="flex-1 bg-gray-50 p-6 overflow-y-auto" id="selectedPatient">
            <PatientDetails
              patient={selectedPatient}
              onSubmit={handleFormSubmit}
              prescriptions={prescriptions[selectedPatient?.id] || []}
            />
            <MedicineSuggestions fillPrescription={fillPrescription} />
          </section>
        </main>
      </div>
    </div>
  );
};

export default DoctorDashboard;

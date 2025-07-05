import React, { useState, useEffect, useRef } from "react";
import { apiFetch } from "../../../utils/api"; // ✅ use centralized fetch

const PatientDetails = ({ patient }) => {
  const [medName, setMedName] = useState("");
  const [dose, setDose] = useState("");
  const [freq, setFreq] = useState("");
  const [time, setTime] = useState("");
  const [remarks, setRemarks] = useState("");
  const [prescriptions, setPrescriptions] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (medName.trim()) {
        try {
          const data = await apiFetch(`/doctor/medicines/?q=${medName}`);
          setSuggestions(data);
          setShowSuggestions(true);
          setActiveSuggestionIndex(0);
        } catch (err) {
          console.error("Suggestion fetch error:", err);
        }
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    };

    fetchSuggestions();
  }, [medName]);

  const handleKeyDown = (e) => {
    if (!showSuggestions || suggestions.length === 0) return;
    if (e.key === "ArrowDown") {
      setActiveSuggestionIndex((prev) => (prev + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      setActiveSuggestionIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      handleSelectSuggestion(suggestions[activeSuggestionIndex].name);
    }
  };

  const handleSelectSuggestion = (name) => {
    setMedName(name);
    setShowSuggestions(false);
    setSuggestions([]);
  };

  const resetForm = () => {
    setMedName("");
    setDose("");
    setFreq("");
    setTime("");
    setRemarks("");
    setEditIndex(null);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleAddPrescription = (e) => {
    e.preventDefault();
    const newPrescription = { medName, dose, freq, time, remarks };

    if (editIndex !== null) {
      const updated = [...prescriptions];
      updated[editIndex] = newPrescription;
      setPrescriptions(updated);
    } else {
      setPrescriptions([...prescriptions, newPrescription]);
    }
    resetForm();
  };

  const handleEdit = (index) => {
    const p = prescriptions[index];
    setMedName(p.medName);
    setDose(p.dose);
    setFreq(p.freq);
    setTime(p.time);
    setRemarks(p.remarks);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updated = prescriptions.filter((_, i) => i !== index);
    setPrescriptions(updated);
    if (editIndex === index) resetForm();
  };

  const handlePrint = () => window.print();

  const handleSaveToBackend = async () => {
    if (prescriptions.length === 0) {
      alert("Add at least one medicine.");
      return;
    }

    const payload = {
      patient_id: patient.id,
      medicines: prescriptions,
    };

    try {
      const data = await apiFetch("/doctor/save-prescription/", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      alert("✅ Prescription saved!");
      setPrescriptions([]);
    } catch (err) {
      console.error(err);
      alert("❌ Error saving prescription.");
    }
  };

  if (!patient)
    return <p className="text-gray-500">Select a patient to start prescribing.</p>;

  return (
    <div className="bg-white p-6 rounded shadow space-y-6 print:p-0 print:shadow-none print:bg-white w-full">
      {/* Patient Details */}
      <div>
        <h2 className="text-2xl font-bold mb-2">{patient.name}</h2>
        <div className="grid grid-cols-2 gap-2 text-gray-800 text-lg">
          <p><strong>Age:</strong> {patient.age}</p>
          <p><strong>Weight:</strong> {patient.weight}kg</p>
          <p><strong>Phone:</strong> {patient.phone}</p>
          <p><strong>Address:</strong> {patient.address}</p>
          <p><strong>Vitals:</strong> {patient.vitals}</p>
          <p><strong>Allergies:</strong> {patient.allergies}</p>
        </div>
      </div>

      {/* Prescription Form */}
      <form onSubmit={handleAddPrescription} className="space-y-4 relative">
        <h3 className="text-xl font-semibold">Add Prescription</h3>

        <div className="relative">
          <input
            ref={inputRef}
            value={medName}
            onChange={(e) => setMedName(e.target.value)}
            onKeyDown={handleKeyDown}
            type="text"
            placeholder="Search medicine name"
            className="w-full px-4 py-3 border rounded text-xl focus:outline-blue-500"
            onFocus={() => medName && setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
            required
          />
          {showSuggestions && suggestions.length > 0 && (
            <ul className="absolute z-50 bg-white border w-full rounded shadow-xl mt-1 max-h-[250px] overflow-y-auto no-scrollbar">
              {suggestions.map((med, idx) => (
                <li
                  key={idx}
                  className={`px-4 py-3 border-b text-lg cursor-pointer ${
                    idx === activeSuggestionIndex
                      ? "bg-blue-100 font-semibold"
                      : "hover:bg-blue-50"
                  }`}
                  onMouseDown={() => handleSelectSuggestion(med.name)}
                >
                  {med.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select value={dose} onChange={(e) => setDose(e.target.value)} required className="px-4 py-3 border rounded text-lg">
            <option value="">Select Dose</option>
            <option value="1 tab">1 tab</option>
            <option value="2 tab">2 tab</option>
            <option value="5 ml">5 ml</option>
            <option value="10 ml">10 ml</option>
          </select>

          <select value={freq} onChange={(e) => setFreq(e.target.value)} required className="px-4 py-3 border rounded text-lg">
            <option value="">Select Frequency</option>
            <option value="Once a day">Once a day</option>
            <option value="Twice a day">Twice a day</option>
            <option value="Thrice a day">Thrice a day</option>
          </select>

          <select value={time} onChange={(e) => setTime(e.target.value)} required className="px-4 py-3 border rounded text-lg">
            <option value="">Select Time</option>
            <option value="Morning">Morning</option>
            <option value="Afternoon">Afternoon</option>
            <option value="Night">Night</option>
          </select>
        </div>

        <textarea
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          rows={2}
          placeholder="Remarks (optional)"
          className="w-full px-4 py-3 border rounded text-lg"
        />

        <button
          type="submit"
          className={`${
            editIndex !== null ? "bg-yellow-600" : "bg-blue-600"
          } text-white text-lg px-6 py-3 rounded hover:opacity-90`}
        >
          {editIndex !== null ? "Update Medicine" : "Add Medicine"}
        </button>
      </form>

      {/* Prescription Table */}
      {prescriptions.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mt-6 mb-2">Prescribed Medicines</h3>
          <div className="overflow-x-auto">
            <table className="min-w-[900px] w-full text-lg border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-4 py-3">#</th>
                  <th className="border px-4 py-3">Medicine</th>
                  <th className="border px-4 py-3">Dose</th>
                  <th className="border px-4 py-3">Frequency</th>
                  <th className="border px-4 py-3">Time</th>
                  <th className="border px-4 py-3">Remarks</th>
                  <th className="border px-4 py-3 print:hidden">Actions</th>
                </tr>
              </thead>
              <tbody>
                {prescriptions.map((item, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-3 text-center">{index + 1}</td>
                    <td className="border px-4 py-3">{item.medName}</td>
                    <td className="border px-4 py-3">{item.dose}</td>
                    <td className="border px-4 py-3">{item.freq}</td>
                    <td className="border px-4 py-3">{item.time}</td>
                    <td className="border px-4 py-3">{item.remarks}</td>
                    <td className="border px-4 py-3 print:hidden text-center">
                      <button
                        onClick={() => handleEdit(index)}
                        className="bg-yellow-500 text-white px-4 py-2 mr-2 rounded hover:bg-yellow-600"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                      >
                        🗑️ Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="print:hidden flex gap-4 mt-4">
            <button
              onClick={handlePrint}
              className="bg-green-600 text-white text-lg px-6 py-3 rounded hover:bg-green-700"
            >
              🖨️ Print Prescription
            </button>
            <button
              onClick={handleSaveToBackend}
              className="bg-blue-700 text-white text-lg px-6 py-3 rounded hover:bg-blue-800"
            >
              💾 Save to Backend
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientDetails;

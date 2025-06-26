const suggestions = [
  {
    title: "Common Cold",
    symptoms: "Sneezing, runny nose, mild fever",
    meds: ["Paracetamol 500mg", "Cetirizine 10mg", "Steam inhalation"],
    prescription: ["Paracetamol 500mg", "500mg", "2 times/day", "Morning/Evening"],
  },
  {
    title: "Headache",
    symptoms: "Pain in head, tension",
    meds: ["Ibuprofen 400mg", "Paracetamol 500mg", "Rest & hydration"],
    prescription: ["Ibuprofen 400mg", "400mg", "2 times/day", "Afternoon/Evening"],
  },
  {
    title: "Stomach Ache",
    symptoms: "Abdominal pain, bloating",
    meds: ["Dicyclomine", "Ranitidine", "ORS"],
    prescription: ["Dicyclomine", "20mg", "3 times/day", "After meals"],
  },
];

const MedicineSuggestions = ({ fillPrescription }) => (
  <div className="mt-10">
    <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Medicine Suggestion</h2>
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {suggestions.map((item, idx) => (
        <div key={idx} className="bg-white rounded-lg shadow p-5">
          <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
          <p className="text-sm mt-2"><strong>Symptoms:</strong> {item.symptoms}</p>
          <p className="text-sm mt-2 font-semibold">Suggested Medicines:</p>
          <ul className="list-disc pl-5 text-sm text-gray-700 mt-1 space-y-1">
            {item.meds.map((med, i) => <li key={i}>{med}</li>)}
          </ul>
          <button
            onClick={() => fillPrescription(...item.prescription)}
            className="mt-4 bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700"
          >
            Prescribe
          </button>
        </div>
      ))}
    </div>
  </div>
);

export default MedicineSuggestions;

const PatientList = ({ patients, setSelectedPatient }) => (
  <section className="w-full md:w-1/3 bg-white border-r overflow-y-auto p-4 border-gray-200">
    <h2 className="text-lg font-semibold mb-3">Incoming Patients</h2>
    <div className="space-y-3">
      {patients.length === 0 ? (
        <p className="text-gray-500">No incoming patients.</p>
      ) : (
        patients.map((patient) => (
          <button
            key={patient.id}
            onClick={() => setSelectedPatient(patient)}
            className="w-full text-left border p-3 rounded hover:bg-blue-50"
          >
            <div className="font-semibold">{patient.name} {patient.surname}</div>
            <div className="text-sm text-gray-500">
              Age: {patient.age}, Weight: {patient.weight}kg
            </div>
          </button>
        ))
      )}
    </div>
  </section>
);

export default PatientList;

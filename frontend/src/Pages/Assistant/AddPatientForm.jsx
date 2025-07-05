import React, { useEffect, useState } from "react";
import { State, City } from "country-state-city";
import { apiFetch } from "../../utils/api";  // ✅ Use your working apiFetch

const indianStates = [
  {
    name: "Maharashtra",
    districts: [
      "Ahmednagar", "Akola", "Amravati", "Aurangabad", "Beed",
      "Bhandara", "Buldhana", "Chandrapur", "Dhule", "Gadchiroli",
      "Gondia", "Hingoli", "Jalgaon", "Jalna", "Kolhapur",
      "Latur", "Mumbai City", "Mumbai Suburban", "Nagpur",
      "Nanded", "Nandurbar", "Nashik", "Osmanabad", "Parbhani",
      "Pune", "Raigad", "Ratnagiri", "Sangli", "Satara",
      "Sindhudurg", "Solapur", "Thane", "Wardha", "Washim", "Yavatmal"
    ]
  }
];

const AddPatientForm = ({ onPatientSaved, editingPatient }) => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    age: "",
    weight: "",
    phone: "",
    address: "",
    gender: "",
    state: "",
    city: "",
  });

  const [cityList, setCityList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load all states on mount
  useEffect(() => {
    const allStates = State.getStatesOfCountry("IN");
    const stateNames = [
      "Maharashtra",
      ...allStates.map((s) => s.name).filter((s) => s !== "Maharashtra")
    ];
    setStateList(stateNames);
  }, []);

  // Pre-fill for editing
  useEffect(() => {
    if (editingPatient) {
      setFormData({
        name: editingPatient.name || "",
        surname: editingPatient.surname || "",
        age: editingPatient.age || "",
        weight: editingPatient.weight || "",
        phone: editingPatient.phone || "",
        address: editingPatient.address || "",
        gender: editingPatient.gender || "",
        state: editingPatient.state || "",
        city: editingPatient.city || "",
      });
      document.getElementById("popupForm")?.classList.remove("hidden");
    }
  }, [editingPatient]);

  // Load cities/districts when state changes
  useEffect(() => {
    if (!formData.state) {
      setCityList([]);
      return;
    }
    if (formData.state === "Maharashtra") {
      const found = indianStates.find((s) => s.name === "Maharashtra");
      setCityList(found ? found.districts : []);
    } else {
      const allStates = State.getStatesOfCountry("IN");
      const stateObj = allStates.find((s) => s.name === formData.state);
      const districts = stateObj
        ? City.getCitiesOfState("IN", stateObj.isoCode).map((d) => d.name)
        : [];
      setCityList(districts);
    }
  }, [formData.state]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  let url = "/assistant/add-patient/";
  let method = "POST";

  if (editingPatient && editingPatient.id) {
    url = `/assistant/edit-patient/${editingPatient.id}/`;
    method = "PUT";
  } else if (editingPatient) {
    console.error("EditingPatient is set but missing ID!", editingPatient);
  }

  try {
    await apiFetch(url, {
      method,
      body: JSON.stringify(formData),
    });

      // Success: Close form and reset
      document.getElementById("popupForm")?.classList.add("hidden");
      setFormData({
        name: "",
        surname: "",
        age: "",
        weight: "",
        phone: "",
        address: "",
        gender: "",
        state: "",
        city: "",
      });
      onPatientSaved();
    } catch (err) {
      console.error("Error saving patient:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      id="popupForm"
      className="fixed inset-0 bg-black bg-opacity-50 hidden z-50 flex items-center justify-center px-4"
    >
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-2xl relative">
        <button
          onClick={() => document.getElementById("popupForm")?.classList.add("hidden")}
          className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-black"
          aria-label="Close form"
        >
          &times;
        </button>

        <h2 className="text-2xl font-semibold mb-4">
          {editingPatient ? "Edit Patient" : "Add New Patient"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 gap-3 sm:gap-4"
        >
          <div className="col-span-1">
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="w-full border px-3 py-2 rounded"
              required
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="col-span-1">
            <input
              type="text"
              name="surname"
              placeholder="Surname"
              className="w-full border px-3 py-2 rounded"
              required
              value={formData.surname}
              onChange={handleChange}
            />
          </div>
          <div className="col-span-1">
            <input
              type="number"
              name="age"
              placeholder="Age"
              className="w-full border px-3 py-2 rounded"
              required
              value={formData.age}
              onChange={handleChange}
            />
          </div>
          <div className="col-span-1">
            <input
              type="number"
              name="weight"
              placeholder="Weight"
              className="w-full border px-3 py-2 rounded"
              required
              value={formData.weight}
              onChange={handleChange}
            />
          </div>
          <div className="col-span-1">
            <input
              type="number"
              name="phone"
              placeholder="Phone"
              className="w-full border px-3 py-2 rounded"
              required
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div className="col-span-1">
            <select
              name="gender"
              className="w-full border px-3 py-2 rounded"
              required
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="col-span-1">
            <select
              name="state"
              className="w-full border px-3 py-2 rounded"
              required
              value={formData.state}
              onChange={handleChange}
            >
              <option value="">Select State</option>
              {stateList.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
          <div className="col-span-1">
            <select
              name="city"
              className="w-full border px-3 py-2 rounded"
              required
              value={formData.city}
              onChange={handleChange}
            >
              <option value="">Select District</option>
              {cityList.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
          <div className="col-span-2">
            <input
              type="text"
              name="address"
              placeholder="Address"
              className="w-full border px-3 py-2 rounded"
              required
              value={formData.address}
              onChange={handleChange}
            />
          </div>
          <div className="col-span-2">
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
              disabled={loading}
            >
              {loading
                ? "Saving..."
                : editingPatient
                  ? "Update"
                  : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPatientForm;

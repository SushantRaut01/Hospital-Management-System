import React from 'react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer,
} from 'recharts';

const patientData = [
  { date: 'Mon', patients: 10 },
  { date: 'Tue', patients: 14 },
  { date: 'Wed', patients: 8 },
  { date: 'Thu', patients: 18 },
  { date: 'Fri', patients: 20 },
  { date: 'Sat', patients: 16 },
  { date: 'Sun', patients: 5 },
];

const medicineData = [
  { name: 'Paracetamol', value: 120 },
  { name: 'Azithromycin', value: 98 },
  { name: 'Ibuprofen', value: 86 },
  { name: 'Vitamin D', value: 65 },
];

const revenueData = [
  { day: 'Mon', revenue: 5000 },
  { day: 'Tue', revenue: 7000 },
  { day: 'Wed', revenue: 4000 },
  { day: 'Thu', revenue: 9000 },
  { day: 'Fri', revenue: 11000 },
  { day: 'Sat', revenue: 8000 },
  { day: 'Sun', revenue: 2000 },
];

const genderData = [
  { name: 'Male', value: 60 },
  { name: 'Female', value: 40 },
];

const COLORS = ['#8884d8', '#82ca9d'];

const InfoCard = ({ title, value, description }) => (
  <div className="bg-white rounded-2xl shadow p-6 flex flex-col justify-between">
    <div>
      <h2 className="text-base sm:text-lg font-semibold text-gray-700">{title}</h2>
      <p className="text-2xl sm:text-3xl font-bold mt-2 text-indigo-700">{value}</p>
    </div>
    <p className="text-sm text-gray-500 mt-2">{description}</p>
  </div>
);

const BreakdownItem = ({ color, label, value }) => (
  <div className="flex items-center gap-2 text-sm text-gray-600">
    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: color }}></span>
    <span className="font-medium">{label}:</span>
    <span className="font-bold text-gray-800">{value}</span>
  </div>
);

const DoctorAnalyticsDashboard = () => {
  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gray-50 min-h-screen">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-6">Doctor Analytics Dashboard</h1>

      {/* Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <InfoCard title="Total Patients This Week" value="91" description="Includes clinic & emergency visits" />
        <InfoCard title="Avg. Consultation Time" value="12 min" description="Across all consultations this week" />
        <InfoCard title="Revenue This Week" value="₹42,000" description="Generated from all patient treatments" />
      </div>

      {/* Line Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mt-8">
        {/* Patients Line Chart */}
        <div className="bg-white rounded-2xl shadow p-4 sm:p-6">
          <h2 className="text-base sm:text-lg font-semibold mb-4 text-gray-700">Patients per Day</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={patientData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="patients" stroke="#4f46e5" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-1">
            <BreakdownItem color="#4f46e5" label="Total Patients" value="91" />
            <BreakdownItem color="#cbd5e1" label="Peak Day" value="Friday (20)" />
            <BreakdownItem color="#cbd5e1" label="Lowest Day" value="Sunday (5)" />
          </div>
        </div>

        {/* Revenue Chart */}
        <div className="bg-white rounded-2xl shadow p-4 sm:p-6">
          <h2 className="text-base sm:text-lg font-semibold mb-4 text-gray-700">Revenue Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#16a34a" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-1">
            <BreakdownItem color="#16a34a" label="Total Revenue" value="₹42,000" />
            <BreakdownItem color="#cbd5e1" label="Highest Day" value="Friday (₹11,000)" />
            <BreakdownItem color="#cbd5e1" label="Lowest Day" value="Sunday (₹2,000)" />
          </div>
        </div>
      </div>

      {/* Bar and Pie Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 mt-8">
        {/* Medicine Bar Chart */}
        <div className="bg-white rounded-2xl shadow p-4 sm:p-6">
          <h2 className="text-base sm:text-lg font-semibold mb-4 text-gray-700">Top Prescribed Medicines</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={medicineData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" />
              <Tooltip />
              <Bar dataKey="value" fill="#0ea5e9" />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-1">
            {medicineData.map((item, idx) => (
              <BreakdownItem
                key={idx}
                color="#0ea5e9"
                label={item.name}
                value={`${item.value} times`}
              />
            ))}
          </div>
        </div>

        {/* Gender Pie Chart */}
        <div className="bg-white rounded-2xl shadow p-4 sm:p-6 col-span-1">
          <h2 className="text-base sm:text-lg font-semibold mb-4 text-gray-700">Gender Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={genderData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label
              >
                {genderData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-1">
            {genderData.map((item, idx) => (
              <BreakdownItem
                key={idx}
                color={COLORS[idx % COLORS.length]}
                label={item.name}
                value={`${item.value}%`}
              />
            ))}
          </div>
        </div>
      </div>
{/* Additional Analytics Components */}
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 mt-8">

  {/* Common Diseases */}
  <div className="bg-white rounded-2xl shadow p-4 sm:p-6">
    <h2 className="text-base sm:text-lg font-semibold mb-4 text-gray-700">Common Diseases</h2>
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie data={[
          { name: 'Fever', value: 40 },
          { name: 'Cold', value: 30 },
          { name: 'Flu', value: 20 },
          { name: 'Diabetes', value: 10 },
        ]} cx="50%" cy="50%" outerRadius={100} fill="#6366f1" label dataKey="value" />
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  </div>

  {/* Age & Gender Distribution */}
  <div className="bg-white rounded-2xl shadow p-4 sm:p-6">
    <h2 className="text-base sm:text-lg font-semibold mb-4 text-gray-700">Age & Gender Distribution</h2>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={[
        { ageGroup: '0-18', Male: 15, Female: 12 },
        { ageGroup: '19-35', Male: 22, Female: 28 },
        { ageGroup: '36-60', Male: 18, Female: 20 },
        { ageGroup: '60+', Male: 10, Female: 15 },
      ]}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="ageGroup" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Male" fill="#3b82f6" />
        <Bar dataKey="Female" fill="#f472b6" />
      </BarChart>
    </ResponsiveContainer>
  </div>

  {/* Treatment Patterns */}
  <div className="bg-white rounded-2xl shadow p-4 sm:p-6">
    <h2 className="text-base sm:text-lg font-semibold mb-4 text-gray-700">Treatment Patterns</h2>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={[
        { type: 'Consultation', count: 50 },
        { type: 'Follow-up', count: 30 },
        { type: 'Emergency', count: 11 },
      ]}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="type" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" fill="#10b981" />
      </BarChart>
    </ResponsiveContainer>
  </div>

  {/* Revenue Per Patient */}
  <div className="bg-white rounded-2xl shadow p-4 sm:p-6">
    <h2 className="text-base sm:text-lg font-semibold mb-4 text-gray-700">Revenue Per Patient</h2>
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={[
        { name: 'Mon', revenue: 550 },
        { name: 'Tue', revenue: 600 },
        { name: 'Wed', revenue: 500 },
        { name: 'Thu', revenue: 700 },
        { name: 'Fri', revenue: 730 },
        { name: 'Sat', revenue: 640 },
        { name: 'Sun', revenue: 400 },
      ]}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="revenue" stroke="#f59e0b" strokeWidth={3} />
      </LineChart>
    </ResponsiveContainer>
  </div>

  {/* Patient Origin (Local vs Outstation) */}
  <div className="bg-white rounded-2xl shadow p-4 sm:p-6">
    <h2 className="text-base sm:text-lg font-semibold mb-4 text-gray-700">Patient Origin</h2>
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie data={[
          { name: 'Local', value: 70 },
          { name: 'Outstation', value: 30 },
        ]} cx="50%" cy="50%" outerRadius={100} label dataKey="value">
          <Cell fill="#34d399" />
          <Cell fill="#f87171" />
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  </div>

  {/* Patient Locations (City-wise) */}
  <div className="bg-white rounded-2xl shadow p-4 sm:p-6">
    <h2 className="text-base sm:text-lg font-semibold mb-4 text-gray-700">Patient Locations</h2>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={[
        { city: 'Delhi', patients: 25 },
        { city: 'Mumbai', patients: 20 },
        { city: 'Bangalore', patients: 18 },
        { city: 'Chennai', patients: 14 },
        { city: 'Kolkata', patients: 10 },
      ]}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="city" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="patients" fill="#8b5cf6" />
      </BarChart>
    </ResponsiveContainer>
  </div>
</div>

    </div>
  );
};

export default DoctorAnalyticsDashboard;

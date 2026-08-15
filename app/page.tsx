"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const API_URL =
  "https://attendance-backend-y257.onrender.com/employee/employees";

/*
 * Google Sheet column names
 */



type Employee = Record<string, string>;

export default function Home() {
  const [employeeId, setEmployeeId] = useState("");

  const [employees, setEmployees] = useState<Employee[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [searching, setSearching] = useState(false);

  const router = useRouter();


  /* =====================================================
     FETCH ALL EMPLOYEES WHEN WEBSITE OPENS
  ===================================================== */

  useEffect(() => {
    fetchEmployees();
  }, []);


  const fetchEmployees = async () => {
    try {
      setLoading(true);
      setError("");

      console.log("Fetching employee data...");

      const response = await fetch(API_URL, {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch employee data");
      }

      const data = await response.json();

      console.log("API Response:", data);

      if (!data?.data || !Array.isArray(data.data)) {
        throw new Error("Invalid API response");
      }

      /*
       * Keep the API arrays exactly as they are.
       *
       * data.data:
       *
       * [
       *   [employee 1 data],
       *   [employee 2 data],
       *   [employee 3 data],
       *   ...
       * ]
       */

      setEmployees(data.data);

      console.log(
        "Employees loaded:",
        data.data.length
      );

    } catch (error) {

      console.error("Fetch error:", error);

      setError(
        "Unable to load employee data. Please try again."
      );

    } finally {

      setLoading(false);

    }
  };


  /* =====================================================
     SEARCH EMPLOYEE
  ===================================================== */

  const handleSubmit = (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    const id = employeeId.trim();

    if (!id) {
      return;
    }

    setSearching(true);

    /*
     * SFX HR Code is at index 1
     */

    const employee = employees.find(
      (item) =>
        item[0]?.trim().toLowerCase() ===
        id.toLowerCase()
    );

    console.log("Entered ID:", id);
    console.log("Employee Found:", employee);

    /*
     * Employee not found
     */

    if (!employee) {

      setError(
        "Employee ID not found. Please check your ID."
      );

      setSearching(false);

      return;
    }

    /*
     * Pass the COMPLETE original array
     * to the attendance page.
     */

    sessionStorage.setItem(
      "employeeData",
      JSON.stringify(employee)
    );

    /*
     * Save ID also if you need it later
     */

    sessionStorage.setItem(
      "employeeId",
      id
    );

    /*
     * Go to attendance page
     */

    router.push("/attendance");
  };


  /* =====================================================
     LOADING SCREEN
  ===================================================== */

  if (loading) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center">

          <div className="relative w-24 h-24 mx-auto flex items-center justify-center">

            <div className="absolute inset-0 rounded-full border-2 border-slate-700" />

            <div className="absolute inset-2 rounded-full border-2 border-slate-600 border-t-white animate-spin" />

            <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-2xl overflow-hidden">
              <img
                src="/sfx_logo.png"
                alt="SFX Logo"
                className="w-full h-full object-contain"
              />
            </div>

          </div>

          <h1 className="text-orange-500 text-2xl font-bold mt-8 tracking-widest">
            SFX
          </h1>

          <p className="text-slate-400 text-sm mt-2">
            Loading attendance
          </p>

          <div className="flex justify-center gap-1.5 mt-5">
            <span className="w-2 h-2 bg-white rounded-full animate-bounce" />
            <span className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:150ms]" />
            <span className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:300ms]" />
          </div>

        </div>
      </main>
    );
  }


  /* =====================================================
     ERROR SCREEN
  ===================================================== */

  if (error && employees.length === 0) {

    return (
      <main className="min-h-screen bg-slate-100 flex items-center justify-center px-4">

        <div className="w-full max-w-md">

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">

            <div className="w-14 h-14 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">

              <span className="text-xl font-bold">
                !
              </span>

            </div>

            <h1 className="text-xl font-bold text-slate-900">
              Unable to Load
            </h1>

            <p className="text-sm text-slate-500 mt-2">
              {error}
            </p>

            <button
              onClick={fetchEmployees}
              className="w-full mt-6 bg-slate-900 text-white py-3 rounded-xl font-semibold hover:bg-slate-800 transition"
            >
              Try Again
            </button>

          </div>

        </div>

      </main>
    );
  }


  /* =====================================================
     MAIN UI
  ===================================================== */

  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center px-4">

      <div className="w-full max-w-md">

        {/* Card */}

        <div className="bg-white rounded-2xl shadow-lg p-8">

          {/* Logo / Brand */}

          <div className="text-center mb-8">

            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4">

              <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-2xl overflow-hidden">
              <img
                src="/sfx_logo.png"
                alt="SFX Logo"
                className="w-full h-full object-contain"
              />
            </div>

            </div>

            <h1 className="text-2xl font-bold text-slate-900">
              Shadowfax
            </h1>

            <p className="text-slate-500 mt-2">
              Attendance Portal
            </p>

          </div>


          {/* Form */}

          <form onSubmit={handleSubmit}>

            <label
              htmlFor="employeeId"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Employee ID
            </label>


            <input
              id="employeeId"
              type="text"
              value={employeeId}
              onChange={(e) => {
                setEmployeeId(e.target.value);

                if (error) {
                  setError("");
                }
              }}
              placeholder="Enter your employee ID"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 outline-none text-black placeholder-black focus:border-slate-900 focus:ring-2 focus:ring-slate-200 transition"
            />

            {/* Search Error */}

            {error && (
              <p className="text-sm text-red-500 mt-2">
                {error}
              </p>
            )}


            <button
              type="submit"
              disabled={searching}
              className="w-full mt-5 bg-slate-900 text-white py-3 rounded-xl font-semibold hover:bg-slate-800 disabled:opacity-50 transition"
            >

              {searching
                ? "Opening..."
                : "View Attendance"}

            </button>

          </form>


          {/* Loaded Employees */}

          <div className="text-center mt-6">

            <p className="text-xs text-slate-400">
              Attendance data loaded successfully
            </p>

          </div>

        </div>


        {/* Footer */}

        <p className="text-center text-sm text-slate-400 mt-5">
          Shadowfax Attendance System
        </p>

        <p className="text-center text-xs text-slate-400 mt-1">
          Made by Abhi
        </p>

      </div>

    </main>
  );
}
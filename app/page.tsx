"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const API_URL =
  "https://attendance-backend-y257.onrender.com/employee/employees";

type Employee = Record<string, string>;

export default function Home() {
  const [employeeId, setEmployeeId] = useState("");
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searching, setSearching] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const router = useRouter();
  const [topRow, setTopRow] = useState<string[]>([]);
  /* =====================================================
     FETCH ALL EMPLOYEES
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

      const topRow = data.data[0];

      setTopRow(topRow);

      console.log("Top Row:", topRow);

      console.log("API Response:", data);

      if (!data?.data || !Array.isArray(data.data)) {
        throw new Error("Invalid API response");
      }

      setEmployees(data.data);

      console.log("Employees loaded:", data.data.length);
    } catch (error) {
      console.error("Fetch error:", error);

      setError(
        "Unable to load employee data. Please try again."
      );
    } finally {
      // Loading screen stays for a little moment
      setTimeout(() => {
        setLoading(false);

        // Immediately show Welcome screen
        setShowWelcome(true);

        // After welcome animation, show login screen
        setTimeout(() => {
          setShowWelcome(false);
        }, 2600);
      }, 500);
    }
  };

  /* =====================================================
     SEARCH EMPLOYEE
  ===================================================== */

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const id = employeeId.trim();

    if (!id) {
      setError("Please enter your employee ID.");
      return;
    }

    setSearching(true);
    setError("");

    const searchId = employeeId.trim().toUpperCase();

    const employee = employees.find((emp) => {
      const valinorId = emp[0]?.trim().toUpperCase();
      const tempEmpCode = emp[2]?.trim().toUpperCase();

      return (
        valinorId === searchId ||
        tempEmpCode === searchId
      );
    });

    console.log("Entered ID:", id);
    console.log("Employee Found:", employee);

    if (!employee) {
      setError(
        "Employee ID not found. Please check your ID."
      );

      setSearching(false);
      return;
    }

    sessionStorage.setItem(
      "employeeData",
      JSON.stringify(employee)
    );

    sessionStorage.setItem(
      "topRow",
      JSON.stringify(topRow)
    );

    sessionStorage.setItem(
      "employeeId",
      id
    );

    router.push("/attendance");
  };

  /* =====================================================
     LOADING SCREEN
  ===================================================== */

  if (loading) {
    return (
      <main className="relative min-h-screen overflow-hidden bg-slate-950 flex items-center justify-center px-4">

        {/* Background Effects */}

        <div className="absolute -top-32 -left-32 w-80 h-80 bg-orange-500/20 rounded-full blur-3xl animate-pulse" />

        <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse [animation-delay:1s]" />

        <div className="relative text-center animate-[fadeIn_.8s_ease-out]">

          {/* Animated Logo */}

          <div className="relative w-28 h-28 mx-auto flex items-center justify-center">

            <div className="absolute inset-0 rounded-full border border-orange-400/30 animate-ping" />

            <div className="absolute inset-2 rounded-full border-2 border-slate-700 border-t-orange-500 animate-spin" />

            <div className="absolute inset-5 rounded-2xl bg-white shadow-2xl shadow-orange-500/20 flex items-center justify-center overflow-hidden animate-[float_3s_ease-in-out_infinite]">

              <img
                src="/sfx_logo.png"
                alt="SFX Logo"
                className="w-full h-full object-contain"
              />

            </div>

          </div>

          <h1 className="text-orange-400 text-3xl font-black mt-8 tracking-[0.35em] animate-pulse">
            SFX
          </h1>

          <p className="text-slate-400 text-sm mt-3">
            Loading attendance portal
          </p>

          {/* Loading Dots */}

          <div className="flex justify-center gap-2 mt-6">

            <span className="w-2.5 h-2.5 bg-orange-400 rounded-full animate-bounce" />

            <span className="w-2.5 h-2.5 bg-orange-400 rounded-full animate-bounce [animation-delay:150ms]" />

            <span className="w-2.5 h-2.5 bg-orange-400 rounded-full animate-bounce [animation-delay:300ms]" />

          </div>

        </div>

        <style jsx global>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px) scale(0.96);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }

          @keyframes float {
            0%,
            100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-8px);
            }
          }
        `}</style>
      </main>
    );
  }

  /* =====================================================
   WELCOME SCREEN
===================================================== */

  if (showWelcome) {
    return (
      <main className="relative min-h-screen overflow-hidden bg-slate-950 flex items-center justify-center">

        {/* Background Glow */}

        <div className="absolute inset-0">

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange-500/20 rounded-full blur-[120px] animate-pulse" />

          <div className="absolute top-10 left-10 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl animate-[floatWelcome_4s_ease-in-out_infinite]" />

          <div className="absolute bottom-10 right-10 w-52 h-52 bg-blue-500/10 rounded-full blur-3xl animate-[floatWelcome_5s_ease-in-out_infinite_reverse]" />

        </div>


        {/* Confetti */}

        <div className="absolute inset-0 pointer-events-none">

          <span className="absolute top-[15%] left-[15%] text-orange-400 text-2xl animate-[confetti_2.5s_ease-out_infinite]">
            ✦
          </span>

          <span className="absolute top-[25%] right-[18%] text-yellow-400 text-xl animate-[confetti_3s_ease-out_infinite_.2s]">
            ✦
          </span>

          <span className="absolute bottom-[25%] left-[20%] text-blue-400 text-xl animate-[confetti_2.7s_ease-out_infinite_.4s]">
            ✦
          </span>

          <span className="absolute bottom-[18%] right-[20%] text-orange-300 text-2xl animate-[confetti_3.2s_ease-out_infinite_.6s]">
            ✦
          </span>

          <span className="absolute top-[45%] left-[8%] text-white/40 text-lg animate-[confetti_2.8s_ease-out_infinite_.8s]">
            •
          </span>

          <span className="absolute top-[40%] right-[10%] text-white/40 text-lg animate-[confetti_3.1s_ease-out_infinite_1s]">
            •
          </span>

        </div>


        {/* Welcome Content */}

        <div className="relative text-center">

          {/* Logo */}

          <div className="relative w-32 h-32 mx-auto mb-8">

            {/* Outer Ring */}

            <div className="absolute inset-0 rounded-full border border-orange-400/20 animate-ping" />

            <div className="absolute -inset-3 rounded-full border border-orange-500/10 animate-[spin_8s_linear_infinite]" />

            {/* Glow */}

            <div className="absolute inset-0 rounded-3xl bg-orange-500/30 blur-2xl animate-pulse" />

            {/* Logo */}

            <div className="relative w-32 h-32 rounded-[32px] bg-white shadow-2xl shadow-orange-500/30 flex items-center justify-center overflow-hidden animate-[welcomeLogo_.8s_cubic-bezier(.16,1,.3,1)]">

              <img
                src="/sfx_logo.png"
                alt="SFX Logo"
                className="w-full h-full object-contain"
              />

            </div>

          </div>


          {/* Welcome */}

          <p className="text-slate-400 text-lg tracking-[0.25em] uppercase animate-[welcomeText_.7s_ease-out]">
            Welcome to
          </p>


          {/* Shadowfax */}

          <h1 className="mt-3 text-5xl sm:text-6xl font-black tracking-tight text-white animate-[shadowfaxReveal_1s_cubic-bezier(.16,1,.3,1)]">

            Shadowfax

          </h1>


          {/* Orange Line */}

          <div className="flex justify-center items-center gap-3 mt-5 animate-[fadeIn_1.5s_ease-out]">

            <span className="h-px w-10 bg-gradient-to-r from-transparent to-orange-500" />

            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />

            <span className="h-px w-10 bg-gradient-to-l from-transparent to-orange-500" />

          </div>


          <p className="text-slate-500 text-sm mt-5 animate-[fadeIn_1.8s_ease-out]">
            Attendance Portal
          </p>

        </div>


        <style jsx global>{`

        @keyframes welcomeLogo {

          0% {
            opacity: 0;
            transform: scale(0.2) rotate(-180deg);
          }

          60% {
            transform: scale(1.15) rotate(10deg);
          }

          100% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }

        }


        @keyframes welcomeText {

          from {
            opacity: 0;
            transform: translateY(25px);
            letter-spacing: 0.5em;
          }

          to {
            opacity: 1;
            transform: translateY(0);
            letter-spacing: 0.25em;
          }

        }


        @keyframes shadowfaxReveal {

          0% {
            opacity: 0;
            transform: translateY(35px) scale(0.7);
            filter: blur(10px);
          }

          60% {
            transform: translateY(-5px) scale(1.05);
            filter: blur(0);
          }

          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }

        }


        @keyframes floatWelcome {

          0%,
          100% {
            transform: translateY(0) translateX(0);
          }

          50% {
            transform: translateY(-30px) translateX(20px);
          }

        }


        @keyframes confetti {

          0% {
            opacity: 0;
            transform: translateY(40px) rotate(0deg) scale(0.5);
          }

          30% {
            opacity: 1;
          }

          100% {
            opacity: 0;
            transform: translateY(-180px) rotate(360deg) scale(1.5);
          }

        }

      `}</style>

      </main>
    );
  }
  /* =====================================================
     ERROR SCREEN
  ===================================================== */

  if (error && employees.length === 0) {
    return (
      <main className="relative min-h-screen overflow-hidden bg-slate-100 flex items-center justify-center px-4">

        {/* Background */}

        <div className="absolute -top-40 -right-40 w-96 h-96 bg-red-200/40 rounded-full blur-3xl" />

        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-orange-200/40 rounded-full blur-3xl" />

        <div className="relative w-full max-w-md animate-[fadeIn_.5s_ease-out]">

          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white p-8 text-center">

            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-sm animate-[shake_.5s_ease-in-out]">

              <span className="text-2xl font-black">
                !
              </span>

            </div>

            <h1 className="text-2xl font-bold text-slate-900">
              Unable to Load
            </h1>

            <p className="text-sm text-slate-500 mt-3 leading-6">
              {error}
            </p>

            <button
              onClick={fetchEmployees}
              className="group w-full mt-7 bg-slate-900 text-white py-3.5 rounded-xl font-semibold shadow-lg shadow-slate-900/20 hover:-translate-y-0.5 hover:shadow-xl active:scale-[0.98] transition-all duration-300"
            >
              <span className="inline-flex items-center gap-2">
                Try Again

                <span className="group-hover:rotate-180 transition-transform duration-500">
                  ↻
                </span>
              </span>
            </button>

          </div>

        </div>

        <style jsx global>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes shake {
            0%,
            100% {
              transform: translateX(0);
            }
            25% {
              transform: translateX(-5px);
            }
            75% {
              transform: translateX(5px);
            }
          }
        `}</style>

      </main>
    );
  }

  /* =====================================================
     MAIN UI
  ===================================================== */

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-100 flex items-center justify-center px-4 py-8">

      {/* =================================================
          BACKGROUND ANIMATION
      ================================================= */}

      <div className="absolute inset-0 pointer-events-none">

        <div className="absolute -top-32 -left-32 w-96 h-96 bg-orange-300/30 rounded-full blur-3xl animate-[float_8s_ease-in-out_infinite]" />

        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl animate-[float_10s_ease-in-out_infinite_reverse]" />

        <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-purple-300/15 rounded-full blur-3xl animate-[float_12s_ease-in-out_infinite]" />

      </div>

      {/* =================================================
          MAIN CONTAINER
      ================================================= */}

      <div className="relative w-full max-w-md">

        {/* Card */}

        <div className="relative bg-white/90 backdrop-blur-xl rounded-[28px] shadow-[0_25px_70px_rgba(15,23,42,0.12)] border border-white p-7 sm:p-9 animate-[cardEnter_.7s_cubic-bezier(.16,1,.3,1)]">

          {/* Top Glow */}

          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent rounded-full" />

          {/* =================================================
              LOGO
          ================================================= */}

          <div className="text-center mb-9">

            <div className="relative w-20 h-20 mx-auto mb-5">

              {/* Glow */}

              <div className="absolute inset-0 bg-orange-400/20 rounded-3xl blur-xl animate-pulse" />

              {/* Logo */}

              <div className="relative w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-xl border border-slate-100 overflow-hidden animate-[float_4s_ease-in-out_infinite]">

                <img
                  src="/sfx_logo.png"
                  alt="SFX Logo"
                  className="w-full h-full object-contain"
                />

              </div>

            </div>

            <h1 className="text-3xl font-black tracking-tight text-slate-900">
              Shadowfax
            </h1>

            <div className="flex items-center justify-center gap-2 mt-2">

              <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />

              <p className="text-slate-500 text-sm">
                Attendance Portal
              </p>

              <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />

            </div>

          </div>

          {/* =================================================
              FORM
          ================================================= */}

          <form onSubmit={handleSubmit}>

            <label
              htmlFor="employeeId"
              className="block text-sm font-semibold text-slate-700 mb-2.5"
            >
              Employee ID
            </label>

            <div className="relative group">

              {/* Input Glow */}

              <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-400 to-orange-500 rounded-xl opacity-0 group-focus-within:opacity-20 blur transition duration-300" />

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
                autoComplete="off"
                className="relative w-full px-4 py-3.5 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder-slate-400 outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all duration-300"
              />

            </div>

            {/* Search Error */}

            {error && (
              <div className="flex items-center gap-2 mt-3 text-sm text-red-500 animate-[errorIn_.3s_ease-out]">

                <span className="w-5 h-5 flex items-center justify-center rounded-full bg-red-100 font-bold">
                  !
                </span>

                <span>
                  {error}
                </span>

              </div>
            )}

            {/* Button */}

            <button
              type="submit"
              disabled={searching}
              className="group relative overflow-hidden w-full mt-6 bg-slate-900 text-white py-3.5 rounded-xl font-semibold shadow-lg shadow-slate-900/20 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-slate-900/25 active:translate-y-0 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300"
            >

              {/* Button Shine */}

              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700" />

              <span className="relative flex items-center justify-center gap-2">

                {searching ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Opening...
                  </>
                ) : (
                  <>
                    View Attendance

                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      →
                    </span>
                  </>
                )}

              </span>

            </button>

          </form>

          {/* =================================================
              STATUS
          ================================================= */}

          <div className="flex items-center justify-center gap-2 mt-7">

            <span className="relative flex h-2.5 w-2.5">

              <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />

              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />

            </span>

            <p className="text-xs text-slate-400">
              Attendance data loaded successfully
            </p>

          </div>

        </div>

        {/* =================================================
            FOOTER
        ================================================= */}

        <div className="text-center mt-6 animate-[fadeIn_1s_ease-out]">

          <p className="text-sm font-medium text-slate-500">
            Shadowfax Attendance System
          </p>

          <p className="text-xs text-slate-400 mt-1">
            Made by Abhi
          </p>

        </div>

      </div>

      {/* =================================================
          GLOBAL ANIMATIONS
      ================================================= */}

      <style jsx global>{`

        @keyframes cardEnter {
          from {
            opacity: 0;
            transform: translateY(35px) scale(0.96);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(15px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes errorIn {
          from {
            opacity: 0;
            transform: translateX(-8px);
          }

          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }

          25% {
            transform: translateX(-5px);
          }

          75% {
            transform: translateX(5px);
          }
        }

      `}</style>

    </main>
  );
}
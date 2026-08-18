"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Employee = string[];

/* =========================================================
   MAIN PAGE
========================================================= */

export default function AttendancePage() {
  const router = useRouter();

  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  console.log("employee:", employee);

  /* =======================================================
     LOAD EMPLOYEE FROM SESSION STORAGE
  ======================================================= */

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;

    try {
      const storedEmployee =
        sessionStorage.getItem("employeeData");

      /*
       * If employee data does not exist,
       * return to home page.
       */
      if (!storedEmployee) {
        router.push("/");
        return;
      }

      /*
       * Convert stored JSON back to array.
       */
      const employeeData: Employee =
        JSON.parse(storedEmployee);

      /*
       * Validate that stored data is an array.
       */
      if (!Array.isArray(employeeData)) {
        throw new Error("Invalid employee data.");
      }

      console.log("Selected Employee:", employeeData);

      setEmployee(employeeData);

      /*
       * Small loading animation.
       */
      timer = setTimeout(() => {
        setLoading(false);
      }, 700);
    } catch (err) {
      console.error("Error loading employee:", err);

      setError(
        "Unable to load employee attendance."
      );

      setLoading(false);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [router]);

  /* =======================================================
     CHANGE EMPLOYEE
  ======================================================= */

  const handleChangeEmployee = () => {
    sessionStorage.removeItem("employeeId");
    sessionStorage.removeItem("employeeData");

    router.push("/");
  };

  /* =======================================================
     LOADING SCREEN
  ======================================================= */

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center overflow-hidden relative">

        {/* Background Glow */}

        <div className="absolute inset-0 overflow-hidden pointer-events-none">

          <div
            className="
              absolute
              w-72
              h-72
              bg-red-500/20
              rounded-full
              blur-3xl
              -top-20
              -left-20
              animate-pulse
            "
          />

          <div
            className="
              absolute
              w-80
              h-80
              bg-orange-500/10
              rounded-full
              blur-3xl
              -bottom-20
              -right-20
              animate-pulse
            "
          />

        </div>

        {/* Loading Content */}

        <div className="relative text-center">

          {/* Logo */}

          <div className="relative w-24 h-24 mx-auto">

            <div
              className="
                absolute
                inset-0
                rounded-3xl
                border
                border-red-400/30
                animate-ping
              "
            />

            <div
              className="
                relative
                w-24
                h-24
                rounded-3xl
                bg-white
                flex
                items-center
                justify-center
                shadow-2xl
                shadow-red-500/20
                animate-bounce
              "
            >

              <img
                src="/sfx_logo.png"
                alt="Shadowfax"
                className="w-16 h-16 object-contain"
              />

            </div>

          </div>

          <h2 className="text-white font-bold text-xl mt-7 animate-pulse">
            Loading Attendance
          </h2>

          <p className="text-slate-400 text-sm mt-2">
            Preparing your dashboard...
          </p>

          {/* Loading Dots */}

          <div className="flex justify-center gap-1 mt-5">

            <span className="w-2 h-2 rounded-full bg-red-500 animate-bounce" />

            <span
              className="w-2 h-2 rounded-full bg-red-500 animate-bounce"
              style={{
                animationDelay: "150ms",
              }}
            />

            <span
              className="w-2 h-2 rounded-full bg-red-500 animate-bounce"
              style={{
                animationDelay: "300ms",
              }}
            />

          </div>

        </div>

      </main>
    );
  }

  /* =======================================================
     ERROR SCREEN
  ======================================================= */

  if (error) {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center px-4">

        <div
          className="
            bg-white
            rounded-3xl
            shadow-2xl
            p-8
            max-w-md
            w-full
            text-center
            animate-pulse
          "
        >

          {/* Error Icon */}

          <div
            className="
              w-16
              h-16
              bg-red-50
              text-red-500
              rounded-2xl
              flex
              items-center
              justify-center
              mx-auto
              text-2xl
              font-bold
            "
          >
            !
          </div>

          <h2 className="text-xl font-bold text-slate-900 mt-5">
            Unable to Load Attendance
          </h2>

          <p className="text-sm text-slate-500 mt-2">
            {error}
          </p>

          <button
            type="button"
            onClick={handleChangeEmployee}
            className="
              mt-7
              bg-slate-900
              text-white
              px-6
              py-3
              rounded-xl
              text-sm
              font-semibold
              hover:bg-red-600
              hover:-translate-y-1
              active:scale-95
              transition-all
              duration-300
              shadow-lg
            "
          >
            Go Back
          </button>

        </div>

      </main>
    );
  }

  /* =======================================================
     SAFETY CHECK
  ======================================================= */

  if (!employee) {
    return null;
  }

  /* =======================================================
     CURRENT STATUS
  ======================================================= */

  const currentStatus =
    employee[73]?.trim().toUpperCase();

  const isActive =
    currentStatus === "ACTIVE";

  /* =======================================================
     MAIN UI
  ======================================================= */

  return (
    <main
      className="
        min-h-screen
        bg-slate-100
        relative
        overflow-hidden
      "
    >

      {/* ===================================================
          BACKGROUND DECORATION
      =================================================== */}

      <div className="fixed inset-0 pointer-events-none overflow-hidden">

        {/* Top Right */}

        <div
          className="
            absolute
            -top-32
            -right-32
            w-96
            h-96
            bg-red-500/10
            rounded-full
            blur-3xl
            animate-pulse
          "
        />

        {/* Left Middle */}

        <div
          className="
            absolute
            top-[45%]
            -left-40
            w-96
            h-96
            bg-orange-400/10
            rounded-full
            blur-3xl
          "
        />

        {/* Bottom Right */}

        <div
          className="
            absolute
            bottom-0
            right-[20%]
            w-72
            h-72
            bg-red-400/5
            rounded-full
            blur-3xl
          "
        />

      </div>

      {/* ===================================================
          HEADER
      =================================================== */}

      <header
        className="
          sticky
          top-0
          z-50
          bg-white/80
          backdrop-blur-xl
          border-b
          border-slate-200/70
        "
      >

        <div className="max-w-6xl mx-auto px-4 py-4">

          <div className="flex items-center justify-between">

            {/* Logo + Brand */}

            <div className="flex items-center gap-3">

              <div
                className="
                  w-12
                  h-12
                  rounded-2xl
                  bg-white
                  flex
                  items-center
                  justify-center
                  shadow-lg
                  shadow-slate-200
                  border
                  border-slate-100
                  hover:rotate-6
                  hover:scale-105
                  transition-all
                  duration-300
                "
              >

                <img
                  src="/sfx_logo.png"
                  alt="SFX Logo"
                  className="w-10 h-10 object-contain"
                />

              </div>

              <div>

                <h1
                  className="
                    font-extrabold
                    text-lg
                    text-slate-900
                    tracking-tight
                  "
                >
                  Shadowfax
                </h1>

                <p className="text-xs text-slate-500">
                  Employee Attendance Portal
                </p>

              </div>

            </div>

            {/* Change Employee */}

            <button
              type="button"
              onClick={handleChangeEmployee}
              className="
                group
                text-sm
                font-semibold
                text-slate-600
                hover:text-red-600
                transition-all
                duration-300
                flex
                items-center
                gap-2
              "
            >

              <span className="hidden sm:inline">
                Change Employee
              </span>

              <span
                className="
                  w-9
                  h-9
                  rounded-xl
                  bg-slate-100
                  group-hover:bg-red-50
                  flex
                  items-center
                  justify-center
                  group-hover:rotate-12
                  transition-all
                  duration-300
                "
              >
                ↗
              </span>

            </button>

          </div>

        </div>

      </header>

      {/* ===================================================
          CONTENT
      =================================================== */}

      <div className="relative max-w-6xl mx-auto px-4 py-8">

        {/* =================================================
            EMPLOYEE DETAILS
        ================================================= */}

        <section
          className="
            bg-white/90
            backdrop-blur-xl
            rounded-3xl
            shadow-xl
            shadow-slate-200/50
            border
            border-white
            p-6
            mb-6
            transition-all
            duration-500
            hover:shadow-2xl
            hover:-translate-y-1
          "
        >

          <div
            className="
              flex
              flex-col
              lg:flex-row
              lg:items-center
              lg:justify-between
              gap-7
            "
          >

            {/* Employee Name */}

            <div>

              <div className="flex items-center gap-2 mb-2">

                <span className="relative flex h-2.5 w-2.5">

                  <span
                    className="
                      absolute
                      inline-flex
                      h-full
                      w-full
                      rounded-full
                      bg-red-400
                      opacity-75
                      animate-ping
                    "
                  />

                  <span
                    className="
                      relative
                      inline-flex
                      h-2.5
                      w-2.5
                      rounded-full
                      bg-red-500
                    "
                  />

                </span>

                <p
                  className="
                    text-xs
                    uppercase
                    tracking-wider
                    font-semibold
                    text-slate-400
                  "
                >
                  Employee Details
                </p>

              </div>

              <h2
                className="
                  text-2xl
                  md:text-3xl
                  font-extrabold
                  text-slate-900
                  tracking-tight
                "
              >
                {employee[4] || "Employee"}
              </h2>

              <p className="text-sm text-slate-500 mt-2">

                Employee ID:

                <span className="font-semibold text-slate-700 ml-1">
                  {employee[0] || "-"}
                </span>

              </p>

            </div>

            {/* Employee Information */}

            <div
              className="
                grid
                grid-cols-2
                md:grid-cols-4
                gap-x-8
                gap-y-5
                text-sm
              "
            >

              <InfoItem
                label="Department"
                value={employee[26]}
              />

              <InfoItem
                label="Designation"
                value={employee[14]}
              />

              <InfoItem
                label="Branch Code"
                value={employee[17]}
              />

              <InfoItem
                label="Week Off"
                value={employee[28]}
              />

              <InfoItem
                label="State"
                value={employee[20]}
              />

              <InfoItem
                label="City"
                value={employee[21]}
              />

              <InfoItem
                label="Shift"
                value={employee[27]}
              />

              {/* Current Status */}

              <div>

                <p className="text-slate-400 mb-1">
                  Current Status
                </p>

                <div className="flex items-center gap-2">

                  <span className="relative flex h-2.5 w-2.5">

                    <span
                      className={`
                        absolute
                        inline-flex
                        h-full
                        w-full
                        rounded-full
                        opacity-75
                        animate-ping
                        ${
                          isActive
                            ? "bg-green-400"
                            : "bg-red-400"
                        }
                      `}
                    />

                    <span
                      className={`
                        relative
                        inline-flex
                        h-2.5
                        w-2.5
                        rounded-full
                        ${
                          isActive
                            ? "bg-green-500"
                            : "bg-red-500"
                        }
                      `}
                    />

                  </span>

                  <span
                    className={`
                      font-bold
                      ${
                        isActive
                          ? "text-green-700"
                          : "text-red-700"
                      }
                    `}
                  >
                    {employee[73] || "Inactive"}
                  </span>

                </div>

              </div>

            </div>

          </div>

        </section>

        {/* =================================================
            SUMMARY CARDS
        ================================================= */}

        <div
          className="
            grid
            grid-cols-2
            md:grid-cols-4
            gap-4
            mb-6
          "
        >

          <SummaryCard
            title="Present Days"
            value={employee[60]}
            subtitle="Attendance period"
            valueClass="text-slate-900"
            icon="✓"
            delay="0ms"
          />

          <SummaryCard
            title="Payable Days"
            value={employee[70]}
            subtitle="Payable attendance"
            valueClass="text-green-600"
            icon="₹"
            delay="100ms"
          />

          <SummaryCard
            title="Week Off"
            value={employee[63]}
            subtitle="Weekly off days"
            valueClass="text-orange-500"
            icon="☀"
            delay="200ms"
          />

          <SummaryCard
            title="LWP"
            value={employee[66]}
            subtitle="Leave without pay"
            valueClass="text-red-500"
            icon="!"
            delay="300ms"
          />

        </div>

        {/* =================================================
            ATTENDANCE
        ================================================= */}

        <section
          className="
            bg-white
            rounded-3xl
            shadow-xl
            shadow-slate-200/50
            border
            border-slate-100
            overflow-hidden
          "
        >

          {/* Attendance Header */}

          <div
            className="
              px-6
              py-5
              border-b
              border-slate-200
            "
          >

            <div className="flex items-center justify-between">

              <div>

                <div className="flex items-center gap-3">

                  <div
                    className="
                      w-10
                      h-10
                      rounded-xl
                      bg-red-50
                      flex
                      items-center
                      justify-center
                      text-red-500
                      shadow-sm
                    "
                  >
                    📅
                  </div>

                  <div>

                    <h3
                      className="
                        font-extrabold
                        text-lg
                        text-slate-900
                      "
                    >
                      Attendance
                    </h3>

                    <p className="text-xs text-slate-500">
                      August 2026
                    </p>

                  </div>

                </div>

              </div>

              {/* Branch */}

              <div
                className="
                  hidden
                  sm:flex
                  items-center
                  gap-2
                  px-3
                  py-2
                  bg-slate-50
                  rounded-xl
                  text-xs
                  font-bold
                  text-slate-600
                "
              >

                <span
                  className="
                    w-2
                    h-2
                    bg-green-500
                    rounded-full
                    animate-pulse
                  "
                />

                {employee[17] || "-"}

              </div>

            </div>

          </div>

          {/* =================================================
              ATTENDANCE GRID
          ================================================= */}

          <div className="p-4 md:p-6">

            <div
              className="
                grid
                grid-cols-4
                sm:grid-cols-5
                md:grid-cols-7
                gap-2
                md:gap-4
              "
            >

              {employee
                .slice(29, 60)
                .map((status, index) => {

                  const cleanStatus =
                    status?.trim().toUpperCase() || "";

                  let actualStatus = "--";

                  if (
                    [
                      "P",
                      "P1",
                      "P2",
                      "P3",
                      "WO",
                      "LWP",
                      "A",
                      "HD",
                      "PL",
                      "HPL",
                      "NA",
                    ].includes(cleanStatus)
                  ) {
                    actualStatus = cleanStatus;
                  }

                  if (
                    status?.trim() === "Left"
                  ) {
                    actualStatus = "Left";
                  }

                  return (
                    <AttendanceDayCard
                      key={index}
                      date={`${String(index + 1).padStart(
                        2,
                        "0"
                      )}-Aug`}
                      status={actualStatus}
                      delay={index}
                    />
                  );
                })}

            </div>

          </div>

          {/* =================================================
              LEGEND
          ================================================= */}

          <div
            className="
              px-6
              py-5
              border-t
              border-slate-200
              bg-slate-50/50
            "
          >

            <div className="flex flex-wrap gap-x-6 gap-y-3">

              <Legend
                status="P"
                label="Present"
              />

              <Legend
                status="A"
                label="Absent"
              />

              <Legend
                status="WO"
                label="Week Off"
              />

              <Legend
                status="LWP"
                label="Leave Without Pay"
              />

              <Legend
                status="NA"
                label="Not Available"
              />

            </div>

          </div>

        </section>

        {/* =================================================
            FOOTER
        ================================================= */}

        <div className="text-center mt-8 pb-8">

          <div className="flex items-center justify-center gap-2">

            <span className="h-px w-10 bg-slate-300" />

            <p className="text-xs font-medium text-slate-400">
              Shadowfax Attendance Portal
            </p>

            <span className="h-px w-10 bg-slate-300" />

          </div>

          <p className="text-xs text-slate-400 mt-2">
            Made with ❤️ by Abhi
          </p>

        </div>

      </div>

    </main>
  );
}


/* =========================================================
   INFO ITEM
========================================================= */

function InfoItem({
  label,
  value,
}: {
  label: string;
  value: string | undefined;
}) {
  return (
    <div className="group">

      <p className="text-slate-400 mb-1 text-xs">
        {label}
      </p>

      <p
        className="
          font-semibold
          text-slate-700
          group-hover:text-red-600
          transition-colors
          duration-300
        "
      >
        {value || "-"}
      </p>

    </div>
  );
}


/* =========================================================
   SUMMARY CARD
========================================================= */

function SummaryCard({
  title,
  value,
  subtitle,
  valueClass,
  icon,
  delay,
}: {
  title: string;
  value: string | undefined;
  subtitle: string;
  valueClass: string;
  icon: string;
  delay: string;
}) {
  return (
    <div
      className="
        group
        bg-white
        rounded-2xl
        p-5
        shadow-lg
        shadow-slate-200/40
        border
        border-slate-100
        relative
        overflow-hidden
        hover:-translate-y-2
        hover:shadow-2xl
        transition-all
        duration-500
      "
      style={{
        animationDelay: delay,
      }}
    >

      {/* Decorative Circle */}

      <div
        className="
          absolute
          -right-6
          -top-6
          w-20
          h-20
          rounded-full
          bg-slate-50
          group-hover:scale-150
          transition-transform
          duration-700
        "
      />

      <div className="relative">

        <div className="flex items-center justify-between">

          <p className="text-sm text-slate-500 font-medium">
            {title}
          </p>

          <div
            className="
              w-8
              h-8
              rounded-lg
              bg-slate-100
              flex
              items-center
              justify-center
              text-sm
              font-bold
              group-hover:rotate-12
              group-hover:bg-red-50
              group-hover:text-red-500
              transition-all
              duration-300
            "
          >
            {icon}
          </div>

        </div>

        <p
          className={`
            text-3xl
            font-extrabold
            mt-3
            ${valueClass}
          `}
        >
          {value || "0"}
        </p>

        <p className="text-xs text-slate-400 mt-1">
          {subtitle}
        </p>

      </div>

    </div>
  );
}


/* =========================================================
   ATTENDANCE CARD
========================================================= */

function AttendanceDayCard({
  date,
  status,
  delay,
}: {
  date: string;
  status: string;
  delay: number;
}) {

  const styles: Record<
    string,
    {
      card: string;
      date: string;
      status: string;
    }
  > = {

    P: {
      card:
        "bg-green-50 border-green-200 hover:bg-green-100",
      date: "text-green-700",
      status: "text-green-700",
    },

    P1: {
      card:
        "bg-green-50 border-green-200 hover:bg-green-100",
      date: "text-green-700",
      status: "text-green-700",
    },

    P2: {
      card:
        "bg-green-50 border-green-200 hover:bg-green-100",
      date: "text-green-700",
      status: "text-green-700",
    },

    P3: {
      card:
        "bg-green-50 border-green-200 hover:bg-green-100",
      date: "text-green-700",
      status: "text-green-700",
    },

    A: {
      card:
        "bg-red-50 border-red-200 hover:bg-red-100",
      date: "text-red-700",
      status: "text-red-700",
    },

    WO: {
      card:
        "bg-orange-50 border-orange-200 hover:bg-orange-100",
      date: "text-orange-700",
      status: "text-orange-700",
    },

    LWP: {
      card:
        "bg-red-50 border-red-200 hover:bg-red-100",
      date: "text-red-700",
      status: "text-red-700",
    },

    PL: {
      card:
        "bg-blue-50 border-blue-200 hover:bg-blue-100",
      date: "text-blue-700",
      status: "text-blue-700",
    },

    HPL: {
      card:
        "bg-purple-50 border-purple-200 hover:bg-purple-100",
      date: "text-purple-700",
      status: "text-purple-700",
    },

    HD: {
      card:
        "bg-pink-50 border-pink-200 hover:bg-pink-100",
      date: "text-pink-700",
      status: "text-pink-700",
    },

    Left: {
      card:
        "bg-yellow-50 border-yellow-200 hover:bg-yellow-100",
      date: "text-yellow-700",
      status: "text-yellow-700",
    },

    NA: {
      card:
        "bg-slate-50 border-slate-200 hover:bg-slate-100",
      date: "text-slate-500",
      status: "text-slate-400",
    },

    "--": {
      card:
        "bg-slate-50 border-slate-200 hover:bg-slate-100",
      date: "text-slate-500",
      status: "text-slate-400",
    },
  };

  const style =
    styles[status] || styles.NA;

  return (
    <div
      className={`
        aspect-square
        rounded-2xl
        border
        ${style.card}
        flex
        flex-col
        items-center
        justify-center
        cursor-default
        shadow-sm
        hover:shadow-lg
        hover:-translate-y-1
        hover:scale-[1.03]
        transition-all
        duration-300
      `}
      style={{
        animationDelay: `${delay * 35}ms`,
      }}
    >

      <p
        className={`
          text-[10px]
          md:text-xs
          font-bold
          ${style.date}
        `}
      >
        {date}
      </p>

      <p
        className={`
          mt-2
          text-lg
          md:text-2xl
          font-extrabold
          ${style.status}
        `}
      >
        {status}
      </p>

    </div>
  );
}


/* =========================================================
   LEGEND
========================================================= */

function Legend({
  status,
  label,
}: {
  status: string;
  label: string;
}) {

  const colors: Record<
    string,
    string
  > = {

    P: "bg-green-500",

    A: "bg-red-500",

    WO: "bg-orange-500",

    LWP: "bg-red-400",

    NA: "bg-slate-400",

  };

  return (
    <div
      className="
        flex
        items-center
        gap-2
        group
        cursor-default
      "
    >

      <span
        className={`
          w-2.5
          h-2.5
          rounded-full
          ${colors[status] || "bg-slate-400"}
          group-hover:scale-150
          transition-transform
          duration-300
        `}
      />

      <span className="text-xs text-slate-500">

        <span className="font-bold text-slate-700">
          {status}
        </span>

        {" - "}

        {label}

      </span>

    </div>
  );
}
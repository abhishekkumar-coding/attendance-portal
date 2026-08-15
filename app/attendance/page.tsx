"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Employee = string[];
type AttendanceItem = {
  date: string;
  status: string;
};


/* =========================================================
   MAIN PAGE
========================================================= */

export default function AttendancePage() {
  const router = useRouter();

  const [employee, setEmployee] = useState<Employee | null>(null);

  const [attendance, setAttendance] = useState<AttendanceItem[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  console.log("employee: ", employee)

  /* =======================================================
     LOAD EMPLOYEE FROM SESSION STORAGE
  ======================================================= */

  useEffect(() => {

    try {

      const storedEmployee =
        sessionStorage.getItem("employeeData");


      /*
       * If employee data does not exist,
       * go back to first page.
       */

      if (!storedEmployee) {

        router.push("/");

        return;
      }


      /*
       * Convert stored JSON back into object
       */

      const employeeData: Employee =
        JSON.parse(storedEmployee);


      console.log(
        "Selected Employee:",
        employeeData
      );


      /*
       * Save employee
       */

      setEmployee(employeeData);


      /*
       * Create attendance grid
       */

      // createAttendance(employeeData);


    } catch (error) {

      console.error(
        "Error loading employee:",
        error
      );

      setError(
        "Unable to load employee attendance."
      );

    } finally {

      setLoading(false);

    }

  }, [router]);


  /* =======================================================
     CREATE ATTENDANCE DATA
  ======================================================= */

  // const createAttendance = (
  //   employeeData: Employee
  // ) => {

  //   const attendanceData: AttendanceItem[] = [];


  //   /*
  //    * August has 31 days
  //    */

  //   for (let day = 1; day <= 31; day++) {

  //     const dateKey =
  //       `${String(day).padStart(2, "0")}-Aug`;


  //     /*
  //      * Get attendance value
  //      */

  //     let status =
  //       employeeData[dateKey] || "";


  //     status = status
  //       .trim()
  //       .toUpperCase();


  //     /*
  //      * Convert P1 → P
  //      */

  //     if (status === "P1") {
  //       status = "P";
  //     }


  //     /*
  //      * Convert empty value → NA
  //      */

  //     if (!status) {
  //       status = "NA";
  //     }


  //     /*
  //      * Only show these statuses
  //      */

  //     const allowedStatuses = [
  //       "P",
  //       "A",
  //       "WO",
  //       "LWP",
  //       "NA",
  //     ];


  //     if (!allowedStatuses.includes(status)) {

  //       status = "NA";

  //     }


  //     attendanceData.push({
  //       date: dateKey,
  //       status,
  //     });

  //   }


  //   setAttendance(attendanceData);

  // };


  /* =======================================================
     CHANGE EMPLOYEE
  ======================================================= */

  const handleChangeEmployee = () => {

    sessionStorage.removeItem(
      "employeeId"
    );

    sessionStorage.removeItem(
      "employeeData"
    );

    router.push("/");

  };


  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {

    return (

      <main className="min-h-screen bg-slate-100 flex items-center justify-center">

        <div className="text-center">

          <div
            className="
              w-10
              h-10
              border-4
              border-slate-300
              border-t-slate-900
              rounded-full
              animate-spin
              mx-auto
            "
          />

          <p className="text-sm text-slate-500 mt-4">
            Loading attendance...
          </p>

        </div>

      </main>

    );

  }


  /* =======================================================
     ERROR
  ======================================================= */

  if (error) {

    return (

      <main className="min-h-screen bg-slate-100 flex items-center justify-center px-4">

        <div className="bg-white rounded-2xl shadow-sm p-8 max-w-md w-full text-center">

          <div className="w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto text-xl">

            !

          </div>


          <h2 className="text-xl font-bold text-slate-900 mt-4">

            Unable to Load Attendance

          </h2>


          <p className="text-sm text-slate-500 mt-2">

            {error}

          </p>


          <button
            onClick={handleChangeEmployee}
            className="
              mt-6
              bg-slate-900
              text-white
              px-5
              py-2.5
              rounded-lg
              text-sm
              font-medium
              hover:bg-slate-800
              transition
            "
          >

            Go Back

          </button>

        </div>

      </main>

    );

  }


  if (!employee) {
    return null;
  }


  /* =======================================================
     MAIN UI
  ======================================================= */

  return (

    <main className="min-h-screen bg-slate-100">


      {/* ===================================================
          HEADER
      =================================================== */}

      <header className="bg-white border-b border-slate-200">

        <div className="max-w-6xl mx-auto px-4 py-4">

          <div className="flex items-center justify-between">


            <div className="flex items-center gap-3">


              <div
                className="
                  w-11
                  h-11
                  rounded-xl
                  flex
                  items-center
                  justify-center
                "
              >

              <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-2xl overflow-hidden">
              <img
                src="/sfx_logo.png"
                alt="SFX Logo"
                className="w-full h-full object-contain"
              />
            </div>

              </div>


              <div>

                <h1 className="font-bold text-lg text-slate-900">

                  Shadowfax

                </h1>


                <p className="text-xs text-slate-500">

                  Made by Abhi

                </p>

              </div>


            </div>


            <button
              onClick={handleChangeEmployee}
              className="
                text-sm
                font-medium
                text-slate-600
                hover:text-slate-900
                transition
              "
            >

              Change Employee

            </button>


          </div>

        </div>

      </header>


      {/* ===================================================
          CONTENT
      =================================================== */}

      <div className="max-w-6xl mx-auto px-4 py-8">


        {/* =================================================
            EMPLOYEE DETAILS
        ================================================= */}

        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">


            {/* Employee Name */}

            <div>

              <p className="text-sm text-slate-500 mb-1">

                Employee Details

              </p>


              <h2 className="text-2xl font-bold text-slate-900">

                {employee[4]}

              </h2>


              <p className="text-sm text-slate-500 mt-2">

                Employee ID:{employee[0]}

                <span className="font-medium text-slate-700">

                  {/* {employee["Valinor id"]} */}

                </span>

              </p>

            </div>


            {/* Employee Information */}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-4 text-sm">


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


              <div>

                <p className="text-slate-400 mb-1">

                  Current Status

                </p>


                <div className="flex items-center gap-2">

                  <span className="w-2 h-2 bg-green-500 rounded-full" />

                  <span className="font-medium text-green-700">

                    {employee[73]}

                  </span>

                </div>

              </div>


            </div>

          </div>

        </div>


        {/* =================================================
            SUMMARY
        ================================================= */}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">


          <SummaryCard
            title="Present Days"
            value={employee[60]}
            subtitle="Attendance period"
            valueClass="text-slate-900"
          />


          <SummaryCard
            title="Payable Days"
            value={employee[70]}
            subtitle="Payable attendance"
            valueClass="text-green-600"
          />


          <SummaryCard
            title="Weak Off"
            value={employee[63]}
            subtitle="Weak Off"
            valueClass="text-yellow-500"
          />


          <SummaryCard
            title="LWP"
            value={employee[66]}
            subtitle="Loss of pay"
            valueClass="text-orange-500"
          />


        </div>


        {/* =================================================
            ATTENDANCE
        ================================================= */}

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">


          {/* Attendance Header */}

          <div className="px-6 py-5 border-b border-slate-200">


            <div className="flex items-center justify-between">


              <div>

                <h3 className="font-bold text-lg text-slate-900">

                  Attendance

                </h3>


                <p className="text-sm text-slate-500 mt-1">

                  August 2026

                </p>

              </div>


              <div className="text-sm font-medium text-slate-600">

                {employee[17]}

              </div>


            </div>

          </div>


          {/* =================================================
              ATTENDANCE GRID
          ================================================= */}

          <div className="p-4 md:p-6">


            <div className="grid grid-cols-4 gap-2 md:gap-7">


              {/* Empty spaces before 01-Aug */}

              {/* {Array.from({ length: 5 }).map(
                (_, index) => (

                  <div
                    key={`empty-${index}`}
                    className="aspect-square"
                  />

                )
              )} */}


              {/* Attendance Days */}

              {employee.slice(29, 60).map((status, index) => {

                let actualStatus = "-";

                if (status === "P1") {
                  actualStatus = "P1";
                }

                if (status === "P2") {
                  actualStatus = "P2";
                }

                if (status === "P3") {
                  actualStatus = "P3";
                }

                if (status === "WO") {
                  actualStatus = "WO";
                }

                if (status === "LWP") {
                  actualStatus = "LWP";
                }

                if (status === "A") {
                  actualStatus = "A";
                }

                if (status === "PL") {
                  actualStatus = "PL";
                }

                if (status === "NA") {
                  actualStatus = "NA";
                }

                if (status === "") {
                  actualStatus = "--";
                }

                return (
                  <AttendanceDayCard
                    key={index}
                    date={`${String(index + 1).padStart(2, "0")}-Aug`}
                    status={actualStatus}
                  />
                );

              })}


            </div>

          </div>


          {/* =================================================
              LEGEND
          ================================================= */}

          <div className="px-6 py-4 border-t border-slate-200">


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


        </div>


        {/* =================================================
            FOOTER
        ================================================= */}

        <div className="text-center mt-6 pb-6">

          <p className="text-xs text-slate-400">

            Shadowfax Attendance Portal

          </p>


          <p className="text-xs text-slate-400 mt-1">

            Made by Abhi

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

    <div>

      <p className="text-slate-400 mb-1">

        {label}

      </p>


      <p className="font-medium text-slate-700">

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
}: {
  title: string;
  value: string | undefined;
  subtitle: string;
  valueClass: string;
}) {

  return (

    <div className="bg-white rounded-2xl p-5 shadow-sm">


      <p className="text-sm text-slate-500">

        {title}

      </p>


      <p
        className={`text-2xl font-bold mt-2 ${valueClass}`}
      >

        {value || "0"}

      </p>


      <p className="text-xs text-slate-400 mt-1">

        {subtitle}

      </p>


    </div>

  );

}


/* =========================================================
   ATTENDANCE CARD
========================================================= */

function AttendanceDayCard({
  date,
  status,
}: {
  date: string;
  status: string;
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
      card: "bg-green-50 border-green-200",
      date: "text-green-700",
      status: "text-green-700",
    },

    P1: {
      card: "bg-green-50 border-green-200",
      date: "text-green-700",
      status: "text-green-700",
    },

    P2: {
      card: "bg-green-50 border-green-200",
      date: "text-green-700",
      status: "text-green-700",
    },

    P3: {
      card: "bg-green-50 border-green-200",
      date: "text-green-700",
      status: "text-green-700",
    },

    A: {
      card: "bg-red-50 border-red-200",
      date: "text-red-700",
      status: "text-red-700",
    },

    WO: {
      card: "bg-orange-50 border-orange-200",
      date: "text-orange-700",
      status: "text-orange-700",
    },

    LWP: {
      card: "bg-red-50 border-red-200",
      date: "text-red-700",
      status: "text-red-700",
    },

    PL: {
      card: "bg-blue-50 border-blue-200",
      date: "text-blue-700",
      status: "text-blue-700",
    },

    HPL: {
      card: "bg-purple-50 border-purple-200",
      date: "text-purple-700",
      status: "text-purple-700",
    },

    HD: {
      card: "bg-yellow-50 border-yellow-200",
      date: "text-yellow-700",
      status: "text-yellow-700",
    },

    HL: {
      card: "bg-yellow-50 border-yellow-200",
      date: "text-yellow-700",
      status: "text-yellow-700",
    },

    NA: {
      card: "bg-slate-50 border-slate-200",
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
        rounded-xl
        border
        ${style.card}
        flex
        flex-col
        items-center
        justify-center
        transition
        hover:shadow-sm
      `}
    >

      <p
        className={`
          text-xs
          md:text-sm
          font-semibold
          ${style.date}
        `}
      >
        {date}
      </p>

      <p
        className={`
          mt-2
          text-xl
          md:text-2xl
          font-bold
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

    <div className="flex items-center gap-2">


      <span
        className={`
          w-2.5
          h-2.5
          rounded-full
          ${colors[status] || "bg-slate-400"}
        `}
      />


      <span className="text-xs text-slate-500">

        <span className="font-semibold text-slate-700">

          {status}

        </span>


        {" - "}


        {label}

      </span>


    </div>

  );

}
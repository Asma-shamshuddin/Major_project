


// import React, { useEffect, useState } from 'react'
// import Step3report from '../components/interview/Step3report'
// import { useNavigate, useParams } from 'react-router-dom'
// import { getInterview } from '../apis/interview.api'

// function InterviewReport({user, setUser}) {
//   const {id} = useParams()
//     const [loading , setLoading] = useState(true)
//     const [report,setReport] = useState(null)
//     const navigate = useNavigate()

//     useEffect(()=>{
//         const fetchReport = async () => {
//             const response = await getInterview(id)
//             const data = response?.interview
//             if(data.status !== "completed"){
//                 navigate(`/interview/${id}`,
//                     {replace: true});
//                     return;
//             }
//             setReport(data)
//             setLoading(false)
//          }

//          fetchReport()

//     },[id,navigate])

//     if(loading){
//         return(
//             <div className="min-h-screen bg-purple-50 flex items-center justify-center">
//         <div className="w-12 h-12 rounded-full border-4 border-purple-200 border-t-purple-600 animate-spin" />
//       </div>
//         )
//     }
//     if(!report) return null


//   return (
//    <Step3report
//    user={user}
//    setUser={setUser}
//    report={report}
//    />
//   )
// }

// export default InterviewReport

//chatgpt code😄😄😄😄😄😄


import React, { useEffect, useState } from "react";
import Step3report from "../components/interview/Step3report";
import { useNavigate, useParams } from "react-router-dom";
import { getInterview } from "../apis/interview.api";

function InterviewReport({ user, setUser }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [report, setReport] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchReport = async () => {
      try {
        const response = await getInterview(id);

        // Support either response format
        const data =
          response?.interview || response?.data?.interview;

        if (!data) {
          throw new Error("Interview report not found.");
        }

        // Allow both completed and manually ended interviews
        if (
          data.status !== "completed" &&
          data.status !== "ended"
        ) {
          navigate(`/interview/${id}`, { replace: true });
          return;
        }

        if (isMounted) {
          setReport(data);
        }
      } catch (err) {
        console.error("Error fetching interview report:", err);

        if (isMounted) {
          setError(
            err.message || "Unable to load the interview report."
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchReport();

    return () => {
      isMounted = false;
    };
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-purple-50 flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-purple-200 border-t-purple-600 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-purple-50 flex flex-col items-center justify-center gap-4 px-4">
        <p className="text-red-600 text-center">{error}</p>

        <button
          onClick={() => navigate("/interview")}
          className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
        >
          Back to Interview
        </button>
      </div>
    );
  }

  if (!report) return null;

  return (
    <Step3report
      user={user}
      setUser={setUser}
      report={report}
    />
  );
}

export default InterviewReport;


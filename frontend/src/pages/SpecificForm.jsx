import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import FormPreview from "../components/PreviewForm";
import { useUser } from "../UserContext";

export default function SpecificForm() {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const navigation=useNavigate();
  const {user}=useUser()
  const userId=user.id


  useEffect(() => {
    const fetchForm = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_Server}/api/forms/${id}`);
        setForm(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching form:", err);
        setLoading(false);
      }
    };
    fetchForm();
  }, [id]);

  const handleAnswerChange = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleSubmit = async () => {
    
  };

  if (loading) return <div className="text-white p-6">Loading form...</div>;
  if (!form) return <div className="text-red-500">Form not found</div>;

    let isAuthor=userId===form?.userId;
    console.log(isAuthor)

  return (
    <>
    {isAuthor ? <div className="max-w-6xl mx-auto p-4 w-full max-h-screen overflow-y-auto space-y-6 text-white">
           <div className="flex justify-between"><h1 className="text-3xl font-bold">Form Preview</h1> 
           <button className="bg-gray-500 p-2 rounded" onClick={()=>{
            navigation("/forms")
           }}>Back</button>
           </div>
         <div className="bg-gray-800  rounded-lg ">
             <FormPreview formData={form} />
        </div>
    </div>:<div></div>}
    </>
  );
}

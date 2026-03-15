import Mainlayout from "@/layout/Mainlayout";
import axiosInstance from "@/lib/axiosinstance";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const QuestionsPage = () => {
  const [questions, setQuestions] = useState<any[]>([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axiosInstance.get("/questions");
        setQuestions(res.data.data || []);
      } catch (err) {
        console.log(err);
      }
    };

    fetchQuestions();
  }, []);

  return (
    <Mainlayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Questions</h1>

        {questions.length === 0 ? (
          <p>No questions yet</p>
        ) : (
          questions.map((q) => (
            <Link key={q._id} href={`/questions/${q._id}`}>
              <div className="border p-4 mb-3 rounded hover:bg-gray-50 cursor-pointer">
                <h2 className="font-semibold">{q.questiontitle}</h2>
                <p className="text-sm text-gray-500">
                  {q.noofanswer} Answers
                </p>
              </div>
            </Link>
          ))
        )}
      </div>
    </Mainlayout>
  );
};

export default QuestionsPage;
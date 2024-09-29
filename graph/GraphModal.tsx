import { useState } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Smile } from "lucide-react";

export default function GraphModal({ userQuiz, visible, onClose }) {
  const { preQuizResults, postQuizResults } = userQuiz;
  const preData = [
    { name: "ความทนต่อแรงกดดัน", value: preQuizResults?.pressure || 0 },
    { name: "การมีความหวังและกำลังใจ", value: preQuizResults?.encouragement || 0 },
    { name: "การต่อสู้เอาชนะอุปสรรค", value: preQuizResults?.obstacle || 0 },
  ];
  const postData = [
    { name: "ความทนต่อแรงกดดัน", value: postQuizResults?.pressure || 0 },
    { name: "การมีความหวังและกำลังใจ", value: postQuizResults?.encouragement || 0 },
    { name: "การต่อสู้เอาชนะอุปสรรค", value: postQuizResults?.obstacle || 0 },
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip bg-white rounded-md">
          <p className="label">{`${payload[0].name} : ${payload[0].value} คะแนน`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <dialog id="graphModal" className={`modal ${visible ? "block" : "hidden"}`}>
      <div className="modal-box max-w-7xl h-auto">
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose}>
          ✕
        </button>
        <h3 className="font-bold text-lg p-4">ผลลัพธ์แบบประเมินเปรียบเทียบระหว่างการทำแบบประเมินก่อนและหลัง</h3>
        
        <h1 className="font-bold text-lg">แบบประเมิน RQ 20</h1>
        <BarChart data={preData} width={800} height={400}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="value" fill="#0078b7" />
        </BarChart>

        <BarChart data={postData} width={800} height={400}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="value" fill="#38bdf8" />
        </BarChart>
        
        <form method="dialog" className="modal-backdrop">
          <button className="btn">Close</button>
        </form>
      </div>
    </dialog>
  );
}

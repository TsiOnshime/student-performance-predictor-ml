import { useState } from "react";
import axios from "axios";
import { GraduationCap, Calculator, GitBranch, TrendingUp } from "lucide-react";

export default function PredictionForm() {
  const [formData, setFormData] = useState({
    G1: "",
    G2: "",
    studytime: "",
    absences: "",
    failures: "",
    Medu: "",
    Fedu: "",
    freetime: "",
    goout: "",
    health: "",
  });

  const [model, setModel] = useState("linear_regression");
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePredict = async () => {
    setError(null);
    setPrediction(null);
    try {
      const res = await axios.post(import.meta.env.VITE_BACKEND_URL, {
        ...formData,
        model_type: model,
      });
      setPrediction(res.data.predicted_G3);
    } catch (err) {
      setError("Prediction failed");
      console.error(err);
    }
  };

  // Array of features for input generation
  const featureInputs = [
    { name: "G1", label: "First Period Grade", placeholder: "0–20" },
    { name: "G2", label: "Second Period Grade", placeholder: "0–20" },
    {
      name: "studytime",
      label: "Study Time (hours/week)",
      placeholder: "1–10",
    },
    { name: "absences", label: "Absences", placeholder: "Total absences" },
    {
      name: "failures",
      label: "Past Failures",
      placeholder: "Number of past failures",
    },
    { name: "Medu", label: "Mother's Education (0–4)", placeholder: "0–4" },
    { name: "Fedu", label: "Father's Education (0–4)", placeholder: "0–4" },
    { name: "freetime", label: "Free Time (1–5)", placeholder: "1–5" },
    { name: "goout", label: "Going Out (1–5)", placeholder: "1–5" },
    { name: "health", label: "Health (1–5)", placeholder: "1–5" },
  ];

  return (
    <div className="min-h-screen bg-[#faf9f6] flex items-start justify-center py-16 px-4">
      <div className="w-full max-w-2xl text-center">
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-orange-100 text-orange-500">
            <GraduationCap />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Student Performance Predictor
        </h1>
        <p className="text-gray-500 mb-10">
          Analyze academic potential using machine learning models. Input
          student metrics to forecast final grade performance.
        </p>

        <div className="bg-white rounded-2xl shadow-sm p-8 text-left">
          {/* Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featureInputs.map((f) => (
              <div key={f.name}>
                <label className="font-medium text-gray-700">{f.label}</label>
                <input
                  name={f.name}
                  value={formData[f.name]}
                  onChange={handleChange}
                  placeholder={f.placeholder}
                  type="number"
                  className="mt-2 w-full rounded-lg border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>
            ))}
          </div>

          {/* Model Selection */}
          <div className="mt-10">
            <h3 className="font-semibold text-gray-800 mb-4">
              Prediction Model
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => setModel("linear_regression")}
                className={`p-5 rounded-xl border-2 transition text-left flex gap-4 items-start ${
                  model === "linear_regression"
                    ? "border-orange-400 bg-orange-50"
                    : "border-gray-200"
                }`}
              >
                <TrendingUp className="text-orange-500 mt-1" />
                <div>
                  <p className="font-semibold">Linear Regression</p>
                  <p className="text-sm text-gray-500">
                    Best for continuous trends and weighted relationships.
                  </p>
                </div>
              </button>

              <button
                onClick={() => setModel("decision_tree")}
                className={`p-5 rounded-xl border-2 transition text-left flex gap-4 items-start ${
                  model === "decision_tree"
                    ? "border-orange-400 bg-orange-50"
                    : "border-gray-200"
                }`}
              >
                <GitBranch className="text-gray-500 mt-1" />
                <div>
                  <p className="font-semibold">Decision Tree</p>
                  <p className="text-sm text-gray-500">
                    Best for complex, non-linear patterns and thresholds.
                  </p>
                </div>
              </button>
            </div>
          </div>

          {/* Predict Button */}
          <button
            onClick={handlePredict}
            className="mt-10 w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2"
          >
            <Calculator /> Predict Final Grade
          </button>

          {/* Result */}
          {prediction !== null && (
            <div className="mt-6 text-center text-lg font-semibold">
              Predicted Final Grade:{" "}
              <span className="text-orange-500">{prediction}</span>
            </div>
          )}

          {error && (
            <div className="mt-6 text-center text-red-500 font-medium">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

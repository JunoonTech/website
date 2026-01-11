"use client";
import { useState } from "react";
import { signOut } from "next-auth/react";
import RenderImage from "./RenderImage";
import { submitApplication } from "@/app/recruitment/actions";

const MAX_FILE_SIZE = 10 * 1024 * 1024; 

export default function RecruitmentForm({ positions, user }) {
  const [selectedPosition, setSelectedPosition] = useState(positions[0]);
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const formData = new FormData(e.target);
    const questionKeys = selectedPosition.customQuestions.map((q) => ({
      text: q.questionText,
      type: q.fieldType,
    }));

    for (const q of questionKeys) {
      if (q.type === "image upload") {
        const file = formData.get(q.text);
        if (file && file instanceof File && file.size > MAX_FILE_SIZE) {
          setStatus("error");
          setErrorMessage(
            `The file for "${q.text}" is too large (Max 10MB). Please upload a smaller image.`
          );
          return;
        }
      }
    }

    formData.append("questionKeys", JSON.stringify(questionKeys));
    formData.append("positionId", selectedPosition._id);

    try {
      const result = await submitApplication(formData);
      if (result.success) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMessage(result.error || "Failed to submit application.");
      }
    } catch (err) {
      console.error("Client-side submission error:", err);
      setStatus("error");
      setErrorMessage("An unexpected error occurred. Please check your internet connection.");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-darker/50 p-12 rounded-2xl border border-neon-green/30 text-center backdrop-blur-sm">
        <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-neon-green/10 text-neon-green">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">
          Application Received!
        </h2>
        <p className="text-gray-400">
          Thank you for applying. We will review your work and get back to you.
        </p>
        <div className="mt-8 flex flex-col gap-4 items-center">
          <button
            onClick={() => setStatus("idle")}
            className="text-sm font-bold uppercase tracking-widest text-neon-green hover:text-white transition-colors"
          >
            Submit another application
          </button>
          <button
            onClick={() => signOut({ callbackUrl: "/recruitment" })}
            className="text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-red-500 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-darker/50 p-8 rounded-2xl mb-12 border border-white/10 backdrop-blur-sm">
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-400 mb-2">
          Select Position
        </label>
        <select
          className="w-full bg-darkest border border-white/10 rounded-lg px-4 py-3 text-white focus:border-neon-green outline-none transition-colors"
          value={selectedPosition._id}
          onChange={(e) =>
            setSelectedPosition(positions.find((p) => p._id === e.target.value))
          }
        >
          {positions.map((pos) => (
            <option key={pos._id} value={pos._id}>
              {pos.position}
            </option>
          ))}
        </select>
        {selectedPosition?.description && (
          <p className="mt-4 text-sm text-gray-400 leading-relaxed">
            {selectedPosition.description}
          </p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="text-xs text-gray-500 ml-1">Full Name</label>
            <input
              name="name"
              type="text"
              defaultValue={user?.name || ""}
              readOnly
              className="bg-darkest/50 border border-white/5 rounded-lg px-4 py-3 text-gray-400 w-full outline-none cursor-not-allowed"
              required
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs text-gray-500 ml-1">Email Address</label>
            <input
              name="email"
              type="email"
              defaultValue={user?.email || ""}
              readOnly
              className="bg-darkest/50 border border-white/5 rounded-lg px-4 py-3 text-gray-400 w-full outline-none cursor-not-allowed"
              required
            />
          </div>
        </div>

        {selectedPosition.customQuestions?.map((q, index) => (
          <div
            key={index}
            className="space-y-4 border-t border-white/5 pt-6 first:border-none first:pt-0"
          >
            <div className="flex flex-col gap-4">
              {q.questionImage && (
                <div className="w-full max-w-md flex justify-center mx-auto">
                  <RenderImage
                    image={q.questionImage}
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="rounded-lg border border-white/10 shadow-lg"
                  />
                </div>
              )}
              <div className="space-y-2">
                <label className="block text-sm text-gray-300 font-medium">
                  {q.questionText}
                </label>
                {q.fieldType === "small text" && (
                  <input
                    name={q.questionText}
                    type="text"
                    className="w-full bg-darkest border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-neon-green transition-all"
                    required
                  />
                )}
                {q.fieldType === "large text" && (
                  <textarea
                    name={q.questionText}
                    className="w-full bg-darkest border border-white/10 rounded-lg px-4 py-3 text-white h-32 outline-none focus:border-neon-green transition-all resize-none"
                    required
                  ></textarea>
                )}
                {q.fieldType === "image upload" && (
                  <div className="group relative">
                    <input
                      name={q.questionText}
                      type="file"
                      accept="image/*"
                      className="w-full cursor-pointer text-sm text-gray-400 file:mr-4 file:rounded-full file:border-0 file:bg-neon-green/10 file:px-4 file:py-2 file:text-xs file:font-bold file:text-neon-green hover:file:bg-neon-green hover:file:text-darkest transition-all"
                      required
                    />
                    <p className="text-[10px] text-gray-600 mt-1">Max file size: 10MB</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {status === "error" && (
          <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/50 text-red-500 text-sm">
            {errorMessage}
          </div>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full rounded-lg bg-neon-green py-4 font-bold uppercase tracking-widest text-darkest transition-all hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === "loading" ? "Uploading..." : "Submit Application"}
        </button>
      </form>
    </div>
  );
}

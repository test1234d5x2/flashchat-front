"use client";

import { useState } from "react";
import handleAddReport from "@/actions/handleAddReport";
import { useRouter } from "next/navigation";

const reasons = [
    "Spam",
    "Hate Speech",
    "Violence",
    "Other"
];

export default function ReportModal({ postId, userId, setIsReportModalOpen }: { postId: string, userId: string, setIsReportModalOpen: (isReportModalOpen: boolean) => void }) {
    const [chosenReason, setChosenReason] = useState("Spam");
    const [otherReason, setOtherReason] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        formData.set("reason", chosenReason === "Other" ? otherReason : chosenReason);

        try {
            await handleAddReport(formData, postId, userId);
            setIsReportModalOpen(false); 
            router.replace(`/portal/home`);
        } catch (err: any) {
            setError(err.message || "Failed to report. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.8)] z-50 flex justify-center items-center cursor-default overflow-y-scroll" onClick={e => {e.stopPropagation();}}>
            <div className="text-white flex flex-col bg-black p-8 gap-4 relative">
                <span className="material-symbols-outlined text-white text-4xl cursor-pointer absolute top-4 right-4" onClick={() => setIsReportModalOpen(false)}>close</span>
                <h1 className="text-2xl font-bold">Report Modal</h1>
                <p>Please select the reason for reporting this post.</p>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <select name="reason" onChange={e => setChosenReason(e.target.value)}>
                        {reasons.map(reason => (
                            <option key={reason} value={reason}>{reason}</option>
                        ))}
                    </select>
                    {chosenReason === "Other" && <textarea onChange={(e) => setOtherReason(e.target.value)} name="reason" className="border border-gray-300 text-white p-2 rounded-md" placeholder="Please provide a reason for reporting this post." />}
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 cursor-pointer" disabled={loading}>
                        {loading ? "Reporting..." : "Report"}
                    </button>
                    {error && <div className="text-red">{error}</div>}
                </form>
            </div>
        </section>
    )
}
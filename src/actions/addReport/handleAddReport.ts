"use server";

import addReport from "./addReport";

export default async function handleAddReport(formData: FormData, postId: string) {
    const reason = formData.get("reason")?.toString();
    if (!reason) {
        throw new Error("Reason is required");
    }

    const response = await addReport(reason, postId);
    if (!response.success) {
        throw new Error(response.message);
    }
}
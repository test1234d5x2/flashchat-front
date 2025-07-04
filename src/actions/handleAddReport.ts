"use server";

import addReport from "./addReport";

export default async function handleAddReport(formData: FormData, postId: string, userId: string) {
    const reason = formData.get("reason")?.toString();
    if (!reason) {
        throw new Error("Reason is required");
    }

    const response = await addReport(reason, postId, userId);
    if (!response.success) {
        throw new Error(response.message);
    }
}
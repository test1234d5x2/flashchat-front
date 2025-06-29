"use client";

import { useState } from "react";
import styles from "@/styles/styles";
import createUser from "./createUser";
import { redirect } from "next/navigation";

export default function Signup() {
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (formData: FormData) => {
        setIsLoading(true);
        setMessage("");

        const username = formData.get("username")?.toString() || "";
        const password = formData.get("password")?.toString() || "";

        if (!username || !password) {
            setMessage("Error: Username and password are required");
            setIsLoading(false);
            return;
        }
        
        const result = await createUser(username, password);
        
        if (result.success) {
            setMessage("User created successfully!");
            redirect("/auth/login");
        } else {
            setMessage(`Error: ${result.message}`);
        }
        
        setIsLoading(false);
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen gap-8">
            <h1 className="text-2xl font-bold">Signup</h1>
            <form className="flex flex-col gap-4" action={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Username" 
                    className={styles.formInput} 
                    name="username"
                    required
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    className={styles.formInput} 
                    name="password"
                    required
                />
                <button 
                    type="submit" 
                    className={styles.postButton}
                    disabled={isLoading}
                >
                    {isLoading ? "Creating..." : "Signup"}
                </button>
            </form>
            {message && (
                <div className={`mt-4 p-3 rounded ${message.includes("Error") ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
                    {message}
                </div>
            )}
        </div>
    );
}
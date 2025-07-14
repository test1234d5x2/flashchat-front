"use client";

import handleLoginUser from "@/actions/loginUser/handleLoginUser";
import styles from "@/styles/styles"
import { redirect } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = async (formData: FormData) => {
        setIsLoading(true);
        setMessage("");

        let loggedIn = false;

        try {
            await handleLoginUser(formData);
            loggedIn = true;
        } catch (error) {
            setMessage(`${error}`);
        }

        if (loggedIn) {
            redirect("/portal/home");
        }

        setIsLoading(false);
    }
    
    return (
        <section>
            <form className="flex flex-col gap-4" action={handleSubmit}>
                <input type="text" placeholder="Username" className={styles.formInput} name="username" required />
                <input type="password" placeholder="Password" className={styles.formInput} name="password" required />
                <button type="submit" className={styles.postButton} disabled={isLoading}>{isLoading ? "Logging In..." : "Login"}</button>
            </form>
            {message && (
                <div className={`mt-4 p-3 rounded ${message.includes("Error") ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
                    {message}
                </div>
            )}
        </section>
    )
}
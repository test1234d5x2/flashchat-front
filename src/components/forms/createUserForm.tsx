"use client";

import styles from "@/styles/styles";
import { useState } from "react";
import handleCreateUser from "@/actions/createUser/handleCreateUser";

export default function CreateUserForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = async (formData: FormData) => {
        setIsLoading(true);
        setMessage("");

        try {
            await handleCreateUser(formData);
            setMessage("User created successfully!");
        } catch (error) {
            setMessage(`${error}`);
        }

        setIsLoading(false);
    };

    return (
        <section className="flex flex-col items-center justify-center gap-8">
            <form className="flex flex-col gap-4" action={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    className={styles.formInput}
                    name="username"
                    required
                />
                <input
                    type="text"
                    placeholder="Handle"
                    className={styles.formInput}
                    name="handle"
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
        </section>
    )
}
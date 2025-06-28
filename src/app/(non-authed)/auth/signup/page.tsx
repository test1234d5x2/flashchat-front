import styles from "@/styles/styles";

export default function Signup() {
    return (
        <div className="flex flex-col items-center justify-center h-screen gap-8">
            <h1 className="text-2xl font-bold">Signup</h1>
            <form className="flex flex-col gap-4">
                <input type="text" placeholder="Username" className={styles.formInput} />
                <input type="email" placeholder="Email" className={styles.formInput} />
                <input type="password" placeholder="Password" className={styles.formInput} />
                <button type="submit" className={styles.postButton}>Signup</button>
            </form>
        </div>
    );
}
import LoginForm from "@/components/forms/loginForm";

export default function Login() {
    return (
        <div className="flex flex-col items-center justify-center h-screen gap-8">
            <h1 className="text-2xl font-bold">Login</h1>
            <LoginForm />
        </div>
    );
}
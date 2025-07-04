import CreateUserForm from "@/components/forms/createUserForm";

export default function Signup() {
    return (
        <div className="flex flex-col items-center justify-center h-screen gap-8">
            <h1 className="text-2xl font-bold">Signup</h1>
            <CreateUserForm />  
        </div>
    );
}
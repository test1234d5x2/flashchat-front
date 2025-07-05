export default function UserMessage({ message, setMessage }: { message: string, setMessage: (message: string) => void }) {

    return (
        <section className="absolute z-100 left-0 top-0 w-full flex justify-center items-center" onClick={(e) => e.stopPropagation()}>
            <div className={`flex flex-row gap-2 p-4 ${message.includes("Error") ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
                <span className="text-center">{message}</span>
                <span className={`material-symbols-outlined cursor-pointer`} onClick={() => setMessage("")}>close</span>
            </div>
        </section>
    )
}
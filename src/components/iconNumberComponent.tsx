export default function IconNumberComponent({ icon, number }: { icon: string, number: number }) {
    return (
        <div className="flex flex-row gap-2 cursor-pointer hover:text-blue-500">
            <span className="material-symbols-outlined">{icon}</span>
            <span>{number}</span>
        </div>
    );
}
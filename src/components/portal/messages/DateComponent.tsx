export default function DateComponent({timestamp}: {timestamp: string}) {
    return (
        <div className="w-full flex justify-center">
            <span>{new Date(timestamp).toLocaleDateString()}</span>
        </div>
    )
}
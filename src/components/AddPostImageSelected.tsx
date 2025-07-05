export default function AddPostImageSelected({ image, index, removeImage }: { image: File, index: number, removeImage: (index: number) => void }) {
    return (
        <div key={index} className="relative">
            <img
                src={URL.createObjectURL(image)}
                alt={`Selected ${index + 1}`}
                className="w-20 h-20 object-cover rounded"
            />
            <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute -top-2 -right-2 text-center rounded-full text-black z-100 bg-white rounded-full w-6 h-6 cursor-pointer"
            >
                ×
            </button>
        </div>
    )
}
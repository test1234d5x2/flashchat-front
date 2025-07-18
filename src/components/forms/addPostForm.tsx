"use client";

import handleCreatePost from "@/actions/addPost/handleCreatePost";
import { useState } from "react";
import styles from "@/styles/styles";
import UserMessage from "@/components/userMessage";
import AddPostImageSelected from "../AddPostImageSelected";

export default function AddPostForm() {

    const [message, setMessage] = useState("");
    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    
    const handleCreatePostWithDetails = (formData: FormData) => {
        // Add all selected images to the form data
        selectedImages.forEach(image => {
            formData.append('images', image);
        });
        
        console.log("Number of images:", selectedImages.length);
        handleCreatePost(formData).then((message) => {
            setMessage(message);
            setSelectedImages([]); // Clear selected images after successful post
        }).catch((error) => {
            setMessage(error.message);
        });
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const fileArray = Array.from(files);
            setSelectedImages(prev => [...prev, ...fileArray]);
        }
    };

    const removeImage = (index: number) => {
        setSelectedImages(prev => prev.filter((_, i) => i !== index));
    };

    return (
        <form className="w-full" action={handleCreatePostWithDetails}>
            <div>
                <input type="text" placeholder="What's on your mind?" className="w-full p-2 rounded-md border border-gray-300 focus:border-highlight-default focus:outline-none" name="post" />
            </div>
            
            {/* Display selected images */}
            {selectedImages.length > 0 && (
            <div className="py-4">
                <div className="flex flex-wrap gap-2">
                    {selectedImages.map((image, index) => (
                        <AddPostImageSelected key={index} image={image} index={index} removeImage={removeImage} />
                    ))}
                </div>
            </div>
            )}
            
            <div className="flex flex-row flex-wrap justify-between p-4">
                <div className="flex flex-row gap-2 py-2">
                    <label className="cursor-pointer flex items-center">
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                        />
                        <span className="material-symbols-outlined text-blue-500">add_photo_alternate</span>
                    </label>
                    <div className="material-symbols-outlined cursor-pointer text-blue-500">gif</div>
                    <div className="material-symbols-outlined cursor-pointer text-blue-500">emoji_emotions</div>
                </div>
                <button className={styles.postButton}>Post</button>
            </div>
            {message && <UserMessage message={message} setMessage={setMessage} />}
        </form>
    )
}
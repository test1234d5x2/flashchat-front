import Image from "next/image";
import landingImage from "@/images/landingImage.jpg";
import IconNumberComponent from "@/components/iconNumberComponent";


export default function Post() {
    return (
        <section className="w-full border-b border-gray-200">
            <div className="flex items-start gap-4 p-4">
                <div className="w-10 h-10 rounded-full relative">
                    <Image  
                        src={landingImage}
                        alt="Profile"
                        className="rounded-full object-cover"
                        fill
                    />
                </div>
                <div className="flex-1 flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-900">Jane Doe {/* name */}</span>
                        <span className="text-gray-500 text-sm">@janedoe {/* username */}</span>
                        <span className="text-gray-400 text-xs ml-2">· 2h ago {/* time posted */}</span>
                    </div>
                    <p className="text-gray-800">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo harum quia obcaecati quo similique doloremque, dolorum illum rerum laudantium modi et minima animi placeat. Debitis eaque nihil tenetur nam rem. {/* post content */}
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo harum quia obcaecati quo similique doloremque, dolorum illum rerum laudantium modi et minima animi placeat. Debitis eaque nihil tenetur nam rem.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo harum quia obcaecati quo similique doloremque, dolorum illum rerum laudantium modi et minima animi placeat. Debitis eaque nihil tenetur nam rem.
                    </p>
                    <div className="flex flex-row gap-2 overflow-x-scroll">
                        <Image
                            src={landingImage}
                            alt="Post content"
                            className="rounded-lg object-cover cursor-pointer"
                            width={200}
                            height={200}
                        />
                        <Image
                            src={landingImage}
                            alt="Post content"
                            className="rounded-lg object-cover cursor-pointer"
                            width={200}
                            height={200}
                        />
                        <Image
                            src={landingImage}
                            alt="Post content"
                            className="rounded-lg object-cover cursor-pointer"
                            width={200}
                            height={200}
                        />
                        <Image
                            src={landingImage}
                            alt="Post content"
                            className="rounded-lg object-cover cursor-pointer"
                            width={200}
                            height={200}
                        />
                    </div>
                    <div className="flex gap-6 mt-4 text-gray-500 text-sm">
                        <IconNumberComponent icon="chat" number={12} /> {/* comments */}
                        <IconNumberComponent icon="favorite" number={34} /> {/* likes */}
                        <IconNumberComponent icon="visibility" number={120} /> {/* views */}
                    </div>
                </div>
            </div>
        </section>
    );
}
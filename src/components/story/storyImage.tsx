"use client";
import Image, { StaticImageData } from "next/image";
import { useStory } from "./storyContext";
import Spinner from "../ui/spinner";
import { useEffect, useState } from "react";
interface StoryImageProps {
    src: string | StaticImageData;
    alt?: string;
}
export const StoryImage: React.FC<StoryImageProps> = ({
    src,
    alt = "story",
}) => {
    const { currentStroyLoaded, handleImageLoad } = useStory();
    const [isLoader, setIsLoader] = useState(false);
    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsLoader(currentStroyLoaded);
        }, 200);
        return () => clearTimeout(timeout);
    }, [currentStroyLoaded]);
    return (
        <div>
            <Image
                src={src}
                alt={alt}
                className={`brightness-90 ${
                    !isLoader ? "invisible" : "visible"
                }`}
                onLoad={handleImageLoad}
                priority
            />
            {!isLoader ? (
                <Spinner className="fixed left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]" />
            ) : null}
        </div>
    );
};

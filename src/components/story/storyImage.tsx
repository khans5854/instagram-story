/**
 * Renders an image for a story with optional loading spinner.
 *
 * @component
 * @param {string | StaticImageData} src - The source URL or StaticImageData for the image.
 * @param {string} [alt="story"] - The alternative text for the image.
 * @returns {JSX.Element} The rendered StoryImage component.
 */

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

    /**
     * This useEffect hook is responsible for updating the state of the "isLoader" variable based on the value of "currentStroyLoaded".
     * It sets a timeout of 200 milliseconds, and after the timeout, it updates the "isLoader" state with the value of "currentStroyLoaded".
     * The clearTimeout function is used to clean up the timeout when the component unmounts or when "currentStroyLoaded" changes.
     */
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

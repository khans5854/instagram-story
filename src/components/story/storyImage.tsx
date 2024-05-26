import Image, { StaticImageData } from "next/image";
import { useStory } from "./storyContext";
import Spinner from "../ui/spinner";
interface StoryImageProps {
    src: string | StaticImageData;
    alt?: string;
}
export const StoryImage: React.FC<StoryImageProps> = ({
    src,
    alt = "story",
}) => {
    const { currentStroyLoaded, handleImageLoad } = useStory();
    return (
        <div>
            <Image
                src={src}
                alt={alt}
                className={`brightness-90 ${
                    !currentStroyLoaded ? "invisible" : "visible"
                }`}
                onLoad={handleImageLoad}
                priority
            />
            {!currentStroyLoaded ? (
                <Spinner className="fixed left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]" />
            ) : null}
        </div>
    );
};

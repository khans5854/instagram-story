/**
 * Renders a profile section with a name and profile image.
 *
 * @component
 * @param {string} name - The name of the profile.
 * @param {string | StaticImageData} profileUrl - The URL or static image data of the profile image.
 * @returns {JSX.Element} The rendered profile section component.
 */
import Image, { StaticImageData } from "next/image";
import { useStory } from "./storyContext";
import { Button } from "../ui/button";
import { Chat, CloseIcon, ThreeDotIcon } from "../icons";

interface ProfileSectionProps {
    name: string;
    profileUrl: string | StaticImageData;
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({
    name,
    profileUrl,
}) => {
    const { handleClose } = useStory();
    return (
        <section className="flex flex-row justify-between py-2 px-4 w-[100vw]">
            <div className="flex flex-row gap-4">
                <div className="flex w-12 h-12 min-w-12 min-h-12">
                    <Image
                        src={profileUrl}
                        alt={name}
                        className="rounded-full"
                    />
                </div>
                <div>
                    <h2 className="font-serif font-light text-white capitalize">
                        {name}
                    </h2>
                    <h2 className="flex items-center gap-1 text-white text-xs">
                        <Chat /> see translation
                    </h2>
                </div>
            </div>
            <div className="flex flex-row items-center">
                <ThreeDotIcon />
                <Button variant="ghost" className="p-2" onClick={handleClose}>
                    <CloseIcon />
                </Button>
            </div>
        </section>
    );
};

/**
 * Renders the header component for the Instagram story.
 *
 * @component
 * @param {StoryHeaderProps} props - The props for the StoryHeader component.
 * @param {IUser[]} props.users - The array of users to display in the story header.
 * @returns {JSX.Element} The rendered StoryHeader component.
 */
import { IUser } from "@/interface";
import { Button } from "../ui/button";
import Image from "next/image";
import { useStory } from "./storyContext";
interface StoryHeaderProps {
    users: IUser[];
}

export const StoryHeader: React.FC<StoryHeaderProps> = ({ users }) => {
    const { handleOpen } = useStory();
    return (
        <div className="flex flex-column gap-2 w-full overflow-auto no-scrollbar">
            {users.map(({ profileUrl, name }, index) => (
                <div key={name + index}>
                    <Button
                        variant="ghost"
                        className="flex w-16 h-16 min-w-16 min-h-16 p-0"
                        onClick={() => handleOpen(index)}
                    >
                        <div className="flex w-16 h-16 min-w-16 min-h-16 rounded-full border-2 border-red-400 p-0.5">
                            <Image
                                src={profileUrl}
                                alt="profile-pic"
                                className="rounded-full"
                                priority
                            />
                        </div>
                    </Button>
                    <h4 className="text-center text-sm font-serif font-light text-ellipsis whitespace-nowrap overflow-hidden w-[8ch]">
                        {name}
                    </h4>
                </div>
            ))}
        </div>
    );
};

/**
 * Renders the preview of a story.
 *
 * @returns The JSX element representing the story preview.
 */
import { DEFAULT_STORY_DURATION } from "@/lib/constant";
import Image from "next/image";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { useStory } from "./storyContext";
import { ProfileSection } from "./storyPreviewProfile";

export const StoryPreview = () => {
    const {
        isOpen,
        currentUser,
        currentStoryIdx,
        handleNextStory,
        handlePrevStory,
    } = useStory();
    if (!isOpen) {
        return null;
    }
    const { name, profileUrl, stories } = currentUser!;
    return (
        <div className="fixed left-0 top-0 h-[100vh] w-[100vw] z-10 bg-white">
            <div className="fixed left-0 top-0">
                <div className="flex flex-row gap-1 p-1">
                    {currentUser?.stories.map((story, idx) => (
                        <Progress
                            key={idx + currentUser.name}
                            duration={story.duration ?? DEFAULT_STORY_DURATION}
                            isActive={idx <= currentStoryIdx}
                            isCompleted={idx < currentStoryIdx}
                        />
                    ))}
                </div>
                <ProfileSection name={name} profileUrl={profileUrl} />
            </div>
            <div className="w-[100vw] h-[100vh] min-w-[100vw] min-h-[100vh] absolute z-[-1] ">
                <Image
                    src={stories[currentStoryIdx].storyUrl}
                    alt="story"
                    className="brightness-90"
                    priority
                />
                <Button
                    variant="ghost"
                    className=" w-1/2 fixed top-0 left-0  h-full"
                    onClick={handlePrevStory}
                />
                <Button
                    variant="ghost"
                    className=" w-1/2 fixed top-0 right-0 h-full"
                    onClick={handleNextStory}
                />
            </div>
        </div>
    );
};

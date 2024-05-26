import Pic1 from "@/../public/images/pic-1.jpeg";
import Pic2 from "@/../public/images/pic-2.jpg";
import Pic3 from "@/../public/images/pic-3.jpeg";
import Pic4 from "@/../public/images/pic-4.jpeg";
import Pic5 from "@/../public/images/pic-5.jpeg";
import Pic6 from "@/../public/images/pic-6.jpeg";
import Story1 from "@/../public/images/story-1.jpg";
import Story2 from "@/../public/images/story-2.webp";
import Story3 from "@/../public/images/story-3.jpg";
import Story4 from "@/../public/images/story-4.png";
import Story5 from "@/../public/images/story-5.jpg";
import Story6 from "@/../public/images/story-6.png";
import Story7 from "@/../public/images/story-7.png";
import Story8 from "@/../public/images/story-8.jpg";
import Story9 from "@/../public/images/story-9.jpg";
import Story10 from "@/../public/images/story-10.webp";
import Story11 from "@/../public/images/story-11.jpg";
import Story12 from "@/../public/images/story-12.webp";
import Story13 from "@/../public/images/story-13.png";
import Story15 from "@/../public/images/story-15.webp";
import { Story } from "@/components/story";
import { IStoryItem } from "@/interface";

const STORY_ITEMS: IStoryItem = {
    users: [
        {
            profileUrl: Pic3,
            name: "Sophia",
            stories: [
                { storyUrl: Story5 },
                { storyUrl: Story4 },
                { storyUrl: Story8 },
                { storyUrl: Story7 },
            ],
        },
        {
            profileUrl: Pic2,
            name: "Michael",
            stories: [{ storyUrl: Story12 }],
        },
        {
            profileUrl: Pic1,
            name: "John Doe",
            stories: [
                { storyUrl: Story1 },
                { storyUrl: Story3 },
                { storyUrl: Story2 },
            ],
        },
        {
            profileUrl: Pic4,
            name: "Robert",
            stories: [{ storyUrl: Story9 }, { storyUrl: Story6 }],
        },
        {
            profileUrl: Pic5,
            name: "Sarah",
            stories: [
                { storyUrl: Story10 },
                { storyUrl: Story5 },
                { storyUrl: Story3 },
            ],
        },
        {
            profileUrl: Pic6,
            name: "David",
            stories: [
                { storyUrl: Story15 },
                { storyUrl: Story11 },
                { storyUrl: Story13 },
            ],
        },
    ],
};

async function getStory() {
    return STORY_ITEMS;
}

export default async function Home() {
    try {
        const storyItems = await getStory();
        const filteredStoryItems = storyItems.users.filter(
            (user) => user.stories.length > 0
        );
        return (
            <main className="p-4">
                <Story storyItem={{ users: filteredStoryItems }} />
            </main>
        );
    } catch (error) {
        return <div>Error fetching: {JSON.stringify(error)}</div>;
    }
}

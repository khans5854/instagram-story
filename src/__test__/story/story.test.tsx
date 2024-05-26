import React from "react";
import { render, screen } from "@testing-library/react";
import { IStoryItem } from "@/interface";
import { Story } from "@/components/story";

// Mock the StoryProvider, StoryHeader, and StoryPreview components
jest.mock("../../components/story/storyContext.tsx", () => ({
    StoryProvider: ({ children }: any) => <div>{children}</div>,
}));

jest.mock("../../components/story/storyHeader.tsx", () => ({
    StoryHeader: ({ users }: any) => (
        <div data-testid="story-header">
            {users.map((user: any) => user.name).join(", ")}
        </div>
    ),
}));

jest.mock("../../components/story/storyPreview.tsx", () => ({
    StoryPreview: () => <div data-testid="story-preview" />,
}));

describe("Story", () => {
    const mockStoryItem: IStoryItem = {
        users: [
            {
                name: "User1",
                profileUrl: "https://example.com/user1.jpg",
                stories: [
                    {
                        storyUrl: "https://example.com/story1.jpg",
                        duration: 5000,
                    },
                ],
            },
            {
                name: "User2",
                profileUrl: "https://example.com/user2.jpg",
                stories: [
                    {
                        storyUrl: "https://example.com/story2.jpg",
                        duration: 5000,
                    },
                ],
            },
        ],
    };

    test("renders Story component correctly", () => {
        render(<Story storyItem={mockStoryItem} />);

        // Check that the StoryHeader is rendered with the correct users
        const header = screen.getByTestId("story-header");
        expect(header).toBeInTheDocument();
        expect(header).toHaveTextContent("User1, User2");

        // Check that the StoryPreview is rendered
        const preview = screen.getByTestId("story-preview");
        expect(preview).toBeInTheDocument();
    });
});

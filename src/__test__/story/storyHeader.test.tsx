import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { IUser } from "@/interface";
import { useStory } from "@/components/story/storyContext";
import { StoryHeader } from "@/components/story/storyHeader";

// Mock the useStory hook
jest.mock("../../components/story/storyContext.tsx", () => ({
    useStory: jest.fn(),
}));

// Mock the Button and Image components
jest.mock("../../components/ui/button.tsx", () => ({
    Button: ({ children, ...props }: any) => (
        <button {...props}>{children}</button>
    ),
}));

jest.mock("next/image", () => {
    const Image = (props: any) => <img {...props} />;
    Image.displayName = "Image";
    return Image;
});

describe("StoryHeader", () => {
    const users: IUser[] = [
        {
            profileUrl: "https://example.com/image1.jpg",
            name: "User1",
            stories: [{ storyUrl: "https://example.com/image1.jpg" }],
        },
        {
            profileUrl: "https://example.com/image2.jpg",
            name: "User2",
            stories: [{ storyUrl: "https://example.com/image1.jpg" }],
        },
    ];

    beforeEach(() => {
        // Clear all mocks before each test
        jest.clearAllMocks();
    });

    test("renders the users correctly", () => {
        (useStory as jest.Mock).mockReturnValue({
            handleOpen: jest.fn(),
        });

        render(<StoryHeader users={users} />);

        users.forEach((user) => {
            expect(screen.getByText(user.name)).toBeInTheDocument();
        });
    });

    test("calls handleOpen when a user is clicked", () => {
        const handleOpenMock = jest.fn();

        (useStory as jest.Mock).mockReturnValue({
            handleOpen: handleOpenMock,
        });

        render(<StoryHeader users={users} />);

        const buttons = screen.getAllByRole("button");
        buttons.forEach((button, index) => {
            fireEvent.click(button);
            expect(handleOpenMock).toHaveBeenCalledWith(index);
        });
    });
});

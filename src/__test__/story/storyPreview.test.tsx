import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useStory } from "@/components/story/storyContext";
import { StoryPreview } from "@/components/story/storyPreview";
// Mock the useStory hook
jest.mock("../../components/story/storyContext.tsx", () => ({
    useStory: jest.fn(),
}));

// Mock the StoryImage, ProfileSection, Button, and Progress components
jest.mock("../../components/story/storyImage.tsx", () => ({
    StoryImage: (props: any) => <div data-testid="story-image" {...props} />,
}));

jest.mock("../../components/story/storyPreviewProfile.tsx", () => ({
    ProfileSection: (props: any) => (
        <div data-testid="profile-section" {...props} />
    ),
}));

jest.mock("../../components/ui/button.tsx", () => ({
    Button: ({ children, ...props }: any) => (
        <button {...props}>{children}</button>
    ),
}));

jest.mock("../../components/ui/progress", () => ({
    Progress: (props: any) => <div data-testid="progress" {...props} />,
}));

describe("StoryPreview", () => {
    const mockUseStory = {
        isOpen: true,
        currentUser: {
            name: "John Doe",
            profileUrl: "https://example.com/profile.jpg",
            stories: [
                { storyUrl: "https://example.com/story1.jpg", duration: 5000 },
                { storyUrl: "https://example.com/story2.jpg", duration: 5000 },
            ],
        },
        currentStoryIdx: 0,
        handleNextStory: jest.fn(),
        handlePrevStory: jest.fn(),
        currentStroyLoaded: true,
    };

    beforeEach(() => {
        (useStory as jest.Mock).mockReturnValue(mockUseStory);
        jest.clearAllMocks();
    });

    test("renders the StoryPreview component correctly", () => {
        render(<StoryPreview />);

        expect(screen.getByTestId("story-image")).toBeInTheDocument();
        expect(screen.getByTestId("profile-section")).toBeInTheDocument();
        expect(screen.getAllByTestId("progress")).toHaveLength(
            mockUseStory.currentUser.stories.length
        );

        // Check for the presence of navigation buttons
        const buttons = screen.getAllByRole("button");
        expect(buttons).toHaveLength(2);
    });

    test("calls handleNextStory when the right half is clicked", () => {
        render(<StoryPreview />);

        const buttons = screen.getAllByRole("button");
        fireEvent.click(buttons[1]); // Click the right half

        expect(mockUseStory.handleNextStory).toHaveBeenCalled();
    });

    test("calls handlePrevStory when the left half is clicked", () => {
        render(<StoryPreview />);

        const buttons = screen.getAllByRole("button");
        fireEvent.click(buttons[0]); // Click the left half

        expect(mockUseStory.handlePrevStory).toHaveBeenCalled();
    });

    test("does not render the StoryPreview component when isOpen is false", () => {
        (useStory as jest.Mock).mockReturnValue({
            ...mockUseStory,
            isOpen: false,
        });

        render(<StoryPreview />);

        expect(screen.queryByTestId("story-image")).not.toBeInTheDocument();
    });
});

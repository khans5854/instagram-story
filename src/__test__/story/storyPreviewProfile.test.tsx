import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useStory } from "@/components/story/storyContext";
import { ProfileSection } from "@/components/story/storyPreviewProfile";

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

// Mock the icons
jest.mock("../../components/icons", () => ({
    Chat: () => <span data-testid="chat-icon" />,
    CloseIcon: () => <span data-testid="close-icon" />,
    ThreeDotIcon: () => <span data-testid="three-dot-icon" />,
}));

describe("ProfileSection", () => {
    const name = "John Doe";
    const profileUrl = "https://example.com/profile.jpg";

    beforeEach(() => {
        // Clear all mocks before each test
        jest.clearAllMocks();
    });

    test("renders the profile name and image correctly", () => {
        (useStory as jest.Mock).mockReturnValue({
            handleClose: jest.fn(),
        });

        render(<ProfileSection name={name} profileUrl={profileUrl} />);

        const profileImage = screen.getByAltText(name);
        const profileName = screen.getByText(name);
        const chatIcon = screen.getByTestId("chat-icon");
        const closeIcon = screen.getByTestId("close-icon");
        const threeDotIcon = screen.getByTestId("three-dot-icon");

        expect(profileImage).toBeInTheDocument();
        expect(profileName).toBeInTheDocument();
        expect(chatIcon).toBeInTheDocument();
        expect(closeIcon).toBeInTheDocument();
        expect(threeDotIcon).toBeInTheDocument();
    });

    test("calls handleClose when the close button is clicked", () => {
        const handleCloseMock = jest.fn();

        (useStory as jest.Mock).mockReturnValue({
            handleClose: handleCloseMock,
        });

        render(<ProfileSection name={name} profileUrl={profileUrl} />);

        const closeButton = screen.getByRole("button");
        fireEvent.click(closeButton);

        expect(handleCloseMock).toHaveBeenCalled();
    });
});

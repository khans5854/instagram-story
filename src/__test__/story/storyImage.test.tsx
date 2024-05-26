import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useStory } from "@/components/story/storyContext";
import { StoryImage } from "@/components/story/storyImage";

// Mock the useStory hook
jest.mock("../../components/story/storyContext.tsx", () => ({
    useStory: jest.fn(),
}));

// Mock the Image component from next/image
jest.mock("next/image", () => {
    const Image = (props: any) => <img {...props} />;
    Image.displayName = "Image";
    return Image;
});

// Mock the Spinner component
jest.mock("../../components/ui/spinner", () => {
    const Spinner = (props: any) => <div data-testid="spinner" {...props} />;
    Spinner.displayName = "Spinner";
    return Spinner;
});

describe("StoryImage", () => {
    const mockUseStory = {
        currentStroyLoaded: false,
        handleImageLoad: jest.fn(),
    };

    beforeEach(() => {
        (useStory as jest.Mock).mockReturnValue(mockUseStory);
        jest.clearAllMocks();
    });

    test("renders the image with a spinner initially", () => {
        render(<StoryImage src="https://example.com/story.jpg" />);

        // Check that the image is rendered but not visible initially
        const image = screen.getByRole("img");
        expect(image).toBeInTheDocument();
        expect(image).toHaveClass("brightness-90 invisible");

        // Check that the spinner is rendered
        const spinner = screen.getByTestId("spinner");
        expect(spinner).toBeInTheDocument();
    });

    test("hides the spinner and shows the image when loaded", async () => {
        (useStory as jest.Mock).mockReturnValue({
            ...mockUseStory,
            currentStroyLoaded: true,
        });

        render(<StoryImage src="https://example.com/story.jpg" />);

        // Simulate the image loading
        const image = screen.getByRole("img");
        fireEvent.load(image);

        await waitFor(() => {
            expect(image).toHaveClass("brightness-90 visible");
        });

        // Check that the spinner is not rendered
        const spinner = screen.queryByTestId("spinner");
        expect(spinner).not.toBeInTheDocument();
    });

    test("calls handleImageLoad on image load", () => {
        render(<StoryImage src="https://example.com/story.jpg" />);

        const image = screen.getByRole("img");
        fireEvent.load(image);

        expect(mockUseStory.handleImageLoad).toHaveBeenCalled();
    });
});

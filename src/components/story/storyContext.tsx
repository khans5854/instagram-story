"use client";
import { IStoryItem, IUser } from "@/interface";
import { DEFAULT_STORY_DURATION } from "@/lib/constant";
import {
    PropsWithChildren,
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";

/**
 * Props for the StoryProvider component.
 */
interface IStoryContextProps {
    storyItem: IStoryItem;
}

/**
 * Type definition for the StoryContext.
 */
type StoryContextType = {
    isOpen: boolean;
    currentStroyLoaded: boolean;
    handleOpen: (idx: number) => void;
    handleClose: () => void;
    currentUser: IUser | null;
    currentStoryIdx: number;
    handleNextStory: () => void;
    handlePrevStory: () => void;
    handleImageLoad: () => void;
};

/**
 * Initial value for the StoryContext.
 */
const initialValue: StoryContextType = {
    isOpen: false,
    currentStroyLoaded: false,
    handleOpen: () => {},
    handleClose: () => {},
    currentUser: null,
    currentStoryIdx: 0,
    handleNextStory: () => {},
    handlePrevStory: () => {},
    handleImageLoad: () => {},
};

/**
 * Context for managing the story state.
 */
const storyContext = createContext<StoryContextType>(initialValue);

/**
 * Provider component for the StoryContext.
 */
const StoryProvider: React.FC<PropsWithChildren<IStoryContextProps>> = ({
    storyItem,
    children,
}) => {
    const [open, setOpen] = useState<number>(-1);

    const [currentStoryIdx, setCurrentStoryIdx] = useState<number>(0);

    const [currentStroyLoaded, setCurrentStoryLoaded] =
        useState<boolean>(false);

    /**
     * Opens the story at the specified index.
     * @param idx - The index of the story to open.
     */
    const handleOpen = useCallback((idx: number) => setOpen(idx), []);

    /**
     * Closes the currently open story.
     */
    const handleClose = useCallback(() => setOpen(-1), []);

    /**
     * Checks if a story is currently open.
     */
    const isOpen = useMemo(() => open >= 0, [open]);

    /**
     * Retrieves the current user based on the open story index.
     */
    const currentUser = useMemo(() => {
        if (open >= 0) {
            return storyItem.users[open];
        }
        return null;
    }, [open, storyItem.users]);

    /**
     * Handles the next story in the sequence.
     */
    const handleNextStory = useCallback(() => {
        if (!currentUser?.stories) {
            return;
        }
        const isLastStory = currentStoryIdx === currentUser?.stories.length - 1;
        const isLastUser = open === storyItem.users.length - 1;
        if (isLastStory && isLastUser) {
            setOpen(-1);
            return;
        }

        if (isLastStory) {
            setOpen((prev) => prev + 1);
            setCurrentStoryIdx(0);
            return;
        }
        setCurrentStoryIdx((prev) => prev + 1);
    }, [
        currentUser,
        currentStoryIdx,
        setOpen,
        storyItem.users.length,
        open,
        setCurrentStoryIdx,
    ]);

    /**
     * Handles the previous story in the sequence.
     */
    const handlePrevStory = useCallback(() => {
        if (currentStoryIdx === 0) {
            setCurrentStoryIdx(storyItem.users[open - 1]?.stories.length - 1);
            setOpen((prev) => prev - 1);
        } else {
            setCurrentStoryIdx((prev) => prev - 1);
        }
    }, [currentStoryIdx, setOpen, setCurrentStoryIdx, open, storyItem.users]);

    /**
     * Callback function that is called when the image is loaded.
     * It sets the currentStoryLoaded state to true, indicating that the current story image has been loaded.
     */
    const handleImageLoad = useCallback(() => {
        setCurrentStoryLoaded(true);
    }, []);

    /**
     * Resets the currentStoryLoaded state to false whenever the currentUser or currentStoryIdx changes.
     */
    useEffect(
        () => setCurrentStoryLoaded(false),
        [currentUser, currentStoryIdx]
    );

    /**
     * Sets up a timer to automatically advance to the next story.
     */
    useEffect(() => {
        if (!currentStroyLoaded) return;
        const timer = setInterval(
            handleNextStory,
            currentUser?.stories[currentStoryIdx].duration ??
                DEFAULT_STORY_DURATION * 1000
        );
        return () => clearInterval(timer);
    }, [handleNextStory, currentUser, currentStoryIdx, currentStroyLoaded]);

    /**
     * Resets the current story index when the story is closed.
     */
    useEffect(() => {
        return () => setCurrentStoryIdx(0);
    }, [isOpen]);

    /**
     * The value to be provided by the StoryProvider.
     */
    const value = useMemo(
        () => ({
            isOpen,
            currentStroyLoaded,
            handleOpen,
            handleClose,
            currentUser,
            currentStoryIdx,
            handleNextStory,
            handlePrevStory,
            handleImageLoad,
        }),
        [
            isOpen,
            currentStroyLoaded,
            handleOpen,
            handleClose,
            currentUser,
            currentStoryIdx,
            handleNextStory,
            handlePrevStory,
            handleImageLoad,
        ]
    );

    return (
        <storyContext.Provider value={value}>{children}</storyContext.Provider>
    );
};

/**
 * Custom hook for accessing the StoryContext.
 */
const useStory = () => {
    const context = useContext(storyContext);

    if (!context) {
        throw new Error("useStory must be used within a StoryProvider");
    }
    return context;
};

export { StoryProvider, useStory };

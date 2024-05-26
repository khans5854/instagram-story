/**
 * Represents a single story component.
 *
 * @component
 * @param {StoryProps} props - The props for the Story component.
 * @param {IStoryItem} props.storyItem - The story item data.
 * @returns {JSX.Element} The rendered Story component.
 */
"use client";
import { IStoryItem } from "@/interface";
import React from "react";
import { StoryProvider } from "./storyContext";
import { StoryHeader } from "./storyHeader";
import { StoryPreview } from "./storyPreview";

interface StoryProps {
    storyItem: IStoryItem;
}

export const Story: React.FC<StoryProps> = ({ storyItem }) => {
    const { users } = storyItem;
    return (
        <StoryProvider storyItem={storyItem}>
            <StoryHeader users={users} />
            <StoryPreview />
        </StoryProvider>
    );
};

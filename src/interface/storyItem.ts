import { StaticImageData } from "next/image";

type IUrl = string | StaticImageData;

export interface IStoryItem {
    users: IUser[];
}

export interface IUser {
    profileUrl: IUrl;
    name: string;
    stories: IStroy[];
}

export interface IStroy {
    storyUrl: IUrl;
    duration?: number;
}

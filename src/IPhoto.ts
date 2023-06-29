import { Key } from "react";

export interface Photo {
    albumId: Number,
    id: Key,
    title: string,
    url: URL,
    thumbnailUrl: URL
}

export interface PhotoResponse { 
    data: Photo[]
}
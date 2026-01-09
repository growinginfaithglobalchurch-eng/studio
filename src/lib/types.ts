
import type { ImagePlaceholder } from './placeholder-images';

export type User = {
    id: string | number;
    name: string;
    location: string;
    avatar: ImagePlaceholder;
}

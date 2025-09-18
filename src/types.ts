export interface Track {
  title: string;
  author: string;
  length: number;
  identifier: string;
  isStream: boolean;
  uri?: string | null;
  artworkUrl?: string | null;
  isrc?: string | null;
  sourceName: string;
  position?: number;
}

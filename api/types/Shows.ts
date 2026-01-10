export type ShowDetails = {
    id: number;
    name: string;
    summary?: string;
    image?: {
        medium: string;
        original: string;
    };
    rating: {
        average: number | null;
    };
    genres: string[];
    network?: {
        name: string;
        id: number;
        officialSite: string | null;
        country: {
            name: string;
            code: string;
            timezone: string;
        };
    };
    schedule: {
        time: string;
        days: string[];
    };
};

export type Show = {
    score: number;
    show: ShowDetails;
};

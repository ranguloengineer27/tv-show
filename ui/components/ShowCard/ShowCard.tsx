import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../baseComponents/Card/Card";
import { StarIcon } from "lucide-react";
import { Button } from "../baseComponents/Button/Button";
import router from "next/router";

export type ShowCardProps = {
    title: string;
    summary?: string;
    image?: string;
    genres?: string[];
    rating?: number | null;
    url: string;
};

function ShowCard({ title, summary, image, genres, rating, url }: ShowCardProps) {
    return (
        <Card>
            {image && (
                <div className="relative h-48 w-full">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover rounded-t-lg"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </div>
            )}

            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>

            <hr />

            <CardContent>
                <div className="flex items-center gap-2">
                    <StarIcon className="h-5 w-5 text-yellow-400" />
                    {rating ?
                        <span className="text-sm font-medium">{rating}</span>
                        : <span className="text-sm font-medium text-muted-foreground">Not rated</span>
                    }
                </div>
            </CardContent>

            {summary && (
                <CardContent>
                    <div
                        className="text-sm text-muted-foreground"
                        dangerouslySetInnerHTML={{ __html: summary }}
                    />
                </CardContent>
            )}

            {genres &&
                <CardContent>
                    <div className="flex flex-wrap gap-2">
                        {genres.map((genre) => (
                            <span
                                key={genre}
                                className="inline-flex items-center rounded-full bg-muted px-2 py-1 text-xs font-medium text-muted-foreground"
                            >
                                {genre}
                            </span>
                        ))}
                    </div>
                    <hr className="mt-4" />
                </CardContent>
            }
            <CardFooter>
                <Button
                    variant="outline"
                    className="cursor-pointer"
                    onClick={() => router.push(url)}
                >
                    See more
                </Button>
            </CardFooter>
        </Card>
    );
}

export default ShowCard;
import { Card, CardContent, CardHeader, CardTitle } from "../baseComponents/Card/Card";

export type ShowCardProps = {
    title: string;
    summary?: string;
    image?: string;
};

function ShowCard({ title, summary, image }: ShowCardProps) {
    return (
        <Card>
            {image && (
                <img
                    src={image}
                    alt={title}
                    className="h-48 w-full object-cover rounded-t-lg"
                />
            )}

            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>

            {summary && (
                <CardContent>
                    <div
                        className="text-sm text-muted-foreground"
                        dangerouslySetInnerHTML={{ __html: summary }}
                    />
                </CardContent>
            )}
        </Card>
    );
}

export default ShowCard;
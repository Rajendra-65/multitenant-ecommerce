import Link from "next/link";
import Image from "next/image";

interface ProductCardprops {
    id: string;
    name: string;
    imageUrl?: string | null;
    authorUsername: string;
    authorImageUrl?: string | null;
    reviewRating: number;
    reviewCount: number;
    price: number;
}

export const ProuductCard = ({
    id,
    name,
    imageUrl,
    authorUsername,
    authorImageUrl,
    reviewRating,
    reviewCount,
    price,
}: ProductCardprops) => {
    return (
        <Link
            href="/"
        >
            <div className="border rounded-md bg-white overflow-hidden h-full flex flex-col">
                <div className="relative aspect-square">
                    <Image
                        alt={name}
                        fill
                        src={imageUrl || ""}
                        className="object-cover"
                    />
                </div>
            </div>
        </Link>
    )

}
import { useTRPC } from "@/trpc/client";
import { Checkbox } from "@/components/ui/checkbox";
import { useInfiniteQuery } from "@tanstack/react-query";
import { DEFAULT_LIMIT } from "@/constants";

interface TagsFilterProps {
    value ? : string [] | null;
    onChange : (value: string[]) => void
}

export const TagsFilter = ({value,onChange}:TagsFilterProps) => {
    const trpc = useTRPC()
    const {data} = useInfiniteQuery(trpc.tags.getMany.infiniteQueryOptions(
        {
            limit:DEFAULT_LIMIT
        },
        {
            getNextPageParam: (lastpage) => {
                return lastpage.docs.length > 0 ? lastpage.nextPage : undefined
            },
        }
    ))
}


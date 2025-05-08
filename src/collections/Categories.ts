import type { CollectionConfig } from "payload";

export const Categories : CollectionConfig = {
    slug: "Categories",
    access:{
        create:() =>false,
        update:() => false,
    },
    fields : [
        {
            name : "name",
            type : "text",
            required : true,
        },
    ],
};
import type { CollectionConfig } from "payload";

export const Categories : CollectionConfig = {
    slug: "Categories",
    
    admin: {
        useAsTitle : "name"
    },
    
    fields : [
        {
            name : "name",
            type : "text",
            required : true,
        },
        {
            name: "slug",
            type: "text",
            required: true,
            unique: true,
            index: true
        },
        {
            name: "color",
            type: "text",
        },
        {
            name: "parent",
            type: "relationship",
            relationTo : "Categories",
            hasMany : false,
        },
        {
            name : "subcategores",
            type: "join",
            collection: "Categories",
            on: "parent",
            hasMany:true,
        }
    ],
};
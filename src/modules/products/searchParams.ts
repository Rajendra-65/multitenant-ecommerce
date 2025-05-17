import {parseAsString } from "nuqs";
import { parseAsArrayOf } from "nuqs";
import {createLoader} from "nuqs/server"
import { parseAsStringLiteral } from "nuqs/server";

const sortValues = ["curated","trending","hot_and_new"] as const


export const params = {
  sort : parseAsStringLiteral(sortValues).withDefault("curated"),
  minPrice: parseAsString.withOptions({
    clearOnDefault: true,
  }),
  maxPrice: parseAsString.withOptions({
    clearOnDefault: true,
  }),
  tags: parseAsArrayOf(parseAsString)
    .withOptions({
      clearOnDefault : true
    })
};

export const loadProductFilters = createLoader(params)
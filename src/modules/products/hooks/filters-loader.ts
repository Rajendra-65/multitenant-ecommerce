import { parseAsString } from "nuqs/server";
import { createLoader } from "nuqs/server";

export const serverParams = {
  minPrice: parseAsString,
  maxPrice: parseAsString,
};

export const loadProductFilters = createLoader(serverParams);

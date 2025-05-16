"use client"

import { useQueryStates, parseAsString } from "nuqs";
import { parseAsArrayOf } from "nuqs";
export const params = {
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

export const useProductFilters = () => {
  return useQueryStates(params);
};

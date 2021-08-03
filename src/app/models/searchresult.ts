import { ProductFilters } from "./productfilters";
import { ProductCard } from "./productcard";

export class SearchResult {
    filterlist: ProductFilters;
    productlist: ProductCard[];
}
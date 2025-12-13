import { BrandModel } from "./brandModel";
import { CategoryModel } from "./categoryModel";

export interface ElectronicItemModel {
    electronicItemID: number;
    electronicItemName: string;
    price: number;
    qoh: number;

    electronicItemImageUrl: string | null;
    electronicItemImage: string | null;

    //FK: Fields
    brandResponseDto: BrandModel;
    categoryResponseDto: CategoryModel;
}
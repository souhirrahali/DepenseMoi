import { Depense } from "./depense.model";
import { Revenu } from "./revenu.model";

export interface Stats {
    revenu: number;
    depense: number;
    latestRevenu: Revenu;
    latestDepense: Depense;
    balance: number;
    minRevenu: number;
    maxRevenu: number;
    minDepense: number;
    maxDepense: number;
}
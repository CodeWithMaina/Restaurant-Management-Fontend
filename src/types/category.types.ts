

export interface TMenuItem {
    id: number;
    name: string;
    description: string;
    price: number;
    active: boolean
}

export interface TCategory {
    id: number;
    name: string;
    menuItems: TMenuItem[];
}

export type TCategoryItemResponse = TCategory[];


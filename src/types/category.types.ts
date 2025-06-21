

interface TMenuItem {
    id: number;
    name: string;
    description: string;
    price: number;
    active: boolean
}

interface TCategory {
    id: number;
    name: string;
    menuItems: TMenuItem[];
}

export type TCategoryItemResponse = TCategory[];


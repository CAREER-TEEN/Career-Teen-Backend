export declare enum Category {
    study = "\uC0AC\uBB34\uC9C1",
    benefit = "IT",
    Company = "\uB514\uC790\uC778",
    career = "\uC694\uC2DD",
    Youth = "\uB9C8\uCF00\uD305"
}
export declare class MentoringBulletinBoard {
    id: number;
    category: Category;
    title: string;
    text: string;
    img: string;
    createdAt: Date;
    view: number;
}

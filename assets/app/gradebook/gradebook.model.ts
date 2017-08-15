import { Category } from "./category/category.model"

export class Gradebook {

    /** A string uniquely identifying this gradebook. */
    private _id: string;

    /**
     *
     * @param {string} id - The unique identifier of this gradebook object.
     * @param {string} name - The name of this gradebook (i.e. course).
     * @param {Category[]} categories - The categories that belong to this gradebook.
     */
    constructor(id: string, public name: string, public categories: Category[]) {
        this._id = id;
    }

    get id(): string {
        return this._id;
    }
}
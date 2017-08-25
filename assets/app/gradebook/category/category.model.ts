import {Assignment} from "./assignment/assignment.model";

export class Category {
    /** A string uniquely identifying this category. */
    private _id: string;

    /**
     *
     * @param {string} id - The unique identifier of this category object.
     * @param {string} name - The name of the category.
     * @param {Assignment[]} assignments - The assignments that belong to this category.
     * @param {number} weight - The percentage of the course grade this category is worth.
     */
    constructor(public name: string, public assignments: Assignment[], public weight: number, id?: string) {
        this._id = id;
    }

    get id(): string {
        return this._id;
    }
}
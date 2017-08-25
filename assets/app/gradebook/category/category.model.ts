import {Assignment} from "./assignment/assignment.model";

export class Category {
    /**
     * @param {string} name - The name of the category.
     * @param {Assignment[]} assignments - The assignments that belong to this category.
     * @param {number} weight - The percentage of the course grade this category is worth.
     */
    constructor(public name: string, public assignments: Assignment[], public weight: number) {}
}
import {Category} from "./category/category.model"

export class Gradebook {

    /** A string uniquely identifying this gradebook. */
    private _id: string;

    /**
     *
     * @param {string} id - The unique identifier of this gradebook object.
     * @param {string} name - The name of this gradebook (i.e. course).
     * @param {Category[]} categories - The categories that belong to this gradebook.
     */
    constructor(public name: string, public categories: Category[], id?: string) {
        this._id = id;
    }

    get id(): string {
        return this._id;
    }

    get grade(): number {
        let earnedPercent = 0;
        let totalPercent = 0;

        this.categories.forEach(c => {
            let earnedTotal = 0;
            let worthTotal = 0;
            c.assignments.forEach(a => {
                if (a.earned !== undefined && a.worth !== undefined) { // don't factor in the assignment if it has missing grade info
                    earnedTotal += a.earned;
                    worthTotal += a.worth
                }
            });
            earnedPercent += (earnedTotal/worthTotal) * c.weight;
            totalPercent += c.weight;
        });

        return earnedPercent / totalPercent;
    }
}
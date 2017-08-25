export class Assignment {
    /**
     * @param {string} name - The name of the assignment.
     * @param {number} earned - The number of points/marks earned by the student for this assignment.
     * @param {number} worth - The number of points/marks this assignment is worth.
     */
    constructor(public name: string, public earned?: number, public worth?: number) { }
}
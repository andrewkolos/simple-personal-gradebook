import {Assignment} from "./assignment/assignment.model";

export class Category {

    constructor(public name: string, public assignments: Assignment[], public weight?: number) {}

}
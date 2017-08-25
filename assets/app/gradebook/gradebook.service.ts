import {Gradebook} from "./gradebook.model";
import {Assignment} from "./category/assignment/assignment.model";
import {Category} from "./category/category.model";

export class GradebookService {
    private _gradebooks: Gradebook[] = [];

    addGradebook(gradebook: Gradebook) {
        this._gradebooks.push(gradebook);
        console.log(this._gradebooks);
    }

    deleteGradebook(gradebook: Gradebook) {
        this._gradebooks.splice(this._gradebooks.indexOf(gradebook), 1);
    }

    getGradebooks(): Gradebook[] {
        return this._gradebooks;
    }

    constructor() {
        var assignment1 = new Assignment( "assignmentName1", 50, 100, "assignmentID1");
        var assignment2 = new Assignment( "assignmentName2", 75, 80, "assignmentID2");
        var assignment3 = new Assignment( "assignmentName3", 100, 100, "assignmentID3");
        var assignment4 = new Assignment( "assignmentName4", 90, 90, "assignmentID4");

        var category1 = new Category("categoryName", [assignment1, assignment2], 50, "categoryID1");
        var category2 = new Category("categoryName2", [assignment3, assignment4], 50, "categoryID2");


        var gb = new Gradebook("gradebook name", [category1, category2], "gradebookID1");
        this._gradebooks.push(gb);
    }
}
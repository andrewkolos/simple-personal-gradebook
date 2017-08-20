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
        var assignment = new Assignment("assignmentID", "assignmentName", 50, 100);
        var assignment2 = new Assignment("assignmentID2", "assignmentName2", 75, 80);
        var assignment3 = new Assignment("assignmentID3", "assignmentNam3", 100, 100);
        var assignment4 = new Assignment("assignmentID4", "assignmentName4", 90, 90);

        var category = new Category("categoryID", "categoryName", [assignment, assignment2], 50);
        var category2 = new Category("categoryID2", "categoryName2", [assignment3, assignment4], 50);


        var gb = new Gradebook("id", "gradebook name", [category, category2]);
        this._gradebooks.push(gb);
    }
}
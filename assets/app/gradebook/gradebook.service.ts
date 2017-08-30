import {Gradebook} from "./gradebook.model";
import {Assignment} from "./category/assignment/assignment.model";
import {Category} from "./category/category.model";
import {Http, RequestOptions, Headers} from "@angular/http";
import {Injectable} from "@angular/core";
import 'rxjs/Rx';
import {Observable} from "rxjs/Observable";

@Injectable()
export class GradebookService {
    private _gradebooks: Gradebook[] = [];

    constructor(private http: Http) {
        var assignment1 = new Assignment( "assignmentName1", 50, 100);
        var assignment2 = new Assignment( "assignmentName2", 75, 80);
        var assignment3 = new Assignment( "assignmentName3", 100, 100);
        var assignment4 = new Assignment( "assignmentName4", 90, 90);

        var category1 = new Category("categoryName", [assignment1, assignment2], 50);
        var category2 = new Category("categoryName2", [assignment3, assignment4], 50);


        var gb = new Gradebook("gradebook name", [category1, category2], "gradebookID1");

        this._gradebooks.push(gb);
    }

    addGradebook(gradebook: Gradebook) {
        this._gradebooks.push(gradebook);
    }

    deleteGradebook(gradebook: Gradebook) {
        this._gradebooks.splice(this._gradebooks.indexOf(gradebook), 1);
    }

    getGradebooks() {
        return this.http.get('http://localhost:3000/gradebook')
            .map(response => {
                const gradebooks = response.json().obj;
                let transformedGradebooks: Gradebook[] = [];
                for (let gradebook of gradebooks) {
                    transformedGradebooks.push(new Gradebook(gradebook.name, gradebook.categories, gradebook._id));
                }
                this._gradebooks = transformedGradebooks;
                return transformedGradebooks;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }

    getGradebookById(id: string) {
        return this.http.get('http://localhost:3000/gradebook/' + id)
            .map(response => {
                const gradebook = response.json().obj;
                let transformedGradebook = new Gradebook(gradebook.name, gradebook.categories, gradebook._id);
                return transformedGradebook;
            })
            .catch((error: Response) => Observable.throw("Error in gradebook service"));
    }

    updateGradebook(gradebook: Gradebook) {
        const body = JSON.stringify(gradebook);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.patch('http://localhost:3000/gradebook/' + gradebook.id, body, new RequestOptions({headers: headers}))
            .map(response => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }
}
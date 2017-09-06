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

    constructor(private http: Http) {}

    addGradebook(gradebook: Gradebook) {
        const body = JSON.stringify(gradebook);
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this.http.post('http://localhost:3000/gradebook' + token, body, {headers: headers})
            .map(response => {
                const result = response.json();
                const gradebook = new Gradebook(result.obj.name, result.obj.categories, result.obj._id);
                this._gradebooks.push(gradebook);
                return gradebook;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }

    deleteGradebook(gradebook: Gradebook) {
        this._gradebooks.splice(this._gradebooks.indexOf(gradebook), 1);
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this.http.delete('http://localhost:3000/gradebook/' + gradebook.id + token)
            .map(response => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }

    getGradebooks() {
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this.http.get('http://localhost:3000/gradebook' + token)
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
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this.http.patch('http://localhost:3000/gradebook/' + gradebook.id + token, body, new RequestOptions({headers: headers}))
            .map(response => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }
}
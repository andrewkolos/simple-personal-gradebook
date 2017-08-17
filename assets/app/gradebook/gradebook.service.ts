import {Gradebook} from "./gradebook.model";

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
}
import { Quantity } from '../shared/model/quantity.model';

export class Ingredient {
    public name : String;
    public quantity : Quantity;
    public labels : Array<String>;

    constructor(name : String, quantity : Quantity) {
        this.name = name;
        this.quantity = quantity;
        this.setLabels();
    }

    private setLabels() {
        this.labels.push(this.name);
    }
}
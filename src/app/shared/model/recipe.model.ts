import {Ingredient} from './ingredient.model';

export class Recipe {
    public name : String;
    public description : String;
    public imageUrl : String;
    public tutorialPath : String;
    public ingredients : Ingredient[];

    constructor(name : String, description : String, imageUrl : String, tutorialPath : String, ingredients : Ingredient[]) {
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
        this.tutorialPath = tutorialPath;
        this.ingredients = ingredients;
    }
}
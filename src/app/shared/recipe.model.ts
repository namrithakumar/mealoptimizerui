import {Ingredient} from './ingredient.model';

export class Recipe {
    public name : String;
    public description : String;
    public imagePath : String;
    public tutorialPath : String;
    public ingredients : Ingredient[];

    constructor(name : String, description : String, imagePath : String, tutorialPath : String, ingredients : Ingredient[]) {
        this.name = name;
        this.description = description;
        this.imagePath = imagePath;
        this.tutorialPath = tutorialPath;
        this.ingredients = ingredients;
    }
}
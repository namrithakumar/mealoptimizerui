export class Recipe {
    public name : String;
    public description : String;
    public imagePath : String;
    public tutorialPath : String;
    
    constructor(name : String, description : String, imagePath : String, tutorialPath : String) {
        this.name = name;
        this.description = description;
        this.imagePath = imagePath;
        this.tutorialPath = tutorialPath;
    }
}
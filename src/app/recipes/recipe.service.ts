import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();

    constructor(private slService : ShoppingListService){}

    // private recipes : Recipe[] = [
    //     new Recipe(
    //         'Recipe 1', 
    //         'Test desc 1',
    //         'https://cdn.loveandlemons.com/wp-content/uploads/2020/03/pantry-recipes-2.jpg',
    //         [
    //             new Ingredient('fries',20),
    //             new Ingredient('cheese',1)
    //         ] 
    //         ),
    //     new Recipe(
    //         'Recipe 2', 
    //         'Test desc 2',
    //         'https://cdn.loveandlemons.com/wp-content/uploads/2020/03/pantry-recipes-2.jpg',
    //         [
    //             new Ingredient('buns',2),
    //             new Ingredient('cheese',1)
    //         ]
    //         )
    
    //   ];
    private recipes : Recipe[] = [];

    setRecipes(recipes:Recipe[])
    {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes()
    {
        return this.recipes.slice();
    }

    addIngredientsToShoppingList(ingredients : Ingredient[])
    {
        this.slService.addIngredients(ingredients);
    }

    getRecipe(id:number)
    {
        return this.recipes[id];
    }

    addRecipe(recipe:Recipe)
    {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index:number, recipe:Recipe)
    {
        this.recipes[index] = recipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index:number)
    {
        this.recipes.splice(index,1);
        this.recipesChanged.next(this.recipes.slice());
    }
    
}
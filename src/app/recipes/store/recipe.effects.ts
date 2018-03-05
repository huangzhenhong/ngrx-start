import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { HttpClient, HttpRequest } from '@angular/common/http';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';
import { Store } from '@ngrx/store';

import * as RecipeActions from './recipe.actions';
import * as fromRecipes from './recipe.reducers';
import { Recipe } from '../recipe.model';
import { stat } from 'fs';

@Injectable()
export class RecipeEffects {
    @Effect()
    recipeFetch = this.actions$
        .ofType(RecipeActions.FETCH_RECIPES)
        .switchMap((action: RecipeActions.FetchRecipes) => {

            return this.httpClient.get<Recipe[]>('https://recipebook-9f375.firebaseio.com/recipes.json', {
                observe: 'body',
                responseType: 'json'
            })
                .map(
                    (recipes) => {
                        console.log(recipes);
                        for (let recipe of recipes) {
                            if (!recipe['ingredients']) {
                                recipe['ingredients'] = [];
                            }
                        }
                        return {
                            type: RecipeActions.SET_RECIPES,
                            payload: recipes
                        };
                    }
                );

        });
    
    @Effect({ dispatch: false })
    recipeStore = this.actions$
        .ofType(RecipeActions.STORE_RECIPES)
        .withLatestFrom(this.store.select('recipes'))
        .switchMap(([action, state]) => {
            const req = new HttpRequest('PUT', 'https://recipebook-9f375.firebaseio.com/recipes.json', state.recipes , {reportProgress: true});
            return this.httpClient.request(req);
        })

    constructor(private actions$: Actions, 
        private httpClient: HttpClient,
        private store: Store<fromRecipes.FeatureState>
    ) { }
}
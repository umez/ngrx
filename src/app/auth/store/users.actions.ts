import { createAction, props } from "@ngrx/store";


export const loginAction = createAction(
  '[User] login',
  props<{ email: string, id: number }>
)

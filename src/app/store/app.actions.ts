import { createAction } from '@ngrx/store';

export const appLoadingStarted = createAction('[App] Loading Started');

export const appLoadingFinished = createAction('[App] Loading Finished');

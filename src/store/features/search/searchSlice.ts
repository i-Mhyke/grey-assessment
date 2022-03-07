import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../..";

export interface ISearchState {
    keyword: string
}
const initialState: ISearchState = {
    keyword: '',
}

export const searchSlice = createSlice({
    name: 'search',
    initialState,

    reducers: {
        sendSearch: (state, action: PayloadAction<string>) => {
            state.keyword = action.payload
        },

    }
});

export const { sendSearch } = searchSlice.actions;
export const currentSearch = (state: RootState) => state.searchReducer.keyword;
export default searchSlice.reducer;
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface ICartItem {
    id: string | undefined;
}

type CartState = ICartItem[];

const initialState: CartState = []

const cartSlice = createSlice({
    
    name: 'cart',
    initialState,
    reducers: {
        addCourseToCart: (state, action: PayloadAction<ICartItem>) => {
            if(!state.includes(action.payload)){
                state.push(action.payload);
            }           
        },
    },
})

export const { addCourseToCart } = cartSlice.actions

export default cartSlice.reducer

export const selectCurrentCourse = (state:{ cart: ICartItem }) => state.cart.id

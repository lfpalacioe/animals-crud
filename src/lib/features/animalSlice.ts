import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    id: 0,
    nombre: '',
    password: '',
    email: ''
}

export const animalSlice = createSlice({
    name: "animal",
    initialState,
    reducers: {
        loginAnimal: (state, actions) => {
            state.id = Number(actions.payload.id);
            state.nombre = actions.payload.nombre;
            state.password = actions.payload.password;
            state.email = actions.payload.email;
        },
        deleteAnimal: (state) => {
            state.id = 0;
            state.nombre = '',
            state.password = '',
            state.email = ''
        },
        editAnimal: (state, actions) => {
            state.id = Number(actions.payload.id),
            state.nombre = actions.payload.nombre
            state.password = actions.payload.password,
            state.email = actions.payload.email
        }
    }
});

export const {loginAnimal, deleteAnimal, editAnimal} = animalSlice.actions;
export default animalSlice.reducer;
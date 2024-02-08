import { deleteAnimal, editAnimal, loginAnimal } from "@/lib/features/animalSlice";
import { store } from "@/lib/store";

describe('Slicer de redux', () => {
    it('Should initialize reducer', () => {
        const state = store.getState().animalReducer;
        expect(state.nombre).toEqual('');
    });

    it('Should dispatch loginAnimal', ()=>{
        const result = store.dispatch(loginAnimal({
            id: 3,
            nombre: 'prueba',
            password: 'prueba',
            email: 'prueba'
        }));
        const animal = result.payload;
        const state = store.getState().animalReducer
        expect(state).toEqual(animal);
    });

    it('Should dispatch deleteAnimal', () => {
        store.dispatch(deleteAnimal());
        const state = store.getState().animalReducer;
        expect(state.nombre).toEqual('');
    });

    it('Should dispatch editAnimal', () => {
        const result = store.dispatch(editAnimal({
            id: 3,
            nombre: 'prueba',
            password: 'prueba',
            email: 'prueba'
        }));
        const animal = result.payload;
        const state = store.getState().animalReducer;
        expect(state).toEqual(animal);
    })
})
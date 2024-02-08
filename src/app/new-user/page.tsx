"use client";
import NavBar from "@/components/ui/navbar";
import FormContainer from "@/components/ui/formContainer";
import {useForm} from 'react-hook-form';
import { createFormValues } from "@/utils/interfaces/typesInterfaces";
import { registerValidation } from "@/utils/validations/validations";
import client from "@/utils/config/axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const NewUser = () => {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: {errors, isValid}
    } = useForm<createFormValues>({mode: 'onChange'});
    const onSubmit = handleSubmit((form) => {
        client.get('/animals').then((resp) => {
            if(resp.data?.some((e: any) => e.nombre === form.nombre.toUpperCase())){
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Este animal ya existe"
                })
            }else{
                client.post('/animals', {
                    id: Math.floor(Math.random() * 1000),
                    nombre: form.nombre.toUpperCase(),
                    email: form.email,
                    password: form.password
                }).then(() => {
                    Swal.fire({
                        icon: "success",
                        title: 'Cuenta creada',
                        text: "Animal creado con éxito"
                    });
                    router.push('/');
                }).catch((response) => {
                    Swal.fire({
                        icon: "error",
                        title: 'Error',
                        text: response.data
                    })
                })
            }
        }).catch((e) => {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Hubo un error"
            })
        })
        
    });

    return (
        <>
            <NavBar
                text="new-account"
            />
            <FormContainer
                title="Crear cuenta"
            >
                <form onSubmit={onSubmit}>
                    <div className="mb-8 text-center mt-5">
                        <label htmlFor="nombre" className="flex items-center justify-center pb-5 text-lg label-styles">Nombre</label>
                        <input
                            type="text"
                            placeholder="Nombre"
                            id="nombre"
                            className="input-border rounded-full w-3/4 py-2 px-3"
                            {...register('nombre', registerValidation.nombre)}
                        />
                        {errors?.nombre && <p className="text-red-300 mt-3" role="alert">{errors.nombre.message}</p>}
                    </div>
                    <div className="mb-8 text-center mt-5">
                        <label htmlFor="email" className="flex items-center justify-center pb-5 text-lg label-styles">E-mail</label>
                        <input
                            type="email"
                            placeholder="E-mail"
                            id="email"
                            className="input-border rounded-full w-3/4 py-2 px-3"
                            {...register('email', registerValidation.email)}
                        />
                        {errors?.email && <p className="text-red-300 mt-3" role="alert">{errors.email.message}</p>}
                    </div>
                    <div className="mb-8 text-center mt-5">
                        <label htmlFor="password" className="flex items-center justify-center pb-5 text-lg label-styles">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="password"
                            className="input-border rounded-full w-3/4 py-2 px-3"
                            {...register('password', registerValidation.password)}
                        />
                        {errors?.password && <p className="text-red-300 mt-3" role="alert">{errors.password.message}</p>}
                    </div>
                    <div className="mb-8 text-center mt-5">
                        <input
                            type="submit"
                            value="Crear cuenta"
                            className="input-submit-login rounded-full w-3/4 border py-2 px-3 text-xl font-bold"
                            disabled={!isValid}
                        />
                    </div>
                </form>
            </FormContainer>
        </>
    );
}
 
export default NewUser;
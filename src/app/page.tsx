"use client";
import NavBar from "@/components/ui/navbar";
import FormContainer from "@/components/ui/formContainer";
import { loginFormValues } from "@/utils/interfaces/typesInterfaces";
import { useForm } from "react-hook-form";
import { loginValidation } from "@/utils/validations/validations";
import { useAppDispatch } from "@/lib/hooks/hooks";
import { loginAnimal } from "@/lib/features/animalSlice";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import client from "@/utils/config/axios";

export default function Home() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: {errors, isValid}
  } = useForm<loginFormValues>({mode: 'onChange'});
  
  const onSubmit = handleSubmit((form) => {
    client.get('/animals').then((resp) => {
      const validationData = resp.data?.filter((el: any) => el.nombre === form.nombre.toUpperCase());
      if(validationData?.length !== 0 && validationData){
        if(validationData[0].password !== form.password){
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Contraseña equivocada"
          });
        }else{
          const payload = {
            id: validationData[0].id,
            nombre: validationData[0].nombre,
            email: validationData[0].email,
            password: validationData[0].password
          }
          dispatch(loginAnimal(payload));
          router.push('/user-panel');
        }
      }else{
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Este animal no existe"
        });
      }
    }).catch((e) => {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Contraseña equivocada"
      });
    })
    
  });

  return (
    <>
      <NavBar
        text="landing"
      />
      <FormContainer
        title="Login"
      >
        <form onSubmit={onSubmit}>
          <div className="mb-8 text-center mt-5">
            <label htmlFor="nombre" className="flex items-center justify-center pb-5 text-lg label-styles">Nombre</label>
            <input 
              type="text" 
              placeholder="Nombre"
              id="nombre"
              className="input-border rounded-full w-3/4 py-2 px-3"
              {...register('nombre', loginValidation.nombre)}
            />
            {errors?.nombre && <p className='text-red-300 mt-3' role="alert">{errors.nombre.message}</p>}
          </div>
          <div className="mb-8 text-center mt-5">
          <label htmlFor="password" className="flex items-center justify-center pb-5 text-lg label-styles">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              className="input-border rounded-full w-3/4 py-2 px-3"
              {...register('password', loginValidation.password)}
            />
            {errors?.password && <p className="text-red-300 mt-3" role="alert">{errors.password.message}</p>}
          </div>
          <div className="mb-4 text-center">
            <input
              type="submit"
              value="Empezar"
              className="input-submit-login rounded-full w-3/4 border py-2 px-3 text-xl font-bold"
              disabled={!isValid}
            />
          </div>
        </form>
      </FormContainer>
    </>
  );
}

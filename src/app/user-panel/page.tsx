"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import { useRouter } from "next/navigation";
import NavBar from "@/components/ui/navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPenToSquare, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Swal from "sweetalert2";
import client from "@/utils/config/axios";
import { deleteAnimal, editAnimal } from "@/lib/features/animalSlice";

const UserPanel = () => {
    const animal = useAppSelector(state => state.animalReducer);
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState('');
    const [passwords, setPasswords] = useState('');
    const [emails, setEmails] = useState('');

    if(animal.nombre === ''){
        router.push('/');
    }

    const editData = () => {
        const payload = {
            id: Number(animal.id),
            nombre: name === '' ? animal.nombre : name,
            password: passwords === '' ? animal.password : passwords,
            email: emails === '' ? animal.email : emails
        }
        client.put(`/animals/${animal.id}`, payload).then((resp) => {
            dispatch(editAnimal(payload));
            Swal.fire({
                title: "Actualizado con éxito",
                text: "El animal se ha actualizado",
                icon: "success"
            });
            setIsEditing(false);
        }).catch((e) => {
            Swal.fire({
                title: "Se produjo un error",
                text: "Hubo un error",
                icon: "error"
            });
        })
    }

    const deleteData = () => {
        Swal.fire({
            title: "Está Seguro?",
            text: "¿Desea eliminar su cuenta?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si",
            cancelButtonText: "No"
        }).then((result) => {
            if (result.isConfirmed) {
                client.delete(`/animals/${animal.id}`).then(() => {
                    dispatch(deleteAnimal());
                    Swal.fire({
                        title: "Eliminado",
                        text: "El animal ha sido eliminado",
                        icon: "success"
                    });
                    router.push('/');
                }).catch((e) => {
                    console.log(e);
                    Swal.fire({
                        title: "Error",
                        text: "Hubo un error",
                        icon: "error"
                    });
                });
            }
        });
    }

    return (
        <>
            <NavBar
                text="user-panel"
            />
            <div className="h-screen flex items-center justify-center">
                <div className="main-form-container w-3/5 login-container pt-8 pb-8">
                    <div className="relative overflow-x-auto">
                        <table className="w-full text-lg rtl:text-right text-gray-500">
                            <thead className="text-lg uppercase">
                                <tr className="border-b">
                                    <th scope="col" className="px-6 py-3">Nombre</th>
                                    <th scope="col" className="px-6 py-3">Email</th>
                                    <th scope="col" className="px-6 py-3">Contraseña</th>
                                    <th scope="col" className="px-6 py-3">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    {isEditing ? (
                                        <>
                                            <th className="py-5 px-5">
                                                <input 
                                                    type="text"
                                                    defaultValue={animal.nombre}
                                                    className="input-border rounded-full w-3/4 py-2 px-3"
                                                    onChange={(e) => setName(e.target.value)}
                                                />
                                            </th>
                                            <th className="py-5 px-5">
                                                <input
                                                    type="text"
                                                    defaultValue={animal.email}
                                                    className="input-border rounded-full w-3/4 py-2 px-3"
                                                    onChange={(e) => setEmails(e.target.value)}
                                                />
                                            </th>
                                            <th className="py-5 px-5">
                                                <input
                                                    type="text"
                                                    defaultValue={animal.password}
                                                    className="input-border rounded-full w-3/4 py-2 px-3"
                                                    onChange={(e) => setPasswords(e.target.value)}
                                                />
                                            </th>
                                        </>
                                        
                                    ) : (
                                        <>
                                            <th className="py-5 px-5">
                                                {animal.nombre}
                                            </th>
                                            <th className="py-5 px-5">
                                                {animal.email}
                                            </th>
                                            <th className="py-5 px-5">
                                                {animal.password}
                                            </th>
                                        </>
                                        
                                    )}
                                    
                                    {!isEditing ? (
                                        <th className="flex-auto items-center justify-center align-center">
                                            <FontAwesomeIcon 
                                                icon={faPenToSquare} 
                                                className="fas fa-pen-to-square h-10 w-10 cursor-pointer" 
                                                style={{color: "#D7EEB8"}}
                                                onClick={() => setIsEditing(true)}
                                            ></FontAwesomeIcon>
                                            <FontAwesomeIcon 
                                                icon={faTrash} 
                                                className="fas fa-trash h-10 w-10 cursor-pointer" 
                                                style={{color: "#D7EEB8"}}
                                                onClick={() => {deleteData()}}
                                            ></FontAwesomeIcon>
                                        </th>
                                    ) : (
                                        <th className="flex-auto items-center justify-center align-center">
                                            <FontAwesomeIcon 
                                                icon={faCheck} 
                                                className="fas fa-check h-10 w-10 cursor-pointer" 
                                                style={{color: "#D7EEB8"}}
                                                onClick={() => {editData()}}
                                            ></FontAwesomeIcon>
                                            <FontAwesomeIcon 
                                                icon={faXmark} 
                                                className="fas fa-xmark h-10 w-10 cursor-pointer" 
                                                style={{color: "#D7EEB8"}}
                                                onClick={() => setIsEditing(false)}
                                            ></FontAwesomeIcon>
                                        </th>
                                    )}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}
 
export default UserPanel;
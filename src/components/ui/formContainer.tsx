
const FormContainer = (props: any) => {
    const {title} = props;
    return (
        <div className="h-screen flex items-center justify-center">
            <div className="main-form-container lg:w-1/5 md:w-2/4 login-container pt-8 pb-8">
                <h1 className="text-3xl font-bold login-title text-center mt-6">{title}</h1>
                {props.children}
            </div>
        </div>
    )
}

export default FormContainer;
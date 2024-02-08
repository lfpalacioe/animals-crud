import Link from "next/link";

const NavBar = (props: any) => {
    const {text} = props;
    return (
        <nav className="flex items-center justify-between flex-wrap nav-bar p-1">
            <div className="flex items-center flex-shrink-0 text-white pb-3 pt-3 pl-3">
                <img src="/img/logo.svg" className="w-12 h-12"/>
            </div>
            {text === 'user-panel' && (
                <div>
                    <Link
                        href={'/'}
                        className="inline-block text-sm px-4 py-2 leading-none border rounded-full text-xl font-bold input-submit-login"     
                    >
                        Crear sesión
                    </Link>
                    
                </div>  
            )}
            {text === 'new-account' && (
                <div>
                <Link
                    href={'/'}
                    className="inline-block text-sm px-4 py-2 leading-none border rounded-full text-xl font-bold input-submit-login"     
                >
                    Login
                </Link>
            </div>  
            )}
            {text === 'landing' && (
                <div>
                    <Link
                        href={'/new-user'}
                        className="inline-block text-sm px-4 py-2 leading-none border rounded-full text-xl font-bold input-submit-login"     
                    >
                        Crear cuenta
                    </Link>
                </div>
            )

            }
        </nav>
    );
}
 
export default NavBar;
import Link from "next/link";

export default function Login() {
    return (
        <>
            <div className="login d-flex flex-column">
                <div className="d-flex " style={{ height: '20%' }}>
                    <img src="/logo-umi.svg" alt="logo-umi" />
                </div>
                <div className="cards d-flex justify-content-center align-items-center" style={{ height: '80%' }}>
                    <div className="card justify-content-between align-items-center">
                        <span>
                            <h3>Login</h3>
                            <input type="text" placeholder="Username" />
                            <input type="password" placeholder="Password" />
                            <Link href="#">Forget Password</Link>
                        </span>
                        <span>
                            <button style={{ color: '#000' }}>Login With Google</button>
                            <button style={{ backgroundColor: '#239843' }}>Login</button>
                            <p style={{ textAlign: 'center' }}>Don't have an account? <Link href="#">Register</Link></p>
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}
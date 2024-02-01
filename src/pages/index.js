import Link from "next/link";
import { useRouter } from "next/router";
import { db } from "../../public/firebaseConfig";
import { getDocs, collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";

async function fetchDataLoginFromFirestore() {
    const querySnapshot = await getDocs(collection(db, "login"));

    const data = [];

    querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
    });
    return data;
}

async function fetchDataLoginSekretaris() {
    const querySnapshot = await getDocs(collection(db, "loginSekretaris"));

    const dataSekretaris = [];

    querySnapshot.forEach((doc) => {
        dataSekretaris.push({ id: doc.id, ...doc.data() });
    });
    return dataSekretaris;
}

export default function Login() {
    const [dataLogin, SetDataLogin] = useState([]);
    const [dataLoginSekretaris, SetDataLoginSekretaris] = useState([]);
    const router = useRouter();

    useEffect(() => {
        async function fetchData() {
            const data = await fetchDataLoginSekretaris();
            SetDataLogin(data);
        }
        fetchData();
    }, []);

    useEffect(() => {
        async function fetchData() {
            const dataSekretaris = await fetchDataLoginFromFirestore();
            SetDataLoginSekretaris(dataSekretaris);
        }
        fetchData();
    }, []);

    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");

    const handleLogin = () => {
        // Memeriksa apakah nilai input sama dengan salah satu email di dataLogin
        const loginSekretaris = dataLogin.some((user) => user.email === emailInput && user.password === passwordInput);
        const isLoginSuccessful = dataLoginSekretaris.some((user) => user.email === emailInput && user.password === passwordInput);

        if (isLoginSuccessful) {
            alert("Login berhasil");
            // Navigasi ke halaman lain setelah login berhasil
            router.push('/user');  // Ganti dengan path halaman yang diinginkan
        } else if (loginSekretaris) {
            alert("Login berhasil sebagai sekretaris");
            router.push('/sekretaris');  // Ganti dengan path halaman yang diinginkan
        } else {
            alert("Login gagal");
        }
    };


    return (
        <>
            <div className="login d-flex flex-column">
                <div className="d-flex " style={{ height: "20%" }}>
                    <img src="/logo-umi.svg" alt="logo-umi" />
                </div>
                <div
                    className="cards d-flex justify-content-center align-items-center"
                    style={{ height: "80%" }}
                >
                    <div className="card justify-content-between align-items-center">
                        <span>
                            <h3>Login</h3>
                            <input
                                type="text"
                                placeholder="Username"
                                onChange={(e) => setEmailInput(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                onChange={(e) => setPasswordInput(e.target.value)}
                            />
                            {/* <Link href="#">Forget Password</Link> */}
                        </span>
                        <span>
                            {/* <button style={{ color: '#000' }} >Login With Google</button> */}
                            <button
                                style={{ backgroundColor: "#239843" }}
                                onClick={handleLogin}
                            >
                                Login
                            </button>
                            {/* <p style={{ textAlign: 'center' }}>Don't have an account? <Link href="#">Register</Link></p> */}
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
}

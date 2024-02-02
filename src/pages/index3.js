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

async function fetchDataLoginKepalaDesa() {
    const querySnapshot = await getDocs(collection(db, "loginKades"));

    const dataKades = [];

    querySnapshot.forEach((doc) => {
        dataKades.push({ id: doc.id, ...doc.data() });
    });
    return dataKades;
}

export default function Login() {
    const [dataLogin, SetDataLogin] = useState([]);
    const [dataLoginSekretaris, SetDataLoginSekretaris] = useState([]);
    const [dataLoginKades, SetDataLoginKades] = useState([]);
    const router = useRouter();

    useEffect(() => {
        async function fetchData() {
            const data = await fetchDataLoginFromFirestore();
            SetDataLogin(data);
        }
        fetchData();
    }, []);
    
    useEffect(() => {
        async function fetchData() {
            const dataSekretaris = await fetchDataLoginSekretaris();
            SetDataLoginSekretaris(dataSekretaris);
        }
        fetchData();
    }, []);

    useEffect(() => {
        async function fetchData() {
            const dataKades = await fetchDataLoginKepalaDesa();
            SetDataLoginKades(dataKades);
        }
        fetchData();
    }, []);

    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");

    const handleLogin = () => {
        // Memeriksa apakah nilai input sama dengan salah satu email di dataLogin
        const isLoginSuccessful = dataLogin.some((user) => user.email === emailInput && user.password === passwordInput);
        const loginKades = dataLoginKades.some((user) => user.email === emailInput && user.password === passwordInput);
        const loginSekretaris = dataLoginSekretaris.some((user) => user.email === emailInput && user.password === passwordInput);
        const kades = emailInput === "kades1" && passwordInput === "1234";

        if (isLoginSuccessful) {
            alert("Login berhasil");
            router.push('/user');  
        } else if (loginSekretaris) {
            alert("Selamat Datang Sekretaris");
            router.push('/sekretaris');
        } else if (loginKades) {
            alert("Selamat Datang Kepala Desa");
            router.push('/kepala-desa');
        } else if (kades) {
            alert("Selamat Datang Kepala Desa");
            router.push('/kepala-desa');
        } else {
            alert("Email atau Password Salah!!!");
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

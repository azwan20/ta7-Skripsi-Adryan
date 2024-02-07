import Link from "next/link";
import { useRouter } from "next/router";
import { db } from "../../../public/firebaseConfig";
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

    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");

    const handleLogin = () => {
        if (emailInput === "sekretaris@gmail.com" && passwordInput === "1234567") {
            alert("Login berhasil");
            // Simpan status login sebagai sekretaris di localStorage
            localStorage.setItem("role", "sekretaris");
            router.push('/sekretaris/home');
        } else if (emailInput === "kades@gmail.com" && passwordInput === "123") {
            alert("Selamat Datang Kepala Desa");
            // Simpan status login sebagai kepala desa di localStorage
            localStorage.setItem("role", "kades");
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
                        </span>
                        <span>
                            <button
                                style={{ backgroundColor: "#239843" }}
                                onClick={handleLogin}
                            >
                                Login
                            </button>
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
}
import Link from "next/link";
import { useRouter } from "next/router";
import { db } from "../../../public/firebaseConfig";
import { getDocs, getDoc, collection, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
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
    const [passKades, SetPassKades] = useState("");
    const [passSekretaris, SetPassSekretaris] = useState("");
    const [formFields, setFormFields] = useState({
        password: '',
    });

    useEffect(() => {
        async function fetchData() {
            const data = await fetchDataLoginFromFirestore();
            SetDataLogin(data);
            SetPassKades(data[0].password);
            SetPassSekretaris(data[1].password);
            setFormFields({
                password: data[0].password || '',
            });
        }
        fetchData();
    }, []);

    const handleFieldChange = (fieldName, value) => {
        setFormFields((prevFields) => ({
            ...prevFields,
            [fieldName]: value,
        }));
    };

    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const enteredEmail = emailInput.toLowerCase(); // Ambil email yang diinputkan dan ubah menjadi lowercase
        const enteredPassword = passwordInput;

        // Validasi apakah email yang diinputkan sesuai dengan salah satu email dalam koleksi
        const matchingUser = dataLogin.find(user => user.email.toLowerCase() === enteredEmail);

        if (!matchingUser) {
            alert("Email tidak ditemukan. Silakan masukkan email yang valid.");
            return;
        }

        // Validasi apakah password lama sesuai dengan password yang ada dalam koleksi
        // if (matchingUser.password !== enteredPassword) {
        //     alert("Password lama tidak sesuai. Silakan masukkan password yang benar.");
        //     return;
        // }

        const updatedData = {
            password: formFields.password,
        };

        try {
            // Lakukan pembaruan password pada dokumen dengan email yang sesuai
            const suratRef = doc(db, 'login', matchingUser.id);
            await updateDoc(suratRef, updatedData);
            alert("Password Berhasil di Update");
            console.log('Document successfully updated!');
            location.reload();
        } catch (error) {
            console.error('Error updating document: ', error);
        }
    };

    const handleLogin = () => {
        if (emailInput === "sekretaris@gmail.com" && passwordInput === passSekretaris) {
            alert("Login berhasil");
            // Simpan status login sebagai sekretaris di localStorage
            localStorage.setItem("role", "sekretaris");
            router.push('/sekretaris/home');
        } else if (emailInput === "kades@gmail.com" && passwordInput === passKades) {
            alert("Selamat Datang Kepala Desa");
            // Simpan status login sebagai kepala desa di localStorage
            localStorage.setItem("role", "kades");
            router.push('/kepala-desa');
        } else {
            alert("Email atau Password Salah!!!");
        }
    };

    const [forgetPass, setForegetPass] = useState(false);

    const handleForget = () => {
        setForegetPass(true);
    }

    const HandleCancel = () => {
        setForegetPass(false);
    }

    return (
        <>
            <div className="login">
                <div
                    className="cards d-flex justify-content-center align-items-center"
                    style={{ height: "100%" }}
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
                            <Link href="" onClick={handleForget}><p >Forget password</p></Link>
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
                {forgetPass && (
                    <form onSubmit={handleSubmit} method="post" action="">
                        <div className="forgetKata">
                            <div className="forgetSandi">
                                <span>
                                    <p>Masukkan email :</p>
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        onChange={(e) => setEmailInput(e.target.value)}
                                    />
                                </span>
                                {/* <span>
                                <p>Password Lama :</p>
                                <input
                                    type="password"
                                    placeholder="Password Lama"
                                    onChange={(e) => setPasswordInput(e.target.value)}
                                />
                            </span> */}
                                <span>
                                    <p>Password Baru :</p>
                                    <input type="password" placeholder="Password baru"
                                        onChange={(e) => handleFieldChange('password', e.target.value)} />
                                </span>
                                <span>
                                    <button type="submit" style={{ backgroundColor: "#239843" }}>SIMPAN</button>
                                    <button onClick={HandleCancel}>BATAL</button>
                                </span>
                            </div>
                        </div>
                    </form>
                )}
            </div>
        </>
    );
}
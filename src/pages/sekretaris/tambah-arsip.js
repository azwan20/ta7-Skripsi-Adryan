import SekretarisAside from "./sekretarisAside";
import { db } from "../../../public/firebaseConfig";
import { getDocs, collection, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";

async function addDataToFirebase(file, alamat, no_surat, jenis_surat, tanggal_masuk, tanggal_terima, tanggal_surat, tanggal_keluar, sifat_surat, prihal) {
    try {
        const docRefSurat = await addDoc(collection(db, "surat"), {
            file: file,
            alamat: alamat,
            no_surat: no_surat,
            jenis_surat: jenis_surat,
            tanggal_masuk: tanggal_masuk,
            tanggal_terima: tanggal_terima,
            tanggal_surat: tanggal_surat,
            tanggal_keluar: tanggal_keluar,
            sifat_surat: sifat_surat,
            prihal: prihal,
        })
        console.log("Document input document ID : ", docRefSurat.id);
        return true;

    } catch (error) {
        console.error("error input document", error);
        return false;
    }
}

async function fetchDataFromFirestore() {
    const querySnapshot = await getDocs(collection(db, "surat"));

    const data = [];

    querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
    });
    return data;
}

export default function TambahArsip() {
    const [isPopupVisible, setPopupVisible] = useState(false);

    const handleSimpanClick = () => {
        setPopupVisible(true);
    };

    const handlePopupClose = () => {
        // Set state untuk menyembunyikan pop-up
        setPopupVisible(false);
    };

    const [dataSurat, SetDataSurat] = useState([]);
    const [dataSuratMasuk, SetDataSuratMasuk] = useState([]);
    const [dataSuratKeluar, SetDataSuratKeluar] = useState([]);

    const [dataLogin, SetDataLogin] = useState([]);
    // const [jenis, Setjenis] = useState("");

    useEffect(() => {
        async function fetchData() {
            const data = await fetchDataFromFirestore();
            SetDataSurat(data);

            // Pisahkan data berdasarkan jenis surat
            const suratMasuk = data.filter((surat) => surat.jenis_surat === "surat masuk");
            const suratKeluar = data.filter((surat) => surat.jenis_surat === "surat keluar");

            SetDataSuratMasuk(suratMasuk);
            SetDataSuratKeluar(suratKeluar);
        }

        fetchData();
    }, []);

    // useEffect(() => {
    //     async function fetchData() {
    //         const data = await fetchDataLoginFromFirestore();
    //         SetDataLogin(data);
    //     }
    //     fetchData();
    // }, []);

    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        // Fungsi ini akan dijalankan setiap kali komponen di-mount
        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000); // Setiap detik, perbarui waktu

        // Fungsi ini akan dijalankan ketika komponen di-unmount
        return () => {
            clearInterval(intervalId);
        };
    }, []); // Menggunakan array kosong agar useEffect hanya dijalankan sekali saat komponen di-mount

    const [file, setFile] = useState('');
    const [alamat, setAlamat] = useState('');
    const [no_surat, setNo_surat] = useState('');
    const [jenis_surat, setJenis] = useState('');
    const [tanggal_masuk, setTanggal_masuk] = useState('');
    const [tanggal_surat, setTanggal_surat] = useState('');
    const [sifat_surat, setSifat] = useState('');
    const [prihal, setPerihal] = useState('');
    const [no_wa, setNo_wa] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const added = await addDataToFirebase(file, alamat, no_surat, jenis_surat, tanggal_masuk, "", tanggal_surat, "", sifat_surat, prihal);
        if (added) {
            setFile("");
            setAlamat("");
            setNo_surat("");
            setTanggal_masuk("");
            "";
            setTanggal_surat("");
            "";
            setPerihal("");
            setSifat("");
            setJenis("");
            // setNo_wa("");

            alert("Data berhasil di upload");
        }
    }

    // fungsi input, fungsi ini di pake di setiap halaman yg perlu input ke firebase
    // const handleSubmit = async (element) => {
    //     element.preventDefault();
    //     const added = await addDataToFirebase(
    //         "1file",
    //         "1alamat",
    //         "1no_surat",
    //         "surat keluar",
    //         currentTime.toLocaleString(),
    //         currentTime.toLocaleString(),
    //         currentTime.toLocaleString(),
    //         currentTime.toLocaleString(),
    //         "1sifat_surat",
    //         "1prihal",
    //     );
    //     if (added) {
    //         alert("Data added to firebase DB")
    //     }
    // }
    return (
        <>
            <div className="tambah-arsip d-flex">
                <SekretarisAside />
                <article className="d-flex flex-column align-items-center justify-content-between" style={{ maxHeight: '100vh', overflowY: 'auto' }}>
                    <form onSubmit={handleSubmit} method="post" action="">
                            <section>
                                <span>
                                    <p>File Arsip</p>
                                    <input type="file" name="file" id="nama" value={file} onChange={(e) => setFile(e.target.value)} />
                                </span>
                                <span>
                                    <p>Tanggal Masuk</p>
                                    <input type="date" name="tanggal_masuk" id="nama" value={tanggal_masuk} onChange={(e) => setTanggal_masuk(e.target.value)} />
                                </span>
                                <span>
                                    <p>Alamat Pengirim</p>
                                    <input type="text" name="alamat" id="nama" value={alamat} onChange={(e) => setAlamat(e.target.value)} />
                                </span>
                                <span>
                                    <p>No. Surat</p>
                                    <input type="text" name="no" id="nama" value={no_surat} onChange={(e) => setNo_surat(e.target.value)} />
                                </span>
                                <span>
                                    <p>Jenis Surat</p>
                                    <input type="text" name="jenis" id="nama" value={jenis_surat} onChange={(e) => setJenis(e.target.value)} />
                                </span>
                                <span>
                                    <p>Tanggal Surat</p>
                                    <input type="date" name="tanggal_surat" id="nama" value={tanggal_surat} onChange={(e) => setTanggal_surat(e.target.value)} />
                                </span>
                                <span>
                                    <p>Sifat Surat</p>
                                    <input type="text" name="sifat" id="nama" value={sifat_surat} onChange={(e) => setSifat(e.target.value)} />
                                </span>
                                <span>
                                    <p>Perihal Lampiran</p>
                                    <input type="text" name="perihal" id="nama" value={prihal} onChange={(e) => setPerihal(e.target.value)} />
                                </span>
                                <span>
                                    <p>No. WhatsApp</p>
                                    <input type="text" name="no_wa" id="nama" value={no_wa} onChange={(e) => setNo_wa(e.target.value)} />
                                </span>
                            </section>
                            <section className="d-flex justify-content-between">
                                <button type="submit" onClick={handleSimpanClick} style={{ backgroundColor: '#27323A' }}>Simpan</button>
                                <button style={{ backgroundColor: '#900000' }}>Batal</button>
                            </section>
                        </form>
                </article>
            </div>
            {/* Pop-up component */}
            {isPopupVisible && (
                <div className="popup">
                    <div className="popup-content">
                        <h2>Input Data Selesai</h2>
                        <button onClick={handlePopupClose}>Tutup</button>
                    </div>
                </div>
            )}
        </>
    )
}
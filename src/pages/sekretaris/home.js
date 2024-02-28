import { useEffect, useState } from "react";
import SekretarisAside from "./sekretarisAside";
import Navbar from "./navbar";
import Link from "next/link";
import { db } from "../../../public/firebaseConfig";
import { getDocs, collection, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";

async function fetchDataFromFirestore() {
    const querySnapshot = await getDocs(collection(db, "surat"));

    const data = [];

    querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
    });
    return data;
}

export default function Arsip() {
    const [isHomeActive, setIsHomeActive] = useState(true);
    const [isMasukActive, setIsMasukActive] = useState(false);
    const [isKeluarActive, setIsKeluarActive] = useState(false);
    const [dataSurat, SetDataSurat] = useState([]);
    const [dataSuratMasuk, SetDataSuratMasuk] = useState([]);
    const [dataSuratKeluar, SetDataSuratKeluar] = useState([]);

    const handleButtonClick = (buttonType) => {
        if (buttonType === "home") {
            setIsHomeActive(true);
            setIsMasukActive(false);
            setIsKeluarActive(false);
        } else if (buttonType === "masuk") {
            setIsHomeActive(false);
            setIsMasukActive(true);
            setIsKeluarActive(false);
        } else if (buttonType === "keluar") {
            setIsHomeActive(false);
            setIsMasukActive(false);
            setIsKeluarActive(true);
        }
    };

    useEffect(() => {
        async function fetchData() {
            const data = await fetchDataFromFirestore();
            const sortedData = data.sort((a, b) => new Date(b.tanggal_surat) - new Date(a.tanggal_surat));
            SetDataSurat(sortedData);

            // Pisahkan data berdasarkan jenis surat
            const suratMasuk = sortedData.filter((surat) => surat.jenis_surat === "surat masuk");
            const suratKeluar = sortedData.filter((surat) => surat.jenis_surat === "surat keluar");

            SetDataSuratMasuk(suratMasuk);
            SetDataSuratKeluar(suratKeluar);
        }

        fetchData();
    }, []);

    return (
        <>
            <div className="sekretaris homeSekretaris d-flex">
                <SekretarisAside isHomeActive={isHomeActive} isMasukActive={isMasukActive} isKeluarActive={isKeluarActive} handleButtonClick={handleButtonClick} />
                <article style={{ maxHeight: '100vh', overflowY: 'auto' }}>
                    <div className="konten">
                        <h1 style={{ color: '#BBA482', marginBottom: '20px' }}>Welcome Kantor Desa Pao</h1>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
                            electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                            and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
                        </p>
                        <div className="d-flex justify-content-between">
                            <Link href="/sekretaris/surat-masuk"><button>{dataSuratMasuk.length} Surat Masuk</button></Link>
                            <Link href="/sekretaris/surat-keluar"><button>{dataSuratKeluar.length} Surat Keluar</button></Link>
                        </div>
                    </div>
                    <div className="moskov">
                        <img src="/moskov.svg" alt="moskov.svg" width={220} />
                    </div>
                </article>
                <Navbar isHomeActive={isHomeActive} isMasukActive={isMasukActive} isKeluarActive={isKeluarActive} handleButtonClick={handleButtonClick} />
            </div>
        </>
    )
}
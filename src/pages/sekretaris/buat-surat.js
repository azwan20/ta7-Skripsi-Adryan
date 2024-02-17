import SekretarisAside from "./sekretarisAside";
import Link from "next/link";
import { db } from "../../../public/firebaseConfig";
import { getDocs, collection, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getNewData } from "./surat-masuk";

async function addDataToFirebase(file, nama, alamat, no_surat, jenis_surat, tanggal_masuk, tanggal_terima, tanggal_surat, tanggal_keluar, sifat_surat, prihal) {
    try {
        const docRefSurat = await addDoc(collection(db, "surat"), {
            file: file,
            nama: nama,
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

export default function BuatSuart() {
    const [dataSurat, SetDataSurat] = useState([]);
    const [dataSuratMasuk, SetDataSuratMasuk] = useState([]);
    const [dataSuratKeluar, SetDataSuratKeluar] = useState([]);
    const newData = getNewData();
    console.log("ini id buat surat", newData)

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

    const [isHomeActive, setIsHomeActive] = useState(false);
    const [isMasukActive, setIsMasukActive] = useState(false);
    const [isKeluarActive, setIsKeluarActive] = useState(false);
    const [isBuatActive, setIsBuatActive] = useState(true);

    const handleButtonClick = (buttonType) => {
        if (buttonType === "home") {
            setIsHomeActive(true);
            setIsMasukActive(false);
            setIsKeluarActive(false);
            setIsBuatActive(false);
        } else if (buttonType === "masuk") {
            setIsHomeActive(false);
            setIsMasukActive(true);
            setIsKeluarActive(false);
            setIsBuatActive(false);
        } else if (buttonType === "keluar") {
            setIsHomeActive(false);
            setIsMasukActive(false);
            setIsKeluarActive(true);
            setIsBuatActive(false);
        } else if (buttonType === "buat") {
            setIsHomeActive(false);
            setIsMasukActive(false);
            setIsKeluarActive(false);
            setIsBuatActive(true);
        }
    };

   
    return (
        <>
            <div className="d-flex buatSurat">
                <SekretarisAside isHomeActive={isHomeActive} isMasukActive={isMasukActive} isKeluarActive={isKeluarActive} handleButtonClick={handleButtonClick} />
                <article>
                    {dataSuratMasuk.map((value) => (
                        <form>
                            <span>
                                <p>No Surat</p>
                                <p>Nama Kades</p>
                                <p>Jabatan</p>
                                <p>Nama Penerima</p>
                                <p>Nik</p>
                                <p>Tempat/Tanggal Lahir</p>
                                <p>Jenis Kelamin</p>
                                <p>Status perkawinan</p>
                                <p>Agama</p>
                                <p>Pekerjaan</p>
                                <p>Alamat</p>
                                <p>Isi surat</p>
                                <p>Penutup Surat</p>
                                <p>Tanggal Surat</p>
                            </span>
                            <span>
                                <input type="number" value={value.no_surat} />
                                <input type="text" />
                                <input type="text" />
                                <input type="text" value={value.name} />
                                <input type="number" />
                                <input type="text" />
                                <input type="text" />
                                <input type="text" />
                                <input type="text" />
                                <input type="text" />
                                <input type="text" value={value.alamat} />
                                <textarea />
                                <textarea />
                                <input type="date" value={value.tanggal_surat} />
                            </span>
                        </form>
                    ))}
                </article>
            </div>
        </>
    )
}
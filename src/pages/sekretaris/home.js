import { useEffect, useState } from "react";
import SekretarisAside from "./sekretarisAside";
import { db } from "../../../public/firebaseConfig";
import { getDocs, collection, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import Navbar from "./navbar";

async function fetchDataFromFirestore() {
    const querySnapshot = await getDocs(collection(db, "surat"));

    const data = [];

    querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
    });
    return data;
}

export default function Home() {
    const [dataSurat, SetDataSurat] = useState([]);
    const [dataSuratMasuk, SetDataSuratMasuk] = useState([]);
    const [dataSuratKeluar, SetDataSuratKeluar] = useState([]);

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
    return (
        <>
            <div className="sekretaris d-flex">
                <SekretarisAside />
                <article style={{ maxHeight: '100vh', overflowY: 'auto' }}>
                    <div className="d-flex align-items-center p-2 title-mobile">
                        <img className="imgProfile" src="https://upload.wikimedia.org/wikipedia/commons/b/bc/Luwu_Utara_Logo_%28North_Luwu%29.png" alt="Profile" width={55} height={70} />
                        <h1 style={{textAlign: 'center', margin: 'auto'}}>Kantor Desa Pao</h1>
                    </div>
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col" style={{ display: 'none' }}>ID</th>
                                <th scope="col">No</th>
                                <th scope="col">File Arsip</th>
                                <th scope="col">Tanggal Masuk</th>
                                <th scope="col">Tanggal Keluar</th>
                                <th scope="col">Nama Penerima</th>
                                <th scope="col">Alamat Pengirim</th>
                                <th scope="col">No.Surat</th>
                                <th scope="col">Jenis Surat</th>
                                <th scope="col">Tanggal Surat</th>
                                <th scope="col">Sifat Surat</th>
                                <th scope="col">Perihal Lampiran</th>
                                <th scope="col">No WhatsApp</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataSurat.map((value, index) => (
                                <tr key={value.id}>
                                    <td style={{ display: 'none' }}></td>
                                    <td>{index + 1}</td>
                                    <td>{value.file}</td>
                                    <td>{value.tanggal_masuk}</td>
                                    <td>{value.tanggal_keluar}</td>
                                    <td>{value.nama}</td>
                                    <td>{value.alamat}</td>
                                    <td>{value.no_surat}</td>
                                    <td><b>{value.jenis_surat}</b></td>
                                    <td>{value.tanggal_surat}</td>
                                    <td>{value.sifat_surat}</td>
                                    <td>{value.perihal}</td>
                                    <td>{value.no_wa}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </article>
                <Navbar />
            </div>
        </>
    )
}
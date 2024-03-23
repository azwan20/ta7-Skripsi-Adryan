import { useRouter } from "next/router";
import Link from "next/link";
import { db } from "../../../public/firebaseConfig";
import React, { useEffect, useState } from "react";
import { getDocs, getDoc, collection, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";

async function fetchData_ModelTransaksi(id) {
    const docRef = doc(db, "surat", id);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
        const data = { id: docSnapshot.id, ...docSnapshot.data() };
        return [data];
    } else {
        // Handle case where the document doesn't exist
        return [];
    }
}

export default function Template() {
    const router = useRouter();
    const { id } = router.query;
    const [dataSurat, SetDataSurat] = useState([]);
    const [dataSuratMasuk, SetDataSuratMasuk] = useState([]);
    const [dataSuratKeluar, SetDataSuratKeluar] = useState([]);


    console.log("id", id);

    useEffect(() => {
        async function fetchData() {
            if (id) {
                const data = await fetchData_ModelTransaksi(id);

                const sortedData = data.sort((a, b) => new Date(b.tanggal_surat) - new Date(a.tanggal_surat));
                SetDataSurat(data);

                if (data.length > 0) {

                    // Pisahkan data berdasarkan jenis surat
                    const suratMasuk = data.filter((surat) => surat.jenis_surat === "surat masuk");
                    const suratKeluar = data.filter((surat) => surat.jenis_surat === "surat keluar");

                    SetDataSuratMasuk(suratMasuk);
                    SetDataSuratKeluar(suratKeluar);
                }
            }
        }
        fetchData();
    }, [id]);

    const currentDate = new Date();

    const formatDate = (inputDate) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(inputDate).toLocaleDateString('id-ID', options);
    };

    return (
        <>
            {dataSuratKeluar.map((value) => (
                <div className="template">
                    <button className="print-button" onClick={() => window.print()}>Cetak</button>
                    <div className="header">
                        <img id="logo"
                            src="https://www.datalpse.com/files/images/kldi/6311a2a15978e_300x300.png"
                            width="60" height="70" />
                        <h4>PEMERINTAH KABUPATEN LUWU UTARA</h4>
                        <h4><strong>KECAMATAN MALANGKE BARAT</strong></h4>
                        <h4><strong>DESA PAO</strong></h4>
                        <p>Dusun Amassangan II Desan Pao Kec. Malangke Barat Kab. Luwu Utara Kode Pos:92957</p>
                        <div style={{ marginBottom: '2px' }} className="hr2" />
                        <div className="hr1" />
                    </div>
                    <div className="">
                        <div className="d-flex title">
                            <b style={{ textTransform: 'uppercase' }}>{value.penghasilan}</b>
                            <div className="hr2" />
                            <p>Nomor : {value.no_surat} </p>
                        </div>
                        <div>
                            <div>
                                <p>Yang bertanda tangan di bawah ini : </p>
                                <section className="d-flex flex-direction-coloumn" style={{ paddingLeft: '30px' }}>
                                    <span>
                                        <p>Nama</p>
                                        <p>Nip</p>
                                        <p>Jabatan</p>
                                    </span>
                                    <span style={{ paddingLeft: '120px' }}>
                                        <p>: {value.nama_penanggungJawab}</p>
                                        <p>: {value.nip_penanggungJawab}</p>
                                        <p>: {value.jabatan_penanggungJawab}</p>
                                    </span>
                                </section>
                                <p>Menerangkan dengan sebenarnya bahwa : </p>
                            </div>
                            <div>
                                <section className="d-flex flex-direction-coloumn" style={{ paddingLeft: '30px' }}>
                                    <span>
                                        <p>Nama</p>
                                        <p>Nik</p>
                                        <p>Tempat/tgl lahir</p>
                                        <p>Jenis kelamin</p>
                                        <p>Status perkawinan</p>
                                        <p>Agama</p>
                                        <p>Pekerjaan</p>
                                        <p>Alamat</p>
                                    </span>
                                    <span style={{ paddingLeft: '50px' }}>
                                        <p>: {value.nama} </p>
                                        <p>: {value.nik} </p>
                                        <p>: {value.ttl} </p>
                                        <p>: {value.jenis_kelamin} </p>
                                        <p>: {value.status_perkawinan} </p>
                                        <p>: {value.agama} </p>
                                        <p>: {value.pekerjaan} </p>
                                        <p>: {value.alamat} </p>
                                    </span>
                                </section>
                            </div>
                        </div>
                        <div className="pembuka"><p>&emsp; &emsp; &emsp; {value.isi_surat}</p>
                        </div>
                        <div className="penutup"><p>&emsp; &emsp; &emsp; {value.penutup_surat}</p></div>
                        <div className="d-flex footer">
                            <span>
                                <p>Yang bermohon,</p>
                                <p><b>{value.nama}</b></p>
                            </span>
                            <span>
                                <div className="names">
                                    <p>{value.nama_desa}, {formatDate(currentDate)}</p>
                                    <p>{value.jabatan_penanggungJawab},</p>
                                </div>
                                <p><b>{value.nama_penanggungJawab}</b></p>
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}
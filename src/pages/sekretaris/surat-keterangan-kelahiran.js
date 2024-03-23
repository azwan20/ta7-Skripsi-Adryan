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
                            <b>SURAT KETERANGAN KELAHIRAN</b>
                            <div className="hr2" />
                            <p>Nomor : {value.no_surat} </p>
                        </div>
                        <div>
                            {/* <div className="d-flex">
                                <span>
                                    <p>Lampiran Surat</p>
                                    <p>Tanggal</p>
                                </span>
                                <span>
                                    <p>: {value.prihal} </p>
                                    <p>: {formatDate(currentDate)}</p>
                                </span>
                            </div> */}
                            <div>
                                <p>Yang bertanda tangan di bawah ini, menerangkan bahwa : </p>
                                <section className="d-flex flex-direction-coloumn" style={{ paddingLeft: '30px' }}>
                                    <span>
                                        <p>Nama Lengkap Bayi</p>
                                        <p>Nomor Induk Kependudukan</p>
                                        <p>Nomor Kartu Keluarga</p>
                                        <p>Jenis kelamin</p>
                                        <p>Tempat/Tanggal Lahir</p>
                                        <p>Anak Ke</p>
                                        <p>Jenis Kelahiran</p>
                                        <p>Nama Lengkap Ayah</p>
                                        <p>Nik Ayah</p>
                                        <p>Nama Lengkap Ibu</p>
                                        <p>Nik Ibu</p>
                                        <p>Agama</p>
                                        <p>Kewarganegaraan</p>
                                        <p>Alamat</p>
                                    </span>
                                    <span style={{ paddingLeft: '120px' }}>
                                        <p className="namaUpper">: <b> {value.nama} </b></p>
                                        <p>: {value.nik} </p>
                                        <p>: {value.nomor_kk}</p>
                                        <p>: {value.jenis_kelamin}</p>
                                        <p>: {value.ttl} </p>
                                        <p>: {value.anak_ke}</p>
                                        <p>: {value.jenis_kelahiran}</p>
                                        <p className="namaUpper">: <b>{value.nama_ayah}</b></p>
                                        <p>: {value.nik_ayah}</p>
                                        <p className="namaUpper">: <b>{value.namaOrangTua}</b></p>
                                        <p>: {value.nik_ibu}</p>
                                        <p>: {value.agama}</p>
                                        <p>: {value.kewarganegaraan}</p>
                                        <p>: Dusun {value.kelurahan} {value.nama_desa} Kec. {value.kecamatan} </p>
                                        <p style={{ paddingLeft: '7px' }}>{value.kabupaten} </p>
                                    </span>
                                </section>
                                <p>Demikian Surat Keterangan Kelahiran ini dibuat agar dapat digunakan sebagaimana mestinya.</p>
                            </div>
                        </div>
                        <div className="d-flex footer">
                            <span>
                                {/* <p>Yang bermohon,</p>
                                <p><b>{value.nama}</b></p> */}
                            </span>
                            <span className="names">
                                <div >
                                    <p>{value.nama_desa}, {formatDate(currentDate)}</p>
                                    <p style={{paddingLeft: '0'}}>an. Kepala Desa Pao</p>
                                    <p>{value.jabatan_penanggungJawab},</p>
                                </div>
                                <p className="namaUpper"><b>{value.nama_penanggungJawab}</b></p>
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}
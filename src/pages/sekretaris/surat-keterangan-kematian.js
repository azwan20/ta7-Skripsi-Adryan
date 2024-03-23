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
                            <b>SURAT KETERANGAN KEMATIAN</b>
                            <div className="hr2" />
                            <p>Nomor : {value.no_surat} </p>
                        </div>
                        <div>
                            <p>Yang bertanda tangan di bawah ini, menerangkan bahawa : </p>
                            <div>
                                <section className="d-flex flex-direction-coloumn">
                                    <span>
                                        <p>1. Nama Lengkap</p>
                                        <p>2. Nomor Induk Kependudukan</p>
                                        <p>3. Nomor Kartu Keluarga</p>
                                        <p>4. Tempat/tgl lahir</p>
                                        <p>5. Jenis kelamin</p>
                                        <p>6. Kewarganegaraan</p>
                                        <p>7. Agama</p>
                                        <p>8. Status perkawinan</p>
                                        <p>9. Pekerjaan</p>
                                        <p>10. Alamat</p>
                                        <p><br /></p>
                                        <p>11. Anak ke</p>
                                        <h6>Telah meninggal pada</h6>
                                        <p>12. Hari/Tanggal</p>
                                        <p>13. Tempat Kematian</p>
                                        <section style={{ marginLeft: '23px' }}>
                                            <p>Kecamatan</p>
                                            <p>Kabupaten/Kota</p>
                                            <p>Provinsi</p>
                                        </section>
                                        <p>14. Sebab kematian</p>
                                        <p>15. Yang menentukan</p>
                                        <p>16. Keterangan Visum</p>
                                    </span>
                                    <span style={{ paddingLeft: '50px' }}>
                                        <p className="namaUpper">:<b> {value.nama}</b> </p>
                                        <p>: {value.nik} </p>
                                        <p>: {value.nomor_kk}</p>
                                        <p>: {value.ttl} </p>
                                        <p>: {value.jenis_kelamin} </p>
                                        <p>: {value.kewarganegaraan}</p>
                                        <p>: {value.agama} </p>
                                        <p>: {value.status_perkawinan} </p>
                                        <p>: {value.pekerjaan} </p>
                                        <p>: Dusun {value.kelurahan} {value.nama_desa} Kec. {value.kecamatan} </p>
                                        <p style={{ paddingLeft: '7px' }}>{value.kabupaten} </p>
                                        <p>: {value.anak_ke}</p>
                                        <p><br /></p>
                                        <p>: {value.ttl_orangtua}</p>
                                        <p>: {value.alamat_tujuan}</p>
                                        <p>: {value.kecamatan}</p>
                                        <p>: {value.kabupaten}</p>
                                        <p>: {value.provinsi}</p>
                                        <p>: {value.sebab_kematian}</p>
                                        <p>: {value.jenis_kepindahan}</p>
                                        <p>: {value.keterangan_visum}</p>
                                    </span>
                                </section>
                            </div>
                        </div>
                        <div className="pembuka"><p>&emsp; &emsp; &emsp;Demikian surat keterangan kematian ini dibuat agar dapat digunakan sebagaimana mestinya.</p>
                        </div>
                        <div className="d-flex footer">
                            <span>
                                {/* <p>Yang bermohon,</p> */}
                                {/* <p><b>{value.nama}</b></p> */}
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
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
            {dataSuratMasuk.map((value) => (
                <div className="template">
                    <button className="print-button" onClick={() => window.print()}>Cetak</button>
                    <div className="d-flex flex-row header">
                        <span>
                            <img id="logo"
                                src="https://www.datalpse.com/files/images/kldi/6311a2a15978e_300x300.png"
                                width="100" height="120" />
                        </span>
                        <span style={{ marginRight: '100px' }}>
                            <h4><strong>PEMERINTAH KABUPATEN LUWU UTARA</strong></h4>
                            <h4><strong>DINAS KEPENDUDUKAN DAN PENCACATAN SIPIL</strong></h4>
                            <h6>JL. SIMPURUSIANG NO.27 MASAMBA</h6>
                            <h6>SULAWESI SELATAN - ID, Kode Pos : 92961</h6>
                            <span className="d-flex justify-content-between">
                                <p>TELEPON : {value.telpon_asal}</p>
                                <p>FAX :</p>
                                <p>EMAIL :</p>
                            </span>
                        </span>
                    </div>
                    <div className="hr1" />
                    <div style={{ marginTop: '2px' }} className="hr2" />
                    <div className="">
                        <div className="d-flex kopHead">
                            <span style={{ width: '180px' }}>
                                <p>PROVINSI</p>
                                <p>KABUPATEN/KOTA</p>
                                <p>KECAMATAN</p>
                                <p>DESA/KELURAHAN</p>
                            </span>
                            <span className="spanUpper">
                                <p>: {value.provinsi}</p>
                                <p>: {value.kabupaten}</p>
                                <p>: {value.kecamatan}</p>
                                <p>: {value.kelurahan}</p>
                            </span>
                        </div>
                        <div className="d-flex title" style={{ margin: '0px auto' }}>
                            <b>{value.prihal}</b>
                            <div className="hr2" />
                            <p>{value.klasifikasi}</p>
                            <h6>{value.no_surat} </h6>
                        </div>
                        <div className="suratPindah">
                            <div>
                                <h6><b>DATA DAERAH ASAL</b></h6>
                                <div className="d-flex">
                                    <section className="d-flex flex-direction-coloumn" style={{ width: '50%' }}>
                                        <span style={{ width: '180px' }}>
                                            <p>1. Nomor Kartu Keluarga</p>
                                            <p>2. Nama Kepala Keluarga</p>
                                            <p>3. Alamat</p>
                                            <p><br /></p>
                                            <section style={{ paddingLeft: '15px' }}>
                                                <p>a. Desa/Kelurahan</p>
                                                <p>b. Kecamatan</p>
                                                <p><br /></p>
                                            </section>
                                            <p>4. NIK Pemohon</p>
                                            <p>5. Nama Lengkap</p>
                                        </span>
                                        <span className="spanUpper">
                                            <p>: {value.nomor_kk}</p>
                                            <p>: {value.nama_kepalakk}</p>
                                            <p>: {value.alamat}</p>
                                            <p style={{ paddingLeft: '5px' }}>Dusun/Dukuh/Kampung</p>
                                            <p>: {value.kelurahan}</p>
                                            <p>: {value.kecamatan}</p>
                                            <p style={{ paddingLeft: '5px' }}> Kode Pos : {value.kodePos_asal}</p>
                                            <p>: {value.nik}</p>
                                            <p>: {value.nama}</p>
                                        </span>
                                    </section>
                                    <section className="d-flex flex-direction-coloumn" style={{ width: '50%' }}>
                                        <span>
                                            <p><br /></p>
                                            <p><br /></p>
                                            <p><br /></p>
                                            <p><br /></p>
                                            <section style={{ paddingLeft: '15px' }}>
                                                <p>c. Kab/Kota</p>
                                                <p>d. Provinsi</p>
                                                <p><br /></p>
                                            </section>
                                            <p></p>
                                            <p></p>
                                        </span>
                                        <span>
                                            <p><br /></p>
                                            <p><br /></p>
                                            <p><br /></p>
                                            <p><br /></p>
                                            <p className="spanUpper">: {value.kabupaten}</p>
                                            <p className="spanUpper">: {value.provinsi}</p>
                                            <p style={{ paddingLeft: '5px' }}>Telepon : {value.telpon_asal}</p>
                                            <p></p>
                                            <p></p>
                                        </span>
                                    </section>
                                </div>
                            </div>
                            <h6><b>DATA KEPINDAHAN</b></h6>
                            <div className="d-flex">
                                <section className="d-flex flex-direction-coloumn" style={{ width: '50%' }}>
                                    <span style={{ width: '180px' }}>
                                        <p>1. Alasan Pindah</p>
                                        <p>2. Alamat Tujuan Pindah</p>
                                        <p><br /></p>
                                        <section style={{ paddingLeft: '15px' }}>
                                            <p>a. Desa/Kelurahan</p>
                                            <p>b. Kecamatan</p>
                                            <p><br /></p>
                                        </section>
                                        <p>3. Klasifikasi Pindah</p>
                                        <p>4. Jenis Kepindahan</p>
                                        <p>5. Status KK Bagi Yang Tidak</p>
                                        <p style={{ paddingLeft: '12px' }}>Pindah</p>
                                        <p>6. Status KK Bagi Yang Pindah</p>
                                        <p>7. Keluarga Yang Pindah</p>
                                    </span>
                                    <span>
                                        <p className="spanUpper">: {value.alasan_pindah} </p>
                                        <p className="spanUpper" style={{ width: '200%' }}>: {value.alamat_tujuan} RT.RW </p>
                                        <p style={{ paddingLeft: '5px' }}> Dusun/Dukuh/Kampung </p>
                                        <p className="spanUpper">: {value.desa_tujuan} </p>
                                        <p className="spanUpper">: {value.kecamatan_tujuan} </p>
                                        <p style={{ paddingLeft: '5px' }}> Kode Pos : {value.kodePos_tujuan}</p>
                                        <p className="spanUpper">: {value.klasifikasi} </p>
                                        <p className="spanUpper">: {value.jenis_kepindahan}</p>
                                        <p className="spanUpper">: {value.statustidak_pindah}</p>
                                        <p className="spanUpper"><br /></p>
                                        <p className="spanUpper">: {value.statuskk_pindah}</p>
                                        <p></p>
                                    </span>
                                </section>
                                <section className="d-flex flex-direction-coloumn" style={{ width: '50%' }}>
                                    <span>
                                        <p><br /></p>
                                        <p><br /></p>
                                        <p><br /></p>
                                        <section style={{ paddingLeft: '15px' }}>
                                            <p>c. Kab/Kota</p>
                                            <p>d. Provinsi</p>
                                            <p><br /></p>
                                        </section>
                                        <p></p>
                                        <p></p>
                                    </span>
                                    <span>
                                        <p><br /></p>
                                        <p><br /></p>
                                        <p><br /></p>
                                        <p className="spanUpper">: {value.kabupaten_tujuan}</p>
                                        <p className="spanUpper">: {value.provinsi_tujuan}</p>
                                        <p style={{ paddingLeft: '5px' }}>Telepon : {value.telpon_tujuan}</p>
                                        <p></p>
                                        <p></p>
                                    </span>
                                </section>
                            </div>
                        </div>
                        <div className="tablesForm">
                            <table className="" border="1px solid black">
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>NIK</th>
                                        <th>NAMA</th>
                                        <th>TGL. LAHIR</th>
                                        <th>SHDK</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="spanUpper">
                                        <td scope="row"><p>1</p></td>
                                        <td><p>{value.nik}</p></td>
                                        <td><p>{value.nama}</p></td>
                                        <td><p>{value.ttl}</p></td>
                                        <td><p>{value.shdk}</p></td>
                                    </tr>
                                    <tr>
                                        <th colSpan={5}>
                                            <p style={{ fontSize: '12px', margin: '0' }}>1 dari 1</p>
                                        </th>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="d-flex footer" style={{ height: '220px', marginTop: '0px' }}>
                            <span>
                                <p style={{ paddingTop: '40px' }}>Pemohon,</p>
                                <div>
                                    <p><b>{value.nama}</b></p>
                                    <hr style={{ margin: '0' }} />
                                    <p>NIK. {value.nik}</p>
                                </div>
                            </span>
                            <span>
                                <div className="">
                                    <p>{value.kabupaten}, {formatDate(currentDate)}</p>
                                    <p>Dikeluarkan Oleh :</p>
                                    <p style={{ width: '400px' }}>{value.jabatan_penanggungJawab} {value.kabupaten}</p>
                                </div>
                                <div>
                                    <p><b>{value.nama_penanggungJawab}</b></p>
                                    <hr style={{ margin: '0 auto', width: '50%' }} />
                                    <p>Nip. {value.nip_penanggungJawab}</p>
                                </div>
                            </span>
                        </div>
                        <p style={{ textAlign: 'center' }}>Dokumen ini telah dtandatangani secara elektronik menggunakan sertifikat elektronik yang terterbitkan oleh Balai Sertifikat elektronik (BSrE), BSSN</p>
                    </div>
                </div >
            ))
            }
        </>
    )
}
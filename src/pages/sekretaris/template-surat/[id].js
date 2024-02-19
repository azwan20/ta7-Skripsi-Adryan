import SekretarisAside from "../sekretarisAside";
import Link from "next/link";
import { db } from "../../../../public/firebaseConfig";
import { getDocs, getDoc, collection, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getNewData } from "../surat-masuk";


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

export default function BuatSuart() {
    const [dataSurat, SetDataSurat] = useState([]);
    const [dataSuratMasuk, SetDataSuratMasuk] = useState([]);
    const [formFields, setFormFields] = useState({
        no_surat: '',
        namaKades: '',
        jabatanKades: '',
        nip_penanggungJawab: '',
        jabatan_penerima: '',
        nip_penerima: '',
        nama_desa: 'Desa Pao',
        nik: '',
        ttl: '',
        jenis_kelamin: '',
        status_perkawinan: '',
        agama: '',
        pekerjaan: '',
        isi_surat: '',
        penutup_surat: '',
        rtRw: '',
        kelurahan: '',
        kecamatan: '',
        kabupaten: '',
        penghasilan: '',
        namaOrangTua: '',
    });

    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        async function fetchData() {
            if (id) {
                const data = await fetchData_ModelTransaksi(id);

                if (data.length > 0) {
                    const sortedData = data.sort((a, b) => new Date(b.tanggal_surat) - new Date(a.tanggal_surat));
                    const suratMasuk = sortedData.filter((surat) => surat.jenis_surat === "surat masuk");

                    SetDataSuratMasuk(suratMasuk);

                    // Set form fields based on the existing data
                    setFormFields({
                        no_surat: suratMasuk[0].no_surat || '',
                        namaKades: suratMasuk[0].nama_penanggungJawab || '',
                        jabatanKades: suratMasuk[0].jabatan_penanggungJawab || '',
                        nip_penanggungJawab: suratMasuk[0].nip_penanggungJawab || '',
                        jabatan_penerima: suratMasuk[0].jabatan_penerima || '',
                        nip_penerima: suratMasuk[0].nip_penerima || '',
                        nama_desa: suratMasuk[0].nama_desa || '',
                        nik: suratMasuk[0].nik || '',
                        ttl: suratMasuk[0].ttl || '',
                        jenis_kelamin: suratMasuk[0].jenis_kelamin || '',
                        status_perkawinan: suratMasuk[0].status_perkawinan || '',
                        agama: suratMasuk[0].agama || '',
                        pekerjaan: suratMasuk[0].pekerjaan || '',
                        isi_surat: suratMasuk[0].isi_surat || '',
                        penutup_surat: suratMasuk[0].penutup_surat || '',
                        rtRw: suratMasuk[0].rtRw || '',
                        kelurahan: suratMasuk[0].kelurahan || '',
                        kecamatan: suratMasuk[0].kecamatan || '',
                        kabupaten: suratMasuk[0].kabupaten || '',
                        penghasilan: suratMasuk[0].penghasilan || '',
                        namaOrangTua: suratMasuk[0].namaOrangTua || '',
                    });
                }
            }
        }
        fetchData();
    }, [id]);

    const handleFieldChange = (fieldName, value) => {
        setFormFields((prevFields) => ({
            ...prevFields,
            [fieldName]: value,
        }));
    };

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedData = {
            // Existing fields
            no_surat: formFields.no_surat,
            nama_penanggungJawab: formFields.namaKades,
            jabatan_penanggungJawab: formFields.jabatanKades,
            nip_penanggungJawab: formFields.nip_penanggungJawab,
            jabatan_penerima: formFields.jabatan_penerima,
            nip_penerima: formFields.nip_penerima,
            nama_desa: formFields.nama_desa,
            nik: formFields.nik,
            ttl: formFields.ttl,
            jenis_kelamin: formFields.jenis_kelamin,
            status_perkawinan: formFields.status_perkawinan,
            agama: formFields.agama,
            pekerjaan: formFields.pekerjaan,
            isi_surat: formFields.isi_surat,
            penutup_surat: formFields.penutup_surat,
            rtRw: formFields.rtRw,
            kelurahan: formFields.kelurahan,
            kecamatan: formFields.kecamatan,
            kabupaten: formFields.kabupaten,
            penghasilan: formFields.penghasilan,
            namaOrangTua: formFields.namaOrangTua,
        };

        try {
            const suratRef = doc(db, 'surat', id);
            await updateDoc(suratRef, updatedData);
            alert("Data Berhasil di Update")
            console.log('Document successfully updated!');

            // ... rest of your code ...
        } catch (error) {
            console.error('Error updating document: ', error);
            // Handle error, e.g., show an error message
        }
    };

    let visibleSku = false;
    let visibleSt = false;
    let visibleSkd = false;
    let visibleSktm = false;
    let visibleSkpo = false;
    let visibleLainnya = false;

    dataSuratMasuk.map((value) => {
        switch (value.prihal) {
            case "Surat Keteranagan Usaha":
                visibleSku = true;
                break;
            case "Surat Tugas":
                visibleSt = true;
                break;
            case "Surat Keterangan Tidak Mampu":
                visibleSktm = true;
                break;
            case "Surat Keterangan Domisili":
                visibleSkd = true;
                break;
            case "Surat Keteranagan Penghasilan":
                visibleSkpo = true;
                break;
            default:
                visibleLainnya = true;
                break;
        }
    });

    return (
        <>
            <div className="d-flex buatSurat">
                <SekretarisAside isHomeActive={isHomeActive} isMasukActive={isMasukActive} isKeluarActive={isKeluarActive} handleButtonClick={handleButtonClick} />
                <article style={{ maxHeight: '100vh', overflowY: 'auto' }}>
                    {visibleSku && (
                        <div className="p-3">
                            <h1 className="p-3">Form Pengisian Surat Keterangan Usaha</h1>
                            {dataSuratMasuk.map((value) => (
                                <form onSubmit={handleSubmit} method="post" action="">
                                    <div className="inputanUsers">
                                        <span>
                                            <p>No Surat</p>
                                            <p>Nama Pemberi Izin</p>
                                            <p>Jabatan Pemberi Izin</p>
                                            <p>Nama Penerima</p>
                                            <p>Nik</p>
                                            <p>Tempat/Tanggal Lahir</p>
                                            <p>Jenis Kelamin</p>
                                            <p>Status perkawinan</p>
                                            <p>Agama</p>
                                            <p>Pekerjaan</p>
                                            <p>Alamat</p>
                                            {/* <p>Isi surat</p>
                                        <p>Penutup Surat</p> */}
                                            <p>Tanggal Surat</p>
                                        </span>
                                        <span>
                                            <input type="text" value={formFields.no_surat}
                                                onChange={(e) => handleFieldChange('no_surat', e.target.value)} />
                                            <input type="text" value={formFields.namaKades}
                                                onChange={(e) => handleFieldChange('namaKades', e.target.value)} />
                                            <select
                                                value={formFields.jabatanKades}
                                                onChange={(e) => handleFieldChange('jabatanKades', e.target.value)}>
                                                <option>Pilih Jabatan Pemberi Izin</option>
                                                <option value="Kepala Desa">Kepala Desa</option>
                                                <option value="Sekretaris Desa">Sekretaris Desa</option>
                                                <option value="Kepala Urusan Tata Usaha dan Umum">Kepala Urusan Tata Usaha dan Umum</option>
                                                <option value="Kepala Urusan Keuangan">Kepala Urusan Keuangan</option>
                                                <option value="Kepala Urusan Perencanaan">Kepala Urusan Perencanaan</option>
                                                <option value="Kepala Dusun">Kepala Dusun</option>
                                                <option value="Kepala Seksi Pemerintahan">Kepala Seksi Pemerintahan</option>
                                                <option value="Kepala Seksi Kesejahteraan">Kepala Seksi Kesejahteraan</option>
                                                <option value="Kepala Seksi Pelayanan">Kepala Seksi Pelayanan</option>
                                            </select>
                                            <input type="text" value={value.nama} />
                                            <input type="number" value={formFields.nik}
                                                onChange={(e) => handleFieldChange('nik', e.target.value)} />
                                            <input type="text" value={formFields.ttl}
                                                onChange={(e) => handleFieldChange('ttl', e.target.value)} />
                                            <select
                                                value={formFields.jenis_kelamin}
                                                onChange={(e) => handleFieldChange('jenis_kelamin', e.target.value)}>
                                                <option>Pilih jenis kelamin</option>
                                                <option value="Laki-laki">Laki-laki</option>
                                                <option value="Perempuan">Perempuan</option>
                                            </select>
                                            <select
                                                value={formFields.status_perkawinan}
                                                onChange={(e) => handleFieldChange('status_perkawinan', e.target.value)}>
                                                <option>Pilih Status Perkawinan</option>
                                                <option>Lajang</option>
                                                <option>Sudah Menikah</option>
                                            </select>
                                            <select
                                                value={formFields.agama}
                                                onChange={(e) => handleFieldChange('agama', e.target.value)}>
                                                <option>Pilih Agama</option>
                                                <option value="Islam">Islam</option>
                                                <option value="Kristen Protestan">Kristen Protestan</option>
                                                <option value="Kristen Katolik">Kristen Katolik</option>
                                                <option value="Hindu">Hindu</option>
                                                <option value="Budha">Budha</option>
                                                <option value="Konghuchu">Konghuchu</option>
                                            </select>
                                            <input type="text" value={formFields.pekerjaan}
                                                onChange={(e) => handleFieldChange('pekerjaan', e.target.value)} />
                                            <input type="text" value={value.alamat} />
                                            <input type="date" value={value.tanggal_surat} />
                                        </span>
                                    </div>
                                    <span className="d-flex buttonBuatSurat justify-content-center">
                                        <button type="submit" style={{ backgroundColor: '#BBA482' }}>Simpan</button>
                                        <Link href="/sekretaris/surat-masuk" style={{ backgroundColor: '#900000' }}>
                                            <button style={{ backgroundColor: '#900000' }}>Batal</button>
                                        </Link>
                                        <Link
                                            href={{
                                                pathname: '/sekretaris/surat-keterangan-usaha',
                                                query: { id: id },
                                            }} >
                                            <button>Cetak surat</button>
                                        </Link>
                                    </span>
                                </form>
                            ))}
                        </div>
                    )}
                    <div>
                        {visibleSt && (
                            <div>
                                <h1 className="p-3">Form Pengisian Surat Tugas</h1>
                                {dataSuratMasuk.map((value) => (
                                    <form onSubmit={handleSubmit} method="post" action="">
                                        <div className="inputanUsers">
                                            <span>
                                                <p>No Surat</p>
                                                <p>Nama Pemberi Izin</p>
                                                <p>Nip Pemberi Izin</p>
                                                <p>Jabatan Pemberi Izin</p>
                                                <p>Nama Penerima</p>
                                                <p>Jabatan Penerima</p>
                                                <p>Nip Penerima</p>
                                                <p>Nama Desa</p>
                                                <p>Isi surat</p>
                                                <p>Penutup Surat</p>
                                                <p>Tanggal Surat</p>
                                            </span>
                                            <span>
                                                <input type="text" value={value.no_surat} />
                                                <input type="text" value={formFields.namaKades}
                                                    onChange={(e) => handleFieldChange('namaKades', e.target.value)} />
                                                <input type="number" value={formFields.nip_penanggungJawab}
                                                    onChange={(e) => handleFieldChange('nip_penanggungJawab', e.target.value)} />
                                                <select
                                                    value={formFields.jabatanKades}
                                                    onChange={(e) => handleFieldChange('jabatanKades', e.target.value)}>
                                                    <option>Pilih Jabatan Pemberi Izin</option>
                                                    <option value="Kepala Desa">Kepala Desa</option>
                                                    <option value="Sekretaris Desa">Sekretaris Desa</option>
                                                    <option value="Kepala Urusan Tata Usaha dan Umum">Kepala Urusan Tata Usaha dan Umum</option>
                                                    <option value="Kepala Urusan Keuangan">Kepala Urusan Keuangan</option>
                                                    <option value="Kepala Urusan Perencanaan">Kepala Urusan Perencanaan</option>
                                                    <option value="Kepala Dusun">Kepala Dusun</option>
                                                    <option value="Kepala Seksi Pemerintahan">Kepala Seksi Pemerintahan</option>
                                                    <option value="Kepala Seksi Kesejahteraan">Kepala Seksi Kesejahteraan</option>
                                                    <option value="Kepala Seksi Pelayanan">Kepala Seksi Pelayanan</option>
                                                </select>
                                                <input type="text" value={value.nama} />
                                                <input type="text" value={formFields.jabatan_penerima}
                                                    onChange={(e) => handleFieldChange('jabatan_penerima', e.target.value)} />
                                                <input type="text" value={formFields.nip_penerima}
                                                    onChange={(e) => handleFieldChange('nip_penerima', e.target.value)} />
                                                <input type="text" value={formFields.nama_desa}
                                                    onChange={(e) => handleFieldChange('nama_desa', e.target.value)} />
                                                <textarea value={formFields.isi_surat}
                                                    onChange={(e) => handleFieldChange('isi_surat', e.target.value)} />
                                                <textarea value={formFields.penutup_surat}
                                                    onChange={(e) => handleFieldChange('penutup_surat', e.target.value)} />
                                                <input type="date" value={value.tanggal_surat} />
                                            </span>
                                        </div>
                                        <span className="d-flex buttonBuatSurat justify-content-center">
                                            <button type="submit" style={{ backgroundColor: '#BBA482' }}>Simpan</button>
                                            <Link href="/sekretaris/surat-masuk" style={{ backgroundColor: '#900000' }}>
                                                <button style={{ backgroundColor: '#900000' }}>Batal</button>
                                            </Link>
                                            <Link
                                                href={{
                                                    pathname: '/sekretaris/surat-tugas',
                                                    query: { id: id },
                                                }} >
                                                <button>Cetak surat</button>
                                            </Link>
                                        </span>
                                    </form>
                                ))}
                            </div>
                        )}
                    </div>
                    <div>
                        {visibleSktm && (
                            <div className="p-3">
                                <h1 className="p-3">Form Pengisian Surat Keterangan Usaha</h1>
                                {dataSuratMasuk.map((value) => (
                                    <form onSubmit={handleSubmit} method="post" action="">
                                        <div className="inputanUsers">
                                            <span>
                                                <p>No Surat</p>
                                                <p>Nama Pemberi Izin</p>
                                                <p>Nip Pemberi Izin</p>
                                                <p>Jabatan Pemberi Izin</p>
                                                <p>Nama Penerima</p>
                                                <p>Nik</p>
                                                <p>Tempat/Tanggal Lahir</p>
                                                <p>Jenis Kelamin</p>
                                                <p>Status perkawinan</p>
                                                <p>Agama</p>
                                                <p>Pekerjaan</p>
                                                <p>Alamat</p>
                                                <p>Isi surat</p>
                                                {/* <p>Penutup Surat</p> */}
                                                <p>Tanggal Surat</p>
                                            </span>
                                            <span>
                                                <input type="text" value={formFields.no_surat}
                                                    onChange={(e) => handleFieldChange('no_surat', e.target.value)} />
                                                <input type="text" value={formFields.namaKades}
                                                    onChange={(e) => handleFieldChange('namaKades', e.target.value)} />
                                                <input type="number" value={formFields.nip_penanggungJawab}
                                                    onChange={(e) => handleFieldChange('nip_penanggungJawab', e.target.value)} />
                                                <select
                                                    value={formFields.jabatanKades}
                                                    onChange={(e) => handleFieldChange('jabatanKades', e.target.value)}>
                                                    <option>Pilih Jabatan Pemberi Izin</option>
                                                    <option value="Kepala Desa">Kepala Desa</option>
                                                    <option value="Sekretaris Desa">Sekretaris Desa</option>
                                                    <option value="Kepala Urusan Tata Usaha dan Umum">Kepala Urusan Tata Usaha dan Umum</option>
                                                    <option value="Kepala Urusan Keuangan">Kepala Urusan Keuangan</option>
                                                    <option value="Kepala Urusan Perencanaan">Kepala Urusan Perencanaan</option>
                                                    <option value="Kepala Dusun">Kepala Dusun</option>
                                                    <option value="Kepala Seksi Pemerintahan">Kepala Seksi Pemerintahan</option>
                                                    <option value="Kepala Seksi Kesejahteraan">Kepala Seksi Kesejahteraan</option>
                                                    <option value="Kepala Seksi Pelayanan">Kepala Seksi Pelayanan</option>
                                                </select>
                                                <input type="text" value={value.nama} />
                                                <input type="number" value={formFields.nik}
                                                    onChange={(e) => handleFieldChange('nik', e.target.value)} />
                                                <input type="text" value={formFields.ttl}
                                                    onChange={(e) => handleFieldChange('ttl', e.target.value)} />
                                                <select
                                                    value={formFields.jenis_kelamin}
                                                    onChange={(e) => handleFieldChange('jenis_kelamin', e.target.value)}>
                                                    <option>Pilih jenis kelamin</option>
                                                    <option value="Laki-laki">Laki-laki</option>
                                                    <option value="Perempuan">Perempuan</option>
                                                </select>
                                                <select
                                                    value={formFields.status_perkawinan}
                                                    onChange={(e) => handleFieldChange('status_perkawinan', e.target.value)}>
                                                    <option>Pilih Status Perkawinan</option>
                                                    <option>Lajang</option>
                                                    <option>Sudah Menikah</option>
                                                </select>
                                                <select
                                                    value={formFields.agama}
                                                    onChange={(e) => handleFieldChange('agama', e.target.value)}>
                                                    <option>Pilih Agama</option>
                                                    <option value="Islam">Islam</option>
                                                    <option value="Kristen Protestan">Kristen Protestan</option>
                                                    <option value="Kristen Katolik">Kristen Katolik</option>
                                                    <option value="Hindu">Hindu</option>
                                                    <option value="Budha">Budha</option>
                                                    <option value="Konghuchu">Konghuchu</option>
                                                </select>
                                                <input type="text" value={formFields.pekerjaan}
                                                    onChange={(e) => handleFieldChange('pekerjaan', e.target.value)} />
                                                <input type="text" value={value.alamat} />
                                                <textarea value={formFields.isi_surat}
                                                    onChange={(e) => handleFieldChange('isi_surat', e.target.value)} />
                                                {/* <textarea value={formFields.penutup_surat}
                                            onChange={(e) => handleFieldChange('penutup_surat', e.target.value)} /> */}
                                                <input type="date" value={value.tanggal_surat} />
                                            </span>
                                        </div>
                                        <span className="d-flex buttonBuatSurat justify-content-center">
                                            <button type="submit" style={{ backgroundColor: '#BBA482' }}>Simpan</button>
                                            <Link href="/sekretaris/surat-masuk" style={{ backgroundColor: '#900000' }}>
                                                <button style={{ backgroundColor: '#900000' }}>Batal</button>
                                            </Link>
                                            <Link
                                                href={{
                                                    pathname: '/sekretaris/surat-keterangan-tidak-mampu',
                                                    query: { id: id },
                                                }} >
                                                <button>Cetak surat</button>
                                            </Link>
                                        </span>
                                    </form>
                                ))}
                            </div>
                        )}
                    </div>
                    {visibleSkd && (
                        <div className="p-3">
                            <h1 className="p-3">Form Pengisian Surat Keterangan Domisili</h1>
                            {dataSuratMasuk.map((value) => (
                                <form onSubmit={handleSubmit} method="post" action="">
                                    <div className="inputanUsers">
                                        <span>
                                            <p>No Surat</p>
                                            <p>Nama Pemberi Izin</p>
                                            <p>Nip Pemberi Izin</p>
                                            <p>Jabatan Pemberi Izin</p>
                                            <p>Nama Penerima</p>
                                            <p>Nik</p>
                                            <p>Tempat/Tanggal Lahir</p>
                                            <p>Jenis Kelamin</p>
                                            <p>Status perkawinan</p>
                                            <p>Agama</p>
                                            <p>Pekerjaan</p>
                                            <p>Alamat</p>
                                            <p>RT/RW</p>
                                            <p>Kelurahan</p>
                                            <p>Kecamatan</p>
                                            <p>Kabupaten</p>
                                            <p>Tanggal Surat</p>
                                        </span>
                                        <span>
                                            <input type="text" value={formFields.no_surat}
                                                onChange={(e) => handleFieldChange('no_surat', e.target.value)} />
                                            <input type="text" value={formFields.namaKades}
                                                onChange={(e) => handleFieldChange('namaKades', e.target.value)} />
                                            <input type="number" value={formFields.nip_penanggungJawab}
                                                onChange={(e) => handleFieldChange('nip_penanggungJawab', e.target.value)} />
                                            <select
                                                value={formFields.jabatanKades}
                                                onChange={(e) => handleFieldChange('jabatanKades', e.target.value)}>
                                                <option>Pilih Jabatan Pemberi Izin</option>
                                                <option value="Kepala Desa">Kepala Desa</option>
                                                <option value="Sekretaris Desa">Sekretaris Desa</option>
                                                <option value="Kepala Urusan Tata Usaha dan Umum">Kepala Urusan Tata Usaha dan Umum</option>
                                                <option value="Kepala Urusan Keuangan">Kepala Urusan Keuangan</option>
                                                <option value="Kepala Urusan Perencanaan">Kepala Urusan Perencanaan</option>
                                                <option value="Kepala Dusun">Kepala Dusun</option>
                                                <option value="Kepala Seksi Pemerintahan">Kepala Seksi Pemerintahan</option>
                                                <option value="Kepala Seksi Kesejahteraan">Kepala Seksi Kesejahteraan</option>
                                                <option value="Kepala Seksi Pelayanan">Kepala Seksi Pelayanan</option>
                                            </select>
                                            <input type="text" value={value.nama} />
                                            <input type="number" value={formFields.nik}
                                                onChange={(e) => handleFieldChange('nik', e.target.value)} />
                                            <input type="text" value={formFields.ttl}
                                                onChange={(e) => handleFieldChange('ttl', e.target.value)} />
                                            <select
                                                value={formFields.jenis_kelamin}
                                                onChange={(e) => handleFieldChange('jenis_kelamin', e.target.value)}>
                                                <option>Pilih jenis kelamin</option>
                                                <option value="Laki-laki">Laki-laki</option>
                                                <option value="Perempuan">Perempuan</option>
                                            </select>
                                            <select
                                                value={formFields.status_perkawinan}
                                                onChange={(e) => handleFieldChange('status_perkawinan', e.target.value)}>
                                                <option>Pilih Status Perkawinan</option>
                                                <option>Lajang</option>
                                                <option>Sudah Menikah</option>
                                            </select>
                                            <select
                                                value={formFields.agama}
                                                onChange={(e) => handleFieldChange('agama', e.target.value)}>
                                                <option>Pilih Agama</option>
                                                <option value="Islam">Islam</option>
                                                <option value="Kristen Protestan">Kristen Protestan</option>
                                                <option value="Kristen Katolik">Kristen Katolik</option>
                                                <option value="Hindu">Hindu</option>
                                                <option value="Budha">Budha</option>
                                                <option value="Konghuchu">Konghuchu</option>
                                            </select>
                                            <input type="text" value={formFields.pekerjaan}
                                                onChange={(e) => handleFieldChange('pekerjaan', e.target.value)} />
                                            <input type="text" value={value.alamat} />
                                            <input type="text" value={formFields.rtRw}
                                                onChange={(e) => handleFieldChange('rtRw', e.target.value)} />
                                            <input type="text" value={formFields.kelurahan}
                                                onChange={(e) => handleFieldChange('kelurahan', e.target.value)} />
                                            <input type="text" value={formFields.kecamatan}
                                                onChange={(e) => handleFieldChange('kecamatan', e.target.value)} />
                                            <input type="text" value={formFields.kabupaten}
                                                onChange={(e) => handleFieldChange('kabupaten', e.target.value)} />
                                            <input type="date" value={value.tanggal_surat} />
                                        </span>
                                    </div>
                                    <span className="d-flex buttonBuatSurat justify-content-center">
                                        <button type="submit" style={{ backgroundColor: '#BBA482' }}>Simpan</button>
                                        <Link href="/sekretaris/surat-masuk" style={{ backgroundColor: '#900000' }}>
                                            <button style={{ backgroundColor: '#900000' }}>Batal</button>
                                        </Link>
                                        <Link
                                            href={{
                                                pathname: '/sekretaris/surat-keterangan-domisili',
                                                query: { id: id },
                                            }} >
                                            <button>Cetak surat</button>
                                        </Link>
                                    </span>
                                </form>
                            ))}
                        </div >
                    )
                    }
                    <div>
                        {visibleSkpo && (
                            <div className="p-3">
                                <h1 className="p-3">Form Pengisian Surat Keterangan Penghasilan</h1>
                                {dataSuratMasuk.map((value) => (
                                    <form onSubmit={handleSubmit} method="post" action="">
                                        <div className="inputanUsers">
                                            <span>
                                                <p>No Surat</p>
                                                <p>Nama Pemberi Izin</p>
                                                <p>Nip Pemberi Izin</p>
                                                <p>Jabatan Pemberi Izin</p>
                                                <p>Nama Penerima</p>
                                                <p>Alamat</p>
                                                <p>Pekerjaan</p>
                                                <p>Jenis Kelamin</p>
                                                <p>Orang tua/wali dari</p>
                                                <p>Kecamatan</p>
                                                <p>Kabupaten</p>
                                                <p>Jumlah Penghasilan</p>
                                                <p>Tanggal Surat</p>
                                            </span>
                                            <span>
                                                <input type="text" value={formFields.no_surat}
                                                    onChange={(e) => handleFieldChange('no_surat', e.target.value)} />
                                                <input type="text" value={formFields.namaKades}
                                                    onChange={(e) => handleFieldChange('namaKades', e.target.value)} />
                                                <input type="number" value={formFields.nip_penanggungJawab}
                                                    onChange={(e) => handleFieldChange('nip_penanggungJawab', e.target.value)} />
                                                <select
                                                    value={formFields.jabatanKades}
                                                    onChange={(e) => handleFieldChange('jabatanKades', e.target.value)}>
                                                    <option>Pilih Jabatan Pemberi Izin</option>
                                                    <option value="Kepala Desa">Kepala Desa</option>
                                                    <option value="Sekretaris Desa">Sekretaris Desa</option>
                                                    <option value="Kepala Urusan Tata Usaha dan Umum">Kepala Urusan Tata Usaha dan Umum</option>
                                                    <option value="Kepala Urusan Keuangan">Kepala Urusan Keuangan</option>
                                                    <option value="Kepala Urusan Perencanaan">Kepala Urusan Perencanaan</option>
                                                    <option value="Kepala Dusun">Kepala Dusun</option>
                                                    <option value="Kepala Seksi Pemerintahan">Kepala Seksi Pemerintahan</option>
                                                    <option value="Kepala Seksi Kesejahteraan">Kepala Seksi Kesejahteraan</option>
                                                    <option value="Kepala Seksi Pelayanan">Kepala Seksi Pelayanan</option>
                                                </select>
                                                <input type="text" value={value.nama} />
                                                <input type="text" value={value.alamat} />
                                                <input type="text" value={formFields.pekerjaan}
                                                    onChange={(e) => handleFieldChange('pekerjaan', e.target.value)} />
                                                <select
                                                    value={formFields.jenis_kelamin}
                                                    onChange={(e) => handleFieldChange('jenis_kelamin', e.target.value)}>
                                                    <option>Pilih jenis kelamin</option>
                                                    <option value="Laki-laki">Laki-laki</option>
                                                    <option value="Perempuan">Perempuan</option>
                                                </select>
                                                <input type="text" value={formFields.namaOrangTua}
                                                    onChange={(e) => handleFieldChange('namaOrangTua', e.target.value)} />
                                                <input type="text" value={formFields.kecamatan}
                                                    onChange={(e) => handleFieldChange('kecamatan', e.target.value)} />
                                                <input type="text" value={formFields.kabupaten}
                                                    onChange={(e) => handleFieldChange('kabupaten', e.target.value)} />
                                                <input type="text" value={formFields.penghasilan}
                                                    onChange={(e) => handleFieldChange('penghasilan', e.target.value)} />
                                                <input type="date" value={value.tanggal_surat} />
                                            </span>
                                        </div>
                                        <span className="d-flex buttonBuatSurat justify-content-center">
                                            <button type="submit" style={{ backgroundColor: '#BBA482' }}>Simpan</button>
                                            <Link href="/sekretaris/surat-masuk" style={{ backgroundColor: '#900000' }}>
                                                <button style={{ backgroundColor: '#900000' }}>Batal</button>
                                            </Link>
                                            <Link
                                                href={{
                                                    pathname: '/sekretaris/surat-keterangan-penghasilan',
                                                    query: { id: id },
                                                }} >
                                                <button>Cetak surat</button>
                                            </Link>
                                        </span>
                                    </form>
                                ))}
                            </div>
                        )}
                    </div>
                    <div>
                        {visibleLainnya && (
                            <div className="p-3">
                                <h1 className="p-3">Form Pengisian Surat Lainnya</h1>
                                {dataSuratMasuk.map((value) => (
                                    <form onSubmit={handleSubmit} method="post" action="">
                                        <div className="inputanUsers">
                                            <span>
                                                <p>No Surat</p>
                                                <p>Nama Pemberi Izin</p>
                                                <p>Nip Pemberi Izin</p>
                                                <p>Jabatan Pemberi Izin</p>
                                                <p>Nama Penerima</p>
                                                <p>Nik</p>
                                                <p>Nip</p>
                                                <p>Tempat Tanggal Lahir</p>
                                                <p>Status Perkawinan</p>
                                                <p>Jenis Kelamin</p>
                                                <p>Agama</p>
                                                <p>Alamat</p>
                                                <p>Pekerjaan</p>
                                                <p>RT/RW</p>
                                                <p>Kelurahan</p>
                                                <p>Kecamatan</p>
                                                <p>Kabupaten / Kota</p>
                                                <p>Isi Surat</p>
                                                <p>Penutup Surat</p>
                                                <p>Tanggal Surat</p>
                                                <p>Lampiran</p>
                                            </span>
                                            <span>
                                                <input type="text" value={formFields.no_surat}
                                                    onChange={(e) => handleFieldChange('no_surat', e.target.value)} />
                                                <input type="text" value={formFields.namaKades}
                                                    onChange={(e) => handleFieldChange('namaKades', e.target.value)} />
                                                <input type="number" value={formFields.nip_penanggungJawab}
                                                    onChange={(e) => handleFieldChange('nip_penanggungJawab', e.target.value)} />
                                                <select
                                                    value={formFields.jabatanKades}
                                                    onChange={(e) => handleFieldChange('jabatanKades', e.target.value)}>
                                                    <option>Pilih Jabatan Pemberi Izin</option>
                                                    <option value="Kepala Desa">Kepala Desa</option>
                                                    <option value="Sekretaris Desa">Sekretaris Desa</option>
                                                    <option value="Kepala Urusan Tata Usaha dan Umum">Kepala Urusan Tata Usaha dan Umum</option>
                                                    <option value="Kepala Urusan Keuangan">Kepala Urusan Keuangan</option>
                                                    <option value="Kepala Urusan Perencanaan">Kepala Urusan Perencanaan</option>
                                                    <option value="Kepala Dusun">Kepala Dusun</option>
                                                    <option value="Kepala Seksi Pemerintahan">Kepala Seksi Pemerintahan</option>
                                                    <option value="Kepala Seksi Kesejahteraan">Kepala Seksi Kesejahteraan</option>
                                                    <option value="Kepala Seksi Pelayanan">Kepala Seksi Pelayanan</option>
                                                </select>
                                                <input type="text" value={value.nama} />
                                                <input type="number" value={formFields.nik}
                                                    onChange={(e) => handleFieldChange('nik', e.target.value)} />
                                                <input type="text" value={formFields.nip_penerima}
                                                    onChange={(e) => handleFieldChange('nip_penerima', e.target.value)} />
                                                <input type="text" value={formFields.ttl}
                                                    onChange={(e) => handleFieldChange('ttl', e.target.value)} />
                                                <select
                                                    value={formFields.status_perkawinan}
                                                    onChange={(e) => handleFieldChange('status_perkawinan', e.target.value)}>
                                                    <option>Pilih Status Perkawinan</option>
                                                    <option>Lajang</option>
                                                    <option>Sudah Menikah</option>
                                                </select>
                                                <select
                                                    value={formFields.jenis_kelamin}
                                                    onChange={(e) => handleFieldChange('jenis_kelamin', e.target.value)}>
                                                    <option>Pilih jenis kelamin</option>
                                                    <option value="Laki-laki">Laki-laki</option>
                                                    <option value="Perempuan">Perempuan</option>
                                                </select>
                                                <select
                                                    value={formFields.agama}
                                                    onChange={(e) => handleFieldChange('agama', e.target.value)}>
                                                    <option>Pilih Agama</option>
                                                    <option value="Islam">Islam</option>
                                                    <option value="Kristen Protestan">Kristen Protestan</option>
                                                    <option value="Kristen Katolik">Kristen Katolik</option>
                                                    <option value="Hindu">Hindu</option>
                                                    <option value="Budha">Budha</option>
                                                    <option value="Konghuchu">Konghuchu</option>
                                                </select>
                                                <input type="text" value={value.alamat} />
                                                <input type="text" value={formFields.pekerjaan}
                                                    onChange={(e) => handleFieldChange('pekerjaan', e.target.value)} />
                                                <input type="text" value={formFields.rtRw}
                                                    onChange={(e) => handleFieldChange('rtRw', e.target.value)} />
                                                <input type="text" value={formFields.kelurahan}
                                                    onChange={(e) => handleFieldChange('kelurahan', e.target.value)} />
                                                <input type="text" value={formFields.kecamatan}
                                                    onChange={(e) => handleFieldChange('kecamatan', e.target.value)} />
                                                <input type="text" value={formFields.kabupaten}
                                                    onChange={(e) => handleFieldChange('kabupaten', e.target.value)} />
                                                <input type="text" value={formFields.penghasilan}
                                                    onChange={(e) => handleFieldChange('penghasilan', e.target.value)} />
                                                <input type="date" value={value.tanggal_surat} />
                                                <textarea value={formFields.isi_surat}
                                                    onChange={(e) => handleFieldChange('isi_surat', e.target.value)} />
                                                <textarea value={formFields.penutup_surat}
                                                    onChange={(e) => handleFieldChange('penutup_surat', e.target.value)} />
                                            </span>
                                        </div>
                                        <span className="d-flex buttonBuatSurat justify-content-center">
                                            <button type="submit" style={{ backgroundColor: '#BBA482' }}>Simpan</button>
                                            <Link href="/sekretaris/surat-masuk" style={{ backgroundColor: '#900000' }}>
                                                <button style={{ backgroundColor: '#900000' }}>Batal</button>
                                            </Link>
                                            <Link
                                                href={{
                                                    pathname: '/sekretaris/surat-lainnya',
                                                    query: { id: id },
                                                }} >
                                                <button>Cetak surat</button>
                                            </Link>
                                        </span>
                                    </form>
                                ))}
                            </div>
                        )}
                    </div>
                </article >
            </div >
        </>
    )
}
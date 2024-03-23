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
        provinsi: '',
        klasifikasi: '',
        nomor_kk: '',
        nama_kepalakk: '',
        kodePos_asal: '',
        telpon_asal: '',
        alasan_pindah: '',
        alamat_tujuan: '',
        desa_tujuan: '',
        kecamatan_tujuan: '',
        kabupaten_tujuan: '',
        provinsi_tujuan: '',
        kodePos_tujuan: '',
        telpon_tujuan: '',
        jenis_kepindahan: '',
        statuskk_pindah: '',
        statustidak_pindah: '',
        shdk: '',
        usaha: '',
        ttl_orangtua: '',
        pekerjaan_orangtua: '',
        alamat_orangtua: '',
        terbilang: '',
        kewarganegaraan: '',
        anak_ke: '',
        sebab_kematian: '',
        keterangan_visum: '',
        jenis_kelahiran: '',
        nama_ayah: '',
        nik_ayah: '',
        nik_ibu: '',
    });

    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        async function fetchData() {
            if (id) {
                const data = await fetchData_ModelTransaksi(id);

                if (data.length > 0) {
                    const sortedData = data.sort((a, b) => new Date(b.tanggal_surat) - new Date(a.tanggal_surat));
                    const suratMasuk = sortedData.filter((surat) => surat.jenis_surat === "surat keluar");

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
                        provinsi: suratMasuk[0].provinsi || '',
                        klasifikasi: suratMasuk[0].klasifikasi || '',
                        nomor_kk: suratMasuk[0].nomor_kk || '',
                        nama_kepalakk: suratMasuk[0].nama_kepalakk || '',
                        kodePos_asal: suratMasuk[0].kodePos_asal || '',
                        telpon_asal: suratMasuk[0].telpon_asal || '',
                        alasan_pindah: suratMasuk[0].alasan_pindah || '',
                        alamat_tujuan: suratMasuk[0].alamat_tujuan || '',
                        desa_tujuan: suratMasuk[0].desa_tujuan || '',
                        kecamatan_tujuan: suratMasuk[0].kecamatan_tujuan || '',
                        kabupaten_tujuan: suratMasuk[0].kabupaten_tujuan || '',
                        provinsi_tujuan: suratMasuk[0].provinsi_tujuan || '',
                        kodePos_tujuan: suratMasuk[0].kodePos_tujuan || '',
                        telpon_tujuan: suratMasuk[0].telpon_tujuan || '',
                        jenis_kepindahan: suratMasuk[0].jenis_kepindahan || '',
                        statuskk_pindah: suratMasuk[0].statuskk_pindah || '',
                        statustidak_pindah: suratMasuk[0].statustidak_pindah || '',
                        shdk: suratMasuk[0].shdk || '',
                        usaha: suratMasuk[0].usaha || '',
                        ttl_orangtua: suratMasuk[0].ttl_orangtua || '',
                        pekerjaan_orangtua: suratMasuk[0].pekerjaan_orangtua || '',
                        alamat_orangtua: suratMasuk[0].alamat_orangtua || '',
                        terbilang: suratMasuk[0].terbilang || '',
                        kewarganegaraan: suratMasuk[0].kewarganegaraan || '',
                        anak_ke: suratMasuk[0].anak_ke || '',
                        sebab_kematian: suratMasuk[0].sebab_kematian || '',
                        keterangan_visum: suratMasuk[0].keterangan_visum || '',
                        jenis_kelahiran: suratMasuk[0].jenis_kelahiran || '',
                        nama_ayah: suratMasuk[0].nama_ayah || '',
                        nik_ayah: suratMasuk[0].nik_ayah || '',
                        nik_ibu: suratMasuk[0].nik_ibu || '',
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
            provinsi: formFields.provinsi,
            klasifikasi: formFields.klasifikasi,
            nomor_kk: formFields.nomor_kk,
            nama_kepalakk: formFields.nama_kepalakk,
            kodePos_asal: formFields.kodePos_asal,
            telpon_asal: formFields.telpon_asal,
            alasan_pindah: formFields.alasan_pindah,
            alamat_tujuan: formFields.alamat_tujuan,
            desa_tujuan: formFields.desa_tujuan,
            kecamatan_tujuan: formFields.kecamatan_tujuan,
            kabupaten_tujuan: formFields.kabupaten_tujuan,
            provinsi_tujuan: formFields.provinsi_tujuan,
            kodePos_tujuan: formFields.kodePos_tujuan,
            telpon_tujuan: formFields.telpon_tujuan,
            jenis_kepindahan: formFields.jenis_kepindahan,
            statuskk_pindah: formFields.statuskk_pindah,
            statustidak_pindah: formFields.statustidak_pindah,
            shdk: formFields.shdk,
            usaha: formFields.usaha,
            ttl_orangtua: formFields.ttl_orangtua,
            pekerjaan_orangtua: formFields.pekerjaan_orangtua,
            alamat_orangtua: formFields.alamat_orangtua,
            terbilang: formFields.terbilang,
            kewarganegaraan: formFields.kewarganegaraan,
            anak_ke: formFields.anak_ke,
            sebab_kematian: formFields.sebab_kematian,
            keterangan_visum: formFields.keterangan_visum,
            jenis_kelahiran: formFields.jenis_kelahiran,
            nama_ayah: formFields.nama_ayah,
            nik_ayah: formFields.nik_ayah,
            nik_ibu: formFields.nik_ibu,
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
            case "Surat Keterangan Penghasilan":
                visibleSt = true;
                break;
            case "Surat Keterangan Kematian":
                visibleSktm = true;
                break;
            case "Surat Keterangan Kelahiran":
                visibleSkd = true;
                break;
            case "Surat Keterangan Pindah":
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
                                        <Link href="/sekretaris/surat-keluar" style={{ backgroundColor: '#900000' }}>
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
                            <div className="p-2">
                                <h1 className="p-3">Form Pengisian Surat Penghasilan</h1>
                                {dataSuratMasuk.map((value) => (
                                    <form onSubmit={handleSubmit} method="post" action="">
                                        <div className="inputanUsers">
                                            <span>
                                                <p>No Surat</p>
                                                <p>Nama Pemberi Izin</p>
                                                <p>Jabatan Pemberi Izin</p>
                                                <p>Alamat Pemberi Izin</p>
                                                <p>Nama Penerima</p>
                                                <p>Tempat/tgl lahir</p>
                                                <p>Pekerjaan</p>
                                                <p>Alamat</p>
                                                <p>Nama Orang Tua</p>
                                                <p>Tempat Tanggal Lahir Orang Tua</p>
                                                <p>Pekerjaan Orang Tua</p>
                                                <p>Alamat Orang Tua</p>
                                                <p>Pengahasilan</p>
                                                <p>Terbilang</p>
                                                <p>Kelurahan</p>
                                                <p>Kecamatan</p>
                                                <p>Kabupaten / Kota</p>
                                                <p>No. Hp</p>
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
                                                <input type="text" value={formFields.nip_penanggungJawab}
                                                    onChange={(e) => handleFieldChange('nip_penanggungJawab', e.target.value)} />
                                                <input type="text" value={value.nama} />
                                                <input type="text" value={formFields.ttl}
                                                    onChange={(e) => handleFieldChange('ttl', e.target.value)} />
                                                <input type="text" value={formFields.pekerjaan}
                                                    onChange={(e) => handleFieldChange('pekerjaan', e.target.value)} />
                                                <input type="text" value={value.alamat} />
                                                <input type="text" value={value.namaOrangTua} />
                                                <input type="text" value={formFields.ttl_orangtua}
                                                    onChange={(e) => handleFieldChange('ttl_orangtua', e.target.value)} />
                                                <input type="text" value={formFields.pekerjaan_orangtua}
                                                    onChange={(e) => handleFieldChange('pekerjaan_orangtua', e.target.value)} />
                                                <input type="text" value={formFields.alamat_orangtua}
                                                    onChange={(e) => handleFieldChange('alamat_orangtua', e.target.value)} />
                                                <input type="text" value={formFields.penghasilan}
                                                    onChange={(e) => handleFieldChange('penghasilan', e.target.value)} />
                                                <input type="text" value={formFields.terbilang}
                                                    onChange={(e) => handleFieldChange('terbilang', e.target.value)} />
                                                <input type="text" value={formFields.kelurahan}
                                                    onChange={(e) => handleFieldChange('kelurahan', e.target.value)} />
                                                <input type="text" value={formFields.kecamatan}
                                                    onChange={(e) => handleFieldChange('kecamatan', e.target.value)} />
                                                <input type="text" value={formFields.kabupaten}
                                                    onChange={(e) => handleFieldChange('kabupaten', e.target.value)} />
                                                <input type="text" value={value.no_wa} />
                                                <input type="date" value={value.tanggal_surat} />
                                            </span>
                                        </div>
                                        <span className="d-flex buttonBuatSurat justify-content-center">
                                            <button type="submit" style={{ backgroundColor: '#BBA482' }}>Simpan</button>
                                            <Link href="/sekretaris/surat-keluar" style={{ backgroundColor: '#900000' }}>
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
                        {visibleSktm && (
                            <div className="p-3">
                                <h1 className="p-3">Form Pengisian Surat Keterangan Kematian</h1>
                                {dataSuratMasuk.map((value) => (
                                    <form onSubmit={handleSubmit} method="post" action="">
                                        <div className="inputanUsers">
                                            <span>
                                                <p>No Surat</p>
                                                <p>Nama Pemberi Izin</p>
                                                <p>Jabatan Pemberi Izin</p>
                                                <p>Nama Penerima</p>
                                                <p>Nik</p>
                                                <p>Nomor KK</p>
                                                <p>Tempat/Tanggal Lahir</p>
                                                <p>Jenis Kelamin</p>
                                                <p>Kewarganegaraan</p>
                                                <p>Agama</p>
                                                <p>Status perkawinan</p>
                                                <p>Pekerjaan</p>
                                                <p>Alamat</p>
                                                <p>Anak Ke</p>
                                                <h6 style={{ textAlign: 'left' }}>Telah Meninggal Pada</h6>
                                                <p>Hari/Tanggal</p>
                                                <p>Tempat Kematian</p>
                                                <p>Kelurahan</p>
                                                <p>Kecamatan</p>
                                                <p>Kabupaten</p>
                                                <p>Povinsi</p>
                                                <p>Sebab Kematian</p>
                                                <p>Yang Menentukan</p>
                                                <p>Keterangan Visum</p>
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
                                                <input type="number" value={formFields.nomor_kk}
                                                    onChange={(e) => handleFieldChange('nomor_kk', e.target.value)} />
                                                <input type="text" value={formFields.ttl}
                                                    onChange={(e) => handleFieldChange('ttl', e.target.value)} />
                                                <select
                                                    value={formFields.jenis_kelamin}
                                                    onChange={(e) => handleFieldChange('jenis_kelamin', e.target.value)}>
                                                    <option>Pilih jenis kelamin</option>
                                                    <option value="Laki-laki">Laki-laki</option>
                                                    <option value="Perempuan">Perempuan</option>
                                                </select>
                                                <input type="text" value={formFields.kewarganegaraan}
                                                    onChange={(e) => handleFieldChange('kewarganegaraan', e.target.value)} />
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
                                                <select
                                                    value={formFields.status_perkawinan}
                                                    onChange={(e) => handleFieldChange('status_perkawinan', e.target.value)}>
                                                    <option>Pilih Status Perkawinan</option>
                                                    <option>Lajang</option>
                                                    <option>Sudah Menikah</option>
                                                </select>
                                                <input type="text" value={formFields.pekerjaan}
                                                    onChange={(e) => handleFieldChange('pekerjaan', e.target.value)} />
                                                <input type="text" value={value.alamat} />
                                                <input type="text" value={formFields.anak_ke}
                                                    onChange={(e) => handleFieldChange('anak_ke', e.target.value)} />
                                                <p style={{ margin: '0' }}><br /></p>
                                                <input type="text" value={formFields.ttl_orangtua}
                                                    onChange={(e) => handleFieldChange('ttl_orangtua', e.target.value)} />
                                                <input type="text" value={formFields.alamat_tujuan}
                                                    onChange={(e) => handleFieldChange('alamat_tujuan', e.target.value)} />
                                                <input type="text" value={formFields.kelurahan}
                                                    onChange={(e) => handleFieldChange('kelurahan', e.target.value)} />
                                                <input type="text" value={formFields.kecamatan}
                                                    onChange={(e) => handleFieldChange('kecamatan', e.target.value)} />
                                                <input type="text" value={formFields.kabupaten}
                                                    onChange={(e) => handleFieldChange('kabupaten', e.target.value)} />
                                                <input type="text" value={formFields.provinsi}
                                                    onChange={(e) => handleFieldChange('provinsi', e.target.value)} />
                                                <input type="text" value={formFields.sebab_kematian}
                                                    onChange={(e) => handleFieldChange('sebab_kematian', e.target.value)} />
                                                <input type="text" value={formFields.jenis_kepindahan}
                                                    onChange={(e) => handleFieldChange('jenis_kepindahan', e.target.value)} />
                                                <input type="text" value={formFields.keterangan_visum}
                                                    onChange={(e) => handleFieldChange('keterangan_visum', e.target.value)} />
                                                <input type="date" value={value.tanggal_surat} />
                                            </span>
                                        </div>
                                        <span className="d-flex buttonBuatSurat justify-content-center">
                                            <button type="submit" style={{ backgroundColor: '#BBA482' }}>Simpan</button>
                                            <Link href="/sekretaris/surat-keluar" style={{ backgroundColor: '#900000' }}>
                                                <button style={{ backgroundColor: '#900000' }}>Batal</button>
                                            </Link>
                                            <Link
                                                href={{
                                                    pathname: '/sekretaris/surat-keterangan-kematian',
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
                            <h1 className="p-3">Form Pengisian Surat Keterangan Kelahiran</h1>
                            {dataSuratMasuk.map((value) => (
                                <form onSubmit={handleSubmit} method="post" action="">
                                    <div className="inputanUsers">
                                        <span>
                                            <p>No Surat</p>
                                            <p>Nama Pemberi Izin</p>
                                            <p>Jabatan Pemberi Izin</p>
                                            <p>Nama Lengkap Bayi</p>
                                            <p>Nik</p>
                                            <p>Nomor KK</p>
                                            <p>Jenis Kelamin</p>
                                            <p>Tempat/Tanggal Lahir</p>
                                            <p>Anak ke</p>
                                            <p>Jenis Kelahiran</p>
                                            <p>Nama Ayah</p>
                                            <p>Nik Ayah</p>
                                            <p>Nama Ibu</p>
                                            <p>Nik Ibu</p>
                                            <p>Agama</p>
                                            <p>Kewarganegaraan</p>
                                            <p>Alamat</p>
                                            <p>Kelurahan</p>
                                            <p>Kecamatan</p>
                                            <p>Kabupaten</p>
                                            <p>Tanggal</p>
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
                                            <input type="number" value={formFields.nomor_kk}
                                                onChange={(e) => handleFieldChange('nomor_kk', e.target.value)} />
                                            <select
                                                value={formFields.jenis_kelamin}
                                                onChange={(e) => handleFieldChange('jenis_kelamin', e.target.value)}>
                                                <option>Pilih jenis kelamin</option>
                                                <option value="Laki-laki">Laki-laki</option>
                                                <option value="Perempuan">Perempuan</option>
                                            </select>
                                            <input type="text" value={formFields.ttl}
                                                onChange={(e) => handleFieldChange('ttl', e.target.value)} />
                                            <input type="text" value={formFields.anak_ke}
                                                onChange={(e) => handleFieldChange('anak_ke', e.target.value)} />
                                            <input type="text" value={formFields.jenis_kelahiran}
                                                onChange={(e) => handleFieldChange('jenis_kelahiran', e.target.value)} />
                                            <input type="text" value={formFields.nama_ayah}
                                                onChange={(e) => handleFieldChange('nama_ayah', e.target.value)} />
                                            <input type="text" value={formFields.nik_ayah}
                                                onChange={(e) => handleFieldChange('nik_ayah', e.target.value)} />
                                            <input type="text" value={formFields.namaOrangTua}
                                                onChange={(e) => handleFieldChange('namaOrangTua', e.target.value)} />
                                            <input type="text" value={formFields.nik_ibu}
                                                onChange={(e) => handleFieldChange('nik_ibu', e.target.value)} />
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
                                            <input type="text" value={formFields.kewarganegaraan}
                                                onChange={(e) => handleFieldChange('kewarganegaraan', e.target.value)} />
                                            <input type="text" value={value.alamat} />
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
                                        <Link href="/sekretaris/surat-keluar" style={{ backgroundColor: '#900000' }}>
                                            <button style={{ backgroundColor: '#900000' }}>Batal</button>
                                        </Link>
                                        <Link
                                            href={{
                                                pathname: '/sekretaris/surat-keterangan-kelahiran',
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
                                <h1 className="p-3">Form Pengisian Surat Keterangan Pindah</h1>
                                {dataSuratMasuk.map((value) => (
                                    <form onSubmit={handleSubmit} method="post" action="">
                                        <div className="inputanUsers">
                                            <span>
                                                <p>No Surat</p>
                                                <p>Nama Pemberi Izin</p>
                                                <p>Nip Pemberi Izin</p>
                                                <p>Jabatan Pemberi Izin</p>
                                                <h4>Data Daerah Asal</h4>
                                                <p>Nama Penerima</p>
                                                <p>Nama Provinsi</p>
                                                <p>Kabupaten / Kota</p>
                                                <p>Kecamatan</p>
                                                <p>Kelurahan</p>
                                                <p>Klasifikasi Kepindahan</p>
                                                <p>Nomor kartu keluarga</p>
                                                <p>Nama Kepala Keluarga</p>
                                                <p>Alamat</p>
                                                <p>Kode Pos</p>
                                                <p>Telepon</p>
                                                <p>Nik</p>
                                                <h4>Data Kepindahan</h4>
                                                <p>Alasan Pindah</p>
                                                <p>Alamat Tujuan Pindah</p>
                                                <p>Nama Provinsi Tujuan</p>
                                                <p>Kabupaten / Kota Tujuan</p>
                                                <p>Kecamatan Tujuan</p>
                                                <p>Kelurahan</p>
                                                <p>Kode Pos Tujuan</p>
                                                <p>Telepon Tujuan</p>
                                                <p>Jenis Kepindahan</p>
                                                <p>Status KK Bagi Yang Tidak Pindah</p>
                                                <p>Status KK Bagi Yang Pindah</p>
                                                <p>SHDK</p>
                                                <p>Jenis Surat</p>
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
                                                    <option value="KEPALA DINAS KEPENDIDIKAN DAN PENCACATAN SIPIL KABUPATEN">KEPALA DINAS KEPENDIDIKAN DAN PENCACATAN SIPIL KABUPATEN</option>
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
                                                <p><br /></p>
                                                <input type="text" value={value.nama} />
                                                <input type="text" value={formFields.provinsi}
                                                    onChange={(e) => handleFieldChange('provinsi', e.target.value)} />
                                                <input type="text" value={formFields.kabupaten}
                                                    onChange={(e) => handleFieldChange('kabupaten', e.target.value)} />
                                                <input type="text" value={formFields.kecamatan}
                                                    onChange={(e) => handleFieldChange('kecamatan', e.target.value)} />
                                                <input type="text" value={formFields.kelurahan}
                                                    onChange={(e) => handleFieldChange('kelurahan', e.target.value)} />
                                                <input type="text" value={formFields.klasifikasi}
                                                    onChange={(e) => handleFieldChange('klasifikasi', e.target.value)} />
                                                <input type="text" value={formFields.nomor_kk}
                                                    onChange={(e) => handleFieldChange('nomor_kk', e.target.value)} />
                                                <input type="text" value={formFields.nama_kepalakk}
                                                    onChange={(e) => handleFieldChange('nama_kepalakk', e.target.value)} />
                                                <input type="text" value={value.alamat} />
                                                <input type="text" value={formFields.kodePos_asal}
                                                    onChange={(e) => handleFieldChange('kodePos_asal', e.target.value)} />
                                                <input type="text" value={formFields.telpon_asal}
                                                    onChange={(e) => handleFieldChange('telpon_asal', e.target.value)} />
                                                <input type="text" value={formFields.nik}
                                                    onChange={(e) => handleFieldChange('nik', e.target.value)} />
                                                <p><br /></p>
                                                <input type="text" value={formFields.alasan_pindah}
                                                    onChange={(e) => handleFieldChange('alasan_pindah', e.target.value)} />
                                                <input type="text" value={formFields.alamat_tujuan}
                                                    onChange={(e) => handleFieldChange('alamat_tujuan', e.target.value)} />
                                                <input type="text" value={formFields.provinsi_tujuan}
                                                    onChange={(e) => handleFieldChange('provinsi_tujuan', e.target.value)} />
                                                <input type="text" value={formFields.kabupaten_tujuan}
                                                    onChange={(e) => handleFieldChange('kabupaten_tujuan', e.target.value)} />
                                                <input type="text" value={formFields.kecamatan_tujuan}
                                                    onChange={(e) => handleFieldChange('kecamatan_tujuan', e.target.value)} />
                                                <input type="text" value={formFields.desa_tujuan}
                                                    onChange={(e) => handleFieldChange('desa_tujuan', e.target.value)} />
                                                <input type="text" value={formFields.kodePos_tujuan}
                                                    onChange={(e) => handleFieldChange('kodePos_tujuan', e.target.value)} />
                                                <input type="text" value={formFields.telpon_tujuan}
                                                    onChange={(e) => handleFieldChange('telpon_tujuan', e.target.value)} />
                                                <input type="text" value={formFields.jenis_kepindahan}
                                                    onChange={(e) => handleFieldChange('jenis_kepindahan', e.target.value)} />
                                                <input type="text" value={formFields.statustidak_pindah}
                                                    onChange={(e) => handleFieldChange('statustidak_pindah', e.target.value)} />
                                                <input type="text" value={formFields.statuskk_pindah}
                                                    onChange={(e) => handleFieldChange('statuskk_pindah', e.target.value)} />
                                                <input type="text" value={formFields.shdk}
                                                    onChange={(e) => handleFieldChange('shdk', e.target.value)} />
                                                <input type="text" value={formFields.kabupaten}
                                                    onChange={(e) => handleFieldChange('kabupaten', e.target.value)} />
                                                <input type="date" value={value.tanggal_surat} />
                                            </span>
                                        </div>
                                        <span className="d-flex buttonBuatSurat justify-content-center">
                                            <button type="submit" style={{ backgroundColor: '#BBA482' }}>Simpan</button>
                                            <Link href="/sekretaris/surat-keluar" style={{ backgroundColor: '#900000' }}>
                                                <button style={{ backgroundColor: '#900000' }}>Batal</button>
                                            </Link>
                                            <Link
                                                href={{
                                                    pathname: '/sekretaris/surat-keterangan-pindah',
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
                                                <p>Lampiran</p>
                                                <p>Tanggal Surat</p>
                                                <p>Isi Surat</p>
                                                <p>Penutup Surat</p>
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
                                            <Link href="/sekretaris/surat-keluar" style={{ backgroundColor: '#900000' }}>
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
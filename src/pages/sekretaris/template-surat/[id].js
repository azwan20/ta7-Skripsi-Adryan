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
        namaKades: '',
        jabatanKades: '',
        nip_penanggungJawab: '',
        jabatan_penerima: '',
        nip_penerima: '',
        nama_desa: '',
        nik: '',
        ttl: '',
        jenis_kelamin: '',
        status_perkawinan: '',
        agama: '',
        pekerjaan: '',
        isi_surat: '',
        penutup_surat: '',
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
                    });

                    // ... rest of your code ...
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

    const [namaKades, setNamaKades] = useState('');
    const [jabatan, setJabatan] = useState('');
    const [nik, setNik] = useState('');
    const [ttl, setTtl] = useState('');
    const [jenis_kelamin, setJenis_kelamin] = useState('');
    const [status_perkawinan, setStatus_perkawinan] = useState('');
    const [agama, setAgama] = useState('');
    const [pekerjaan, setPekerjaan] = useState('');
    const [isi_surat, setIsi_surat] = useState('');
    const [penutup_surat, setPenutup_surat] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedData = {
            // Existing fields
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

    // const handleTemplate = () => {
    //     router.push("")
    // }

    const [isVisible, setIsVisible] = useState(true);
    const [visibleSku, setVisibleSku] = useState(false);
    const [visibleSt, setVisibleSt] = useState(false);

    const handleSKU = () => {
        setIsVisible(false);
        setVisibleSku(true);
        setVisibleSt(false);
    }

    const handleST = () => {
        setIsVisible(false);
        setVisibleSku(false);
        setVisibleSt(true);
    }

    const handleBatal = () => {
        setIsVisible(true);
        setVisibleSku(false);
        setVisibleSt(false);
    }



    return (
        <>
            <div className="d-flex buatSurat">
                <SekretarisAside isHomeActive={isHomeActive} isMasukActive={isMasukActive} isKeluarActive={isKeluarActive} handleButtonClick={handleButtonClick} />
                <article>
                    <div>
                        {isVisible && (
                            <div className="buttons">
                                <h1>Silakan Pilih Jenis Surat</h1>
                                <button onClick={handleSKU}>Surat Keterangan Usaha</button>
                                <button onClick={handleST}>Surat Tugas</button>
                                <button>Surat Keterangan Tidak Mampu</button>
                                <button>Surat Keterangan Domisili</button>
                                <button>Surat keterangan penghasilan orang tua</button>
                            </div>
                        )}
                    </div>
                    {visibleSku && (
                        <div>
                            {dataSuratMasuk.map((value) => (
                                <form onSubmit={handleSubmit} method="post" action="">
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
                                        <input type="text" value={formFields.namaKades}
                                            onChange={(e) => handleFieldChange('namaKades', e.target.value)} />
                                        <input type="text" value={formFields.jabatanKades}
                                            onChange={(e) => handleFieldChange('jabatanKades', e.target.value)} />
                                        <input type="text" value={value.nama} />
                                        <input type="number" value={formFields.nik}
                                            onChange={(e) => handleFieldChange('nik', e.target.value)} />
                                        <input type="text" value={formFields.ttl}
                                            onChange={(e) => handleFieldChange('ttl', e.target.value)} />
                                        <input type="text" value={formFields.jenis_kelamin}
                                            onChange={(e) => handleFieldChange('jenis_kelamin', e.target.value)} />
                                        <input type="text" value={formFields.status_perkawinan}
                                            onChange={(e) => handleFieldChange('status_perkawinan', e.target.value)} />
                                        <input type="text" value={formFields.agama}
                                            onChange={(e) => handleFieldChange('agama', e.target.value)} />
                                        <input type="text" value={formFields.pekerjaan}
                                            onChange={(e) => handleFieldChange('pekerjaan', e.target.value)} />
                                        <input type="text" value={value.alamat} />
                                        <textarea value={formFields.isi_surat}
                                            onChange={(e) => handleFieldChange('isi_surat', e.target.value)} />
                                        <textarea value={formFields.penutup_surat}
                                            onChange={(e) => handleFieldChange('penutup_surat', e.target.value)} />
                                        <input type="date" value={value.tanggal_surat} />
                                    </span>
                                    <span className="d-flex buttonBuatSurat justify-content-between">
                                        <button type="submit" style={{ backgroundColor: '#BBA482' }}>Simpan</button>
                                        <button onClick={handleBatal} style={{ backgroundColor: '#900000' }}>Batal</button>
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
                                {dataSuratMasuk.map((value) => (
                                    <form onSubmit={handleSubmit} method="post" action="">
                                        <span>
                                            <p>No Surat</p>
                                            <p>Nama Penanggung Jawab</p>
                                            <p>Jabatan Penanggung Jawab</p>
                                            <p>Nama Penerima</p>
                                            <p>Nip Penanggung Jawab</p>
                                            <p>Jabatan Penerima</p>
                                            <p>Nip Penerima</p>
                                            <p>Nama Desa</p>
                                            <p>Isi surat</p>
                                            <p>Penutup Surat</p>
                                            <p>Tanggal Surat</p>
                                        </span>
                                        <span>
                                            <input type="number" value={value.no_surat} />
                                            <input type="text" value={formFields.namaKades}
                                                onChange={(e) => handleFieldChange('namaKades', e.target.value)} />
                                            <input type="text" value={formFields.jabatanKades}
                                                onChange={(e) => handleFieldChange('jabatanKades', e.target.value)} />
                                            <input type="text" value={value.nama} />
                                            <input type="number" value={formFields.nip_penanggungJawab}
                                                onChange={(e) => handleFieldChange('nip_penanggungJawab', e.target.value)} />
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
                                        <span className="d-flex buttonBuatSurat justify-content-between">
                                            <button type="submit" style={{ backgroundColor: '#BBA482' }}>Simpan</button>
                                            <button onClick={handleBatal} style={{ backgroundColor: '#900000' }}>Batal</button>
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
                </article>
            </div >
        </>
    )
}
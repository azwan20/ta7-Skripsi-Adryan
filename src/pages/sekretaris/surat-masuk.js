import Link from "next/link";
import SekretarisAside from "./sekretarisAside";
import { useEffect, useState } from "react";
import { db } from "../../../public/firebaseConfig";
import { getDocs, collection, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import Navbar from "./navbar";
import { useRouter } from "next/router";

async function fetchDataFromFirestore() {
    const querySnapshot = await getDocs(collection(db, "surat"));

    const data = [];

    querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
    });
    return data;
}

async function updateDataInFirebase(id, updatedData) {
    try {
        const suratRef = doc(db, "surat", id);
        await updateDoc(suratRef, updatedData);
        console.log("Document successfully updated!");
        return true;
    } catch (error) {
        console.error("Error updating document: ", error);
        return false;
    }
}

async function deleteDataFromFirebase(id) {
    try {
        const suratRef = doc(db, "surat", id);
        await deleteDoc(suratRef);
        console.log("Document successfully deleted!");
        return true;
    } catch (error) {
        console.error("Error deleting document: ", error);
        return false;
    }
}


export default function SuratMasuk() {
    const [dataSurat, SetDataSurat] = useState([]);
    const [dataSuratMasuk, SetDataSuratMasuk] = useState([]);
    const [dataSuratKeluar, SetDataSuratKeluar] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [isEditMode, setEditMode] = useState(false);
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [editPopupRow, setEditPopupRow] = useState(null);
    const router = useRouter();

    const [isHomeActive, setIsHomeActive] = useState(false);
    const [isMasukActive, setIsMasukActive] = useState(true);
    const [isKeluarActive, setIsKeluarActive] = useState(false);

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

    // useEffect(() => {
    //     // Fungsi untuk memeriksa apakah pengguna sudah login
    //     const checkLoginStatus = async () => {
    //         // Lakukan pengambilan data login atau sesuaikan dengan metode autentikasi yang Anda gunakan
    //         // Misalnya, Anda bisa menggunakan cookies atau token untuk menentukan status login

    //         // Contoh: Mendapatkan data login dari localStorage
    //         const isLoggedIn = localStorage.getItem("isLoggedIn");

    //         // Jika pengguna tidak login, redirect ke halaman login
    //         if (!isLoggedIn) {
    //             router.push("/sekretaris"); // Sesuaikan dengan path halaman login Anda
    //         }
    //     };

    //     checkLoginStatus();
    // }, [router]); // useEffect hanya dijalankan ketika nilai router berubah

    const handleEditClick = () => {
        setEditMode(true);
    };

    const handleCancelClick = () => {
        setEditMode(false);
        setSelectedRows([]);
    };

    const handleSimpanClick = () => {
        // Lakukan aksi simpan data di sini

        // Set state untuk menampilkan pop-up
        setPopupVisible(true);

        // Reset form atau lakukan aksi lain jika diperlukan
    };

    const handlePopupClose = () => {
        // Set state untuk menyembunyikan pop-up
        setPopupVisible(false);

        // Redirect to another page or handle success after closing the pop-up
        // router.push('/success');
        // resetForm();
        location.reload();
    };

    const [editedData, setEditedData] = useState({});

    const handleCheckboxChange = (id) => {
        const updatedSelectedRows = [...selectedRows];
        const index = updatedSelectedRows.indexOf(id);

        if (index === -1) {
            updatedSelectedRows.push(id);
        } else {
            updatedSelectedRows.splice(index, 1);
        }

        setSelectedRows(updatedSelectedRows);

        // Update the state for each selected row with default values
        const updatedDataForSelectedRows = updatedSelectedRows.reduce((acc, rowId) => {
            acc[rowId] = { ...dataSurat.find((row) => row.id === rowId) }; // Use existing data if available
            return acc;
        }, {});

        setEditedDataForSelectedRows(updatedDataForSelectedRows);

        // Remove the line below to allow editing multiple rows
        setEditPopupRow(updatedSelectedRows.length === 1 ? updatedSelectedRows[0] : null);
    };

    const [editedDataForSelectedRows, setEditedDataForSelectedRows] = useState({});

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


    const [idSementara, setIdSementara] = useState('');
    const [editedFile, setEditedFile] = useState('');
    const [editedTanggal_masuk, setEditTanggal_masuk] = useState('');
    const [editedAlamat, setEditedAlamat] = useState('');
    const [editedNama, setEditNama] = useState('');
    const [editedNo_surat, setEditNo_surat] = useState('');
    const [editedJenia, setEditJenis] = useState('');
    const [editedTanggal_surat, setEditTanggal_surat] = useState('');
    const [editedSifat_surat, setEditSifat_surat] = useState('');
    const [editedPerihal, setEditPerihal] = useState('');
    const [editedNo_wa, setEditNo_wa] = useState('');


    // fungsi edit, digunakan untuk mengedit data di Firebase
    const handleEdit = async (id, updatedData) => {
        const edited = await updateDataInFirebase(id, updatedData);
        if (edited) {
            // alert("Data edited in Firebase DB");
            location.reload();
        }
    };

    // fungsi hapus, digunakan untuk menghapus data di Firebase
    const handleDelete = async () => {
        for (const id of selectedRows) {
            const deleted = await deleteDataFromFirebase(id);
            if (deleted) {
                // alert("Data deleted from Firebase DB");
                location.reload();
            }
        }
    };

    const popups = async (id, file, tanggal_masuk, alamat, no_surat, jenis_surat, tanggal_surat, sifat_surat, perihal) => {
        setIdSementara(id);
        setEditedFile(file);
        setEditTanggal_masuk(tanggal_masuk);
        setEditedAlamat(alamat);
        setEditNo_surat(no_surat);
        setEditJenis(jenis_surat);
        setEditTanggal_surat(tanggal_surat);
        setEditSifat_surat(sifat_surat);
        setEditPerihal(perihal);
        // setPopupOpen(!isPopupOpen);
    };

    const getEditedFieldValue = (rowId, fieldName) => {
        return editedDataForSelectedRows[rowId] ? editedDataForSelectedRows[rowId][fieldName] : '';
    };

    // Helper function to handle changes in field values
    const handleFieldChange = (rowId, fieldName, value) => {
        setEditedDataForSelectedRows((prevData) => ({
            ...prevData,
            [rowId]: {
                ...prevData[rowId],
                [fieldName]: value,
            },
        }));
    };

    return (
        <>
            <div className="surat-masuk d-flex">
            <SekretarisAside isHomeActive={isHomeActive} isMasukActive={isMasukActive} isKeluarActive={isKeluarActive} handleButtonClick={handleButtonClick} />
                <article style={{ maxHeight: '100vh', overflowY: 'auto' }}>
                    <div className="d-flex justify-content-between">
                        <div className="d-flex">
                            {isEditMode ? (
                                <>
                                    <button onClick={handleCancelClick}>
                                        <svg style={{ marginRight: '10px' }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path d="M19 3H5C4.46957 3 3.96086 3.21071 3.58579 3.58579C3.21071 3.96086 3 4.46957 3 5V19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H19C19.5304 21 20.0391 20.7893 20.4142 20.4142C20.7893 20.0391 21 19.5304 21 19V5C21 4.46957 20.7893 3.96086 20.4142 3.58579C20.0391 3.21071 19.5304 3 19 3ZM15.6 17L12 13.4L8.4 17L7 15.6L10.6 12L7 8.4L8.4 7L12 10.6L15.6 7L17 8.4L13.4 12L17 15.6L15.6 17Z" fill="white" />
                                        </svg>
                                        Cancel
                                    </button>
                                </>
                            ) : (
                                <button onClick={handleEditClick} >
                                    <svg style={{ marginRight: '10px' }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M18.988 2.01196L21.988 5.01196L19.701 7.29996L16.701 4.29996L18.988 2.01196ZM8 16H11L18.287 8.71296L15.287 5.71296L8 13V16Z" fill="white" />
                                        <path d="M19 19H8.158C8.132 19 8.105 19.01 8.079 19.01C8.046 19.01 8.013 19.001 7.979 19H5V5H11.847L13.847 3H5C3.897 3 3 3.896 3 5V19C3 20.104 3.897 21 5 21H19C19.5304 21 20.0391 20.7893 20.4142 20.4142C20.7893 20.0391 21 19.5304 21 19V10.332L19 12.332V19Z" fill="white" />
                                    </svg>
                                    Edit
                                </button>
                            )}
                        </div>
                        <div className="button-arsip">
                            <Link href="/sekretaris/tambah-arsip">
                                <button>
                                    <svg style={{ marginRight: '1rem' }} xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                                        <rect y="6.29016" width="15" height="2.41935" rx="1.20968" fill="white" />
                                        <rect x="6.29016" y="15" width="15" height="2.41935" rx="1.20968" transform="rotate(-90 6.29016 15)" fill="white" />
                                    </svg>
                                    <p style={{ margin: '0' }}>Tambah Arsip</p>
                                </button>
                            </Link>
                        </div>
                    </div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col" style={{ display: 'none' }}>ID</th>
                                <th scope="col"></th>
                                <th scope="col">No</th>
                                <th scope="col">File Arsip</th>
                                <th scope="col">Tanggal Masuk</th>
                                <th scope="col">Nama Pengirim</th>
                                <th scope="col">Alamat Pengirim</th>
                                <th scope="col">No.Surat</th>
                                <th scope="col">Jenis Surat</th>
                                <th scope="col">Tanggal Surat</th>
                                <th scope="col">Sifat Surat</th>
                                <th scope="col">Perihal Lampiran</th>
                                <th scope="col">No. WhatsApp</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataSuratMasuk.map((value, index) => (
                                <tr key={value.id}>
                                    <td style={{ display: 'none' }}>{value.id}</td>
                                    <td>
                                        {isEditMode && (
                                            <input
                                                type="checkbox"
                                                checked={selectedRows.includes(value.id)}
                                                onChange={() => handleCheckboxChange(value.id)}
                                                onClick={() => popups(value.id, value.file, value.tanggal_masuk,
                                                    value.alamat, value.no_surat, value.jenis_surat, value.tanggal_surat, value.sifat_surat, value.prihal)}
                                            />
                                        )}
                                    </td>
                                    <td>{index + 1}</td>
                                    <td>{value.file}</td>
                                    <td>{value.tanggal_masuk}</td>
                                    <td>{value.nama}</td>
                                    <td>{value.alamat}</td>
                                    <td>{value.no_surat}</td>
                                    <td><b>{value.jenis_surat}</b></td>
                                    <td>{value.tanggal_surat}</td>
                                    <td>{value.sifat_surat}</td>
                                    <td>{value.prihal}</td>
                                    <td>{value.no_wa}</td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </article>
                <Navbar isHomeActive={isHomeActive} isMasukActive={isMasukActive} isKeluarActive={isKeluarActive} handleButtonClick={handleButtonClick} />
            </div>
            {isPopupVisible && (
                <div className="popup newPop">
                    <div className="popup-content">
                        <h2>Update Data Berhasil</h2>
                        <button onClick={handlePopupClose}>Tutup</button>
                    </div>
                </div>
            )}

            {/* Edit Popup */}
            {isEditMode && editPopupRow && (
                <div className="popup newPop">
                    <div className="popup-content" style={{ maxHeight: '90vh', overflowY: 'auto' }}>
                        {/* Render the edit form with data from the selected row */}
                        <h2>Edit ID: {getEditedFieldValue(editPopupRow, 'nama')}</h2>
                        <div>
                            <span>
                                <p>File Arsip</p>
                                <input type="text" name="file" value={getEditedFieldValue(editPopupRow, 'file')} readOnly />
                            </span>
                            <span>
                                <p>Tanggal Ajukan</p>
                                <input type="date"
                                    id="editedTanggal_masuk"
                                    name="editedTanggal_masuk"
                                    value={getEditedFieldValue(editPopupRow, 'tanggal_masuk')}
                                    onChange={(e) => handleFieldChange(editPopupRow, 'tanggal_masuk', e.target.value)}
                                />
                            </span>
                            <span>
                                <p>Alamat Pengiriman</p>
                                <input type="text"
                                    id="editedAlamat"
                                    name="editedAlamat"
                                    value={getEditedFieldValue(editPopupRow, 'alamat')}
                                    onChange={(e) => handleFieldChange(editPopupRow, 'alamat', e.target.value)}
                                />
                            </span>
                            <span>
                                <p>No Surat</p>
                                <input type="text"
                                    id="editedAlamat"
                                    name="editedAlamat"
                                    value={getEditedFieldValue(editPopupRow, 'no_surat')}
                                    onChange={(e) => handleFieldChange(editPopupRow, 'no_surat', e.target.value)}
                                />
                            </span>
                            <span>
                                <p>Jenis Surat</p>
                                <input type="text"
                                    id="editedJenis_surat"
                                    name="editedJenis_surat"
                                    value={getEditedFieldValue(editPopupRow, 'jenis_surat')}
                                    onChange={(e) => handleFieldChange(editPopupRow, 'jenis_surat', e.target.value)}
                                />
                            </span>
                            <span>
                                <p>Tanggal Surat</p>
                                <input type="date"
                                    id="editedTanggal_surat"
                                    name="editedTanggal_surat"
                                    value={getEditedFieldValue(editPopupRow, 'tanggal_surat')}
                                    onChange={(e) => handleFieldChange(editPopupRow, 'tanggal_surat', e.target.value)}
                                />
                            </span>
                            <span>
                                <p>Sifat Surat</p>
                                <input type="text"
                                    id="editedSifat_surat"
                                    name="editedSifat_surat"
                                    value={getEditedFieldValue(editPopupRow, 'sifat_surat')}
                                    onChange={(e) => handleFieldChange(editPopupRow, 'sifat_surat', e.target.value)}
                                />
                            </span>
                            <span>
                                <p>Perihal Lampiran</p>
                                <input type="text"
                                    id="editedPerihal"
                                    name="editedPerihal"
                                    value={getEditedFieldValue(editPopupRow, 'prihal')}
                                    onChange={(e) => handleFieldChange(editPopupRow, 'perihal', e.target.value)}
                                />
                            </span>
                            <span>
                                <p>No. WhatsApp</p>
                                <input type="text"
                                    id="editedNo_wa"
                                    name="editedNo_wa"
                                    value={getEditedFieldValue(editPopupRow, 'no_wa')}
                                    onChange={(e) => handleFieldChange(editPopupRow, 'no_wa', e.target.value)}
                                />
                            </span>
                        </div>
                        <span className="d-flex button-edit">
                            <button onClick={() => handleEdit(idSementara, editedDataForSelectedRows[editPopupRow])} style={{ backgroundColor: 'green' }}>Update</button>
                            <button onClick={handleDelete}>Delete</button>
                            <button style={{ backgroundColor: '#27323A' }} onClick={handlePopupClose}>Tutup</button>
                        </span>
                    </div>
                </div>
            )}
        </>
    );
}

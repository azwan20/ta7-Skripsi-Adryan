import Link from "next/link";
import SekretarisAside from "./sekretarisAside";
import { useEffect, useState } from "react";
import { db } from "../../../public/firebaseConfig";
import { getDocs, collection, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";

async function fetchDataFromFirestore() {
    const querySnapshot = await getDocs(collection(db, "surat"));

    const data = [];

    querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
    });
    return data;
}


export default function SuratMasuk() {
    const [dataSurat, SetDataSurat] = useState([]);
    const [dataSuratMasuk, SetDataSuratMasuk] = useState([]);
    const [dataSuratKeluar, SetDataSuratKeluar] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [isEditMode, setEditMode] = useState(false);
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [editPopupRow, setEditPopupRow] = useState(null);

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

    const handleCheckboxChange = (id) => {
        const updatedSelectedRows = [...selectedRows];
        const index = updatedSelectedRows.indexOf(id);

        if (index === -1) {
            updatedSelectedRows.push(id);
        } else {
            updatedSelectedRows.splice(index, 1);
        }

        setSelectedRows(updatedSelectedRows);
        setEditPopupRow(id); // Update the row to be edited
    };

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
            <div className="surat-masuk d-flex">
                <SekretarisAside />
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
                                <button onClick={handleEditClick}>
                                    <svg style={{ marginRight: '10px' }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M18.988 2.01196L21.988 5.01196L19.701 7.29996L16.701 4.29996L18.988 2.01196ZM8 16H11L18.287 8.71296L15.287 5.71296L8 13V16Z" fill="white" />
                                        <path d="M19 19H8.158C8.132 19 8.105 19.01 8.079 19.01C8.046 19.01 8.013 19.001 7.979 19H5V5H11.847L13.847 3H5C3.897 3 3 3.896 3 5V19C3 20.104 3.897 21 5 21H19C19.5304 21 20.0391 20.7893 20.4142 20.4142C20.7893 20.0391 21 19.5304 21 19V10.332L19 12.332V19Z" fill="white" />
                                    </svg>
                                    Edit
                                </button>
                            )}
                        </div>

                        <Link href="/sekretaris/tambah-arsip">
                            <button>
                                <svg style={{ marginRight: '1rem' }} xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                                    <rect y="6.29016" width="15" height="2.41935" rx="1.20968" fill="white" />
                                    <rect x="6.29016" y="15" width="15" height="2.41935" rx="1.20968" transform="rotate(-90 6.29016 15)" fill="white" />
                                </svg>
                                Tambah Arsip
                            </button>
                        </Link>
                    </div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col" style={{ display: 'none' }}>ID</th>
                                <th scope="col"></th>
                                <th scope="col">No</th>
                                <th scope="col">File Arsip</th>
                                <th scope="col">Tanggal Masuk</th>
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
                            {dataSurat.map((value, index) => (
                            <tr >
                                <td style={{ display: 'none' }}></td>
                                <td>
                                    {isEditMode && (
                                        <input
                                            type="checkbox"
                                            checked={selectedRows.includes(1)} // Use includes to check if the ID is in the selectedRows array
                                            onChange={() => handleCheckboxChange(1)}
                                        />
                                    )}
                                </td>
                                <td>{index +1}</td>
                                <td>{value.file}</td>
                                <td>{value.tanggal_masuk}</td>
                                <td>{value.alamat}</td>
                                <td>{value.no_surat}</td>
                                <td>{value.jenis_surat}</td>
                                <td>{value.tanggal_surat}</td>
                                <td>{value.sifat_surat}</td>
                                <td>{value.prihal}</td>
                                <td></td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </article>
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
                    <div className="popup-content">
                        {/* Render the edit form with data from the selected row */}
                        <h2>Edit ID: {editPopupRow}</h2>
                        <div>
                            <span>
                                <p>File Arsip</p>
                                <input type="file" name="file" />
                            </span>
                            <span>
                                <p>No. WhatsApp</p>
                                <input type="text" placeholder="+62" />
                            </span>
                            <span>
                                <p>Jenis Surat</p>
                                <input type="text" />
                            </span>
                            <span>
                                <p>Tanggal Ajukan</p>
                                <input type="date" />
                            </span>
                            <span>
                                <p>Tanggal Surat</p>
                                <input type="date" />
                            </span>
                            <span>
                                <p>Sifat Surat</p>
                                <input type="text" />
                            </span>
                            <span>
                                <p>Perihal Lampiran</p>
                                <input type="text" />
                            </span>
                        </div>
                        <span className="d-flex">
                            <button style={{ backgroundColor: 'green' }} >Update</button>
                            <button>Delete</button>
                            <button style={{ backgroundColor: '27323A' }} onClick={handlePopupClose}>Tutup</button>
                        </span>
                    </div>
                </div>
            )}
        </>
    );
}

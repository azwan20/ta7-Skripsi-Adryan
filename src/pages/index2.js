import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";

import { db } from "../../public/firebaseConfig";
import { getDocs, collection, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

async function addDataToFirebase(file, alamat, no_surat, jenis_surat, tanggal_masuk, tanggal_terima, tanggal_surat, tanggal_keluar, sifat_surat, prihal) {
  try {
    const docRefSurat = await addDoc(collection(db, "surat"), {
      file: file,
      alamat: alamat,
      no_surat: no_surat,
      jenis_surat: jenis_surat,
      tanggal_masuk: tanggal_masuk,
      tanggal_terima: tanggal_terima,
      tanggal_surat: tanggal_surat,
      tanggal_keluar: tanggal_keluar,
      sifat_surat: sifat_surat,
      prihal: prihal,
    })
    console.log("Document input document ID : ", docRefSurat.id);
    return true;

  } catch (error) {
    console.error("error input document", error);
    return false;
  }
}

async function fetchDataFromFirestore() {
  const querySnapshot = await getDocs(collection(db, "surat"));

  const data = [];

  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });
  return data;
}
async function fetchDataLoginFromFirestore() {
  const querySnapshot = await getDocs(collection(db, "login"));

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

export default function Home() {
  const [dataSurat, SetDataSurat] = useState([]);
  const [dataSuratMasuk, SetDataSuratMasuk] = useState([]);
  const [dataSuratKeluar, SetDataSuratKeluar] = useState([]);

  const [dataLogin, SetDataLogin] = useState([]);
  // const [jenis, Setjenis] = useState("");

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

  useEffect(() => {
    async function fetchData() {
      const data = await fetchDataLoginFromFirestore();
      SetDataLogin(data);
    }
    fetchData();
  }, []);

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Fungsi ini akan dijalankan setiap kali komponen di-mount
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Setiap detik, perbarui waktu

    // Fungsi ini akan dijalankan ketika komponen di-unmount
    return () => {
      clearInterval(intervalId);
    };
  }, []); // Menggunakan array kosong agar useEffect hanya dijalankan sekali saat komponen di-mount


  // fungsi input, fungsi ini di pake di setiap halaman yg perlu input ke firebase
  const handleSubmit = async (element) => {
    element.preventDefault();
    const added = await addDataToFirebase(
      "1file",
      "1alamat",
      "1no_surat",
      "surat keluar",
      currentTime.toLocaleString(),
      currentTime.toLocaleString(),
      currentTime.toLocaleString(),
      currentTime.toLocaleString(),
      "1sifat_surat",
      "1prihal",
    );
    if (added) {
      alert("Data added to firebase DB")
    }
  }


  const [idSementara, setIdSementara] = useState('');
  const [editedFile, setEditedFile] = useState('');
  const [editedAlamat, setEditedAlamat] = useState('');

  // fungsi edit, digunakan untuk mengedit data di Firebase
  const handleEdit = async (id, updatedData) => {
    const edited = await updateDataInFirebase(id, updatedData);
    if (edited) {
      alert("Data edited in Firebase DB");
      setPopupOpen(false);
    }
  };

  // fungsi hapus, digunakan untuk menghapus data di Firebase
  const handleDelete = async (id) => {
    const deleted = await deleteDataFromFirebase(id);
    if (deleted) {
      alert("Data deleted from Firebase DB");
    }
  };

  const popups = async (id, file, alamat) => {
    setIdSementara(id);
    setEditedFile(file);
    setEditedAlamat(alamat);
    setPopupOpen(!isPopupOpen);
  };

  const [isPopupOpen, setPopupOpen] = useState(false);

  const handleTogglePopup = () => {
    setPopupOpen(!isPopupOpen);
  };


  const [loginInput, setLoginInput] = useState('');
  const handleLogin = () => {
    // Memeriksa apakah nilai input sama dengan salah satu email di dataLogin
    const isLoginSuccessful = dataLogin.some((user) => user.email === loginInput);

    if (isLoginSuccessful) {
      alert("Login berhasil");
    } else {
      alert("Login gagal");
    }
  };

  return (
    <>
      <div>
        {/* <button onClick={handleTogglePopup}>Buka Popup</button> */}

        {isPopupOpen && (
          <div className="popup">
            <div className="popup-content">
              <p><input
                type="text"
                id="editedFile"
                name="editedFile"
                value={editedFile}
                onChange={(e) => setEditedFile(e.target.value)}
                placeholder="Masukkan harga"
              /></p>
              <p><input
                type="text"
                id="editedAlamat"
                name="editedAlamat"
                value={editedAlamat}
                onChange={(e) => setEditedAlamat(e.target.value)}
                placeholder="Masukkan Kode"
              /></p>
              <button onClick={handleTogglePopup}>Tutup Popup</button>
              <button onClick={() => handleEdit(idSementara, { file: editedFile, alamat: editedAlamat })}>Edit</button>
            </div>
          </div>
        )}

        {/* Gaya CSS untuk popup */}
        <style jsx>{`
        .popup {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .popup-content {
          background: white;
          padding: 20px;
          border-radius: 8px;
          text-align: center;
        }
      `}</style>
      </div>

      <h1>Adrian</h1>
      <h2>submit</h2>
      <form onSubmit={handleSubmit}>
        <button type="submit">
          Submit
        </button>
      </form>

      <p>-------------------------------</p>
      <h1>Read Data</h1>
      <h2>Surat surat</h2>
      <div>
        {dataSurat.map((surats) => (
          <div key={surats.id}>
            <p>-------------------------------</p>
            <p>{surats.file}</p>
            <p>{surats.alamat}</p>
            <p>{surats.no_surat}</p>
            <p>{surats.jenis_surat}</p>
            <p>{surats.tanggal_masuk}</p>
            <p>{surats.tanggal_terima}</p>
            <p>{surats.tanggal_surat}</p>
            <p>{surats.sifat_surat}</p>
            <p>{surats.prihal}</p>
            <button onClick={() => popups(surats.id, surats.file, surats.alamat)}>
              Edit Data
            </button>
            <button onClick={() => handleDelete(surats.id)}>
              Delete
            </button>
          </div>
        )
        )}
      </div>

      <p>-------------------------------</p>
      <h2>Surat masuk</h2>
      <div>
        {dataSuratMasuk.map((surats) => (
          <div key={surats.id}>
            <p>-------------------------------</p>
            <p>{surats.file}</p>
            <p>{surats.alamat}</p>
            <p>{surats.no_surat}</p>
            <p>{surats.jenis_surat}</p>
            <p>{surats.tanggal_masuk}</p>
            <p>{surats.tanggal_terima}</p>
            <p>{surats.tanggal_surat}</p>
            <p>{surats.sifat_surat}</p>
            <p>{surats.prihal}</p>
            <button onClick={() => popups(surats.id, surats.file, surats.alamat)}>
              Edit Data
            </button>
            <button onClick={() => handleDelete(surats.id)}>
              Delete
            </button>
          </div>
        )
        )}
      </div>
      <p>-------------------------------</p>
      <h2>Surat keluar</h2>
      <div>
        {dataSuratKeluar.map((surats) => (
          <div key={surats.id}>
            <p>-------------------------------</p>
            <p>{surats.file}</p>
            <p>{surats.alamat}</p>
            <p>{surats.no_surat}</p>
            <p>{surats.jenis_surat}</p>
            <p>{surats.tanggal_masuk}</p>
            <p>{surats.tanggal_terima}</p>
            <p>{surats.tanggal_surat}</p>
            <p>{surats.sifat_surat}</p>
            <p>{surats.prihal}</p>
            <button onClick={() => popups(surats.id, surats.file, surats.alamat)}>
              Edit Data
            </button>
            <button onClick={() => handleDelete(surats.id)}>
              Delete
            </button>
          </div>
        )
        )}
      </div>

      <p>-------------------------------</p>
      <h2>Data login</h2>
      <div>
        {dataLogin.map((isLogin) => (
          <div key={isLogin.id}>
            <p>-------------------------------</p>
            <p>email sekarang: {isLogin.email}</p>
          </div>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={loginInput}
          onChange={(e) => setLoginInput(e.target.value)}
          placeholder="Masukkan email untuk login"
        />
        <button onClick={handleLogin}>
          Login
        </button>
      </div>
    </>
  );
}

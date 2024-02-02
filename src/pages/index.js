import { useEffect, useState } from "react";
import Aside from "./aside";

import { db } from "../../public/firebaseConfig";
import { getDocs, collection, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";

async function addDataToFirebase(file, nama, alamat, tanggal_masuk, tanggal_surat, jenis_surat, sifat_surat, prihal, no_wa) {
  try {
    const docRefSurat = await addDoc(collection(db, "surat"), {
      file: file,
      nama: nama,
      alamat: alamat,
      tanggal_masuk: tanggal_masuk,
      tanggal_surat: tanggal_surat,
      jenis_surat: jenis_surat,
      sifat_surat: sifat_surat,
      prihal: prihal,
      no_wa: no_wa,
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

export default function Home() {
  const [isPopupVisible, setPopupVisible] = useState(false);

  const handleSimpanClick = () => {
    // Lakukan aksi simpan data di sini

    // Set state untuk menampilkan pop-up
    setPopupVisible(true);

    // Reset form atau lakukan aksi lain jika diperlukan
    // resetForm();
  };

  const handlePopupClose = () => {
    // Set state untuk menyembunyikan pop-up
    setPopupVisible(false);
  };

  const [dataSurat, SetDataSurat] = useState([]);
  const [dataSuratMasuk, SetDataSuratMasuk] = useState([]);
  const [dataSuratKeluar, SetDataSuratKeluar] = useState([]);
  const [jenisSurat, setJenisSurat] = useState('');


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

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []); 

  const [file, setFile] = useState('');
  const [alamat, setAlamat] = useState('');
  const [nama, setNama] = useState('');
  const [no_surat, setNo_surat] = useState('');
  const [jenis_surat, setJenis] = useState('');
  const [tanggal_masuk, setTanggal_masuk] = useState('');
  const [tanggal_surat, setTanggal_surat] = useState('');
  const [sifat_surat, setSifat] = useState('');
  const [prihal, setPerihal] = useState('');
  const [no_wa, setNo_wa] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const added = await addDataToFirebase(file, nama, alamat, tanggal_masuk, tanggal_surat, jenis_surat, sifat_surat, prihal, no_wa);

    if (added) {
      setFile("");
      setNama("");
      setAlamat("");
      setTanggal_masuk("");
      setTanggal_surat("");
      setJenis("");
      setSifat("");
      setPerihal("");
      setNo_wa("");

      setPopupVisible(true);
    } else {
      alert("Data tidak berhasil di upload");
    }
  }

  return (
    <>
      <div className="tambah-arsip d-flex">
        <Aside />
        <article className="d-flex flex-column align-items-center justify-content-between" style={{ maxHeight: '100vh', overflowY: 'auto' }}>
          <h1 className="p-4">Silakan Input Request Surat Anda</h1>
          <form onSubmit={handleSubmit} method="post" action="">
            <section>
              <span>
                <p style={{ width: '20%' }}>File Arsip</p>
                <div className="d-flex flex-column align-items-end" style={{ width: '100%' }}>
                  <input style={{ width: '85%', marginBottom: '0' }} type="text" name="file" id="nama" value={file} onChange={(e) => setFile(e.target.value)} />
                  <p style={{ fontSize: '15px' }}>input link google drive (atau penyimpanan cloud lainnya), <br /> pastikan sudah bisa di akses untuk umum.</p>
                </div>
              </span>
              <span>
                <p>Nama Pengirim</p>
                <input type="text" name="nama" id="nama" value={nama} onChange={(e) => setNama(e.target.value)} required />
              </span>
              <span>
                <p>Alamat Pengirim</p>
                <input type="text" name="alamat" required id="nama" value={alamat} onChange={(e) => setAlamat(e.target.value)} />
              </span>
              <span>
                <p>Tanggal Ajukan</p>
                <input type="date" name="tanggal_masuk" id="nama" value={tanggal_masuk} onChange={(e) => setTanggal_masuk(e.target.value)} />
              </span>
              <span>
                <p>Tanggal Surat</p>
                <input type="date" name="tanggal_surat" id="nama" value={tanggal_surat} onChange={(e) => setTanggal_surat(e.target.value)} />
              </span>
              <span>
                <p>Jenis Surat</p>
                <select
                  value={jenis_surat}
                  onChange={(e) => setJenis(e.target.value)}
                  required  // Tambahkan atribut required di sini
                >
                  <option value="" disabled>Pilih Jenis Surat</option>
                  <option value="surat masuk">Surat Masuk</option>
                  <option value="surat keluar">Surat Keluar</option>
                </select>
              </span>
              <span>
                <p>Sifat Surat</p>
                <input type="text" name="sifat" id="nama" value={sifat_surat} onChange={(e) => setSifat(e.target.value)} />
              </span>
              <span>
                <p>Perihal Lampiran</p>
                <input type="text" name="perihal" id="nama" value={prihal} onChange={(e) => setPerihal(e.target.value)} />
              </span>
              <span>
                <p>No. WhatsApp</p>
                <input type="text" name="no_wa" required id="nama" value={no_wa} onChange={(e) => setNo_wa(e.target.value)} />
              </span>
            </section>
            <section className="d-flex justify-content-between">
              <button type="submit" style={{ backgroundColor: '#27323A' }}>Simpan</button>
              <button style={{ backgroundColor: '#900000' }}>Batal</button>
            </section>
          </form>
        </article>
      </div>
      {/* Pop-up component */}
      {isPopupVisible && (
        <div className="popup" style={{backgroundColor: '#009933'}}>
          <div className="popup-content">
            <h2>Data Anda Berhasil Terkirim</h2>
            <button onClick={handlePopupClose}>Tutup</button>
          </div>
        </div>
      )}
    </>
  )
}
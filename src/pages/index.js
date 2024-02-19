import { useEffect, useState } from "react";
import Aside from "./aside";
import { useRouter } from "next/router";

import { db } from "../../public/firebaseConfig";
import { getDocs, collection, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";

async function addDataToFirebase(nama, alamat, tanggal_masuk, tanggal_surat, jenis_surat, sifat_surat, prihal, no_wa,
  nama_penanggungJawab,
  jabatan_penanggungJawab,
  nip_penanggungJawab,
  jabatan_penerima,
  nip_penerima,
  nama_desa,
  nik,
  ttl,
  jenis_kelamin,
  status_perkawinan,
  agama,
  pekerjaan,
  isi_surat,
  penutup_surat,
  rtRw,
  kelurahan,
  kecamatan,
  kabupaten,
  penghasilan,
  namaOrangTua,) {
  try {
    const docRefSurat = await addDoc(collection(db, "surat"), {
      nama: nama,
      alamat: alamat,
      tanggal_masuk: tanggal_masuk,
      tanggal_surat: tanggal_surat,
      jenis_surat: "surat masuk",
      sifat_surat: sifat_surat,
      prihal: prihal,
      no_wa: no_wa,
      nama_penanggungJawab: nama_penanggungJawab,
      jabatan_penanggungJawab: jabatan_penanggungJawab,
      nip_penanggungJawab: nip_penanggungJawab,
      jabatan_penerima: jabatan_penerima,
      nip_penerima: nip_penerima,
      nama_desa: "Desa Pao",
      nik: nik,
      ttl: ttl,
      jenis_kelamin: jenis_kelamin,
      status_perkawinan: status_perkawinan,
      agama: agama,
      pekerjaan: pekerjaan,
      isi_surat: isi_surat,
      penutup_surat: penutup_surat,
      rtRw: rtRw,
      kelurahan: kelurahan,
      kecamatan: kecamatan,
      kabupaten: kabupaten,
      penghasilan: penghasilan,
      namaOrangTua: namaOrangTua,
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
  const router = useRouter();

  const [visibleSku, setVisibleSku] = useState(true);
  const [visibleSt, setVisibleSt] = useState(false);
  const [visibleSktm, setVisibleSktm] = useState(false);
  const [visibleSkd, setVisibleSkd] = useState(false);
  const [visibleSkpo, setVisibleSkpo] = useState(false);

  const [isSku, setIsSku] = useState(true);
  const [isSt, setIsSt] = useState(false);
  const [isSktm, setIsSktm] = useState(false);
  const [isSkd, setIsSkd] = useState(false);
  const [isSkp, setIsSkp] = useState(false);
  const [islainnya, setIsLainnya] = useState(false);

  const handleButtonClick = (buttonType) => {
    if (buttonType === "sku") {
      setIsSku(true);
      setIsSt(false);
      setIsSktm(false);
      setIsSkd(false);
      setIsSkp(false);
      setIsLainnya(false);
      setVisibleSku(true);
      setVisibleSt(false);
      setVisibleSktm(false);
      setVisibleSkd(false);
      setVisibleSkpo(false);
    } else if (buttonType === "st") {
      setIsSku(false);
      setIsSt(true);
      setIsSktm(false);
      setIsSkd(false);
      setIsSkp(false);
      setIsLainnya(false);
      setVisibleSku(false);
      setVisibleSt(true);
      setVisibleSktm(false);
      setVisibleSkd(false);
      setVisibleSkpo(false);
    } else if (buttonType === "sktm") {
      setIsSku(false);
      setIsSt(false);
      setIsSktm(true);
      setIsSkd(false);
      setIsSkp(false);
      setIsLainnya(false);
      setVisibleSku(false);
      setVisibleSt(false);
      setVisibleSktm(true);
      setVisibleSkd(false);
      setVisibleSkpo(false);
    } else if (buttonType === "skd") {
      setIsSku(false);
      setIsSt(false);
      setIsSktm(false);
      setIsSkd(true);
      setIsSkp(false);
      setIsLainnya(false);
      setVisibleSku(false);
      setVisibleSt(false);
      setVisibleSktm(false);
      setVisibleSkd(true);
      setVisibleSkpo(false);
    } else if (buttonType === "skp") {
      setIsSku(false);
      setIsSt(false);
      setIsSktm(false);
      setIsSkd(false);
      setIsSkp(true);
      setIsLainnya(false);
      setVisibleSku(false);
      setVisibleSt(false);
      setVisibleSktm(false);
      setVisibleSkd(false);
      setVisibleSkpo(true);
    } else if (buttonType === "lainnya") {
      setIsSku(false);
      setIsSt(false);
      setIsSktm(false);
      setIsSkd(false);
      setIsSkp(false);
      setIsLainnya(true);
      setVisibleSku(false);
      setVisibleSt(false);
      setVisibleSktm(false);
      setVisibleSkd(false);
      setVisibleSkpo(false);
    }
  };

  const handleSimpanClick = () => {
    setPopupVisible(true);
  };

  const handlePopupClose = () => {
    setPopupVisible(false);
  };

  const [dataSurat, SetDataSurat] = useState([]);
  const [dataSuratMasuk, SetDataSuratMasuk] = useState([]);
  const [dataSuratKeluar, SetDataSuratKeluar] = useState([]);
  const [jenisSurat, setJenisSurat] = useState('');


  const [dataLogin, SetDataLogin] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchDataFromFirestore();
      SetDataSurat(data);

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

  const [nama, setNama] = useState('');
  const [nik, setNik] = useState('');
  const [nip, setNip] = useState('');
  const [ttl, setTtl] = useState('');
  const [agama, setAgama] = useState('');
  const [alamat, setAlamat] = useState('');
  const [jenis_kelamin, setJenis_kelamin] = useState('');
  const [tanggal_masuk, setTanggal_masuk] = useState('');
  const [tanggal_surat, setTanggal_surat] = useState('');
  const [jenis_surat, setJenis] = useState('');
  const [sifat_surat, setSifat] = useState('');
  const [status, setStatus] = useState('');
  const [pekerjaan, setPekerjaan] = useState('');
  const [prihal, setPerihal] = useState('');
  const [no_wa, setNo_wa] = useState('');
  const [rtRw, setRtRw] = useState('');
  const [kelurahan, setKelurahan] = useState('');
  const [kecamatan, setKecamatan] = useState('');
  const [kabupaten, setKabupaten] = useState('');
  const [penghasilan, setPenghasilan] = useState('');
  const [namaOrangTua, setNamaOrangTua,] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const added = await addDataToFirebase(nama, alamat, tanggal_masuk, tanggal_surat, jenis_surat, sifat_surat, prihal, no_wa,
      "",
      "",
      "",
      "",
      nip,
      "",
      nik,
      ttl,
      jenis_kelamin,
      status,
      agama,
      pekerjaan,
      "",
      "",
      rtRw,
      kelurahan,
      kecamatan,
      kabupaten,
      penghasilan,
      namaOrangTua,);

    if (added) {
      setNama("");
      setAlamat("");
      setTanggal_masuk("");
      setTanggal_surat("");
      "surat masuk";
      setSifat("");
      setPerihal("");
      setNo_wa("");
      "";
      "";
      "";
      "";
      "";
      "";
      setNik("");
      setTtl("");
      setNip("");
      setJenis_kelamin("");
      setStatus("");
      setAgama("");
      setPekerjaan("");
      "";
      "";
      setRtRw("")
      setKelurahan("")
      setKecamatan("")
      setKabupaten("")
      setPenghasilan("")
      setNamaOrangTua("")

      setPopupVisible(true);
    } else {
      alert("Data tidak berhasil di upload");
    }
  }

  return (
    <>
      <div className="tambah-arsip d-flex">
        <Aside isSku={isSku} isSt={isSt} isSktm={isSktm} isSkd={isSkd} isSkp={isSkp} islainnya={islainnya} handleButtonClick={handleButtonClick} />
        <article className="d-flex flex-column align-items-center justify-content-between" style={{ maxHeight: '100vh', overflowY: 'auto' }}>
          <div className="d-flex f-width align-items-center justify-content-left p-2 title-mobile">
            <img className="imgProfile" src="https://upload.wikimedia.org/wikipedia/commons/b/bc/Luwu_Utara_Logo_%28North_Luwu%29.png" alt="Profile" width={55} height={70} />
            <h3 className="imgProfile" style={{ textAlign: 'center', margin: 'auto' }}>Kantor Desa Pao</h3>
          </div>
          <h1 className="p-3" style={{ textAlign: 'center' }}>Silakan Input Data Anda</h1>
          <div className="inputUser">
            {visibleSku && (
              <form onSubmit={handleSubmit} method="post" action="">
                <section>
                  <span>
                    <p>Nama Lengkap</p>
                    <input type="text" name="nama" id="nama" required value={nama} onChange={(e) => setNama(e.target.value)} />
                  </span>
                  <span>
                    <p>Nik</p>
                    <input type="number" name="" id="" value={nik} onChange={(e) => setNik(e.target.value)} required />
                  </span>
                  <span>
                    <p>Tempat Tanggal Lahir</p>
                    <input type="text" name="" id="" placeholder="Makassar, 12 Agustus 2007" value={ttl} onChange={(e) => setTtl(e.target.value)} required />
                  </span>
                  <span>
                    <p>Agama</p>
                    <select
                      value={agama}
                      onChange={(e) => setAgama(e.target.value)}>
                      <option>Pilih Agama</option>
                      <option value="Islam">Islam</option>
                      <option value="Kristen Protestan">Kristen Protestan</option>
                      <option value="Kristen Katolik">Kristen Katolik</option>
                      <option value="Hindu">Hindu</option>
                      <option value="Budha">Budha</option>
                      <option value="Konghuchu">Konghuchu</option>
                    </select>
                  </span>
                  <span>
                    <p>Alamat Pengirim</p>
                    <input type="text" name="alamat" required id="nama" value={alamat} onChange={(e) => setAlamat(e.target.value)} />
                  </span>
                  <span>
                    <p>Jenis Kelamin</p>
                    <select
                      value={jenis_kelamin}
                      onChange={(e) => setJenis_kelamin(e.target.value)}>
                      <option>Pilih jenis kelamin</option>
                      <option value="Laki-laki">Laki-laki</option>
                      <option value="Perempuan">Perempuan</option>
                    </select>
                  </span>
                  <span>
                    <p>Tanggal Surat</p>
                    <input type="date" name="tanggal_surat" id="nama" value={tanggal_surat} onChange={(e) => setTanggal_surat(e.target.value)} />
                  </span>
                  <span>
                    <p>Tanggal Ajukan</p>
                    <input type="date" name="tanggal_masuk" id="nama" required value={tanggal_masuk} onChange={(e) => setTanggal_masuk(e.target.value)} />
                  </span>
                  <span>
                    <p>Jenis Surat</p>
                    <input value={"surat masuk"} onChange={(e) => setJenis(e.target.value)} readOnly />
                  </span>
                  <span>
                    <p>Sifat Surat</p>
                    <input type="text" name="sifat" id="nama" value={sifat_surat} onChange={(e) => setSifat(e.target.value)} />
                  </span>
                  <span>
                    <p>Pekerjaan</p>
                    <input type="text" name="" id="" value={pekerjaan} onChange={(e) => setPekerjaan(e.target.value)} />
                  </span>
                  <span>
                    <p>Status Perkawinan</p>
                    <select
                      value={status} onChange={(e) => setStatus(e.target.value)}>
                      <option>Pilih Status Perkawinan</option>
                      <option value="Lajang">Lajang</option>
                      <option value="Sudah Menikah">Sudah Menikah</option>
                    </select>
                  </span>
                  <span>
                    <p>Perihal Lampiran</p>
                    <select value={prihal} onChange={(e) => setPerihal(e.target.value)}>
                      <option>Pilih Perihal Surat</option>
                      <option value="Surat Keteranagan Usaha">Surat Keteranagan Usaha</option>
                      <option value="Surat Tugas">Surat Tugas</option>
                      <option value="Surat Keterangan Tidak Mampu">Surat Keterangan Tidak Mampu</option>
                      <option value="Surat Keterangan Domisili">Surat Keterangan Domisili</option>
                      <option value="Surat Keteranagan Penghasilan">Surat Keteranagan Penghasilan</option>
                      <option value="Lainnya">Lainnya</option>
                    </select>
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
            )}
          </div>
          <div className="inputUser">
            {visibleSt && (
              <form onSubmit={handleSubmit} method="post" action="">
                <section>
                  <span>
                    <p>Nama Lengkap</p>
                    <input type="text" name="nama" id="nama" required value={nama} onChange={(e) => setNama(e.target.value)} />
                  </span>
                  <span>
                    <p>Nip</p>
                    <input type="number" name="" placeholder="Isi jika perlu" id="" value={nip} onChange={(e) => setNip(e.target.value)} />
                  </span>
                  <span>
                    <p>Tempat Tanggal Lahir</p>
                    <input type="text" name="" id="" placeholder="Makassar, 12 Agustus 2007" value={ttl} onChange={(e) => setTtl(e.target.value)} required />
                  </span>
                  <span>
                    <p>Agama</p>
                    <select
                      value={agama}
                      onChange={(e) => setAgama(e.target.value)}>
                      <option>Pilih Agama</option>
                      <option value="Islam">Islam</option>
                      <option value="Kristen Protestan">Kristen Protestan</option>
                      <option value="Kristen Katolik">Kristen Katolik</option>
                      <option value="Hindu">Hindu</option>
                      <option value="Budha">Budha</option>
                      <option value="Konghuchu">Konghuchu</option>
                    </select>
                  </span>
                  <span>
                    <p>Alamat Pengirim</p>
                    <input type="text" name="alamat" required id="nama" value={alamat} onChange={(e) => setAlamat(e.target.value)} />
                  </span>
                  <span>
                    <p>Jenis Kelamin</p>
                    <select
                      value={jenis_kelamin}
                      onChange={(e) => setJenis_kelamin(e.target.value)}>
                      <option>Pilih jenis kelamin</option>
                      <option value="Laki-laki">Laki-laki</option>
                      <option value="Perempuan">Perempuan</option>
                    </select>
                  </span>
                  <span>
                    <p>Tanggal Surat</p>
                    <input type="date" name="tanggal_surat" id="nama" value={tanggal_surat} onChange={(e) => setTanggal_surat(e.target.value)} />
                  </span>
                  <span>
                    <p>Tanggal Ajukan</p>
                    <input type="date" name="tanggal_masuk" id="nama" required value={tanggal_masuk} onChange={(e) => setTanggal_masuk(e.target.value)} />
                  </span>
                  <span>
                    <p>Jenis Surat</p>
                    <input value={"surat masuk"} onChange={(e) => setJenis(e.target.value)} readOnly />
                  </span>
                  <span>
                    <p>Sifat Surat</p>
                    <input type="text" name="sifat" id="nama" value={sifat_surat} onChange={(e) => setSifat(e.target.value)} />
                  </span>
                  <span>
                    <p>Pekerjaan</p>
                    <input type="text" name="" id="" value={pekerjaan} onChange={(e) => setPekerjaan(e.target.value)} />
                  </span>
                  <span>
                    <p>Status Perkawinan</p>
                    <select
                      value={status} onChange={(e) => setStatus(e.target.value)}>
                      <option>Pilih Status Perkawinan</option>
                      <option value="Lajang">Lajang</option>
                      <option value="Sudah Menikah">Sudah Menikah</option>
                    </select>
                  </span>
                  <span>
                    <p>Perihal Lampiran</p>
                    <select value={prihal} onChange={(e) => setPerihal(e.target.value)}>
                      <option>Pilih Perihal Surat</option>
                      <option value="Surat Keteranagan Usaha">Surat Keteranagan Usaha</option>
                      <option value="Surat Tugas">Surat Tugas</option>
                      <option value="Surat Keterangan Tidak Mampu">Surat Keterangan Tidak Mampu</option>
                      <option value="Surat Keterangan Domisili">Surat Keterangan Domisili</option>
                      <option value="Surat Keteranagan Penghasilan">Surat Keteranagan Penghasilan</option>
                      <option value="Lainnya">Lainnya</option>
                    </select>
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
            )}
          </div>
          <div className="inputUser">
            {visibleSktm && (
              <form onSubmit={handleSubmit} method="post" action="">
                <section>
                  <span>
                    <p>Nama Lengkap</p>
                    <input type="text" name="nama" id="nama" required value={nama} onChange={(e) => setNama(e.target.value)} />
                  </span>
                  <span>
                    <p>Nik</p>
                    <input type="number" name="" id="" value={nik} onChange={(e) => setNik(e.target.value)} required />
                  </span>
                  <span>
                    <p>Tempat Tanggal Lahir</p>
                    <input type="text" name="" id="" placeholder="Makassar, 12 Agustus 2007" value={ttl} onChange={(e) => setTtl(e.target.value)} required />
                  </span>
                  <span>
                    <p>Agama</p>
                    <select
                      value={agama}
                      onChange={(e) => setAgama(e.target.value)}>
                      <option>Pilih Agama</option>
                      <option value="Islam">Islam</option>
                      <option value="Kristen Protestan">Kristen Protestan</option>
                      <option value="Kristen Katolik">Kristen Katolik</option>
                      <option value="Hindu">Hindu</option>
                      <option value="Budha">Budha</option>
                      <option value="Konghuchu">Konghuchu</option>
                    </select>
                  </span>
                  <span>
                    <p>Alamat Pengirim</p>
                    <input type="text" name="alamat" required id="nama" value={alamat} onChange={(e) => setAlamat(e.target.value)} />
                  </span>
                  <span>
                    <p>Jenis Kelamin</p>
                    <select
                      value={jenis_kelamin}
                      onChange={(e) => setJenis_kelamin(e.target.value)}>
                      <option>Pilih jenis kelamin</option>
                      <option value="Laki-laki">Laki-laki</option>
                      <option value="Perempuan">Perempuan</option>
                    </select>
                  </span>
                  <span>
                    <p>Tanggal Surat</p>
                    <input type="date" name="tanggal_surat" id="nama" value={tanggal_surat} onChange={(e) => setTanggal_surat(e.target.value)} />
                  </span>
                  <span>
                    <p>Tanggal Ajukan</p>
                    <input type="date" name="tanggal_masuk" id="nama" required value={tanggal_masuk} onChange={(e) => setTanggal_masuk(e.target.value)} />
                  </span>
                  <span>
                    <p>Jenis Surat</p>
                    <input value={"surat masuk"} onChange={(e) => setJenis(e.target.value)} readOnly />
                  </span>
                  <span>
                    <p>Sifat Surat</p>
                    <input type="text" name="sifat" id="nama" value={sifat_surat} onChange={(e) => setSifat(e.target.value)} />
                  </span>
                  <span>
                    <p>Pekerjaan</p>
                    <input type="text" name="" id="" value={pekerjaan} onChange={(e) => setPekerjaan(e.target.value)} />
                  </span>
                  <span>
                    <p>Status Perkawinan</p>
                    <select
                      value={status} onChange={(e) => setStatus(e.target.value)}>
                      <option>Pilih Status Perkawinan</option>
                      <option value="Lajang">Lajang</option>
                      <option value="Sudah Menikah">Sudah Menikah</option>
                    </select>
                  </span>
                  <span>
                    <p>Perihal Lampiran</p>
                    <select value={prihal} onChange={(e) => setPerihal(e.target.value)}>
                      <option>Pilih Perihal Surat</option>
                      <option value="Surat Keteranagan Usaha">Surat Keteranagan Usaha</option>
                      <option value="Surat Tugas">Surat Tugas</option>
                      <option value="Surat Keterangan Tidak Mampu">Surat Keterangan Tidak Mampu</option>
                      <option value="Surat Keterangan Domisili">Surat Keterangan Domisili</option>
                      <option value="Surat Keteranagan Penghasilan">Surat Keteranagan Penghasilan</option>
                      <option value="Lainnya">Lainnya</option>
                    </select>
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
            )}
          </div>
          <div className="inputUser">
            {visibleSkd && (
              <form onSubmit={handleSubmit} method="post" action="">
                <section>
                  <span>
                    <p>Nama Lengkap</p>
                    <input type="text" name="nama" id="nama" required value={nama} onChange={(e) => setNama(e.target.value)} />
                  </span>
                  <span>
                    <p>Nik</p>
                    <input type="number" name="" id="" value={nik} onChange={(e) => setNik(e.target.value)} required />
                  </span>
                  <span>
                    <p>Tempat Tanggal Lahir</p>
                    <input type="text" name="" id="" placeholder="Makassar, 12 Agustus 2007" value={ttl} onChange={(e) => setTtl(e.target.value)} required />
                  </span>
                  <span>
                    <p>Agama</p>
                    <select
                      value={agama}
                      onChange={(e) => setAgama(e.target.value)}>
                      <option>Pilih Agama</option>
                      <option value="Islam">Islam</option>
                      <option value="Kristen Protestan">Kristen Protestan</option>
                      <option value="Kristen Katolik">Kristen Katolik</option>
                      <option value="Hindu">Hindu</option>
                      <option value="Budha">Budha</option>
                      <option value="Konghuchu">Konghuchu</option>
                    </select>
                  </span>
                  <span>
                    <p>Alamat Pengirim</p>
                    <input type="text" name="alamat" required id="nama" value={alamat} onChange={(e) => setAlamat(e.target.value)} />
                  </span>
                  <span>
                    <p>Jenis Kelamin</p>
                    <select
                      value={jenis_kelamin}
                      onChange={(e) => setJenis_kelamin(e.target.value)}>
                      <option>Pilih jenis kelamin</option>
                      <option value="Laki-laki">Laki-laki</option>
                      <option value="Perempuan">Perempuan</option>
                    </select>
                  </span>
                  <span>
                    <p>RT/RW</p>
                    <input type="text" name="" id="" required value={rtRw} onChange={(e) => setRtRw(e.target.value)} />
                  </span>
                  <span>
                    <p>Kelurahan</p>
                    <input type="text" name="" id="" required value={kelurahan} onChange={(e) => setKelurahan(e.target.value)} />
                  </span>
                  <span>
                    <p>Kecamatan</p>
                    <input type="text" name="" id="" required value={kecamatan} onChange={(e) => setKecamatan(e.target.value)} />
                  </span>
                  <span>
                    <p>Kabupaten</p>
                    <input type="text" name="" id="" required value={kabupaten} onChange={(e) => setKabupaten(e.target.value)} />
                  </span>
                  <span>
                    <p>Tanggal Surat</p>
                    <input type="date" name="tanggal_surat" id="nama" value={tanggal_surat} onChange={(e) => setTanggal_surat(e.target.value)} />
                  </span>
                  <span>
                    <p>Tanggal Ajukan</p>
                    <input type="date" name="tanggal_masuk" id="nama" required value={tanggal_masuk} onChange={(e) => setTanggal_masuk(e.target.value)} />
                  </span>
                  <span>
                    <p>Jenis Surat</p>
                    <input value={"surat masuk"} onChange={(e) => setJenis(e.target.value)} readOnly />
                  </span>
                  <span>
                    <p>Sifat Surat</p>
                    <input type="text" name="sifat" id="nama" value={sifat_surat} onChange={(e) => setSifat(e.target.value)} />
                  </span>
                  <span>
                    <p>Pekerjaan</p>
                    <input type="text" name="" id="" value={pekerjaan} onChange={(e) => setPekerjaan(e.target.value)} />
                  </span>
                  <span>
                    <p>Status Perkawinan</p>
                    <select
                      value={status} onChange={(e) => setStatus(e.target.value)}>
                      <option>Pilih Status Perkawinan</option>
                      <option value="Lajang">Lajang</option>
                      <option value="Sudah Menikah">Sudah Menikah</option>
                    </select>
                  </span>
                  <span>
                    <p>Perihal Lampiran</p>
                    <select value={prihal} onChange={(e) => setPerihal(e.target.value)}>
                      <option>Pilih Perihal Surat</option>
                      <option value="Surat Keteranagan Usaha">Surat Keteranagan Usaha</option>
                      <option value="Surat Tugas">Surat Tugas</option>
                      <option value="Surat Keterangan Tidak Mampu">Surat Keterangan Tidak Mampu</option>
                      <option value="Surat Keterangan Domisili">Surat Keterangan Domisili</option>
                      <option value="Surat Keteranagan Penghasilan">Surat Keteranagan Penghasilan</option>
                      <option value="Lainnya">Lainnya</option>
                    </select>
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
            )}
          </div>
          <div className="inputUser">
            {visibleSkpo && (
              <form onSubmit={handleSubmit} method="post" action="">
                <section>
                  <span>
                    <p>Nama Lengkap</p>
                    <input type="text" name="nama" id="nama" required value={nama} onChange={(e) => setNama(e.target.value)} />
                  </span>
                  <span>
                    <p>Alamat Orang Tua</p>
                    <input type="text" name="alamat" required id="nama" value={alamat} onChange={(e) => setAlamat(e.target.value)} />
                  </span>
                  <span>
                    <p>Jenis Kelamin</p>
                    <select
                      value={jenis_kelamin}
                      onChange={(e) => setJenis_kelamin(e.target.value)}>
                      <option>Pilih jenis kelamin</option>
                      <option value="Laki-laki">Laki-laki</option>
                      <option value="Perempuan">Perempuan</option>
                    </select>
                  </span>
                  <span>
                    <p>Nama Orang Tua</p>
                    <input type="text" name="" id="" value={namaOrangTua} onChange={(e) => setNamaOrangTua(e.target.value)} required />
                  </span>
                  <span>
                    <p>Penghasilan Orang Tua</p>
                    <input type="text" name="" id="" required value={penghasilan} onChange={(e) => setPenghasilan(e.target.value)} />
                  </span>
                  <span>
                    <p>Kecamatan</p>
                    <input type="text" name="" id="" required value={kecamatan} onChange={(e) => setKecamatan(e.target.value)} />
                  </span>
                  <span>
                    <p>Kabupaten / Kota</p>
                    <input type="text" name="" id="" required value={kabupaten} onChange={(e) => setKabupaten(e.target.value)} />
                  </span>
                  <span>
                    <p>Tanggal Surat</p>
                    <input type="date" name="tanggal_surat" id="nama" value={tanggal_surat} onChange={(e) => setTanggal_surat(e.target.value)} />
                  </span>
                  <span>
                    <p>Tanggal Ajukan</p>
                    <input type="date" name="tanggal_masuk" id="nama" required value={tanggal_masuk} onChange={(e) => setTanggal_masuk(e.target.value)} />
                  </span>
                  <span>
                    <p>Jenis Surat</p>
                    <input value={"surat masuk"} onChange={(e) => setJenis(e.target.value)} readOnly />
                  </span>
                  <span>
                    <p>Sifat Surat</p>
                    <input type="text" name="sifat" id="nama" value={sifat_surat} onChange={(e) => setSifat(e.target.value)} />
                  </span>
                  <span>
                    <p>Pekerjaan</p>
                    <input type="text" name="" id="" value={pekerjaan} onChange={(e) => setPekerjaan(e.target.value)} />
                  </span>
                  <span>
                    <p>Status Perkawinan</p>
                    <select
                      value={status} onChange={(e) => setStatus(e.target.value)}>
                      <option>Pilih Status Perkawinan</option>
                      <option value="Lajang">Lajang</option>
                      <option value="Sudah Menikah">Sudah Menikah</option>
                    </select>
                  </span>
                  <span>
                    <p>Perihal Lampiran</p>
                    <select value={prihal} onChange={(e) => setPerihal(e.target.value)}>
                      <option>Pilih Perihal Surat</option>
                      <option value="Surat Keteranagan Usaha">Surat Keteranagan Usaha</option>
                      <option value="Surat Tugas">Surat Tugas</option>
                      <option value="Surat Keterangan Tidak Mampu">Surat Keterangan Tidak Mampu</option>
                      <option value="Surat Keterangan Domisili">Surat Keterangan Domisili</option>
                      <option value="Surat Keteranagan Penghasilan">Surat Keteranagan Penghasilan</option>
                      <option value="Lainnya">Lainnya</option>
                    </select>
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
            )}
          </div>
        </article>
      </div>
      {/* Pop-up component */}
      {isPopupVisible && (
        <div className="popup" style={{ backgroundColor: '#009933' }}>
          <div className="popup-content">
            <h2>Data Anda Berhasil Terkirim</h2>
            <button onClick={handlePopupClose}>Tutup</button>
          </div>
        </div>
      )}
    </>
  )
}
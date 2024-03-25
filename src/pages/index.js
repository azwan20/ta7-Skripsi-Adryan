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
  namaOrangTua,
  provinsi,
  klasifikasi,
  nomor_kk,
  nama_kepalakk,
  kodePos_asal,
  telpon_asal,
  alasan_pindah,
  alamat_tujuan,
  desa_tujuan,
  kecamatan_tujuan,
  kabupaten_tujuan,
  provinsi_tujuan,
  kodePos_tujuan,
  telpon_tujuan,
  jenis_kepindahan,
  statuskk_pindah,
  statustidak_pindah,
  shdk,
  usaha,
  ttl_orangtua,
  pekerjaan_orangtua,
  alamat_orangtua,
  terbilang,
  kewarganegaraan,
  anak_ke,
  sebab_kematian,
  keterangan_visum,
  jenis_kelahiran,
  nama_ayah,
  nik_ayah,
  nik_ibu,
) {
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
      provinsi: provinsi,
      klasifikasi: klasifikasi,
      nomor_kk: nomor_kk,
      nama_kepalakk: nama_kepalakk,
      kodePos_asal: kodePos_asal,
      telpon_asal: telpon_asal,
      alasan_pindah: alasan_pindah,
      alamat_tujuan: alamat_tujuan,
      desa_tujuan: desa_tujuan,
      kecamatan_tujuan: kecamatan_tujuan,
      kabupaten_tujuan: kabupaten_tujuan,
      provinsi_tujuan: provinsi_tujuan,
      kodePos_tujuan: kodePos_tujuan,
      telpon_tujuan: telpon_tujuan,
      jenis_kepindahan: jenis_kepindahan,
      statuskk_pindah: statuskk_pindah,
      statustidak_pindah: statustidak_pindah,
      shdk: shdk,
      usaha: usaha,
      ttl_orangtua: ttl_orangtua,
      pekerjaan_orangtua: pekerjaan_orangtua,
      alamat_orangtua: alamat_orangtua,
      terbilang: terbilang,
      kewarganegaraan: kewarganegaraan,
      anak_ke: anak_ke,
      sebab_kematian: sebab_kematian,
      keterangan_visum: keterangan_visum,
      jenis_kelahiran: jenis_kelahiran,
      nama_ayah: nama_ayah,
      nik_ayah: nik_ayah,
      nik_ibu: nik_ibu,
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
  const [visibleLainnya, setVisibleLainnya] = useState(false);

  const [isSku, setIsSku] = useState(true);
  const [isSt, setIsSt] = useState(false);
  const [isSktm, setIsSktm] = useState(false);
  const [isSkd, setIsSkd] = useState(false);
  const [isSkp, setIsSkp] = useState(false);
  const [islainnya, setIsLainnya] = useState(false);

  const handleButtonClick = (buttonType) => {
    let newPerihall;

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
      setVisibleLainnya(false);
      newPerihall = "Surat Keteranagan Usaha";
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
      setVisibleLainnya(false);
      newPerihall = "Surat Keterangan Penghasilan";
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
      setVisibleLainnya(false);
      newPerihall = "Surat Keterangan Kematian";
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
      setVisibleLainnya(false);
      newPerihall = "Surat Keterangan Kelahiran";
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
      setVisibleLainnya(false);
      newPerihall = "Surat Keterangan Pindah";
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
      setVisibleLainnya(true);
      newPerihall = "Lainnya";
    }

    setPerihal(newPerihall);
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
  const [namaOrangTua, setNamaOrangTua] = useState('');
  const [provinsi, setProvinsi] = useState('');
  const [klasifikasi, setKlasifikasi] = useState('');
  const [nomor_kk, setNomor_kk] = useState('');
  const [nama_kepalakk, setNama_kepalakk] = useState('');
  const [kodePos_asal, setKodePos_asal] = useState('');
  const [telpon_asal, setTelpon_asal] = useState('');
  const [alasan_pindah, setAlasan_pindah] = useState('');
  const [alamat_tujuan, setAlamat_tujuan] = useState('');
  const [desa_tujuan, setDesa_tujuan] = useState('');
  const [kecamatan_tujuan, setKecamatan_tujuan] = useState('');
  const [kabupaten_tujuan, setKabupaten_tujuan] = useState('');
  const [provinsi_tujuan, setProvinsi_tujuan] = useState('');
  const [kodePos_tujuan, setKodePos_tujuan] = useState('');
  const [telpon_tujuan, setTelpon_tujuan] = useState('');
  const [jenis_kepindahan, setJenis_kepindahan] = useState('');
  const [statuskk_pindah, setStatuskk_pindah] = useState('');
  const [statustidak_pindah, setStatustidak_pindah] = useState('');
  const [shdk, setShdk] = useState('');
  const [usaha, setUsaha] = useState('');
  const [ttl_orangtua, setTtl_orangtua] = useState('');
  const [pekerjaan_orangtua, setPekerjaan_orangtua] = useState('');
  const [alamat_orangtua, setAlamat_orangtua] = useState('');
  const [terbilang, setTerbilang] = useState('');
  const [kewarganegaraan, setKewarganegaraan] = useState('');
  const [anak_ke, setAnak_ke] = useState('');
  const [sebab_kematian, setSebab_kematian] = useState('');
  const [keterangan_visum, setKeterangan_visum] = useState('');
  const [jenis_kelahiran, setJenis_kelahiran] = useState('');
  const [nama_ayah, setNama_ayah] = useState('');
  const [nik_ayah, setNik_ayah] = useState('');
  const [nik_ibu, setNik_ibu] = useState('');

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
      namaOrangTua,
      provinsi,
      klasifikasi,
      nomor_kk,
      nama_kepalakk,
      kodePos_asal,
      telpon_asal,
      alasan_pindah,
      alamat_tujuan,
      desa_tujuan,
      kecamatan_tujuan,
      kabupaten_tujuan,
      provinsi_tujuan,
      kodePos_tujuan,
      telpon_tujuan,
      jenis_kepindahan,
      statuskk_pindah,
      statustidak_pindah,
      shdk,
      usaha,
      ttl_orangtua,
      pekerjaan_orangtua,
      alamat_orangtua,
      terbilang,
      kewarganegaraan,
      anak_ke,
      sebab_kematian,
      keterangan_visum,
      jenis_kelahiran,
      nama_ayah,
      nik_ayah,
      nik_ibu,
    );

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
      setRtRw("");
      setKelurahan("");
      setKecamatan("");
      setKabupaten("");
      setPenghasilan("");
      setNamaOrangTua("");
      setProvinsi("");
      setKlasifikasi("");
      setNomor_kk("");
      setNama_kepalakk("");
      setKodePos_asal("");
      setTelpon_asal("");
      setAlasan_pindah("");
      setAlamat_tujuan("");
      setKecamatan_tujuan("");
      setKabupaten_tujuan("");
      setProvinsi_tujuan("");
      setKodePos_tujuan("");
      setTelpon_tujuan("");
      setJenis_kepindahan("");
      setStatuskk_pindah("");
      setStatustidak_pindah("");
      setShdk("");
      setUsaha("");
      setTtl_orangtua("");
      setPekerjaan_orangtua("");
      setAlamat_orangtua("");
      setTerbilang("");
      setKewarganegaraan("");
      setAnak_ke("");
      setSebab_kematian("");
      setKeterangan_visum("");
      setJenis_kelahiran("");
      setNama_ayah("");
      setNik_ayah("");
      setNik_ibu("");

      setPopupVisible(true);
    } else {
      alert("Data tidak berhasil di upload");
    }
  }

  const [asideVisble, setAsideVisible] = useState(true);
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };
  const handleAside = () => {
    setAsideVisible(true);
  }

  return (
    <>
      <div className="tambah-arsip d-flex">
        <Aside sidebarVisible={sidebarVisible} toggleSidebar={toggleSidebar} isSku={isSku} isSt={isSt} isSktm={isSktm} isSkd={isSkd} isSkp={isSkp} islainnya={islainnya} handleButtonClick={handleButtonClick} />
        {/* <button onClick={handleAside} className="buttonAside"></button> */}
        <article className="d-flex flex-column align-items-center justify-content-between" style={{ maxHeight: '100vh', overflowY: 'auto' }}>
          <div className="d-flex f-width align-items-center justify-content-left p-2 title-mobile">
            <img className="imgProfile" src="https://upload.wikimedia.org/wikipedia/commons/b/bc/Luwu_Utara_Logo_%28North_Luwu%29.png" alt="Profile" width={55} height={70} />
            <h3 className="imgProfile" style={{ textAlign: 'center', margin: 'auto' }}>Kantor Desa Pao</h3>
          </div>
          {/* <h1 className="p-3" style={{ textAlign: 'center' }}>Silakan Input Data Anda</h1> */}
          <div className="inputUser">
            {visibleSku && (
              <form onSubmit={handleSubmit} method="post" action="">
                <h1 className="p-3" style={{ textAlign: 'center' }}>Formulir Surat Keteranagan Usaha</h1>
                <section>
                  <span>
                    <p>Nama Lengkap</p>
                    <input type="text" name="nama" id="nama" required value={nama} onChange={(e) => setNama(e.target.value)} />
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
                    <p>Nik</p>
                    <input type="number" name="" id="" value={nik} onChange={(e) => setNik(e.target.value)} required />
                  </span>
                  <span>
                    <p>Tempat Tanggal Lahir</p>
                    <input type="text" name="" id="" placeholder="Makassar, 12 Agustus 2007" value={ttl} onChange={(e) => setTtl(e.target.value)} required />
                  </span>
                  <span>
                    <p>Status Perkawinan</p>
                    <select
                      value={status} onChange={(e) => setStatus(e.target.value)} required>
                      <option>Pilih Status Perkawinan</option>
                      <option value="Lajang">Lajang</option>
                      <option value="Sudah Menikah">Sudah Menikah</option>
                    </select>
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
                    <p>Pekerjaan</p>
                    <input type="text" name="" id="" required value={pekerjaan} onChange={(e) => setPekerjaan(e.target.value)} />
                  </span>
                  <span>
                    <p>Alamat</p>
                    <input type="text" name="alamat" required id="nama" value={alamat} onChange={(e) => setAlamat(e.target.value)} />
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
                    <p>Kabupaten / Kota</p>
                    <input type="text" name="" id="" required value={kabupaten} onChange={(e) => setKabupaten(e.target.value)} />
                  </span>
                  <span>
                    <p>Usaha yang dimilki</p>
                    <input type="text" name="" id="" placeholder="Usaha Budidaya Rumut Laut" required value={usaha} onChange={(e) => setUsaha(e.target.value)} />
                  </span>
                  <span>
                    <p>Tanggal Surat</p>
                    <input type="date" name="tanggal_surat" id="nama" required value={tanggal_surat} onChange={(e) => setTanggal_surat(e.target.value)} />
                  </span>
                  <span>
                    <p>Tanggal Ajukan</p>
                    <input type="date" name="tanggal_masuk" id="nama" required value={tanggal_masuk} onChange={(e) => setTanggal_masuk(e.target.value)} />
                  </span>
                  <span>
                    <p>Sifat Surat</p>
                    <select value={sifat_surat} onChange={(e) => setSifat(e.target.value)}>
                      <option value="" disabled>Pilih Sifat Surat</option>
                      <option value="Pribadi">Pribadi</option>
                      <option value="Umum">Umum</option>
                    </select>
                  </span>
                  <span>
                    <p>No. WhatsApp</p>
                    <input type="text" name="no_wa" required id="nama" placeholder="+62" value={no_wa} onChange={(e) => setNo_wa(e.target.value)} />
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
                <h1 className="p-3" style={{ textAlign: 'center' }}>Formulir Surat Keteranagan Penghasilan</h1>
                <section>
                  <span>
                    <p>Nama Lengkap</p>
                    <input type="text" name="nama" id="nama" required value={nama} onChange={(e) => setNama(e.target.value)} />
                  </span>
                  <span>
                    <p>Tempat Tanggal Lahir</p>
                    <input type="text" name="" id="" placeholder="Makassar, 12 Agustus 2007" value={ttl} onChange={(e) => setTtl(e.target.value)} required />
                  </span>
                  <span>
                    <p>Pekerjaan</p>
                    <input type="text" name="" id="" required value={pekerjaan} onChange={(e) => setPekerjaan(e.target.value)} />
                  </span>
                  <span>
                    <p>Alamat</p>
                    <input type="text" name="alamat" required id="nama" value={alamat} onChange={(e) => setAlamat(e.target.value)} />
                  </span>
                  <span>
                    <p>Nama Orang Tua</p>
                    <input type="text" name="alamat" required id="nama" value={namaOrangTua} onChange={(e) => setNamaOrangTua(e.target.value)} />
                  </span>
                  <span>
                    <p>Tempat Tanggal Lahir Orang Tua</p>
                    <input type="text" name="" id="" placeholder="Makassar, 12 Agustus 2007" value={ttl_orangtua} onChange={(e) => setTtl_orangtua(e.target.value)} required />
                  </span>
                  <span>
                    <p>Pekerjaan Orang Tua</p>
                    <input type="text" name="" id="" required value={pekerjaan_orangtua} onChange={(e) => setPekerjaan_orangtua(e.target.value)} />
                  </span>
                  <span>
                    <p>Alamat Orang Tua</p>
                    <input type="text" name="alamat" required id="nama" value={alamat_orangtua} onChange={(e) => setAlamat_orangtua(e.target.value)} />
                  </span>
                  <span>
                    <p>Pengahasilan</p>
                    <input type="text" name="alamat" placeholder="1.000.000" required id="nama" value={penghasilan} onChange={(e) => setPenghasilan(e.target.value)} />
                  </span>
                  <span>
                    <p>Terbilang</p>
                    <input type="text" name="alamat" placeholder="Satu juta rupiah" required id="nama" value={terbilang} onChange={(e) => setTerbilang(e.target.value)} />
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
                    <p>Sifat Surat</p>
                    <select value={sifat_surat} onChange={(e) => setSifat(e.target.value)}>
                      <option value="" disabled>Pilih Sifat Surat</option>
                      <option value="Pribadi">Pribadi</option>
                      <option value="Umum">Umum</option>
                    </select>
                  </span>
                  <span>
                    <p>No. WhatsApp</p>
                    <input type="text" name="no_wa" required id="nama" placeholder="+62" value={no_wa} onChange={(e) => setNo_wa(e.target.value)} />
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
                <h1 className="p-3" style={{ textAlign: 'center' }}>Formulir Surat Keterangan Kematian</h1>
                <section>
                  <span>
                    <p>Nama Lengkap</p>
                    <input type="text" name="nama" id="nama" required value={nama} onChange={(e) => setNama(e.target.value)} />
                  </span>
                  <span>
                    <p>Nik</p>
                    <input type="number" name="" id="" required value={nik} onChange={(e) => setNik(e.target.value)} />
                  </span>
                  <span>
                    <p>Nomor KK</p>
                    <input type="number" name="" id="" required value={nomor_kk} onChange={(e) => setNomor_kk(e.target.value)} />
                  </span>
                  <span>
                    <p>Tempat Tanggal Lahir</p>
                    <input type="text" name="" id="" placeholder="Makassar, 12 Agustus 2007" value={ttl} onChange={(e) => setTtl(e.target.value)} required />
                  </span>
                  <span>
                    <p>Jenis Kelamin</p>
                    <select
                      value={jenis_kelamin}
                      onChange={(e) => setJenis_kelamin(e.target.value)} required>
                      <option>Pilih jenis kelamin</option>
                      <option value="Laki-laki">Laki-laki</option>
                      <option value="Perempuan">Perempuan</option>
                    </select>
                  </span>
                  <span>
                    <p>Kewarganegaraan</p>
                    <input type="text" name="alamat" required id="nama" value={kewarganegaraan} onChange={(e) => setKewarganegaraan(e.target.value)} />
                  </span>
                  <span>
                    <p>Agama</p>
                    <select
                      value={agama}
                      onChange={(e) => setAgama(e.target.value)} required>
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
                    <p>Status Perkawinan</p>
                    <select
                      value={status} onChange={(e) => setStatus(e.target.value)} required>
                      <option value="" disabled>Pilih Status Perkawinan</option>
                      <option value="Lajang">Lajang</option>
                      <option value="Sudah Menikah">Sudah Menikah</option>
                      <option value="Sudah Menikah">Cerai Mati</option>
                    </select>
                  </span>
                  <span>
                    <p>Pekerjaan</p>
                    <input type="text" name="alamat" required id="nama" value={pekerjaan} onChange={(e) => setPekerjaan(e.target.value)} />
                  </span>
                  <span>
                    <p>Alamat</p>
                    <input type="text" name="alamat" required id="nama" value={alamat} onChange={(e) => setAlamat(e.target.value)} />
                  </span>
                  <span>
                    <p>Anak ke</p>
                    <input type="text" name="alamat" id="nama" value={anak_ke} onChange={(e) => setAnak_ke(e.target.value)} />
                  </span>
                  <h6 style={{ textAlign: 'left' }}>Telah Meninggal Pada</h6>
                  <span>
                    <p>Hari/Tanggal</p>
                    <input type="text" name="" required id="nama" placeholder="Selasa, 02 Januari 2024" value={ttl_orangtua} onChange={(e) => setTtl_orangtua(e.target.value)} />
                  </span>
                  <span>
                    <p>Tempat Kematian</p>
                    <input type="text" name="alamat" required id="nama" value={alamat_tujuan} onChange={(e) => setAlamat_tujuan(e.target.value)} />
                  </span>
                  <span>
                    <p>Kelurahan</p>
                    <input type="text" name="alamat" required id="nama" value={kelurahan} onChange={(e) => setKelurahan(e.target.value)} />
                  </span>
                  <span>
                    <p>Kecamatan</p>
                    <input type="text" name="alamat" required id="nama" value={kecamatan} onChange={(e) => setKecamatan(e.target.value)} />
                  </span>
                  <span>
                    <p>Kabupaten</p>
                    <input type="text" name="alamat" required id="nama" value={kabupaten} onChange={(e) => setKabupaten(e.target.value)} />
                  </span>
                  <span>
                    <p>Povinsi</p>
                    <input type="text" name="" required id="nama" value={provinsi} onChange={(e) => setProvinsi(e.target.value)} />
                  </span>
                  <span>
                    <p>Sebab Kematian</p>
                    <input type="text" name="alamat" required id="nama" value={sebab_kematian} onChange={(e) => setSebab_kematian(e.target.value)} />
                  </span>
                  <span>
                    <p>Yang Menentukan</p>
                    <input type="text" name="alamat" required id="nama" value={jenis_kepindahan} onChange={(e) => setJenis_kepindahan(e.target.value)} />
                  </span>
                  <span>
                    <p>Keterangan Visum</p>
                    <input type="text" name="alamat" required id="nama" value={keterangan_visum} onChange={(e) => setKeterangan_visum(e.target.value)} />
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
                    <p>Sifat Surat</p>
                    <select value={sifat_surat} onChange={(e) => setSifat(e.target.value)}>
                      <option value="" disabled>Pilih Sifat Surat</option>
                      <option value="Pribadi">Pribadi</option>
                      <option value="Umum">Umum</option>
                    </select>
                  </span>
                  <span>
                    <p>No. WhatsApp</p>
                    <input type="text" name="no_wa" required id="nama" placeholder="+62" value={no_wa} onChange={(e) => setNo_wa(e.target.value)} />
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
                <h1 className="p-3" style={{ textAlign: 'center' }}>Formulir Surat Keteranagan Kelahiran</h1>
                <section>
                  <span>
                    <p>Nama Lengkap Bayi</p>
                    <input type="text" name="nama" id="nama" required value={nama} onChange={(e) => setNama(e.target.value)} />
                  </span>
                  <span>
                    <p>Nomor Induk Keluarga</p>
                    <input type="number" name="" id="" value={nik} onChange={(e) => setNik(e.target.value)} />
                  </span>
                  <span>
                    <p>Nomor Kartu Keluarga</p>
                    <input type="number" name="nama" id="nama" required value={nomor_kk} onChange={(e) => setNomor_kk(e.target.value)} />
                  </span>
                  <span>
                    <p>Jenis Kelamin</p>
                    <select
                      value={jenis_kelamin}
                      onChange={(e) => setJenis_kelamin(e.target.value)} required>
                      <option value="" disabled>Pilih jenis kelamin</option>
                      <option value="Laki-laki">Laki-laki</option>
                      <option value="Perempuan">Perempuan</option>
                    </select>
                  </span>
                  <span>
                    <p>Tempat Tanggal Lahir</p>
                    <input type="text" name="" id="" placeholder="Makassar, 12 Agustus 2007" value={ttl} onChange={(e) => setTtl(e.target.value)} required />
                  </span>
                  <span>
                    <p>Anak Ke</p>
                    <input type="text" name="" placeholder="1 (Kesatu)" id="" value={anak_ke} onChange={(e) => setAnak_ke(e.target.value)} required />
                  </span>
                  <span>
                    <p>Jenis Kelahiran</p>
                    <input type="text" name="" id="" value={jenis_kelahiran} onChange={(e) => setJenis_kelahiran(e.target.value)} required />
                  </span>
                  <span>
                    <p>Nama Ayah</p>
                    <input type="text" name="" id="" value={nama_ayah} onChange={(e) => setNama_ayah(e.target.value)} required />
                  </span>
                  <span>
                    <p>NIK Ayah</p>
                    <input type="text" name="" id="" value={nik_ayah} onChange={(e) => setNik_ayah(e.target.value)} required />
                  </span>
                  <span>
                    <p>Nama Ibu</p>
                    <input type="text" name="" id="" value={namaOrangTua} onChange={(e) => setNamaOrangTua(e.target.value)} required />
                  </span>
                  <span>
                    <p>NIK Ibu</p>
                    <input type="text" name="" id="" value={nik_ibu} onChange={(e) => setNik_ibu(e.target.value)} required />
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
                    <p>Kewarganegaraan</p>
                    <input type="text" name="" id="" required value={kewarganegaraan} onChange={(e) => setKewarganegaraan(e.target.value)} />
                  </span>
                  <span>
                    <p>Alamat</p>
                    <input type="text" name="alamat" required id="nama" value={alamat} onChange={(e) => setAlamat(e.target.value)} />
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
                    <p>Sifat Surat</p>
                    <select value={sifat_surat} onChange={(e) => setSifat(e.target.value)}>
                      <option value="" disabled>Pilih Sifat Surat</option>
                      <option value="Pribadi">Pribadi</option>
                      <option value="Umum">Umum</option>
                    </select>
                  </span>
                  <span>
                    <p>No. WhatsApp</p>
                    <input type="text" name="no_wa" required id="nama" placeholder="+62" value={no_wa} onChange={(e) => setNo_wa(e.target.value)} />
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
                <h1 className="p-3" style={{ textAlign: 'center' }}>Formulir Surat Keteranagan Pindah</h1>
                <section>
                  <span><h4>Data Daerah Asal</h4></span>
                  <span>
                    <p>Nama Lengkap</p>
                    <input type="text" name="nama" id="nama" required value={nama} onChange={(e) => setNama(e.target.value)} />
                  </span>
                  <span>
                    <p>Nik</p>
                    <input type="number" name="" id="" required value={nik} onChange={(e) => setNik(e.target.value)} />
                  </span>
                  <span>
                    <p>Tempat Tanggal Lahir</p>
                    <input type="text" name="" id="" placeholder="10-01-1990" value={ttl} onChange={(e) => setTtl(e.target.value)} required />
                  </span>
                  <span>
                    <p>Alamat Asal</p>
                    <input type="text" name="alamat" required id="nama" value={alamat} onChange={(e) => setAlamat(e.target.value)} />
                  </span>
                  <span>
                    <p>Nomor kartu keluarga</p>
                    <input type="number" name="" id="" required value={nomor_kk} onChange={(e) => setNomor_kk(e.target.value)} />
                  </span>
                  <span>
                    <p>Nama Kepala Keluarga</p>
                    <input type="text" name="" id="" required value={nama_kepalakk} onChange={(e) => setNama_kepalakk(e.target.value)} />
                  </span>
                  <span>
                    <p>Nama Provinsi Asal</p>
                    <input type="text" name="" id="" required value={provinsi} onChange={(e) => setProvinsi(e.target.value)} />
                  </span>
                  <span>
                    <p>Kabupaten / Kota Asal</p>
                    <input type="text" name="" id="" required value={kabupaten} onChange={(e) => setKabupaten(e.target.value)} />
                  </span>
                  <span>
                    <p>Kecamatan Asal</p>
                    <input type="text" name="" id="" required value={kecamatan} onChange={(e) => setKecamatan(e.target.value)} />
                  </span>
                  <span>
                    <p>Kelurahan Asal</p>
                    <input type="text" name="" id="" required value={kelurahan} onChange={(e) => setKelurahan(e.target.value)} />
                  </span>
                  <span>
                    <p>Klasifikasi Kepindahan</p>
                    <select
                      value={klasifikasi} required onChange={(e) => setKlasifikasi(e.target.value)} >
                      <option value="" disabled>Pilih Jenis Kepindahan</option>
                      <option value="ANTAR DESA">ANTAR DESA</option>
                      <option value="ANTAR KAB/KOTA">ANTAR KAB/KOTA</option>
                      <option value="ANTAR PROVINSI">ANTAR PROVINSI</option>
                      <option value="ANTAR NEGARA">ANTAR NEGARA</option>
                    </select>
                  </span>
                  <span>
                    <p>Kode Pos</p>
                    <input type="number" name="" id="" value={kodePos_asal} onChange={(e) => setKodePos_asal(e.target.value)} />
                  </span>
                  <span>
                    <p>Telepon</p>
                    <input type="number" name="" id="" value={telpon_asal} onChange={(e) => setTelpon_asal(e.target.value)} />
                  </span>
                  <span>
                    <h4>Data Kepindahan</h4>
                  </span>
                  <span>
                    <p>Alasan Pindah</p>
                    <input type="text" name="" id="" required value={alasan_pindah} onChange={(e) => setAlasan_pindah(e.target.value)} />
                  </span>
                  <span>
                    <p>Alamat Tujuan Pindah</p>
                    <input type="text" name="" id="" required value={alamat_tujuan} onChange={(e) => setAlamat_tujuan(e.target.value)} />
                  </span>
                  <span>
                    <p>Nama Provinsi Tujuan</p>
                    <input type="text" name="" id="" required value={provinsi_tujuan} onChange={(e) => setProvinsi_tujuan(e.target.value)} />
                  </span>
                  <span>
                    <p>Kabupaten / Kota Tujuan</p>
                    <input type="text" name="" id="" required value={kabupaten_tujuan} onChange={(e) => setKabupaten_tujuan(e.target.value)} />
                  </span>
                  <span>
                    <p>Kecamatan Tujuan</p>
                    <input type="text" name="" id="" required value={kecamatan_tujuan} onChange={(e) => setKecamatan_tujuan(e.target.value)} />
                  </span>
                  <span>
                    <p>Kelurahan Tujuan</p>
                    <input type="text" name="" id="" required value={desa_tujuan} onChange={(e) => setDesa_tujuan(e.target.value)} />
                  </span>
                  <span>
                    <p>Kode Pos Tujuan</p>
                    <input type="number" name="" id="" value={kodePos_tujuan} onChange={(e) => setKodePos_tujuan(e.target.value)} />
                  </span>
                  <span>
                    <p>Telepon Tujuan</p>
                    <input type="number" name="" id="" value={telpon_tujuan} onChange={(e) => setTelpon_tujuan(e.target.value)} />
                  </span>
                  <span>
                    <p>Jenis Kepindahan</p>
                    <input type="text" name="" id="" value={jenis_kepindahan} onChange={(e) => setJenis_kepindahan(e.target.value)} required />
                  </span>
                  <span>
                    <p>Status KK Bagi Yang Tidak Pindah</p>
                    <input type="text" name="tanggal_surat" id="nama" value={statustidak_pindah} onChange={(e) => setStatustidak_pindah(e.target.value)} />
                  </span>
                  <span>
                    <p>Status KK Bagi Yang Pindah</p>
                    <input type="text" name="" id="" value={statuskk_pindah} onChange={(e) => setStatuskk_pindah(e.target.value)} />
                  </span>
                  <span>
                    <p>SHDK</p>
                    <input type="text" name="" id="" value={shdk} onChange={(e) => setShdk(e.target.value)} />
                  </span>
                  <span>
                    <p>Tanggal Ajukan</p>
                    <input type="date" name="tanggal_masuk" id="nama" required value={tanggal_masuk} onChange={(e) => setTanggal_masuk(e.target.value)} />
                  </span>
                  <span>
                    <p>Tanggal Surat</p>
                    <input type="date" name="tanggal_surat" id="nama" required value={tanggal_surat} onChange={(e) => setTanggal_surat(e.target.value)} />
                  </span>
                  <span>
                    <p>Sifat Surat</p>
                    <select value={sifat_surat} onChange={(e) => setSifat(e.target.value)}>
                      <option value="" disabled>Pilih Sifat Surat</option>
                      <option value="Pribadi">Pribadi</option>
                      <option value="Umum">Umum</option>
                    </select>
                  </span>
                  <span>
                    <p>No. WhatsApp</p>
                    <input type="text" name="no_wa" required id="nama" placeholder="+62" value={no_wa} onChange={(e) => setNo_wa(e.target.value)} />
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
            {visibleLainnya && (
              <form onSubmit={handleSubmit} method="post" action="">
                <h1 className="p-3" style={{ textAlign: 'center' }}>Formulir Surat Lainnya</h1>
                <section>
                  <span>
                    <p>Nama Lengkap</p>
                    <input type="text" name="nama" id="nama" required value={nama} onChange={(e) => setNama(e.target.value)} />
                  </span>
                  <span>
                    <p>Nik</p>
                    <input type="number" name="" id="" value={nik} onChange={(e) => setNik(e.target.value)} />
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
                    <p>Status Perkawinan</p>
                    <select
                      value={status} onChange={(e) => setStatus(e.target.value)}>
                      <option>Pilih Status Perkawinan</option>
                      <option value="Lajang">Lajang</option>
                      <option value="Sudah Menikah">Sudah Menikah</option>
                    </select>
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
                    <input type="text" name="alamat" id="nama" value={alamat} onChange={(e) => setAlamat(e.target.value)} />
                  </span>
                  <span>
                    <p>Pekerjaan</p>
                    <input type="text" name="" id="" value={pekerjaan} onChange={(e) => setPekerjaan(e.target.value)} />
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
                    <input type="text" name="" id="" value={kecamatan} onChange={(e) => setKecamatan(e.target.value)} />
                  </span>
                  <span>
                    <p>Kabupaten / Kota</p>
                    <input type="text" name="" id="" value={kabupaten} onChange={(e) => setKabupaten(e.target.value)} />
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
                    <p>Sifat Surat</p>
                    <select value={sifat_surat} onChange={(e) => setSifat(e.target.value)}>
                      <option value="" disabled>Pilih Sifat Surat</option>
                      <option value="Pribadi">Pribadi</option>
                      <option value="Umum">Umum</option>
                    </select>
                  </span>
                  <span>
                    <p>Lampiran Surat</p>
                    <input type="text" name="" id="" placeholder="Jika memilih Lainnnya" value={penghasilan} onChange={(e) => setPenghasilan(e.target.value)} />
                  </span>
                  <span>
                    <p>No. WhatsApp</p>
                    <input type="text" name="no_wa" required id="nama" placeholder="+62" value={no_wa} onChange={(e) => setNo_wa(e.target.value)} />
                  </span>
                </section>
                <section className="d-flex justify-content-between">
                  <button type="submit" style={{ backgroundColor: '#27323A' }}>Simpan</button>
                  <button style={{ backgroundColor: '#900000' }}>Batal</button>
                </section>
              </form>
            )}
          </div>
        </article >
      </div >
      {/* Pop-up component */}
      {
        isPopupVisible && (
          <div className="popup popUpUser">
            <div className="popup-content">
              <h2>Data Anda Berhasil Terkirim</h2>
              <button onClick={handlePopupClose}>Tutup</button>
            </div>
          </div>
        )
      }
    </>
  )
}
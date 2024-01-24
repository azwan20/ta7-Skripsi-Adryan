import { useState } from "react";
import SekretarisAside from "./sekretarisAside";

export default function TambahArsip() {
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
    return (
        <>
            <div className="tambah-arsip d-flex">
                <SekretarisAside />
                <article className="d-flex flex-column align-items-center justify-content-between">
                    <section>
                        <span>
                            <p>No. Surat</p>
                            <input type="text" />
                        </span>
                        <span>
                            <p>File Arsip</p>
                            <input type="file" />
                        </span>
                        <span>
                            <p>Alamat Surat</p>
                            <input type="text" />
                        </span>
                        <span>
                            <p>Jenis Surat</p>
                            <input type="text" />
                        </span>
                        <span>
                            <p>Tanggal Terima</p>
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
                    </section>
                    <section className="d-flex justify-content-between">
                        <button onClick={handleSimpanClick} style={{ backgroundColor: '#27323A' }}>Simpan</button>
                        <button style={{ backgroundColor: '#900000' }}>Batal</button>
                    </section>
                </article>
            </div>
            {/* Pop-up component */}
            {isPopupVisible && (
                <div className="popup">
                    <div className="popup-content">
                        <h2>Input Data Selesai</h2>
                        <button onClick={handlePopupClose}>Tutup</button>
                    </div>
                </div>
            )}
        </>
    )
}
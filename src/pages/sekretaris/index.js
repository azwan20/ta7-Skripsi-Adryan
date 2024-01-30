import SekretarisAside from "./sekretarisAside";

export default function Home() {
    return (
        <>
            <div className="sekretaris d-flex">
                <SekretarisAside />
                <article style={{ maxHeight: '100vh', overflowY: 'auto' }}>
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col" style={{ display: 'none' }}>ID</th>
                                <th scope="col">No</th>
                                <th scope="col">File Arsip</th>
                                <th scope="col">Tanggal Masuk</th>
                                <th scope="col">Tanggal Keluar</th>
                                <th scope="col">Nama Penerima</th>
                                <th scope="col">Alamat Pengirim</th>
                                <th scope="col">No.Surat</th>
                                <th scope="col">Jenis Surat</th>
                                <th scope="col">Tanggal Surat</th>
                                <th scope="col">Sifat Surat</th>
                                <th scope="col">Perihal Lampiran</th>
                                <th scope="col">No WhatsApp</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {data.map((value, index) => ( */}
                                <tr>
                                    <td style={{ display: 'none' }}></td>
                                    <td>index + 1</td>
                                    <td>value.file</td>
                                    <td>value.tanggl_masuk</td>
                                    <td>value.tanggal_ajukan</td>
                                    <td>value.nama_penerima</td>
                                    <td>value.alamat_pengirim</td>
                                    <td>value.no_surat</td>
                                    <td>value.jenis</td>
                                    <td>value.tanggal_surat</td>
                                    <td>value.sifat</td>
                                    <td>value.perihal</td>
                                    <td>value.no_wa</td>
                                </tr>
                            {/* ))} */}
                        </tbody>
                    </table>
                </article>
            </div>
            {/* {isEditMode && editPopupRow && (
                <div className="popup newPop">
                    <div className="popup-content">
                        {/* Render the edit form with data from the selected row */}
            {/* <h2>Edit Row ID: {editPopupRow}</h2>
            <div>
                <span>
                    <p>File Arsip</p>
                    <input type="file" name="file" onChange={(e) => setEditFormData({ ...editFormData, file: e.target.files[0] })} />
                </span>
                <span>
                    <p>No. WhatsApp</p>
                    <input type="text" placeholder="+62" name="no_wa" value={editFormData.no_wa} onChange={(e) => setEditFormData({ ...editFormData, no_wa: e.target.value })} />
                </span>
                <span>
                    <p>Jenis Surat</p>
                    <input type="text" name="jenis" value={editFormData.jenis} onChange={(e) => setEditFormData({ ...editFormData, jenis: e.target.value })} />
                </span>
                <span>
                    <p>Tanggal Ajukan</p>
                    <input type="date" name="tanggal_ajukan" value={editFormData.tanggal_ajukan} onChange={(e) => setEditFormData({ ...editFormData, tanggal_ajukan: e.target.value })} />
                </span>
                <span>
                    <p>Tanggal Surat</p>
                    <input type="date" name="tanggal_surat" value={editFormData.tanggal_surat} onChange={(e) => setEditFormData({ ...editFormData, tanggal_surat: e.target.value })} />
                </span>
                <span>
                    <p>Sifat Surat</p>
                    <input type="text" name="sifat" value={editFormData.sifat} onChange={(e) => setEditFormData({ ...editFormData, sifat: e.target.value })} />
                </span>
                <span>
                    <p>Perihal Lampiran</p>
                    <input type="text" name="perihal" value={editFormData.perihal} onChange={(e) => setEditFormData({ ...editFormData, perihal: e.target.value })} />
                </span>
            </div>
            <span className="d-flex">
                <button style={{ backgroundColor: 'green', color: '#000' }} onClick={handleSaveClick}>Update</button>
                <button>Delete</button>
                <button onClick={handlePopupClose}>Tutup</button>
            </span>
        </div >
                </div >
            )
} * /} */}
        </>
    )
}
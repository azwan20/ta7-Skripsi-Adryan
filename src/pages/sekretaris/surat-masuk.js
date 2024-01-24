import SekretarisAside from "./sekretarisAside";

export default function SuratMasuk() {
    return (
        <>
            <div className="surat-masuk d-flex">
                <SekretarisAside />
                <article>
                    <div className="d-flex justify-content-end">
                        <button>
                            <svg style={{ marginRight: '1rem' }} xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                                <rect y="6.29016" width="15" height="2.41935" rx="1.20968" fill="white" />
                                <rect x="6.29016" y="15" width="15" height="2.41935" rx="1.20968" transform="rotate(-90 6.29016 15)" fill="white" />
                            </svg>
                            Tambah Arsip
                        </button>
                    </div>
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Nama Penerima</th>
                                <th scope="col">No.Surat</th>
                                <th scope="col">File Arsip</th>
                                <th scope="col">Alamat Surat</th>
                                <th scope="col">Jenis Surat</th>
                                <th scope="col">Tanggal Terima</th>
                                <th scope="col">Tanggal Surat</th>
                                <th scope="col">Sifat Surat</th>
                                <th scope="col">Perihal Lampiran</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td scope="row">1</td>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                                <td>@mdo</td>
                                <td>@mdo</td>
                                <td>@mdo</td>
                                <td>@mdo</td>
                                <td>@mdo</td>
                            </tr>
                            <tr>
                                <td scope="row">2</td>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>Thornton</td>
                                <td>Thornton</td>
                                <td>Thornton</td>
                                <td>Thornton</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                            </tr>
                        </tbody>
                    </table>
                </article>

            </div>
        </>
    )
}
import SekretarisAside from "./sekretarisAside";

export default function Home() {
    return (
        <>
            <div className="sekretaris d-flex">
                <SekretarisAside />
                <article>
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
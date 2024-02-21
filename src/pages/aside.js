import Link from "next/link";
import { useState } from "react";

export default function Aside({ isSku, isSt, isSktm, isSkd, isSkp, islainnya, handleButtonClick }) {
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);

    };
    return (
        <>
            <div className="d-flex sidebar">
                <div className={`asideIndex ${sidebarVisible ? 'visible' : 'hidden'}`}>
                    <aside id="aside">
                        <section className="identify" style={{ height: '25%' }}>
                            <div className="container-fluid text-light d-flex flex-column align-items-center">
                                <h5>Kantor Desa Pao</h5>
                            </div>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/b/bc/Luwu_Utara_Logo_%28North_Luwu%29.png" alt="Profile" width={100} height={120} />
                            <div />
                        </section>
                        <section style={{ height: '75%', paddingTop: '30px' }}>
                            <span style={{ width: '90%' }}>
                                <button className={isSkp ? "active" : ""} onClick={() => handleButtonClick("skp")}>
                                    Surat Keterangan Pindah
                                </button>
                                <button className={isSt ? "active" : ""} onClick={() => handleButtonClick("st")}>
                                    Surat Tugas
                                </button>
                                <button className={isSktm ? "active" : ""} onClick={() => handleButtonClick("sktm")}>
                                    Surat Keterangan Tidak Mampu
                                </button>
                                <button className={isSkd ? "active" : ""} onClick={() => handleButtonClick("skd")}>
                                    Surat Keterangan Domisili
                                </button>
                                <button className={isSku ? "active" : ""} onClick={() => handleButtonClick("sku")}>
                                    Surat Keteranagan Usaha
                                </button>
                                <button className={islainnya ? "active" : ""} onClick={() => handleButtonClick("lainnya")}>
                                    Lainnya
                                </button>
                            </span>
                        </section>
                    </aside>
                </div>
                <div className={`buttonAside ${sidebarVisible ? 'hiddenAdd' : ''}`} onClick={toggleSidebar}>
                    <p>PRIHAL</p>
                </div>
            </div>
            <style jsx>{`
                button {
                    background-color: transparent;
                    border: 1px solid var(--fourth-color);
                    padding: 10px;
                    cursor: pointer;
                    color: #ffffff;
                }

                button.active {
                    background-color: #ffffff;
                    color: #000;
                    border: none;
                }

                .logout {

                }
            `}</style>
        </>
    )
}

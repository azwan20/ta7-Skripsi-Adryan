import Link from "next/link";
import { useState } from "react";

export default function Aside() {
    const [isTransaksiActive, setIsTransaksiActive] = useState(true);
    const [isProdukActive, setIsProdukActive] = useState(false);

    const handleButtonClick = (buttonType) => {
        if (buttonType === "transaksi") {
            setIsTransaksiActive(true);
            setIsProdukActive(false);
        } else if (buttonType === "produk") {
            setIsTransaksiActive(false);
            setIsProdukActive(true);
        }
    };

    return (
        <>
            <aside>
                <section style={{ height: '25%' }}>
                    <div className="container-fluid text-light d-flex flex-column align-items-center">
                        <h5>Kantor Desa Pao</h5>
                    </div>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/bc/Luwu_Utara_Logo_%28North_Luwu%29.png" alt="Profile" width={100} height={120} />
                    <div />
                </section>
                <section style={{ height: '75%', paddingTop: '30px' }}>
                    <span style={{ width: '90%' }}>
                        <Link href="">
                            <button className={isTransaksiActive ? "active" : ""} onClick={() => handleButtonClick("transaksi")}>
                                Input Surat
                            </button>
                        </Link>
                    </span>
                </section>
            </aside>
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

import { useEffect, useState } from "react";
import SekretarisAside from "./sekretarisAside";
import Navbar from "./navbar";
import Link from "next/link";

export default function Arsip() {
    const [isHomeActive, setIsHomeActive] = useState(true);
    const [isMasukActive, setIsMasukActive] = useState(false);
    const [isKeluarActive, setIsKeluarActive] = useState(false);

    const handleButtonClick = (buttonType) => {
        if (buttonType === "home") {
            setIsHomeActive(true);
            setIsMasukActive(false);
            setIsKeluarActive(false);
        } else if (buttonType === "masuk") {
            setIsHomeActive(false);
            setIsMasukActive(true);
            setIsKeluarActive(false);
        } else if (buttonType === "keluar") {
            setIsHomeActive(false);
            setIsMasukActive(false);
            setIsKeluarActive(true);
        }
    };

    return (
        <>
            <div className="sekretaris d-flex">
                <SekretarisAside isHomeActive={isHomeActive} isMasukActive={isMasukActive} isKeluarActive={isKeluarActive} handleButtonClick={handleButtonClick} />
                <article style={{ maxHeight: '100vh', overflowY: 'auto' }}>
                    <h1>Ini home</h1>
                </article>
                <Navbar isHomeActive={isHomeActive} isMasukActive={isMasukActive} isKeluarActive={isKeluarActive} handleButtonClick={handleButtonClick} />
            </div>
        </>
    )
}
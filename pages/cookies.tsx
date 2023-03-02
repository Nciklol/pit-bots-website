import { NextPage } from "next";
import Head from "next/head";
import { useState, useEffect } from "react";

const Cookies: NextPage = () => {
    const [cookieAmount, setCookieAmount] = useState(0);

    const [cookieText, setCookieText] = useState("");
    const [dragging, setDragging] = useState(false);

    const renderCookies = async (files: FileList) => {
        let finalText = "";
        let i = 0;

        for (const file of files) {
            let content = await file.text();

            const cookies = content.split("\n");
            for (const cookie of cookies) {
                // finalText += cookie + "\n\n";
                const inside = cookie.split("\t");
                if (!inside[0].endsWith(".live.com")) return;
                if (inside.includes("__Host-MSAAUTHP")) {
                    i++;
                    finalText += content + "\n\n";
                }
            }
        }

        finalText = finalText.slice(0, -2);

        const set = new Set();

        finalText.split("\n\n").forEach((x) => set.add(x.trim()));

        finalText = Array.from(set).join("\n\n\n");

        setCookieAmount(i);
        // setCookieText(finalText);

        const element = document.createElement("a");
        element.setAttribute(
            "href",
            "data:text/plain;charset=utf-8," + encodeURIComponent(finalText),
        );
        element.setAttribute("download", "cookies.txt");

        element.style.display = "none";
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    };

    useEffect(() => {
        const renderCookies = async (files: FileList) => {
            let finalText = "";
            let i = 0;

            for (const file of files) {
                let content = await file.text();

                const cookies = content.split("\n");
                for (const cookie of cookies) {
                    // finalText += cookie + "\n\n";
                    const inside = cookie.split("\t");
                    console.log(inside);
                    if (inside.includes("__Host-MSAAUTHP")) {
                        i++;
                        finalText += content + "\n\n";
                    }
                }
            }

            finalText = finalText.slice(0, -2);

            const set = new Set();

            finalText.split("\n\n").forEach((x) => set.add(x.trim()));

            finalText = Array.from(set).join("\n\n\n");

            console.log(finalText);

            setCookieAmount(i);
            // setCookieText(finalText);

            const element = document.createElement("a");
            element.setAttribute(
                "href",
                "data:text/plain;charset=utf-8," +
                    encodeURIComponent(finalText),
            );
            element.setAttribute("download", "cookies.txt");

            element.style.display = "none";
            document.body.appendChild(element);

            element.click();

            document.body.removeChild(element);
        };

        window.addEventListener("drop", (e) => {
            if (!e.dataTransfer?.files) return;
            e.preventDefault();
            setDragging(false);
            const files = e.dataTransfer?.files;
            if (files) {
                renderCookies(files);
            }
        });

        window.addEventListener("dragover", (e) => {
            e.preventDefault();
            setDragging(true);
        });

        window.addEventListener("dragleave", (e) => {
            e.preventDefault();
            setDragging(false);
        });
    }, []);

    return (
        <>
            <Head>
                <title>Found {cookieAmount} valid cookies!</title>
            </Head>
            {cookieText ? (
                <div className="flex flex-col items-center justify-center w-full h-screen bg-black">
                    <div className="flex flex-col items-center justify-center w-[40%] h-[90%] border-dashed border-2 border-white text-white rounded-lg">
                        <p className="text-2xl overflow-auto w-full h-full whitespace-pre-wrap">
                            {cookieText}
                        </p>
                    </div>
                </div>
            ) : dragging ? (
                <div className="flex flex-col items-center justify-center w-full h-screen border-4 border-dashed  bg-black">
                    <div
                        className="flex flex-col items-center justify-center w-[40%] h-[30%] border-2 border-dashed border-white text-white rounded-lg"
                        onClick={() => {
                            // @ts-ignore
                            document.querySelector("input[type=file]")?.click();
                        }}
                    >
                        <p className="text-2xl select-none">
                            Click to upload or drag and drop
                        </p>

                        <input type="file" className="hidden"></input>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center w-full h-screen bg-black">
                    <div
                        className="flex flex-col items-center justify-center w-[40%] h-[30%] border-dashed border-2 border-white text-white "
                        onClick={() => {
                            // @ts-ignore
                            document.querySelector("input[type=file]")?.click();
                        }}
                    >
                        <p className="text-2xl select-none">
                            Click to upload or drag and drop
                        </p>

                        <input
                            type="file"
                            className="hidden"
                            onSubmit={(e) => {
                                // @ts-ignore
                                const files = e.dataTransfer?.files;
                                if (files) {
                                    renderCookies(files);
                                }
                            }}
                            multiple
                        ></input>
                    </div>
                </div>
            )}
        </>
    );
};

export default Cookies;

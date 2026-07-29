/* eslint-disable @next/next/no-img-element */


import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt =
    "Boutique de Chaussures — chaussures de sport, de ville et élégantes";

export const size = {
    width: 1200,
    height: 630,
};

export const contentType = "image/png";

// Permet de lire une image locale avec les API Node.js.
export const runtime = "nodejs";

export default async function OpenGraphImage() {
    const imageBuffer = await readFile(
        join(
            process.cwd(),
            "public/images/seo/air-jordan-og.png"
        )
    );

    const productImageSrc = Uint8Array.from(imageBuffer).buffer;


    return new ImageResponse(
        (
            <div
                style={{
                    position: "relative",
                    display: "flex",
                    width: "100%",
                    height: "100%",
                    overflow: "hidden",
                    background: "#fafaf7",
                    color: "#111111",
                    //   fontFamily: "Arial, sans-serif",
                }}
            >
                {/* Ligne d'accent supérieure */}
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        display: "flex",
                        width: "100%",
                        height: 14,
                        background: "#c2410c",
                    }}
                />

                {/* Contenu textuel */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        width: "62%",
                        height: "100%",
                        padding: "68px 54px 56px 64px",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                marginBottom: 38,
                                fontSize: 22,
                                fontWeight: 700,
                                color: "#c2410c",
                            }}
                        >
                            BOUTIQUE · CANADA
                        </div>

                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                fontSize: 68,
                                fontWeight: 800,
                                lineHeight: 1.05,
                            }}
                        >
                            <span>{siteConfig.name}</span>
                        </div>

                        <p
                            style={{
                                maxWidth: 620,
                                marginTop: 30,
                                marginBottom: 0,
                                fontSize: 28,
                                lineHeight: 1.4,
                                color: "#4b4b4b",
                            }}
                        >
                            Sport, ville et élégance. Trouvez la paire qui accompagne chaque
                            pas de votre quotidien.
                        </p>
                    </div>

                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            fontSize: 21,
                            fontWeight: 700,
                            color: "#1f4d3a",
                        }}
                    >
                        SPORT · VILLE · DÉCONTRACTÉ · ÉLÉGANT
                    </div>
                </div>

                {/* Zone produit */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "38%",
                        height: "100%",
                        padding: "54px 46px 54px 20px",
                        background: "#f1ece4",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "100%",
                            height: "100%",
                            overflow: "hidden",
                            border: "1px solid #e5e5e5",
                            borderRadius: 8,
                            background: "#ffffff",
                        }}
                    >
                        <img
                            src={productImageSrc as unknown as string}
                            alt=""
                            width={390}
                            height={430}
                            style={{
                                width: "390px",
                                height: "430px",
                                objectFit: "cover",
                            }}
                        />
                    </div>
                </div>

                {/* Repère décoratif inférieur */}
                <div
                    style={{
                        position: "absolute",
                        right: 0,
                        bottom: 0,
                        display: "flex",
                        width: 160,
                        height: 14,
                        background: "#1f4d3a",
                    }}
                />
            </div>
        ),
        {
            ...size,
        },
    );
}
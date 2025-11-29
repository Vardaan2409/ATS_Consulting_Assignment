"use client";

import Image from "next/image";
import { useState } from "react";

export default function SafeImage(props: any) {
    const { src, alt, ...rest } = props;

    const [imgSrc, setImgSrc] = useState(src);

    return (
        <Image
            {...rest}
            src={imgSrc || "/unavailable.svg"}
            alt={alt}
            onError={() => setImgSrc("/unavailable.svg")}
        />
    );
}

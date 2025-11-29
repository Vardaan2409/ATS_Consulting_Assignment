"use client";

import { useEffect } from "react";

export default function RedirectClient({ url }: { url: string }) {
    useEffect(() => {
        window.location.href = url;
    }, [url]);

    return <p className="text-center py-20">Opening article...</p>;
}

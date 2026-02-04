import { useEffect, useState } from "react";
export const useTypingEffect = (text, speed = 20) => {
    const [displayedText, setDisplayedText] = useState("");
    useEffect(() => {
        if (!text)
            return;
        setDisplayedText("");
        let index = 0;
        const interval = setInterval(() => {
            setDisplayedText((prev) => prev + text[index]);
            index++;
            if (index >= text.length) {
                clearInterval(interval);
            }
        }, speed);
        return () => clearInterval(interval);
    }, [text, speed]);
    return displayedText;
};

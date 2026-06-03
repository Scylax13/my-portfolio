import { useState, useEffect } from "react";

const useTypingEffect = (texts, speed = 150, delay = 2000) => {
    const [text, setText] = useState('');
    const [index, setIndex] = useState(0);
    const [subIndex, setSubIndex] = useState(0);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        if (!texts.length) return;

        const currentText = texts[index % texts.length];
        const isComplete = subIndex === currentText.length;
        const isEmpty = subIndex === 0;

        const timeout = setTimeout(() => {
            if (isComplete && !deleting) {
                setDeleting(true);
                return;
            }

            if (isEmpty && deleting) {
                setDeleting(false);
                setIndex((prev) => (prev + 1) % texts.length);
                return;
            }

            const nextSubIndex = subIndex + (deleting ? -1 : 1);
            setSubIndex(nextSubIndex);
            setText(currentText.substring(0, nextSubIndex));
        }, isComplete && !deleting ? delay : deleting ? speed / 2 : speed);

        return () => clearTimeout(timeout);
    }, [subIndex, index, deleting, texts, speed, delay]);

    return text;
};

export default useTypingEffect;

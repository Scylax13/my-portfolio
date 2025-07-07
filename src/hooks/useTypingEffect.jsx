import { useState, useEffect } from "react";

const useTypingEffect = (texts, speed = 150, delay = 2000)=>{
    const [text, setText] = useState('')
    const [index, setIndex] = useState(0);
    const [subIndex, setSubIndex] = useState(0);
    const [deleting, setDeleting] = useState(false);

    useEffect(()=>{
        if(index===texts.length){
            setIndex(0);
            return;
        }

        if(subIndex===texts[index].length+1 && !deleting){
            setDeleting(true);
            return;
        }
        if(subIndex === 0 && deleting){
            setDeleting(false);
            setIndex(prev => prev+1);
            return;
        }

        const timeout = setTimeout(()=>{
            setSubIndex(prev=>prev + (deleting ? -1 : 1));
            setText(texts[index].substring(0,subIndex));
        },deleting?speed/2:speed);
    
        return()=> clearTimeout(timeout);
    }, [subIndex, index, deleting, texts, speed]);
    
    return text;
};

export default useTypingEffect;
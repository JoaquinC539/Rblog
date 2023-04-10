import {useState,useEffect} from 'react';

const useWindowSize=()=>{
    const [windowSize,setWidnowSize]=useState({
        width:undefined,
        height:undefined
    });
    
    useEffect(()=>{

        const handleResize=()=>{
            setWidnowSize({
                width:window.innerWidth,
                height:window.innerHeight
            });
        }

        handleResize();
        window.addEventListener("resize",handleResize);


        return ()=>window.removeEventListener("resize",handleResize);

    },[])
    return windowSize;
}
export default useWindowSize;

// An highlighted block
import { useEffect, useState } from 'react'
import { useDebounceFn } from 'ahooks';


function useScrollTop() {
    const [scrollTop, setScrollTop] = useState<any>();

    const isScrollTop = () => {

        setScrollTop(document.documentElement.scrollTop);

    };

    const { run } = useDebounceFn(isScrollTop, {
        wait: 100,
    });
    useEffect(() => {
        document.addEventListener('scroll', run)
    }, [])

    return scrollTop
}

export default useScrollTop

import { useEffect, useRef } from 'react';

const MathJax = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/MathJax.js?config=TeX-MML-AM_CHTML';
    script.async = true;

    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
};

export default MathJax;
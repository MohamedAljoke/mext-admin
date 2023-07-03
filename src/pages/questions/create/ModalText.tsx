import MathJax from '@/App/hook/mathJsx'
import React, { useEffect } from 'react'

export default function ModalText({ questionTextState }: { questionTextState: string }) {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.MathJax) {
      window.MathJax.Hub.Queue(['Typeset', window.MathJax.Hub, 'content']); // Queue typesetting for 'content' element
    }
  }, [questionTextState]);
  return (
    <div>
      <p id="content">{`${questionTextState}`}</p>
      <MathJax />
    </div>
  )
}

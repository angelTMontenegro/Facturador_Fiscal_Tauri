interface BotonProps {
  texto: string
  nameC: string
  click: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export default function Boton({texto, click, nameC}:BotonProps) {
  
  return (
    <button type="button" className = {nameC} onClick={click}> 
      {texto}
    </button>
  )
}
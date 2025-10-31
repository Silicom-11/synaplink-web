export default function LongDescription() {
  const verEnAccion = () => {
    alert('Acción: Ver SynapLink en Acción — video/demo.');
    const el = document.querySelector('#por-que');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };
  
  const openContact = () => {
    const el = document.querySelector('#contacto');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };
  
  return (
    <>
     
    </>
  );
}

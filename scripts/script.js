/* bron: https://codepen.io/prathammpurohit/pen/ExeKPgq */

const blob=document.querySelector('.blob');
window.addEventListener('pointermove',(e)=>{
  const {clientX,clientY}=e;
  console.log(clientX,clientY)
  // blob.style.left=`${clientX}px`;
  // blob.style.top=`${clientY}px`;
  blob.animate({
    left:`${clientX}px`,
    top:`${clientY}px`
  },{duration:3000, fill:"forwards"})
})
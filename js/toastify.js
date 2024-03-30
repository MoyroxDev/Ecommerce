export function mostrarToastify(titulo,size) {
  let x,y;
  let key = false;

  if (size > 768) {
    x = "2.5rem";
    y = "1.5rem"
    key = true;

  }else{
    x = "0rem";
    y = "0rem";
  }

  Toastify({
      text: titulo,
      duration: 1000,
      newWindow: true,
      close: key,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        width: "max-content",
        background: "linear-gradient(to right, #2d4997, #4e71cf)",
        borderRadius: "2rem",
        fontSize: ".7rem",
        textTransform: "uppercase"
      },  
      offset: {
          x: x, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
          y: y // vertical axis - can be a number or a string indicating unity. eg: '2em'
      },
      onClick: function(){} // Callback after click
  }).showToast();
}


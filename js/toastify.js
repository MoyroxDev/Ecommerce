export function mostrarToastify(titulo) {
    Toastify({
        text: titulo,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #2d4997, #4e71cf)",
          borderRadius: "2rem",
          fontSize: ".7rem",
          textTransform: "uppercase"
        },  
        offset: {
            x: "2.5rem", // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: "1.5rem" // vertical axis - can be a number or a string indicating unity. eg: '2em'
        },
        onClick: function(){} // Callback after click
      }).showToast();
}
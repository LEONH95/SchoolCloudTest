import swal from 'sweetalert2';

export function TypeSuccess(msg) {
  swal.fire({
    title: "Good job!",
    text: msg,
    icon: "success",
    customClass: {
      confirmButton: 'btn btn-primary'
    },
    buttonsStyling: false,
  });
}

// Info
export function TypeInfo(msg) {
  swal.fire({
    title: "Info!",
    text: msg,
    icon: "info",
    customClass: {
      confirmButton: 'btn btn-primary'
    },
    buttonsStyling: false,
  });
}

// Warning
export function TypeWarning(msg) {
  swal.fire({
    title: "Warning!",
    text: msg,
    icon: "warning",
    customClass: {
      confirmButton: 'btn btn-primary'
    },
    buttonsStyling: false,
  });
}

// Error
export function TypeError(msg) {
  let message:any;

  if(!msg){
    return;
  }

  message = Object.keys(msg);

  swal.fire({
    title: "Error",
    text: `Error en ${message}`,
    icon: "error",
    customClass: {
      confirmButton: 'btn btn-primary'
    },
    buttonsStyling: false,
  });
}




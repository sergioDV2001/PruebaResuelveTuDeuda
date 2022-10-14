var tipoDeuda = document.getElementById("tipoDeuda");
var rango = document.getElementById("range");
var botonSiguiente = document.getElementById("continuar");
var botonEnviar = document.getElementById("enviar");
var formularioBancaria = document.getElementById("formularioBancaria");
var formularioFinanciera = document.getElementById("formularioFinanciera");

tipoDeuda.addEventListener("change", siguienteDeuda);

botonSiguiente.addEventListener("click", siguienteFormulario);
botonEnviar.addEventListener("click", comprobarDatosPersonales);

function comprobarDeuda() {
  if (rango.value == 250) {
    document.getElementById("salidaDinero").textContent = "Deuda mayor";
  } else {
    document.getElementById("salidaDinero").textContent =
      rango.value + ",000 €";
  }
}

function siguienteDeuda() {
  if (tipoDeuda.value !== "Selecciona una opcion") {
    switch (tipoDeuda.value) {
      case "Bancaria":
        formularioFinanciera.hidden = true;
        formularioBancaria.hidden = false;
        formularioFinanciera.style.opacity = 0;
        setTimeout(function () {
          formularioBancaria.style.opacity = 100;
        }, 50);

        break;

      case "Financiera":
        formularioBancaria.hidden = true;
        formularioFinanciera.hidden = false;
        formularioBancaria.style.opacity = 0;
        setTimeout(function () {
          formularioFinanciera.style.opacity = 100;
        }, 50);

        break;
    }
  }
}

function siguienteFormulario() {
  if (!document.querySelector('input[name="radioBanco"]:checked')) {
    document.getElementById("errorAlerta").hidden = false;
  }

  let radioBanco = document.querySelector(
    'input[name="radioBanco"]:checked'
  ).value;

  if (tipoDeuda.value !== "Selecciona una opcion" && radioBanco !== "") {
    localStorage.setItem("tipoDeuda", tipoDeuda.value);
    localStorage.setItem("empresa", radioBanco);
    localStorage.setItem(
      "cantidadDeuda",
      document.getElementById("salidaDinero").textContent
    );

    document.getElementById("formularioDeudas").hidden = true;
    document.getElementById("formularioDatosPersonales").hidden = false;
    setTimeout(function () {
      document.getElementById("formularioDatosPersonales").style.opacity = 100;
    }, 50);
  } else {
    document.getElementById("errorAlerta").hidden = false;
  }
}

function comprobarDatosPersonales() {
  let datosNombre = document.getElementById("formularioDatosNombre").value;
  let datosApellidos = document.getElementById(
    "formularioDatosApellidos"
  ).value;
  let datosTelefono = document.getElementById("formularioDatosTelefono").value;
  let datosCorreo = document.getElementById("formularioDatosCorreo").value;
  let errorCorreo = document.getElementById("errorCorreo");
  let errorTelefono = document.getElementById("errorTelefono");
  let expCorreo = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
  let expTelefono = new RegExp("[0-9]{9}");

  if (!expCorreo.test(datosCorreo)) {
    errorCorreo.hidden = false;
  } else {
    errorCorreo.hidden = true;
  }

  if (!expTelefono.test(datosTelefono)) {
    errorTelefono.hidden = false;
  } else {
    errorTelefono.hidden = true;
  }

  if (
    datosNombre !== "" &&
    datosApellidos !== "" &&
    datosTelefono !== "" &&
    datosCorreo !== ""
  ) {
    localStorage.setItem("datoNombre", datosNombre);
    localStorage.setItem("datoApellidos", datosApellidos);
    localStorage.setItem("datoTelefono", datosTelefono);
    localStorage.setItem("datoCorreo", datosCorreo);

    location.href = "pantallaFinal.html";
  }
}

$(document).ready(function () {
  // Configuración del carrusel
  var slideInterval = 5000; // Intervalo de cambio de diapositiva en milisegundos
  var $carousel = $('#carouselExampleIndicators');
  
  // Función para cambiar a la siguiente diapositiva
  function nextSlide() {
    $carousel.carousel('next');
  }

  // Iniciar intervalo de cambio automático
  var intervalId = setInterval(nextSlide, slideInterval);

  // Detener el intervalo cuando el mouse está sobre el carrusel
  $carousel.mouseenter(function() {
    clearInterval(intervalId);
  });

  // Reanudar el intervalo cuando el mouse sale del carrusel
  $carousel.mouseleave(function() {
    intervalId = setInterval(nextSlide, slideInterval);
  });

  // Tooltip initialization
  $('[data-bs-toggle="tooltip"]').tooltip();

  // Evento click boton tooltip formulario
  $(".d-inline-block").click(function () {
    alert("El correo fue enviado correctamente...");
  });

  // Selectores de etiqueta titulos de las section
  $(".display-4").dblclick(function () {
    $(this).css("color", "red");
  });

  // Selectores de clase descripcion tarjetas ocultar/mostrar
  $(".card-img-top").click(function () {
    $(this).siblings(".card-body").toggle();
  });

  // Evento click enlaces de la barra de navegación
  $('#menu a.nav-link').on('click', function (event) {
    if (this.hash !== "") {
      event.preventDefault();

      var hash = this.hash;

      // Animación de desplazamiento suave
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 100, function () {        // desplazamiento suave si pongo 800 se mueve lento
        window.location.hash = hash;
      });
    }
  });
});

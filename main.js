document.addEventListener('DOMContentLoaded', ()=> {

  const datos = {
      email: '',
      asunto: '',
      mensaje: ''
  }
  
  const inputEmail = document.getElementById('email');
  const inputAsunto = document.querySelector('#asunto');
  const inputMsj = document.querySelector('#mensaje');
  const btnSubmit = document.querySelector('#formulario button[type="submit"]');
  const btnReset = document.querySelector('#formulario button[type="reset"]')
  const form = document.querySelector('#formulario');

  inputEmail.addEventListener('blur', validar);
  inputAsunto.addEventListener('input' , validar);
  inputMsj.addEventListener('input' , validar);

  btnReset.addEventListener('click', (e) => {
      e.preventDefault();
      resetForm();
  })

  function validar(e){
      if(e.target.id === 'mensaje'){
          datos.mensaje = e.target.value.trim();
          submit();
          return;
      }

      if(e.target.value.trim() === '') {
          if(e.target.parentElement) {
              limpiarAlerta(e.target.parentElement);
          }
          const msjError = document.createElement('p');
          msjError.textContent = 'Este campo es obligatorio'
          msjError.classList.add('text-red-600', 'p-1', 'text-left', 'alerta');
          e.target.parentElement.appendChild(msjError)
          submit();
          return;
      } 
      if(e.target.id === 'email' && !validadEmail(e.target.value)){
          if(e.target.parentElement) {
              limpiarAlerta(e.target.parentElement);
          }
          const msjError = document.createElement('p');
          msjError.textContent = 'Email incorrecto'
          msjError.classList.add('text-red-600', 'p-1', 'text-left', 'alerta');
          e.target.parentElement.appendChild(msjError)
          submit();
          return;
      }

      limpiarAlerta(e.target.parentElement);
      datos[e.target.name] = e.target.value.trim().toLowerCase();

      submit();
  }

  function validadEmail(email){
      const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
      result = regex.test(email)
      return result;
  }
  function limpiarAlerta(elemet){
      const alerta = elemet.querySelector('.alerta');
      if (alerta) {
          alerta.remove();
      }
  }
  function submit() {
      if(Object.values(datos).includes('')){
          btnSubmit.classList.add('opacity-50');
          btnSubmit.disabled = true;
          return
      }
      btnSubmit.classList.remove('opacity-50');
      btnSubmit.disabled = false;
  }
  function resetForm() {
    
      datos.email = ''
      datos.asunto = ''
      datos.mensaje = ''

      form.reset();
      submit();
  }
})
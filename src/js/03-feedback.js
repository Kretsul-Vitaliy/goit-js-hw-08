import throttle from 'lodash.throttle';
const LOCAL_STORAGE_KEY = 'feedback-form-state';
const formRef = document.querySelector('.feedback-form')

// прослушиваем форму и submit
formRef.addEventListener('submit', onFormSubmit);
formRef.addEventListener('input', throttle(onInputForm, 500));

// кладем данные в хранилище
function onInputForm() {
  const formData = new FormData(formRef);
  let userForm = {};
  formData.forEach((value, name) => (userForm[name] = value.trim()));
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(userForm));
}

// берем данные из хранилища
initForm()
function initForm() {
  let persistedForm = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (persistedForm) {
    persistedForm = JSON.parse(persistedForm);
    Object.entries(persistedForm).forEach(([name, value]) => {
      formRef.elements[name].value = value;
    });
  }
}

// Очистка формы и получение данных в консоли
function onFormSubmit(evt) {
    evt.preventDefault();
    const inputName = formRef.email.value;
    const inputMessage = formRef.message.value;
    if (inputName && inputMessage !== '') {
        let userForm = localStorage.getItem(LOCAL_STORAGE_KEY);
        userForm = JSON.parse(userForm);
        console.log('Отправляем форму с такими данными', userForm);
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        evt.currentTarget.reset();
        return;
    }
     alert('Поле электронного адреса и сообщения должны быть заполнены!');
  return;
}
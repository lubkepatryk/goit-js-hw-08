import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const email = document.querySelector('input');
const message = document.querySelector('textarea');
const LOCALSTORAGE_KEY = 'feedback-form-state';
const elements = {};

autofill();

form.addEventListener(
  'input',
  throttle(e => {
    elements[e.target.name] = e.target.value;
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(elements));
  }, 500)
);

form.addEventListener('submit', e => {
  e.preventDefault();
  e.currentTarget.reset();
  localStorage.removeItem(LOCALSTORAGE_KEY);
  console.log(elements);
});

function autofill() {
  const savedElements = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
  if (savedElements) {
    email.value = savedElements.email || '';
    message.value = savedElements.message || '';
  }
}

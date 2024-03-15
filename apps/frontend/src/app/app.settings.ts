export const BACKEND_BASE_URL =
  window.location.hostname === 'localhost'
    ? 'http://localhost:3000/api'
    : `${window.location.protocol}//${window.location.hostname}/api`;

export const APP_NAME = 'Template'; // Change
export const APP_ENV =
  window.location.hostname === 'localhost'
    ? 'local'
    : window.location.hostname.split('.')[0].split('-')[1];

export const APP_NAME_ENV =
  APP_ENV === '' || APP_ENV === undefined
    ? APP_NAME
    : `${APP_NAME} - ${APP_ENV}`;

export const APP_THEME = () => {
  let color = '';
  let environment = '';
  if (APP_ENV === '' || APP_ENV === undefined) {
    environment = 'prod';
  } else {
    environment = APP_ENV;
  }
  switch (environment) {
    case 'local':
      // color = `background-image: linear-gradient(
      //   to right,
      //   var(--ha-grey-500),
      //   var(--ha-grey-700)
      // );`;
      color = 'var(--ha-grey-500)|var(--ha-grey-700)';
      // color = '#707173';
      break;
    case 'dev':
      // Grün
      // color = `background-image: linear-gradient(
      //   to right,
      //   var(--ha-green-500),
      //   var(--ha-green-700)
      // );`;
      color = 'var(--ha-green-500)|var(--ha-green-700)';
      break;
    case 'test':
      // Violet
      // color = `background-image: linear-gradient(
      //   to right,
      //   var(--ha-violett-500),
      //   var(--ha-violett-700)
      // );`;
      color = 'var(--ha-violett-500)|var(--ha-grey-700)';
      break;
    default:
      // Blau
      // color = `background-image: linear-gradient(
      //   to right,
      //   var(--ha-darkblue-500),
      //   var(--ha-darkblue-700)
      // );`;
      color = 'var(--ha-darkblue-500)|var(--ha-darkblue-700)';
      break;
  }

  return color;
};

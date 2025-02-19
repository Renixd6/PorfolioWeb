import i18n, { InitOptions } from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      greeting: "Hello",
      dropdown_title: "Language",
      hello: "Hi there, I’m",
      name:"Jorge Higuera.",
      ido:"I develop Artificial Intelligence projects, but...",
      srtdesc:`Although my main activity and constant interest revolve around Artificial Intelligence and continuous learning in this field, I am also
       interested in various disciplines within the world of technological solutions, as you can see on this website created by me.`,
    }
  },
  es: {
    translation: {
      greeting: "Hola",
      dropdown_title: "Idioma",
      hello: "Hola, me llamo",
      name:"Jorge Higuera.",
      ido:"Desarrollo proyectos de Inteligencia Artificial, pero...",
      srtdesc:`Aunque mi actividad e interés principal se centran en la Inteligencia Artificial y en un constante aprendizaje en este campo, me
       atraen diversas disciplinas dentro del mundo de las soluciones tecnológicas, como podrás ver en esta web creada por mí.`,
    }
  }
};

const i18nConfig: InitOptions = {
  resources,
  lng: 'en', 
  fallbackLng: 'en', 
  interpolation: {
    escapeValue: false, 
  },
};

i18n
  .use(initReactI18next) 
  .init(i18nConfig);

export default i18n;

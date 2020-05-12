export const sendPageViewEvent = path =>
  window.gtag('config', 'UA-164609686-1', { page_path: path });

export const sendCustomEvent = ({ category, object, action }) =>
  window.gtag('event', action, {
    event_category: category,
    event_label: `${category} - ${object} - ${action}`
  });

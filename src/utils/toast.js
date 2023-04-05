import EventManager from '../lib/EventManger';

export const toastEventManager = new EventManager();

export default function toast({ type, text, duration }) {
  toastEventManager.emit('addtoast', { type, text, duration });
}

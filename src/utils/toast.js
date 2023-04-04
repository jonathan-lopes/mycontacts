import EventManager from '../lib/EventManger';

export const toastEventManager = new EventManager();

export default function toast({ type, text }) {
  toastEventManager.emit('addtoast', { type, text });
}

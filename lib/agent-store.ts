export type Listener = (speaking: boolean) => void;

let isSpeaking = false;
const listeners = new Set<Listener>();
const eventTarget = typeof window !== 'undefined' ? new EventTarget() : null;

export const agentStore = {
  subscribe(listener: Listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  getSnapshot() {
    return isSpeaking;
  },
  setSpeaking(speaking: boolean) {
    if (isSpeaking !== speaking) {
      isSpeaking = speaking;
      listeners.forEach(l => l(speaking));
    }
  },
  onStop(callback: EventListener) {
    eventTarget?.addEventListener('stop', callback);
    return () => eventTarget?.removeEventListener('stop', callback);
  },
  triggerStop() {
    eventTarget?.dispatchEvent(new Event('stop'));
  }
};

import { Style } from "#build/components";
import { defineStore } from "pinia";

type Style = 'danger' | 'success' | 'warning'

interface ModalData {
  style?: Style;
  title: string;
  body: string;
  cancel: string;
  accept?: string;
}

export interface NuxaModal extends ModalData { }

export class NuxaModal {
  callback?: Function
  constructor({ title, body, cancel, accept, style }: ModalData, callback?: Function) {
    this.title = title;
    this.body = body;
    this.cancel = cancel;
    this.accept = accept;
    this.style = style ?? 'danger';
    this.callback = callback;
  }
}

export const useModal = defineStore('modal', () => {

  const queue = ref<NuxaModal[]>([])

  function create(Modal: ModalData, callback?: Function) {
    if (process.client) {
      const modal = new NuxaModal(Modal, callback)
      queue.value.push(modal)
    }
  }

  const first = computed(() => queue.value?.at(0))
  const visible = computed(() => queue.value?.length > 0 ?? false)

  const accept = async () => {
    if(first.value?.callback){
      first.value?.callback()
      queue.value.shift()
    } else {
      throw new Error('No callback provided')
    }
  };

  const cancel = async () => {
    queue.value.shift()
  };

  return { queue, create, accept, cancel, first, visible }
});

export class NuxaAlert {
  modal;
  constructor(){
    this.modal = useModal()
  }
  danger(Modal: ModalData, callback?: Function) {
    this.modal.create({
      ...Modal,
      style: 'danger'
    }, callback)
  }
  warning(Modal: ModalData, callback?: Function) {
    this.modal.create({
      ...Modal,
      style: 'warning'
    }, callback)
  }
  success(Modal: ModalData, callback?: Function) {
    this.modal.create({
      ...Modal,
      style: 'success'
    }, callback)
  }
}
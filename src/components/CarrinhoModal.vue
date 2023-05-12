<script setup>
import { carrinho } from '../_data/carrinho';

defineProps({
  modalActive: {
    type: Boolean,
    default: false
  }
})

defineEmits(['close-modal'])

function limparCarrinho() {
  carrinho.value.items = []
}
</script>

<template>
  <Teleport to="body">
    <Transition name="modal-outer">
      <div
        class="absolute w-full bg-black bg-opacity-30 h-screen top-0 left-0 flex justify-center px-8 z-50"
        v-show="modalActive"
      >
        <Transition name="modal-inner">
          <div v-if="modalActive" class="p-4 bg-white self-start mt-32 w-1/3">
            <slot/>
        <div class="flex justify-between">
            <button @click="limparCarrinho()" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Limpar carrinho.</button>   
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              @click="$emit('close-modal')"
            >
              Fechar
            </button>
        </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-outer-enter-active,
.modal-outer-leave-active {
  transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}
.modal-outer-enter-from,
.modal-outer-leave-to {
  opacity: 0;
}
.modal-inner-enter-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}
.modal-inner-leave-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}
.modal-inner-enter-from {
  opacity: 0;
  transform: scale(0.8);
}
.modal-inner-leave-to {
  transform: scale(0.8);
}
</style>

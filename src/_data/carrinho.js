import { ref } from 'vue';

export const carrinho = ref({
  items: [
    {
      id: 1,
      nome: 'Camiseta',
      preco: 49.90
  },
  ],
  valorTotal: null
})
<script setup>
import { computed, ref } from 'vue'
import { produtos } from './_data/produtos'
import { carrinho } from './_data/carrinho'
import CarrinhoModal  from './components/CarrinhoModal.vue';
const modalActive = ref(null);
const toggleModal = () => {
    modalActive.value = !modalActive.value;
};

function adicionarProduto(produto) {
  const itemCarrinho = carrinho.value.items.find((item) => item.id === produto.id)
  if (itemCarrinho) {
    itemCarrinho.quantidade += 1
  } else {
    const novoItem = {
      id: produto.id,
      nome: produto.nome,
      preco: produto.preco,
      quantidade: 1
    }
    carrinho.value.items.push(novoItem)
  }
}

function incrementarItem(index) {
  index.value.quantidade++
}

function decrementarItem(index) {
  index.value.quantidade--
  if (index.value.quantidade === 0) {
    const itemIndex = carrinho.value.items.indexOf(index.value)
    carrinho.value.items.splice(itemIndex, 1)
  }
}

const totalCarrinho = computed(() => {
  return carrinho.value.items.reduce((total, item) => {
    return total + item.preco * item.quantidade
  }, 0)
})
</script>

<template>
  
  <div class="min-h-screen flex justify-center items-center">
    <div class="grid grid-cols-4 gap-4 w-1/2">
      <div v-for="produto in produtos" :key="produto.id" class="text-center w-full p-2 shadow-xl">
        {{ produto.nome }} - R$ {{ produto.preco }}
        <button @click="adicionarProduto(produto, quantidadeAdicionar)" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ">Adicionar Produto</button>
      </div>
    </div>

    
      <CarrinhoModal :modalActive="modalActive" @close-modal="toggleModal">

          <div class="grid grid-cols-2 text-center">
            <div
              v-for="(index, item) in carrinho.items"
              :key="item.id"
              class="container "
            >
              {{ index.nome }}(s) {{ index.quantidade }} - R${{
                (index.preco * index.quantidade).toFixed(2)
              }}
              <br/>
              <button @click="incrementarItem(ref(index))" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Incrementar Item</button>
              <br/>
              <button @click="decrementarItem(ref(index))" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Decrementar Item</button>
            </div>
          </div>  
            Valor total do carrinho: R${{ totalCarrinho.toFixed(2) }} <br/>

           
          
      </CarrinhoModal>
  </div>

    <button class="absolute bottom-1 right-1" @click="toggleModal()"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110  duration-300 ">
  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
</svg>
</button>
</template>

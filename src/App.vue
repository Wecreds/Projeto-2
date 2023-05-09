<script setup>
import { computed, ref } from 'vue'
import { produtos } from './_data/produtos'
import { carrinho } from './_data/carrinho'

const mostrarCarrinho = ref(false);

function adicionarProduto(produto) {
  const itemCarrinho = carrinho.value.items.find((item) => item.id === produto.id)
  if (itemCarrinho) {
    itemCarrinho.quantidade += 1
    itemCarrinho.valorTotal = itemCarrinho.preco * itemCarrinho.quantidade
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

function limparCarrinho() {
  carrinho.value.items = []
}

const totalCarrinho = computed(() => {
  return carrinho.value.items.reduce((total, item) => {
    return total + item.preco * item.quantidade
  }, 0)
})
</script>

<template>
  <div class="min-h-screen flex flex-row justify-center items-center">
    <div class="grid grid-cols-3 gap-4 bg-pink-50 w-1/2 h-1/2 mx-auto align-middle">
      <div v-for="produto in produtos" :key="produto.id" class="text-center">
        {{ produto.nome }} - R$ {{ produto.preco }} <br>
        <button @click="adicionarProduto(produto, quantidadeAdicionar)">Adicionar Produto</button>
        <br />
      </div>
    </div>


  
    <div class="absolute w-full h-full bg-black opacity-50 flex flex-row justify-center items-center" v-if="mostrarCarrinho">
      <div class="w-1/2 mx-auto opacity-100" v-if="mostrarCarrinho">
        <div v-for="(index, item) in carrinho.items" :key="item.id" class="flex flex-row justify-center bg-pink-500">
            {{ index.nome }}(s) {{ index.quantidade }} - R${{
              (index.preco * index.quantidade).toFixed(2)
            }}
      
            <button @click="incrementarItem(ref(index))">Incrementar Item</button>
      
            <button @click="decrementarItem(ref(index))">Decrementar Item</button>
        </div>
        Valor total do carrinho: R${{ totalCarrinho.toFixed(2) }} <br />
        <button @click="limparCarrinho()">Limpar carrinho.</button>
      </div>
        </div>
    </div>

  <button class="absolute top-0 right-0" @click="mostrarCarrinho = !mostrarCarrinho">Mostrar carrinho</button>
</template>

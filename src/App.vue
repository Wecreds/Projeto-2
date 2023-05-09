<script setup>
import { computed, ref } from 'vue';
import { produtos } from './_data/produtos';
import { carrinho } from './_data/carrinho';

function adicionarProduto(produto){
  const itemCarrinho = carrinho.value.items.find(item => item.id === produto.id);
  if (itemCarrinho){
    itemCarrinho.quantidade++;
    itemCarrinho.valorTotal = itemCarrinho.preco * itemCarrinho.quantidade;
  } else {
      const novoItem = {
        id: produto.id,
        nome: produto.nome,
        preco: produto.preco,
        quantidade: 1
      };
      carrinho.value.items.push(novoItem);
  }
};

function incrementarItem(item){
  item.value.quantidade++;
}

function decrementarItem(item){
  item.value.quantidade--;
}

const totalCarrinho = computed(() => {
  return carrinho.value.items.reduce((total, item) => {
    return total + item.preco * item.quantidade;
  }, 0);
});

</script>

<template>
  <div class="min-h-screen">
    <div v-for="produto in produtos" :key="produto.id">
    {{ produto.nome }} - R$ {{ produto.preco}}
    <button @click="adicionarProduto(produto)">Adicionar Produto</button>
    </div>

    <div v-for="item in carrinho.items" :key="item.id">
    {{ item.nome }}(s) {{ item.quantidade }} - R${{ item.preco * item.quantidade }}
    <button @click="incrementarItem(ref(item))">Incrementar Item</button>
    <br>
    <button @click="decrementarItem(ref(item))">Decrementar Item</button>
    </div>
    R${{ totalCarrinho }}
  </div>
</template>

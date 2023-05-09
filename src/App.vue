<script setup>
import { computed, ref } from 'vue';
import { produtos } from './_data/produtos';
import { carrinho } from './_data/carrinho';

function adicionarProduto(produto){
  const itemCarrinho = carrinho.value.items.find(item => item.id === produto.id);
  if (itemCarrinho){
    itemCarrinho.quantidade += 1;
    itemCarrinho.valorTotal = itemCarrinho.preco * itemCarrinho.quantidade;
  } else {
      const novoItem = {
        id: produto.id,
        nome: produto.nome,
        preco: produto.preco,
        quantidade: 1
      };
      carrinho.value.items.push(novoItem);
  };
};

function incrementarItem(index){
  index.value.quantidade++;
}

function decrementarItem(index){
  index.value.quantidade--    
  if(index.value.quantidade === 0){
    const itemIndex = carrinho.value.items.indexOf(index.value);
    carrinho.value.items.splice(itemIndex, 1);
  }
}

function limparCarrinho(){
  carrinho.value.items = [];
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
    <button @click="adicionarProduto(produto, quantidadeAdicionar)">Adicionar Produto</button> <br>

    </div> 

    <div v-for="(index, item) in carrinho.items" :key="item.id">
    <br>
    {{ index.nome }}(s) {{ index.quantidade }} - R${{ (index.preco * index.quantidade).toFixed(2) }} <br>
    <button @click="incrementarItem(ref(index))">Incrementar Item</button>
    <br>
    <button @click="decrementarItem(ref(index))">Decrementar Item</button>
    </div>
    Valor total do carrinho: R${{ totalCarrinho.toFixed(2) }} <br>
    <button @click="limparCarrinho()">Limpar carrinho.</button>
  </div>
</template>

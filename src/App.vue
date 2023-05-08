<script setup>
import { produtos } from './_data/produtos';
import { carrinho } from './_data/carrinho';



</script>

<template>
  <div class="min-h-screen">
    <div v-for="(item) in produtos" :key="item.id">
    {{ item.nome }} - R${{ item.preco }}

    </div>

    <div v-for="(index, item) in carrinho" :key="index">
    {{ item }} : {{ index }}
    </div>
    </div>
</template>

<script setup lang="ts">
import Slider from 'primevue/slider';
import {computed} from 'vue';
import Foods from '@/constants/Foods';
import AnIngredient from '@/components/AnIngredient.vue';

import DocumentationIcon from '@/components/icons/IconDocumentation.vue';
import ToolingIcon from '@/components/icons/IconTooling.vue';
import EcosystemIcon from '@/components/icons/IconEcosystem.vue';
import CommunityIcon from '@/components/icons/IconCommunity.vue';
import SupportIcon from '@/components/icons/IconSupport.vue';

type Ingredient = typeof Foods[number] & {
  quantity: number;
};

const model = defineModel<Ingredient[]>({ default: [] });

const foodIngredients = computed(() =>
  model.value
    .map(ingredient => ({
      ...ingredient,
      ...Foods.find(food =>
        food.name === ingredient.name) ||
          console.error(`"${ingredient.name}" not found in Foods list`),
    })));

</script>

<template>
  <AnIngredient v-for="(food, index) in foodIngredients">
    <template #icon>
      <DocumentationIcon v-if="index % 5 === 0" />
      <ToolingIcon v-if="index % 5 === 1" />
      <EcosystemIcon v-if="index % 5 === 2" />
      <CommunityIcon v-if="index % 5 === 3" />
      <SupportIcon v-if="index % 5 === 4" />
    </template>
    <template #heading>
      {{ food.name }}
      <span style="color: #777; font-size: 1rem; margin-left: .3rem">
        {{ model[index].quantity }} {{ food.unit }}
      </span>
    </template>

    <Slider
      v-model="model[index].quantity"
      :max="food.maxQuantity"
    />
  </AnIngredient>
</template>

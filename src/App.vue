<script setup lang="ts">
import MacroNutrients from './components/MacroNutrients.vue'
import TheIngredients from './components/TheIngredients.vue'
import {ref} from 'vue';
import Presets from './constants/Presets';

const ingredients = ref(Presets.superSalad);
</script>

<template>
  <header>
    <div class="wrapper">
      <MacroNutrients v-model="ingredients" />
    </div>
  </header>

  <main>
    <TheIngredients v-model="ingredients" />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
    margin-right: calc(var(--section-gap) * .75);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>

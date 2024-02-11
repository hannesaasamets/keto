<script setup lang="ts">
import Foods from "@/constants/Foods";
import Slider from "primevue/slider";
import {computed} from "vue";

type Ingredient = typeof Foods[number] & {
  quantity: number;
};

const model = defineModel<Ingredient[]>({ default: [] });

const foodIngredients = computed(() =>
  model.value
    .map(ingredient => ({
      ...ingredient,
      ...Foods.find(food =>
        food.name === ingredient.name),
    })));

const macroNutrients = computed(() => ({
  carbs: foodIngredients.value.reduce((acc, ingredient) =>
    acc + ingredient.quantity * ingredient.unitGrams * ingredient.carbs, 0),
  proteins: foodIngredients.value.reduce((acc, ingredient) =>
    acc + ingredient.quantity * ingredient.unitGrams * ingredient.proteins, 0),
  fats: foodIngredients.value.reduce((acc, ingredient) =>
    acc + ingredient.quantity * ingredient.unitGrams * ingredient.fats, 0),
}));

const totalWeight = computed(() =>
  Object.values(macroNutrients.value).reduce((acc, weight) =>
    acc + weight, 0));

const macroNutrientsPercentages = computed(() => Object
  .entries(macroNutrients.value)
  .map(([name, weight]) => [
    name,
    weight / totalWeight.value || 0,
    weight,
  ] as [string, number, number]));

const totalEnergy = computed(() => Math.round(
  foodIngredients.value.reduce((acc, ingredient) =>
    acc + ingredient.quantity * ingredient.unitGrams * ingredient.energy / 100, 0)));

</script>

<template>
  <div class="greetings">
    <h1>{{ totalEnergy }} kcal</h1>
    <h3 v-for="[name, percentage, weight] in macroNutrientsPercentages">
      <p>
        <span>
          <span style="color: #10b981; margin-right: .5rem">
            {{ Math.round(percentage * 100) }}<span style="font-size: .9rem; margin-left: .1rem">%</span>
          </span>
          {{ Math.round(weight) }}<span style="margin-left: .2rem">g</span>
        </span>
        <span style="text-transform: capitalize; margin-left: .9rem">{{ name }}</span>
      </p>
      <Slider :model-value="percentage * 100" style="min-width: 16rem" />
    </h3>
  </div>
</template>

<style scoped>
:deep(.p-slider-handle) {
  display: none;
}

:deep(.p-slider) {
  height: 1.2rem;
}

:deep(.p-slider-range) {
  transition: width .5s;
  transition-timing-function: ease-in-out;
}

h1 {
  font-weight: 500;
  font-size: 2.6rem;
}

h3 {
  font-size: 1.2rem;
  margin-top: .5rem;
}

.greetings {
  width: 100%;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1 {
    text-align: right;
  }
  .greetings h3 p {
    display: flex;
    justify-content: space-between;
  }
}
</style>

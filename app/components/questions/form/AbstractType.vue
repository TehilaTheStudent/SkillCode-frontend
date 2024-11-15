<script lang="ts" setup>
// Reactive list of AbstractType objects
import { AtomicType, CompositeType, AbstractType, textifyEnum } from "~/types/index.d";

const props = defineProps<{ abstractType: AbstractType }>();
const emit = defineEmits(["update"]);

const abstractTypeRoot = ref<AbstractType>(props.abstractType);

watch(abstractTypeRoot, (newVal) => {
  emit("update", newVal);
});

function selectedVarTypeInIndex(payload:{ index: number, value: CompositeType | AtomicType}) {
  console.log(payload);
  console.log("Selected var type in index:", payload.index);
  console.log("Selected:", abstractTypeRoot.value.toPrint());

  abstractTypeRoot.value.setVarType(payload.index,payload.value);
}



</script>
<template>
  <div>
    <!-- Select Type Header with String Representation -->
    <h3 class="font-bold text-lg mb-4 overflow-x-auto whitespace-nowrap">{{abstractTypeRoot.toPrint() }}</h3>

    <!-- Abstract Type Form List -->
    <div v-for="(varType, index) in abstractTypeRoot.toList()" :key="index" class="mb-4">
      <QuestionsFormSingleAbstractType
        :index="index"
        @update-in-index="selectedVarTypeInIndex"
      />
      <div v-if="index < abstractTypeRoot.toList().length - 1" class="text-center my-2">
        <UIcon name="i-material-symbols:arrow-downward" class="w-5 h-5" />
      </div>
    </div>
  </div>
</template>

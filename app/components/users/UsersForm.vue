<script setup lang="ts">
import type { FormError, FormSubmitEvent } from "#ui/types";
import * as yup from "yup";

const emit = defineEmits(["close"]);

const state = reactive({
  name: undefined,
  email: undefined,
});

const schema = yup.object().shape({
  name: yup.string().required("Please enter a name."),
  email: yup.string().email("Please enter a valid email.").required("Please enter an email."),
});

const validate = async (state: any): Promise<FormError[]> => {
  try {
    await schema.validate(state, { abortEarly: false });
    return [];
  } catch (err) {
    return err.inner.map((error: yup.ValidationError) => ({
      path: error.path,
      message: error.message,
    }));
  }
};

async function onSubmit(event: FormSubmitEvent<any>) {
  // Do something with data
  console.log(event.data);

  emit("close");
}
</script>

<template>
  <UForm :validate="validate" :validate-on="['submit']" :state="state" class="space-y-4" @submit="onSubmit">
    <UFormGroup label="Name" name="name">
      <UInput v-model="state.name" placeholder="John Doe" autofocus />
    </UFormGroup>

    <UFormGroup label="Email" name="email">
      <UInput v-model="state.email" type="email" placeholder="john.doe@example.com" />
    </UFormGroup>

    <div class="flex justify-end gap-3">
      <UButton label="Cancel" color="gray" variant="ghost" @click="emit('close')" />
      <UButton type="submit" label="Save" color="black" />
    </div>
  </UForm>
</template>

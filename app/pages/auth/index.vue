<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <a-card title="Sign In" style="width: 360px">
      <a-form layout="vertical">
        <a-form-item label="Username">
          <a-input v-model:value="username" placeholder="Username" />
        </a-form-item>
        <a-form-item label="Password">
          <a-input-password v-model:value="password" placeholder="Password" />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" block @click="onSubmit">Sign In</a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "default",
});
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useGlobalStore } from "~/stores/global";

const username = ref("");
const password = ref("");
const router = useRouter();
const globalStore = useGlobalStore();

function onSubmit() {
  globalStore.isLogged = true;
  router.push("/dashboard");
}
</script>

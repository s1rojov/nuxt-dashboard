<template>
  <a-layout style="height: 100vh; display: flex; flex-direction: column">
    <a-layout style="flex: 1; display: flex">
      <a-layout-sider
        width="240"
        style="background: #3749a6; height: 100%; overflow-y: auto"
      >
        <Sidebar />
      </a-layout-sider>

      <a-layout
        style="flex: 1; display: flex; flex-direction: column; overflow: hidden"
      >
        <Header />

        <a-layout-content
          style="background: #f1f5f9; padding: 25px; flex: 1; overflow-y: auto"
        >
          <slot />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
  import Sidebar from '~/layouts/Sidebar.vue';
  import Header from '~/layouts/Header.vue';
</script>

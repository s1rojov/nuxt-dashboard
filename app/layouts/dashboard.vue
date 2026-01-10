<template>
  <a-layout style="min-height: 100vh" class="">
    <a-layout-sider width="240" style="background: #3749a6">
      <Sidebar />
    </a-layout-sider>

    <a-layout>
      <Header />

      <a-layout-content style="background: #f1f5f9; padding: 25px">
        <slot />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import Sidebar from "~/layouts/Sidebar.vue";
import Header from "~/layouts/Header.vue";
</script>

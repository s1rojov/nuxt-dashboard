<template>
  <div>
    <div class="sidebar-logo">
      <span class="logo-dash">Dash</span><span class="logo-stack">Stack</span>
    </div>

    <a-menu
      v-model:selectedKeys="selectedKeys"
      theme="dark"
      mode="inline"
      class="custom-menu"
      @click="handleMenuClick"
    >
      <a-menu-item v-for="item in menuItems" :key="item.key">
        <template #icon>
          <component :is="item.icon" />
        </template>
        <span>{{ item.label }}</span>
      </a-menu-item>
    </a-menu>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  AppstoreOutlined,
  UserOutlined,
  HeartOutlined,
  MessageOutlined,
  OrderedListOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons-vue";

const route = useRoute();
const router = useRouter();

const menuItems = [
  { key: "/dashboard", label: "Dashboard", icon: AppstoreOutlined },
  { key: "/products", label: "Products", icon: ShoppingCartOutlined },
  { key: "/favourites", label: "Favourites", icon: HeartOutlined },
  { key: "/messenger", label: "Messenger", icon: MessageOutlined },
  { key: "/orders", label: "Order Lists", icon: OrderedListOutlined },
  { key: "/auth", label: "Auth", icon: UserOutlined },
];

// Hozirgi sahifaga qarab menyuni aktiv qilish
const selectedKeys = ref<string[]>([route.path]);

watch(
  () => route.path,
  (newPath) => {
    selectedKeys.value = [newPath];
  }
);

const handleMenuClick = (item: any) => {
  router.push(item.key);
};
</script>

<style scoped>
.sidebar-logo {
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  font-weight: 800;
  color: #fff;
}
.logo-dash {
  color: #fff;
}
.logo-stack {
  color: #43e97b;
}

.custom-menu {
  background: transparent;
  border: none;
}
</style>

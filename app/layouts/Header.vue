<template>
  <a-layout-header class="header-container">
    <div class="flex items-center flex-1">
      <div class="search-wrapper">
        <search-outlined class="search-icon" />
        <input type="text" placeholder="Search" class="search-field" />
      </div>
    </div>

    <div class="flex items-center gap-4">
      <a-badge :count="6" :offset="[-2, 8]" color="#EA5455">
        <div class="action-btn">
          <bell-outlined />
        </div>
      </a-badge>

      <a-dropdown :trigger="['click']">
        <div class="lang-selector">
          <img
            :src="currentLang.flag"
            :alt="currentLang.label"
            class="lang-flag"
          />
          <span class="lang-label">{{ currentLang.label }}</span>
          <down-outlined class="lang-arrow" />
        </div>
        <template #overlay>
          <a-menu @click="handleLangChange" :selected-keys="[selectedLangCode]">
            <a-menu-item v-for="lang in languages" :key="lang.code">
              <div class="lang-menu-item">
                <img
                  :src="lang.flag"
                  :alt="lang.label"
                  class="lang-menu-flag"
                />
                <span>{{ lang.label }}</span>
              </div>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>

      <a-dropdown :trigger="['click']" placement="bottomRight">
        <div class="profile-trigger">
          <a-avatar
            :size="44"
            src="https://xsgames.co/randomusers/avatar.php?g=pixel"
          />
          <div class="profile-info">
            <p class="profile-name">Dilshod Sirojov</p>
            <span class="profile-role">Admin</span>
          </div>
          <div class="profile-arrow-box">
            <down-outlined />
          </div>
        </div>
        <template #overlay>
          <a-menu class="profile-dropdown-menu" @click="handleMenuClick">
            <a-menu-item key="profile">
              <div class="profile-menu-item">
                <user-outlined />
                <span>Profile</span>
              </div>
            </a-menu-item>
            <a-menu-divider />
            <a-menu-item key="logout">
              <div class="profile-menu-item logout-menu-item">
                <logout-outlined />
                <span>Log Out</span>
              </div>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </a-layout-header>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import {
  SearchOutlined,
  BellOutlined,
  DownOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons-vue";

interface Language {
  code: string;
  label: string;
  flag: string;
}

const router = useRouter();
const languages: Language[] = [
  { code: "en", label: "English", flag: "https://flagcdn.com/w40/gb.png" },
  { code: "uz", label: "O'zbekcha", flag: "https://flagcdn.com/w40/uz.png" },
  { code: "ru", label: "Русский", flag: "https://flagcdn.com/w40/ru.png" },
];

const selectedLangCode = ref("en");
const currentLang: any = computed(
  () => languages.find((l) => l.code === selectedLangCode.value) || languages[0]
);

const handleLangChange = (item: any) => {
  selectedLangCode.value = item.key;
};

const handleMenuClick = (item: any) => {
  if (item.key === "profile") {
    console.log("Navigate to profile");
  } else if (item.key === "logout") {
    router.push("/auth");
  }
};
</script>

<style scoped>
.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  background-color: white;
  position: sticky;
  top: 0;
  z-index: 50;
  height: 70px !important;
  line-height: normal !important;
}

.search-wrapper {
  display: flex;
  align-items: center;
  background-color: #f5f6fa;
  border: 1px solid #d5d5d5;
  border-radius: 9999px;
  padding: 0 1rem;
  width: 100%;
  max-width: 380px;
  height: 38px;
  transition: all 0.3s;
}

.search-wrapper:focus-within {
  border-color: #60a5fa;
}

.search-icon {
  color: #78828a;
  font-size: 18px;
  margin-right: 0.5rem;
}

.search-field {
  background: transparent;
  border: none;
  outline: none;
  width: 100%;
  font-size: 14px;
  color: #202224;
}

.search-field::placeholder {
  color: #78828a;
}

.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: #3b82f6;
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 9999px;
  transition: all 0.3s;
}

.action-btn:hover {
  background-color: #eff6ff;
}

.lang-selector {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  padding: 0 0.75rem;
  height: 40px;
  border-radius: 0.5rem;
  transition: all 0.3s;
}

.lang-selector:hover {
  background-color: #f9fafb;
}

.lang-selector:hover .lang-arrow {
  color: #3b82f6;
}

.lang-flag {
  width: 24px;
  height: 16px;
  object-fit: cover;
  border-radius: 2px;
}

.lang-label {
  font-size: 14px;
  font-weight: 600;
  color: #202224;
}

.lang-arrow {
  font-size: 10px;
  color: #565656;
  transition: color 0.3s;
}

.lang-menu-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.lang-menu-flag {
  width: 20px;
  height: 13px;
  object-fit: cover;
}

.profile-trigger {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  padding: 0.25rem;
  padding-right: 0.5rem;
  border-radius: 0.5rem;
  transition: all 0.3s;
}

.profile-trigger:hover {
  background-color: #f3f4f6;
}

.profile-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

.profile-name {
  font-size: 14px;
  font-weight: 600;
  color: #202224;
  line-height: 1.2;
  margin: 0;
}

.profile-role {
  font-size: 12px;
  color: #78828a;
  line-height: 1.2;
}

.profile-arrow-box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border: 1px solid #565656;
  border-radius: 9999px;
  font-size: 8px;
  color: #565656;
  margin-left: 0.25rem;
}

.profile-menu-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 14px;
}

.logout-menu-item {
  color: #ef4444;
}

:deep(.ant-dropdown-menu) {
  border-radius: 0.75rem;
  padding: 0.5rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  min-width: 180px;
}

:deep(.ant-dropdown-menu-item) {
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
}

:deep(.ant-dropdown-menu-item:hover) {
  background-color: #f9fafb;
}

:deep(.ant-dropdown-menu-item:has(.logout-menu-item):hover) {
  background-color: #fef2f2;
}

:deep(.ant-badge-count) {
  min-width: 16px !important;
  height: 16px !important;
  line-height: 16px !important;
  font-size: 10px !important;
  font-weight: 700 !important;
  padding: 0 !important;
}
</style>

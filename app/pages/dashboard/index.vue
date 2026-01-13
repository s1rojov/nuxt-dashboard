<template>
  <div class="p-8 bg-linear-to-br from-slate-50 to-slate-100 min-h-screen">
    <!-- Header -->
    <div class="mb-12">
      <h1 class="text-4xl font-bold text-gray-800 mb-2">Dashboard</h1>
      <p class="text-gray-600">Tizimning asosiy statistikasi</p>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center h-96">
      <div class="text-center">
        <div
          class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"
        ></div>
        <p class="mt-4 text-gray-600">Ma'lumotlar yuklanmoqda...</p>
      </div>
    </div>

    <!-- Error State -->
    <div
      v-else-if="error"
      class="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg mb-8"
    >
      {{ error }}
    </div>

    <!-- Stats Cards -->
    <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
      <!-- Users Card -->
      <div
        class="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
      >
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-600 text-sm font-medium mb-2">
              Jami Foydalanuvchilar
            </p>
            <p class="text-5xl font-bold text-blue-600">
              {{ users?.data?.total || 0 }}
            </p>
          </div>
          <div
            class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center"
          ></div>
        </div>
        <p class="text-gray-500 text-xs mt-4">
          Barcha ro'yxatlangan foydalanuvchilar
        </p>
      </div>

      <!-- Posts Card -->
      <div
        class="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
      >
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-600 text-sm font-medium mb-2">Jami Postlar</p>
            <p class="text-5xl font-bold text-emerald-600">
              {{ posts?.data?.total || 0 }}
            </p>
          </div>
          <div
            class="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center"
          ></div>
        </div>
        <p class="text-gray-500 text-xs mt-4">Barcha e'lonlar va maqolalar</p>
      </div>

      <!-- Products Card -->
      <div
        class="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
      >
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-600 text-sm font-medium mb-2">
              Jami Mahsulotlar
            </p>
            <p class="text-5xl font-bold text-orange-600">
              {{ products?.data?.total || 0 }}
            </p>
          </div>
          <div
            class="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center"
          ></div>
        </div>
        <p class="text-gray-500 text-xs mt-4">Katalogdagi barcha mahsulotlar</p>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="bg-white rounded-2xl shadow-lg p-8">
      <h2 class="text-xl font-bold text-gray-800 mb-6">Tez Amallar</h2>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <button
          class="bg-linear-to-r cursor-pointer from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
        >
          Foydalanuvchi Qo'shish
        </button>
        <button
          class="bg-linear-to-r cursor-pointer from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
        >
          Post Yaratish
        </button>
        <button
          class="bg-linear-to-r cursor-pointer from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
        >
          Mahsulot Qo'shish
        </button>
        <button
          class="bg-linear-to-r cursor-pointer from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
        >
          Hisobot Ko'rish
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  definePageMeta({
    layout: 'dashboard',
  });

  import { ref, onMounted } from 'vue';
  import { UserService } from '~/services/user.service';
  import { PostService } from '~/services/post.service';
  import { ProductService } from '~/services/product.service';

  const users = ref([]);
  const posts = ref([]);
  const products = ref([]);
  const loading = ref(true);
  const error = ref('');

  onMounted(async () => {
    try {
      const [usersData, postsData, productsData] = await Promise.all([
        UserService.getAll(),
        PostService.getAll(),
        ProductService.getAll(),
      ]);

      users.value = usersData;
      posts.value = postsData;
      products.value = productsData;
    } catch (err) {
      error.value = "Ma'lumotlar yuklanishida xato!";
    } finally {
      loading.value = false;
    }
  });
</script>

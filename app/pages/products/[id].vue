<template>
  <div class="p-8 bg-linear-to-br from-slate-50 to-slate-100 min-h-screen">
    <div class="mb-8">
      <a-button @click="goBack" type="default" class="mb-4">← Orqaga</a-button>
      <h1 class="text-4xl font-bold text-gray-800 mb-2">
        {{ isNew ? 'Yangi mahsulot' : 'Mahsulotni tahrirla' }}
      </h1>
    </div>

    <div
      v-if="error"
      class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
    >
      {{ error }}
    </div>

    <div class="bg-white rounded-lg shadow-lg p-8 max-w-2xl">
      <a-spin :spinning="loading">
        <a-form :model="form" layout="vertical">
          <a-form-item label="Nomi" class="mb-4">
            <a-input
              v-model:value="form.title"
              placeholder="Mahsulot nomi"
              :disabled="loading"
            />
          </a-form-item>

          <a-form-item label="Kategoriya" class="mb-4">
            <a-input
              v-model:value="form.category"
              placeholder="Kategoriya"
              :disabled="loading"
            />
          </a-form-item>

          <a-form-item label="Narx" class="mb-4">
            <a-input-number
              v-model:value="form.price"
              placeholder="Narx"
              :disabled="loading"
              class="w-full"
            />
          </a-form-item>

          <a-form-item label="Reyting" class="mb-4">
            <a-input-number
              v-model:value="form.rating"
              placeholder="Reyting"
              :disabled="loading"
              :min="0"
              :max="5"
              :step="0.1"
              class="w-full"
            />
          </a-form-item>

          <a-form-item label="Izog" class="mb-6">
            <a-textarea
              v-model:value="form.description"
              placeholder="Mahsulot izogi"
              :disabled="loading"
              :rows="4"
            />
          </a-form-item>

          <div class="flex gap-4">
            <a-button
              type="primary"
              @click="saveProduct"
              :loading="loading"
              :disabled="loading"
            >
              Saqlash
            </a-button>
            <a-button @click="goBack" :disabled="loading"
              >Bekor qilish</a-button
            >
          </div>
        </a-form>
      </a-spin>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { ProductService } from '~/services/product.service';

  definePageMeta({
    layout: 'dashboard',
  });

  const router = useRouter();
  const route = useRoute();
  const productId = ref<number>(0);
  const isNew = ref<boolean>(true);
  const loading = ref<boolean>(false);
  const error = ref<string>('');

  const form = ref<any>({
    title: '',
    category: '',
    price: 0,
    rating: 0,
    description: '',
  });

  onMounted(() => {
    const id = route.params.id as string;
    productId.value = parseInt(id);

    if (productId.value !== 0) {
      isNew.value = false;
      fetchProduct();
    }
  });

  async function fetchProduct() {
    try {
      loading.value = true;
      // API'dan ma'lumot olish (ProductService'da getById bo'lishi kerak)
      // const { data } = await ProductService.getById(productId.value);
      // form.value = data;
    } catch (err) {
      error.value = "Ma'lumot yuklanishida xato!";
      console.error(err);
    } finally {
      loading.value = false;
    }
  }

  async function saveProduct() {
    try {
      loading.value = true;
      error.value = '';

      if (isNew.value) {
        // Yangi mahsulot yaratish
        // await ProductService.create(form.value);
      } else {
        // Mavjud mahsulotni yangilash
        // await ProductService.update(productId.value, form.value);
      }

      router.push('/products');
    } catch (err) {
      error.value = 'Saqlashda xato yuz berdi!';
      console.error(err);
    } finally {
      loading.value = false;
    }
  }

  function goBack() {
    router.push('/products');
  }
</script>

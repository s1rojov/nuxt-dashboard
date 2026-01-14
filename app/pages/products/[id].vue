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

    <div class="bg-white rounded-lg shadow-lg p-8 w-full">
      <a-spin :spinning="loading">
        <a-form :model="form" layout="vertical">
          <!-- Asosiy ma'lumotlar -->
          <h2 class="text-xl font-bold text-gray-800 mb-6">
            Asosiy ma'lumotlar
          </h2>

          <div
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
          >
            <!-- Nomi -->
            <a-form-item label="Nomi *">
              <a-input
                v-model:value="form.title"
                placeholder="Mahsulot nomi"
                :disabled="loading"
              />
            </a-form-item>

            <!-- Kategoriya -->
            <a-form-item label="Kategoriya *">
              <a-select
                v-model:value="form.category"
                placeholder="Kategoriyani tanlang"
                :disabled="loading"
                :options="categories"
              />
            </a-form-item>

            <!-- Brend -->
            <a-form-item label="Brend">
              <a-input
                v-model:value="form.brand"
                placeholder="Brend nomi"
                :disabled="loading"
              />
            </a-form-item>

            <!-- SKU -->
            <a-form-item label="SKU">
              <a-input
                v-model:value="form.sku"
                placeholder="Unikal identifikator"
                :disabled="loading"
              />
            </a-form-item>
          </div>

          <!-- Narx va Skidka -->
          <h2 class="text-xl font-bold text-gray-800 mb-6 mt-8">
            Narx va Skidka
          </h2>

          <div
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
          >
            <!-- Narx -->
            <a-form-item label="Narx (UZS) *">
              <a-input-number
                v-model:value="form.price"
                placeholder="0"
                :disabled="loading"
                :min="0"
                :precision="2"
                class="w-full"
              />
            </a-form-item>

            <!-- Skidka foizi -->
            <a-form-item label="Skidka (%)">
              <a-input-number
                v-model:value="form.discountPercentage"
                placeholder="0-100"
                :disabled="loading"
                :min="0"
                :max="100"
                :precision="2"
                class="w-full"
              />
            </a-form-item>

            <!-- Reyting -->
            <a-form-item label="Reyting">
              <a-rate
                v-model:value="form.rating"
                :disabled="loading"
                :allow-half="true"
              />
            </a-form-item>

            <!-- Minimal buyurtma -->
            <a-form-item label="Min buyurtma">
              <a-input-number
                v-model:value="form.minimumOrderQuantity"
                placeholder="1"
                :disabled="loading"
                :min="1"
                class="w-full"
              />
            </a-form-item>
          </div>

          <!-- Saqlash va Mavjudlik -->
          <h2 class="text-xl font-bold text-gray-800 mb-6 mt-8">
            Saqlash va Mavjudlik
          </h2>

          <div
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
          >
            <!-- Saqlash miqdori -->
            <a-form-item label="Saqlash miqdori *">
              <a-input-number
                v-model:value="form.stock"
                placeholder="0"
                :disabled="loading"
                :min="0"
                class="w-full"
              />
            </a-form-item>

            <!-- Mavjudlik holati -->
            <a-form-item label="Mavjudlik holati">
              <a-select
                v-model:value="form.availabilityStatus"
                placeholder="Holati tanlang"
                :disabled="loading"
                :options="availabilityOptions"
              />
            </a-form-item>

            <!-- Og'irligi -->
            <a-form-item label="Og'irligi (kg)">
              <a-input-number
                v-model:value="form.weight"
                placeholder="0"
                :disabled="loading"
                :min="0"
                :precision="2"
                class="w-full"
              />
            </a-form-item>

            <!-- Etiketlar -->
            <a-form-item label="Etiketlar">
              <a-select
                v-model:value="form.tags"
                mode="multiple"
                placeholder="Etiketlarni tanlang"
                :disabled="loading"
                :options="tagOptions"
              />
            </a-form-item>
          </div>

          <!-- O'lchamlar -->
          <h2 class="text-xl font-bold text-gray-800 mb-6 mt-8">O'lchamlar</h2>

          <div
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
          >
            <!-- Eni -->
            <a-form-item label="Eni (sm)">
              <a-input-number
                v-model:value="form.dimensions.width"
                placeholder="0"
                :disabled="loading"
                :min="0"
                :precision="2"
                class="w-full"
              />
            </a-form-item>

            <!-- Balandligi -->
            <a-form-item label="Balandligi (sm)">
              <a-input-number
                v-model:value="form.dimensions.height"
                placeholder="0"
                :disabled="loading"
                :min="0"
                :precision="2"
                class="w-full"
              />
            </a-form-item>

            <!-- Chuqurlik -->
            <a-form-item label="Chuqurlik (sm)">
              <a-input-number
                v-model:value="form.dimensions.depth"
                placeholder="0"
                :disabled="loading"
                :min="0"
                :precision="2"
                class="w-full"
              />
            </a-form-item>
          </div>

          <!-- Tavsiflar -->
          <h2 class="text-xl font-bold text-gray-800 mb-6 mt-8">Tavsiflar</h2>

          <div
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
          >
            <!-- Tavsif -->
            <div class="lg:col-span-2">
              <a-form-item label="Mahsulot tavsifi *">
                <a-textarea
                  v-model:value="form.description"
                  placeholder="Mahsulotning to'liq tavsifini yozing"
                  :disabled="loading"
                  :rows="4"
                />
              </a-form-item>
            </div>

            <!-- Kafolat -->
            <div class="lg:col-span-2">
              <a-form-item label="Kafolat ma'lumoti">
                <a-textarea
                  v-model:value="form.warrantyInformation"
                  placeholder="Kafolat shartlari"
                  :disabled="loading"
                  :rows="4"
                />
              </a-form-item>
            </div>
          </div>

          <!-- Yetkazib berish va Qaytarish -->
          <h2 class="text-xl font-bold text-gray-800 mb-6 mt-8">
            Yetkazib berish va Qaytarish siyosati
          </h2>

          <div
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
          >
            <!-- Yetkazib berish -->
            <div class="lg:col-span-2">
              <a-form-item label="Yetkazib berish ma'lumoti">
                <a-textarea
                  v-model:value="form.shippingInformation"
                  placeholder="Yetkazib berish bo'yicha ma'lumot"
                  :disabled="loading"
                  :rows="3"
                />
              </a-form-item>
            </div>

            <!-- Qaytarish siyosati -->
            <div class="lg:col-span-2">
              <a-form-item label="Qaytarish siyosati">
                <a-textarea
                  v-model:value="form.returnPolicy"
                  placeholder="Qaytarish bo'yicha qoidalar"
                  :disabled="loading"
                  :rows="3"
                />
              </a-form-item>
            </div>
          </div>

          <!-- Rasmlar -->
          <h2 class="text-xl font-bold text-gray-800 mb-6 mt-8">Rasmlar</h2>

          <div
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
          >
            <!-- Miniatura -->
            <a-form-item label="Miniatura rasmi (URL)">
              <a-input
                v-model:value="form.thumbnail"
                placeholder="https://example.com/image.jpg"
                :disabled="loading"
              />
            </a-form-item>
          </div>

          <!-- Qo'shimcha rasmlar -->
          <div class="mb-6">
            <label class="block text-gray-700 font-bold mb-2"
              >Qo'shimcha rasmlar (URL)</label
            >
            <div class="space-y-2">
              <div
                v-for="(image, index) in form.images"
                :key="index"
                class="flex gap-2"
              >
                <a-input
                  v-model:value="form.images[index]"
                  placeholder="https://example.com/image.jpg"
                  :disabled="loading"
                />
                <a-button
                  type="primary"
                  danger
                  @click="removeImage(index)"
                  :disabled="loading || form.images.length === 1"
                >
                  O'chirish
                </a-button>
              </div>
              <a-button @click="addImage" :disabled="loading">
                + Rasm qo'shish
              </a-button>
            </div>
          </div>

          <!-- Tugmalar -->
          <div class="flex gap-4 mt-8 pt-6 border-t">
            <a-button
              type="primary"
              @click="saveProduct"
              :loading="loading"
              :disabled="loading"
              size="large"
            >
              ✓ Saqlash
            </a-button>
            <a-button @click="goBack" :disabled="loading" size="large">
              ✕ Bekor qilish
            </a-button>
          </div>
        </a-form>
      </a-spin>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRouter, useRoute } from 'vue-router';

  definePageMeta({
    layout: 'dashboard',
  });

  const router = useRouter();
  const route = useRoute();
  const productId = ref<number>(0);
  const isNew = ref<boolean>(true);
  const loading = ref<boolean>(false);
  const error = ref<string>('');
  const categories = ref<any>([]);

  // Mavjudlik holati
  const availabilityOptions = [
    { label: 'Mavjud', value: 'In Stock' },
    { label: 'Kam miqdorda', value: 'Low Stock' },
    { label: 'Tugagan', value: 'Out of Stock' },
  ];

  // Etiketlar
  const tagOptions = [
    { label: 'Yangi', value: 'new' },
    { label: 'Aktsiya', value: 'sale' },
    { label: 'Mashhur', value: 'popular' },
    { label: 'Tavsiya qilinadigan', value: 'recommended' },
    { label: 'Chegaralangan nashr', value: 'limited' },
    { label: 'Premium', value: 'premium' },
    { label: 'Eco-friendly', value: 'eco' },
  ];

  const form = ref<any>({
    title: '',
    description: '',
    category: '',
    price: 0,
    discountPercentage: 0,
    rating: 0,
    stock: 0,
    tags: [],
    brand: '',
    sku: '',
    weight: 0,
    dimensions: {
      width: 0,
      height: 0,
      depth: 0,
    },
    warrantyInformation: '',
    shippingInformation: '',
    availabilityStatus: 'In Stock',
    returnPolicy: '',
    minimumOrderQuantity: 1,
    images: [''],
    thumbnail: '',
  });

  onMounted(async () => {
    await fetchCategories();

    const id = route.params.id as string;
    productId.value = parseInt(id);

    if (productId.value !== 0 && !isNaN(productId.value)) {
      isNew.value = false;
      await fetchProduct();
    }
  });

  // DummyJSON API'dan kategoriyalar olish
  async function fetchCategories() {
    try {
      const response = await fetch('https://dummyjson.com/products/categories');
      const data = await response.json();
      categories.value = data.map((cat: string) => ({
        label: cat.charAt(0).toUpperCase() + cat.slice(1),
        value: cat,
      }));
    } catch (err) {
      console.error('Kategoriyalar yuklanishida xato:', err);
    }
  }

  // DummyJSON API'dan mahsulot olish
  async function fetchProduct() {
    try {
      loading.value = true;
      error.value = '';
      const response = await fetch(
        `https://dummyjson.com/products/${productId.value}`,
      );

      if (!response.ok) {
        throw new Error('Mahsulot topilmadi');
      }

      const data = await response.json();

      // Ma'lumotlarni formga to'ldirish
      form.value = {
        title: data.title || '',
        description: data.description || '',
        category: data.category || '',
        price: data.price || 0,
        discountPercentage: data.discountPercentage || 0,
        rating: data.rating || 0,
        stock: data.stock || 0,
        tags: data.tags || [],
        brand: data.brand || '',
        sku: data.sku || '',
        weight: data.weight || 0,
        dimensions: {
          width: data.dimensions?.width || 0,
          height: data.dimensions?.height || 0,
          depth: data.dimensions?.depth || 0,
        },
        warrantyInformation: data.warrantyInformation || '',
        shippingInformation: data.shippingInformation || '',
        availabilityStatus: data.availabilityStatus || 'In Stock',
        returnPolicy: data.returnPolicy || '',
        minimumOrderQuantity: data.minimumOrderQuantity || 1,
        images: data.images && data.images.length > 0 ? [...data.images] : [''],
        thumbnail: data.thumbnail || data.images?.[0] || '',
      };
    } catch (err) {
      error.value = "Ma'lumot yuklanishida xato!";
      console.error(err);
    } finally {
      loading.value = false;
    }
  }

  async function saveProduct() {
    try {
      // Validatsiya
      if (!form.value.title.trim()) {
        error.value = "Mahsulot nomi to'ldirilishi shart!";
        return;
      }
      if (!form.value.category) {
        error.value = 'Kategoriya tanlanishi shart!';
        return;
      }
      if (!form.value.description.trim()) {
        error.value = "Tavsif to'ldirilishi shart!";
        return;
      }
      if (form.value.price <= 0) {
        error.value = "Narx 0 dan katta bo'lishi kerak!";
        return;
      }
      if (form.value.stock < 0) {
        error.value = "Saqlash miqdori manfiy bo'la olmaydi!";
        return;
      }

      loading.value = true;
      error.value = '';

      // Rasmlarni to'g'rilash (bo'sh qatorlarni o'chirish)
      form.value.images = form.value.images.filter(
        (img: string) => img.trim() !== '',
      );
      if (form.value.images.length === 0) {
        form.value.images = [''];
      }

      const method = isNew.value ? 'POST' : 'PUT';
      const url = isNew.value
        ? 'https://dummyjson.com/products/add'
        : `https://dummyjson.com/products/${productId.value}`;

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form.value),
      });

      if (!response.ok) {
        throw new Error('Saqlashda xato yuz berdi');
      }

      const result = await response.json();
      console.log(
        isNew.value ? 'Yangi mahsulot yaratildi:' : 'Mahsulot yangilandi:',
        result,
      );

      router.push('/products');
    } catch (err: any) {
      error.value = err?.message || 'Saqlashda xato yuz berdi!';
      console.error(err);
    } finally {
      loading.value = false;
    }
  }

  function goBack() {
    router.push('/products');
  }

  function addImage() {
    form.value.images.push('');
  }

  function removeImage(index: number) {
    if (form.value.images.length > 1) {
      form.value.images.splice(index, 1);
    }
  }
</script>

<style scoped>
  /* Ant Design Input Number uchun to'liq kenglik */
  :deep(.ant-input-number) {
    width: 100%;
  }
</style>

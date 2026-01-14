<template>
  <div class="p-8 bg-linear-to-br from-slate-50 to-slate-100 min-h-screen">
    <div class="mb-6">
      <h1 class="text-4xl font-bold text-gray-800 mb-4">Mahsulotlar</h1>
    </div>

    <div
      v-if="error"
      class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
    >
      {{ error }}
    </div>

    <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <a-input-search
          v-model:value="filter.search"
          placeholder="Nomi bo'yicha qidirish..."
          @search="handleSearch"
          :disabled="loading"
        />

        <a-select
          v-model:value="filter.category"
          placeholder="Kategoriya"
          :disabled="loading"
          allow-clear
          @change="handleFilterChange"
          :options="categories"
        />

        <a-range-picker
          v-model:value="filter.priceRange"
          type="number"
          placeholder="Narx diapazoni"
          :disabled="loading"
          @change="handleFilterChange"
        />

        <a-select
          v-model:value="filter.availabilityStatus"
          placeholder="Mavjudlik holati"
          :disabled="loading"
          allow-clear
          @change="handleFilterChange"
          :options="availabilityOptions"
        />
      </div>

      <div class="flex justify-between items-center mt-6">
        <div class="flex gap-4 items-center">
          <a-button type="primary" @click="Create" :disabled="loading">
            ➕ Qo'shish
          </a-button>

          <a-button
            v-if="selectedRowKeys.length > 0"
            type="primary"
            danger
            @click="showBulkDeleteModal"
            :disabled="loading"
          >
            🗑️ Tanlangan {{ selectedRowKeys.length }} ta o'chirish
          </a-button>

          <a-button
            @click="exportToCSV"
            :disabled="loading || products.length === 0"
          >
            📥 CSV chiqarish
          </a-button>
        </div>

        <div class="flex gap-2 items-center">
          <span>Har sahifada:</span>
          <a-select
            v-model:value="pagination.pageSize"
            style="width: 80px"
            :disabled="loading"
            @change="handlePageSizeChange"
            :options="[
              { label: '10', value: 10 },
              { label: '20', value: 20 },
              { label: '50', value: 50 },
            ]"
          />
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-lg overflow-hidden">
      <a-table
        :columns="columns"
        :data-source="products"
        :pagination="pagination"
        :loading="loading"
        :row-key="(record) => record.id"
        :row-selection="{ selectedRowKeys, onChange: onSelectChange }"
        @change="handleTableChange"
        :scroll="{ x: 1200 }"
      >
        <template #bodyCell="{ column, text, record }">
          <template v-if="column.key === 'price'">
            <span class="font-semibold text-green-600">{{
              formatPrice(text)
            }}</span>
          </template>

          <template v-else-if="column.key === 'discountPercentage'">
            <a-tag v-if="text" color="orange">-{{ text }}%</a-tag>
            <span v-else class="text-gray-400">—</span>
          </template>

          <template v-else-if="column.key === 'rating'">
            <a-rate :value="text" disabled :allow-half="true" />
            <span class="ml-2 text-sm text-gray-600">({{ text }})</span>
          </template>

          <template v-else-if="column.key === 'stock'">
            <a-tag :color="getStockColor(record)"> {{ text }} ta </a-tag>
          </template>

          <template v-else-if="column.key === 'availabilityStatus'">
            <a-tag :color="getAvailabilityColor(text)">
              {{ text }}
            </a-tag>
          </template>

          <template v-else-if="column.key === 'description'">
            <span class="truncate block max-w-xs">{{ text }}</span>
          </template>

          <template v-else-if="column.key === 'actions'">
            <div class="flex gap-2">
              <a-button
                type="primary"
                size="small"
                @click="editProduct(record.id)"
                title="Tahrirla"
              >
                ✏️
              </a-button>
              <a-popconfirm
                title="Rostanham o'chirmoqchisiz?"
                description="Bu amalni qaytara olmaysiz"
                ok-text="Ha"
                cancel-text="Yo'q"
                @confirm="deleteProduct(record.id)"
              >
                <a-button type="primary" danger size="small" title="O'chirish">
                  🗑️
                </a-button>
              </a-popconfirm>
            </div>
          </template>
        </template>
      </a-table>
    </div>

    <a-modal
      v-model:visible="bulkDeleteModal"
      title="Tasdiqlash"
      ok-text="O'chirish"
      cancel-text="Bekor qilish"
      ok-button-props="{ danger: true }"
      @ok="confirmBulkDelete"
    >
      <p>{{ selectedRowKeys.length }} ta mahsulotni o'chiroq?</p>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, computed } from 'vue';
  import { useRouter } from 'vue-router';

  definePageMeta({
    layout: 'dashboard',
  });

  const router = useRouter();
  const products = ref<any>([]);
  const categories = ref<any>([]);
  const loading = ref<boolean>(false);
  const error = ref<string>('');
  const selectedRowKeys = ref<any[]>([]);
  const bulkDeleteModal = ref<boolean>(false);

  const filter = ref<any>({
    search: '',
    category: '',
    priceRange: [],
    availabilityStatus: '',
    sortField: 'id',
    sortOrder: 'ascend',
  });

  const pagination = ref<any>({
    current: 1,
    pageSize: 10,
    total: 0,
    showSizeChanger: true,
    showTotal: (total: number) => `Jami: ${total} ta`,
  });

  const availabilityOptions = [
    { label: 'Mavjud', value: 'In Stock' },
    { label: 'Kam miqdorda', value: 'Low Stock' },
    { label: 'Tugagan', value: 'Out of Stock' },
  ];

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 60,
      sorter: true,
    },
    {
      title: 'Nomi',
      dataIndex: 'title',
      key: 'title',
      width: 200,
    },
    {
      title: 'Brend',
      dataIndex: 'brand',
      key: 'brand',
      width: 120,
    },
    {
      title: 'Kategoriya',
      dataIndex: 'category',
      key: 'category',
      width: 120,
    },
    {
      title: 'Narx',
      dataIndex: 'price',
      key: 'price',
      width: 100,
      sorter: true,
    },
    {
      title: 'Skidka',
      dataIndex: 'discountPercentage',
      key: 'discountPercentage',
      width: 80,
    },
    {
      title: 'Reyting',
      dataIndex: 'rating',
      key: 'rating',
      width: 120,
    },
    {
      title: 'Saqlash',
      dataIndex: 'stock',
      key: 'stock',
      width: 80,
      sorter: true,
    },
    {
      title: 'Mavjudlik',
      dataIndex: 'availabilityStatus',
      key: 'availabilityStatus',
      width: 120,
    },
    {
      title: 'Tavsif',
      dataIndex: 'description',
      key: 'description',
      width: 250,
    },
    {
      title: 'Amallar',
      key: 'actions',
      width: 100,
      fixed: 'right',
    },
  ];

  onMounted(() => {
    fetchCategories();
    refresh();
  });

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

  function refresh() {
    loading.value = true;
    error.value = '';

    let url = `https://dummyjson.com/products?limit=${
      pagination.value.pageSize
    }&skip=${(pagination.value.current - 1) * pagination.value.pageSize}`;

    if (filter.value.search) {
      url = `https://dummyjson.com/products/search?q=${filter.value.search}&limit=${pagination.value.pageSize}`;
    }

    if (filter.value.category) {
      url = `https://dummyjson.com/products/category/${
        filter.value.category
      }?limit=${pagination.value.pageSize}&skip=${
        (pagination.value.current - 1) * pagination.value.pageSize
      }`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        products.value = data.products || [];
        pagination.value.total = data.total || 0;

        filterProducts();
      })
      .catch((err) => {
        error.value = "Ma'lumot yuklanishida xato!";
        console.error(err);
      })
      .finally(() => {
        loading.value = false;
      });
  }

  function filterProducts() {
    let filtered = [...products.value];

    if (filter.value.priceRange && filter.value.priceRange.length === 2) {
      filtered = filtered.filter(
        (p) =>
          p.price >= filter.value.priceRange[0] &&
          p.price <= filter.value.priceRange[1],
      );
    }

    if (filter.value.availabilityStatus) {
      filtered = filtered.filter(
        (p) => p.availabilityStatus === filter.value.availabilityStatus,
      );
    }

    products.value = filtered;
    pagination.value.total = filtered.length;
  }

  function handleSearch() {
    pagination.value.current = 1;
    refresh();
  }

  function handleFilterChange() {
    pagination.value.current = 1;
    refresh();
  }

  function handlePageSizeChange() {
    pagination.value.current = 1;
    refresh();
  }

  function handleTableChange(pag: any, filters: any, sorter: any) {
    pagination.value.current = pag.current;
    pagination.value.pageSize = pag.pageSize;

    if (sorter.field) {
      filter.value.sortField = sorter.field;
      filter.value.sortOrder = sorter.order;
    }

    refresh();
  }

  function Create() {
    router.push('/products/0');
  }

  function editProduct(id: number) {
    router.push(`/products/${id}`);
  }

  async function deleteProduct(id: number) {
    try {
      loading.value = true;
      const response = await fetch(`https://dummyjson.com/products/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        refresh();
      }
    } catch (err) {
      error.value = "Mahsulotni o'chirishda xato yuz berdi!";
      console.error(err);
    } finally {
      loading.value = false;
    }
  }

  function showBulkDeleteModal() {
    bulkDeleteModal.value = true;
  }

  async function confirmBulkDelete() {
    try {
      loading.value = true;
      bulkDeleteModal.value = false;

      for (const id of selectedRowKeys.value) {
        await fetch(`https://dummyjson.com/products/${id}`, {
          method: 'DELETE',
        });
      }

      selectedRowKeys.value = [];
      refresh();
    } catch (err) {
      error.value = "Mahsulotlarni o'chirishda xato yuz berdi!";
      console.error(err);
    } finally {
      loading.value = false;
    }
  }

  function onSelectChange(keys: any) {
    selectedRowKeys.value = keys;
  }

  function exportToCSV() {
    if (products.value.length === 0) return;

    const headers = [
      'ID',
      'Nomi',
      'Brend',
      'Kategoriya',
      'Narx',
      'Skidka',
      'Reyting',
      'Saqlash',
      'Mavjudlik',
    ];

    const rows = products.value.map((p: any) => [
      p.id,
      p.title,
      p.brand || '',
      p.category,
      p.price,
      p.discountPercentage || 0,
      p.rating,
      p.stock,
      p.availabilityStatus,
    ]);

    const csv = [headers, ...rows]
      .map((row) => row.map((cell) => `"${cell}"`).join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mahsulotlar_${new Date().getTime()}.csv`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }

  function formatPrice(price: number) {
    return new Intl.NumberFormat('uz-UZ', {
      style: 'currency',
      currency: 'UZS',
    }).format(price);
  }

  function getStockColor(record: any) {
    if (record.stock > 50) return 'green';
    if (record.stock > 10) return 'orange';
    if (record.stock > 0) return 'red';
    return 'default';
  }

  function getAvailabilityColor(status: string) {
    switch (status) {
      case 'In Stock':
        return 'green';
      case 'Low Stock':
        return 'orange';
      case 'Out of Stock':
        return 'red';
      default:
        return 'default';
    }
  }
</script>

<template>
  <div>
    <div class="bg-white h-fit mb-3 rounded-lg px-3 py-2 flex justify-between">
      <a-input v-model="filter.search" placeholder="search" class="w-56!" />
      <a-button type="primary" @click="Create">Qo'shish</a-button>
    </div>
    <a-table
      :columns="columns"
      :data-source="products"
      :pagination="pagination"
      :loading="loading"
      :row-key="(record) => record.id"
      @change="handleTableChange"
    >
      <template #bodyCell="{ column, text, record }">
        <template v-if="column.key === 'id'">
          <a-button type="link" @click="editProduct(record.id)">{{
            text
          }}</a-button>
        </template>
        <template v-else-if="column.dataIndex === 'name'">
          {{ text.first }} {{ text.last }}
        </template>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { ProductService } from '~/services/product.service';
  import { useRouter } from 'vue-router';

  definePageMeta({
    layout: 'dashboard',
  });

  const router = useRouter();
  const products = ref<any>([]);
  const loading = ref<boolean>(false);
  const error = ref<string>('');

  const filter = ref<any>({
    page: 1,
    limit: 10,
    total: 0,
    skip: 0,
  });

  const pagination = ref<any>({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Nomi',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Kategoriya',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Narx',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Reyting',
      dataIndex: 'rating',
      key: 'rating',
    },
    {
      title: 'Izog',
      dataIndex: 'description',
      key: 'description',
      width: 400,
    },
  ];

  onMounted(() => {
    refresh();
  });

  function Create() {
    router.push('/products/0');
  }

  function editProduct(id: number) {
    router.push(`/products/${id}`);
  }

  function refresh() {
    loading.value = true;
    ProductService.getAll({
      skip: (filter.value.page - 1) * filter.value.limit,
      limit: filter.value.limit,
    })
      .then((res) => {
        products.value = res.data.value?.products;
      })
      .finally(() => {
        loading.value = false;
      });
  }

  const handleTableChange = (pag: any) => {
    filter.value.page = pag.current;
    filter.value.limit = pag.pageSize;
    refresh();
  };
</script>

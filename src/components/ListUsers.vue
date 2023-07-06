<template>
  <div class="container">
    <div class="row">
      <div class="col-2"></div>
      <div class="col-10">
        <h3 class="text-center my-5">DANH SÁCH NÔNG DÂN</h3>
        <template>
          <div class="">
            <div class="row">
              <div class="col-6">
                <button type="button" class="btn btn-success col-3" data-bs-toggle="modal" data-bs-target="#exampleModal">
                  <i class="bi bi-plus-lg"></i> Thêm
                </button>
              </div>
            </div>
          </div>
        </template>

        <table class="table table-bordered mx-auto  mt-3">
          <thead class="table-success text-center">
            <tr class="mx-auto text-center">
              <th class="col-2">Tên</th>
              <th class="col-2">Username </th>
              <th class="col-1">Số điện thoại</th>
              <th class="col-2">Địa chỉ</th>
              <th class="col-2">Ngày tạo</th>
              <th class="col-1">Quản lý</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in result" :key="user.id">
              <td>{{ user.name }}</td>
              <td>{{ user.username }}</td>
              <td>{{ user.phone }}</td>
              <td>{{ user.address }}</td>
              <td>{{ user.createdDay }}</td>

              <td class="text-center">
                <button type="button" class="btn btn-danger btn-sm" @click="deleteSearch(user)"><i
                    class="bi bi-trash3"></i> Xóa</button>
              </td>
            </tr>
          </tbody>
        </table>

        <nav aria-label="Page navigation example">
          <ul class="pagination justify-content-end">
            <li class="page-item" v-bind:class="{ disabled: currentPage === 1 }">
              <a class="page-link" href="#" aria-label="Previous"
                @click.prevent="currentPage > 1 ? goToPage(currentPage - 1) : null">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li class="page-item" v-for="page in pages" :key="page" v-bind:class="{ active: page === currentPage }">
              <a class="page-link" href="#" @click.prevent="goToPage(page)">{{ page }}</a>
            </li>
            <li class="page-item" v-bind:class="{ disabled: currentPage === pages.length }">
              <a class="page-link" href="#" aria-label="Next"
                @click.prevent="currentPage < pages.length ? goToPage(currentPage + 1) : null">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import ModalUsers from './ModalUsers.vue';
import axios from 'axios';
import api from '../services/Users';
Vue.use(axios)
export default {
  data() {
    return {
      user: {
        id: null,
        username: "",
        password: "",
        name: "",
        phone: "",
        address: "",
        createdDay: null,
        updatedDay: null,
      },
      errorMessage: "",
      successMessage: "",
      result: [],
      resultOnPage: [],
      searchName: "",
      currentPage: 1,
      itemsPerPage: 5,
      pages: [],
    };
  },
  created() {
    this.searchLoad();
  },
  comments: {
    ModalUsers,
  },
  methods: {
    async searcheLoad() {
      try {
        const response = await api.getUsers();
        this.result = response.data;
        const totalPages = Math.ceil(this.result.length / this.itemsPerPage);
        this.pages = Array.from({ length: totalPages }, (_, index) => index + 1);
        this.goToPage(1);
      }
      catch (error) {
        console.error(error);
      }
    },
    goToPage(pageNumber) {
      const startIndex = (pageNumber - 1) * this.itemsPerPage;
      const endIndex = Math.min(startIndex + this.itemsPerPage, this.result.length);
      this.resultOnPage = this.result.slice(startIndex, endIndex);
      this.currentPage = pageNumber;
    },
    deleteSearch(user) {
      api.deleteUser(user.id)
        .then(response => {
          console.log(response);
          location.reload();
        });
    },
  },
  mounted() {
    this.searcheLoad();
  },
 
}
</script>


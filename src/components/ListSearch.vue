

<template>
  <div class="container">
    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5 mx-auto text-center" id="exampleModalLabel">
              <div class="" v-if="search.id === null">THÊM TÌM KIẾM</div>
              <div class="" v-else>CHỈNH SỬA TÌM KIẾM</div>
            </h1>

            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="save">
              <div class="mb-3">
                <label for="formGroupExampleInput" class="form-label fw-bold">Tên:</label>
                <input type="text" v-model="search.name" class="form-control" id="formGroupExampleInput"
                  placeholder="Nhập vào tên">
              </div>

              <div class="mb-3">
                <label for="formGroupExampleInput2" class="form-label fw-bold">Giá:</label>
                <input type="text" v-model="search.price" class="form-control" id="formGroupExampleInput2"
                  placeholder="Nhập vào giá">
              </div>
              <div class="mb-3">
                <label for="formGroupExampleInput2" class="form-label fw-bold">Loại tìm kiếm:</label>

                <select class="form-select" v-model="search.typeSearch" aria-label="Default select example">

                  <option value="" selected>Loại tìm kiếm</option>
                  <option value="1">Giá giống</option>
                  <option value="2">Giá vật tư</option>
                  <option value="3">Giá thu mua</option>
                  <option value="4">Hướng dẫn canh tác</option>
                </select>

              </div>

              <div class="mb-3">
                <label for="formGroupExampleInput2" class="form-label fw-bold">Mô tả:</label>
                <input type="text" v-model="search.description" class="form-control" id="formGroupExampleInput2"
                  placeholder="Nhập vào mô tả">
              </div>
              <button type="submit" class="btn btn-success col-2 "><i class="bi bi-save"></i> Lưu</button>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary col-3" data-bs-dismiss="modal"><i class="bi bi-x-lg"></i>
              Đóng</button>
          </div>
        </div>
      </div>
    </div>


    <div class="row">
      <div class="col-2"></div>
      <div class="col-10">
        <h3 class="text-center my-5">DANH SÁCH TRA CỨU</h3>

        <template>
          <div class="">
            <div class="row">
              <div class="col-5"> <button type="button" class="btn btn-success col-3" data-bs-toggle="modal"
                  data-bs-target="#exampleModal"><i class="bi bi-plus-lg"></i> Thêm</button>
              </div>
              <div class="col-7">
                <div class="row">

                  <!-- form tìm kiếm -->
                  <form @submit="searchBy">
                    <div class="input-group">
                      <input type="text" class="form-control" v-model="name" placeholder="Nhập tên để tìm kiếm...">
                      <select class="form-select" v-model="typeSearch" aria-label="Default select example">
                        <option value="" selected>Chọn loại tìm kiếm</option>
                        <option value="1">Giá giống</option>
                        <option value="2">Giá vật tư</option>
                        <option value="3">Giá thu mua</option>
                        <option value="4">Hướng dẫn canh tác</option>
                      </select>
                      <div class="input-group-append">
                        <button type="submit" class="btn btn-secondary"><i class="bi bi-search"></i> Tìm
                          kiếm</button>
                      </div>
                    </div>
                  </form>

                </div>
              </div>
            </div>
          </div>
        </template>
        <div>

        </div>

        <table class="table table-bordered mx-auto  mt-3">
          <thead class="table-success text-center">
            <tr class="mx-auto text-center">
              <th class="col-2 text-center">Tên </th>
              <th class="col-1">Giá</th>
              <th class="col-4">Mô tả</th>
              <th class="col-2">Loại tìm kiếm</th>
              <th class="col-3 text-center">Quản lý</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="search in resultOnPage" :key="search.id">
              <td>{{ search.name }}</td>
              <td>{{ search.price }}</td>
              <td>{{ search.description }}</td>
              <td class="text-center">
                <div v-if="search.typeSearch == '1'">Giá giống</div>
                <div v-else-if="search.typeSearch == '2'">Giá vật tư</div>
                <div v-else-if="search.typeSearch == '3'">Giá thu mua</div>
                <div v-else>Hướng dẫn canh tác</div>
              </td>
              <td class="mx-auto text-center">

                <button type="button" class="btn btn-warning btn-sm text-white" data-bs-toggle="modal"
                  data-bs-target="#exampleModal" @click="edit(search)"><i class="bi bi-pencil"></i> Chỉnh sửa</button>
                <button type="button" class="btn btn-danger btn-sm" @click="deleteSearch(search)"><i
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
import moment from 'moment';
import axios from 'axios';

import { getSearches, createSearch, updateSearch, deleteSearch, searchByName, searchByParams } from '../services/Search';
Vue.use(axios)
export default {
  data() {
    return {
      search: {
        id: null,
        name: '',
        price: '',
        typeSearch: '',
        description: '',
        createdDay: null,
        updatedDay: null,
      },

      result: [],
      resultOnPage: [],
      searchName: '',
      currentPage: 1,
      itemsPerPage: 10,
      pages: [],

      name: '',
      typeSearch: '',
      price: '',
      params: [],
      noResultsMessage: ''
    };
  },
  methods: {



    searchBy(event) {
      event.preventDefault();

      let params = {};

      if (this.name && !this.typeSearch) {
        params = {
          name: this.name
        };
      } else if (!this.name && this.typeSearch) {
        params = {
          typeSearch: this.typeSearch
        };
      } else if (this.name && this.typeSearch) {
        params = {
          name: this.name,
          typeSearch: this.typeSearch
        };
      }

      searchByParams(params)
        .then(response => {
          if (response.data.length > 0) {
            this.resultOnPage = response.data;
            this.noResultsMessage = '';
          } else {
            this.resultOnPage = [];
            this.noResultsMessage = 'No results found.';
          }
        })
        .catch(error => {
          console.error(error);
        });
    },

    async searcheLoad() {
      try {
        const response = await getSearches();
        this.result = response.data;

        const totalPages = Math.ceil(this.result.length / this.itemsPerPage);
        this.pages = Array.from({ length: totalPages }, (_, index) => index + 1);
        this.goToPage(1);


      } catch (error) {
        console.error(error);
      }
    },


    goToPage(pageNumber) {
      const startIndex = (pageNumber - 1) * this.itemsPerPage;
      const endIndex = Math.min(startIndex + this.itemsPerPage, this.result.length);
      this.resultOnPage = this.result.slice(startIndex, endIndex);
      this.currentPage = pageNumber;
    },


    save() {
      if (!this.search.id) {
        this.saveData();
      }
      else {
        this.editData();
      }
    },
    created() {

    },
    saveData() {

      const currentDateTime = moment().format('YYYY-MM-DD HH:mm:ss');
      this.search.createdDay = currentDateTime;
      this.search.updatedDay = currentDateTime;

      createSearch(this.search)
        .then(response => {
          console.log(response);
          location.reload();
        });
    },

    edit(search) {
      this.search = search;

    },
    editData() {
      const currentDateTime = moment().format('YYYY-MM-DD HH:mm:ss');
      this.search.updatedDay = currentDateTime;

     updateSearch(this.search.id, this.search)
        .then(({ data }) => {
          // Logic cập nhật dữ liệu
        })

        .catch((error) => {
          console.error(error);
        });

    },
    deleteSearch(search) {
      deleteSearch(search.id)
        .then(response => {
          console.log(response);
          location.reload();
        })
        .catch(error => {
          console.error(error);
        });
    },

  },
  mounted() {
    this.searcheLoad();
  }
}

</script>

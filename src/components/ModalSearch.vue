<template>
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
      this.search = { ...search };
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
  },
  mounted() {
    this.searcheLoad();
  }
}

</script>

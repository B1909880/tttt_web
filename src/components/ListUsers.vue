<template>
  <div class="container">
    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5 mx-auto text-center" id="exampleModalLabel">
              THÊM NÔNG DÂN
            </h1>

            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="save">
              <div class="mb-3">
                <label for="formGroupExampleInput" class="form-label fw-bold">Tên:</label>
                <input type="text" v-model="user.name" class="form-control" id="formGroupExampleInput"
                  placeholder="Nhập vào tên nông dân">
              </div>

              <div class="mb-3">
                <label for="formGroupExampleInput2" class="form-label fw-bold">Username:</label>
                <input type="text" v-model="user.username" class="form-control" id="formGroupExampleInput2"
                  placeholder="Nhập vào username nông dân">
              </div>
              <div class="mb-3">
                <label for="formGroupExampleInput2" class="form-label fw-bold">Mật khẩu:</label>
                <input type="password" class="form-control" v-model="user.password" aria-label="Default select example"
                  placeholder="Nhập vào mật khẩu" :pattern="passwordPattern">
              </div>

              <div class="mb-3">
                <label for="formGroupExampleInput2" class="form-label fw-bold">Số điện thoại:</label>
                <input type="text" v-model="user.phone" class="form-control" id="formGroupExampleInput2"
                  placeholder="Nhập vào số điện thoại">
              </div>
              <div class="mb-3">
                <label for="formGroupExampleInput2" class="form-label fw-bold">Địa chỉ:</label>
                <input type="text" v-model="user.address" class="form-control" id="formGroupExampleInput2"
                  placeholder="Nhập vào đại chỉ">
              </div>
              <button type="submit" class="btn btn-success col-2 "><i class="bi bi-save"></i> Lưu</button>
            </form>

            <div v-if="errorMessage">{{ errorMessage }}</div>
            <div v-if="successMessage">{{ successMessage }}</div>
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
        <h3 class="text-center my-5">DANH SÁCH NÔNG DÂN</h3>
        <template>
          <div class="">
            <div class="row">
              <div class="col-6"> <button type="button" class="btn btn-success col-3" data-bs-toggle="modal"
                  data-bs-target="#exampleModal"><i class="bi bi-plus-lg"></i>
                  Thêm
                </button></div>
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
import moment from 'moment';
import axios from 'axios';
Vue.use(axios)
export default {

  data() {
    return {
      user: {
        id: null,
        username: '',
        password: '',
        name: '',
        phone: '',
        address: '',
        createdDay: null,
        updatedDay: null,
      },
      errorMessage: '', // Thông báo lỗi
      successMessage: '',

      result: [],
      resultOnPage: [],
      searchName: '',
      currentPage: 1,
      itemsPerPage: 5,
      pages: [],

    };
  },
  created() {
    this.searchLoad();
  },
  methods: {
    async searcheLoad() {
      try {
        const response = await axios.get('http://localhost:8098/auth/');
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
      if (!this.user.id) {
        this.saveData();
      }
      else {
        this.editData();
      }
    },
    saveData() {
      const currentDateTime = moment().format('YYYY-MM-DD HH:mm:ss');
      this.user.createdDay = currentDateTime;
      this.user.updatedDay = currentDateTime;

      axios.post('http://localhost:8098/auth/register', this.user)
        .then(response => {
          console.log(response);

          this.successMessage = response.data;
          this.errorMessage = '';
          location.reload();
        })
        .catch(error => {
          // Xử lý lỗi nếu có lỗi xảy ra
          this.errorMessage = error.response.data;
          this.successMessage = '';
        });
    },
    edit(user) {
      this.user = user;

    },
    editData() {
      const currentDateTime = moment().format('YYYY-MM-DD HH:mm:ss');
      this.user.updatedDay = currentDateTime;

      axios.put(`http://localhost:8098/auth/${this.user.id}`, this.user)
        .then(({ data }) => {
          // location.reload();// Reset form fields Reset form fields

        })
        .catch((error) => {
          console.error(error);
        });
    },
    deleteSearch(user) {
      axios.delete("http://localhost:8098/auth/" + user.id).then(response => {
        console.log(response);

        location.reload()
      });
    },

    searchByName() {
      const url = `http://localhost:8098/auth/name?name=${this.searchName}`;
      axios.get(url)
        .then(response => {
          this.result = response.data;
          const totalPages = Math.ceil(this.result.length / this.itemsPerPage);
          this.pages = Array.from({ length: totalPages }, (_, index) => index + 2);
          this.goToPage(1);
        })
        .catch(error => {
          console.error(error);
        });
    }
  },

  mounted() {
    this.searcheLoad();
  }
}
</script>


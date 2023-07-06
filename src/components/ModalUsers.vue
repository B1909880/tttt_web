<template>
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5 mx-auto text-center" id="exampleModalLabel">THÊM NÔNG DÂN</h1>
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
          <button type="button" class="btn btn-secondary col-3" data-bs-dismiss="modal">
            <i class="bi bi-x-lg"></i> Đóng
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import api from '../services/Users';

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
      errorMessage: '',
      successMessage: '',

    };
  },
  methods: {
    save() {
      const currentDateTime = moment().format('YYYY-MM-DD HH:mm:ss');
      this.user.createdDay = currentDateTime;
      this.user.updatedDay = currentDateTime;

      api.registerUser(this.user)
        .then(response => {
          console.log(response.data);

          this.successMessage = response.data;
          this.errorMessage = '';
          location.reload();
        })
        .catch(error => {
          if (error.response) {
            this.errorMessage = error.response.data;
          } else {
            this.errorMessage = 'Đã xảy ra lỗi khi gửi yêu cầu.';
          }
          this.successMessage = '';
        });
    },
  },
};
</script>

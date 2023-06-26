<template>
  <div class="container">

    <!-- Button trigger modal -->

    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5 mx-auto text-center" id="exampleModalLabel">
              <div class="" v-if="cultivateGuide.id === null"> THÊM HƯỚNG DẪN CANH TÁC</div>
              <div class="" v-else>CHỈNH SỬA HƯỚNG DẪN CANH TÁC</div>
            </h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="save">
              <div class="mb-3">
                <label for="formGroupExampleInput" class="form-label fw-bold">Tên canh tác:</label>
                <input type="text" v-model="cultivateGuide.name" class="form-control" id="formGroupExampleInput"
                  placeholder="Nhập vào tên loại canh tác ">
              </div>

              <div class="mb-3">
                <label for="formGroupExampleInput2" class="form-label fw-bold">Khoảng thời gian canh tác:</label>
                <input type="number" v-model="cultivateGuide.plantingInterval" class="form-control"
                  id="formGroupExampleInput2" placeholder="Nhập vào khoảng thời gian trồng trọt ">
              </div>

              <div class="mb-3">
                <label for="formGroupExampleInput3" class="form-label fw-bold">Thời gian bón phân: </label><button
                  class="btn btn-primary" @click="addFertilizingTime" type="button" id="button-addon2"
                  data-mdb-ripple-color="dark"><i class="bi bi-plus-lg"></i>
                  Thêm
                </button>
              </div>

              <div v-for="time in cultivateGuide.fertilizingTimeList" :key="time.id">
                <div class="mb-3 row">
                  <label for="inputPassword" class="col-sm-3 col-form-label">Ngày</label>
                  <div class="col-sm-9">
                    <input type="text" class="form-control" v-model="time.date" aria-label="With textarea"
                      placeholder="Nhập vào ngày" />
                  </div>
                </div>


                <div class="mb-3 row">
                  <label for="inputPassword" class="col-sm-3 col-form-label">Mô tả</label>
                  <div class="col-sm-9">
                    <input class="form-control rounded" v-model="time.description" aria-label="With textarea"
                      placeholder="Nhập mô tả" />
                  </div>
                </div>

                <div class="mb-3 row">

                  <label for="inputPassword" class="col-sm-3 col-form-label">Số lượng</label>
                  <div class="col-sm-9">
                    <input type="number" min="1" class="form-control rounded" v-model="time.quantity"
                      aria-label="With textarea" placeholder="Nhập vào số lượng phân bón trên hecta" />
                  </div>
                </div>
                <button type="button" class="btn btn-danger mb-3" @click="removeFertilizingTime(time)"><i class="bi bi-trash3"></i> Xóa</button>

              </div>

              <div class="mb-3">
                <label for="formGroupExampleInput4" class="form-label fw-bold">Quy trình trồng trọt:</label>
                <textarea type="text" v-model="cultivateGuide.plantingGuide" class="form-control"
                  id="formGroupExampleInput4" placeholder="Nhập vào quy trình trồng trọt "></textarea>
              </div>


              <button type="submit" class="btn btn-success col-2 my-2"><i class="bi bi-save"></i> Lưu</button>
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
        <h3 class="text-center my-5">DANH SÁCH HƯỚNG DẪN CANH TÁC</h3>

        <template>
          <div class="">
            <div class="row">
              <div class="col-6"> <button type="button" class="btn btn-success col-3" data-bs-toggle="modal"
                  data-bs-target="#exampleModal"><i class="bi bi-plus-lg"></i>
                  Thêm
                </button></div>
              <div class="col-6">
                <div class="row">
                  <div class="input-group">
                    <input type="text" class="form-control" v-model="searchTerm" placeholder="Nhập tên để tìm kiếm...">
                    <div class="input-group-append">
                      <button class="btn btn-secondary" @click="search"><i class="bi bi-search"></i> Tìm kiếm</button>

                    </div>
                  </div>
                  <!-- <div class="input-group">
                    <input type="text" class="form-control" v-model="searchName" @input="searchByName()"
                      placeholder="Nhập tên để tìm kiếm...">
                    <div class="input-group-append">
                      <button class="btn btn-secondary ">Tìm kiếm</button>
                    </div>
                  </div> -->
                </div>
              </div>
            </div>
          </div>
        </template>
        <table class="table table-bordered my-3">
          <thead class="table-success ">
            <tr>
              <th class="col-1">Tên</th>
              <th class="col-2">Thời gian trồng</th>
              <th class="col-3">Thời gian bón phân</th>
              <th class="col-3">Quy trình trồng trọt</th>
              <!-- <th class="col-1">Khối lượng phân bón</th> -->
              <th class="col-3">Quản lý</th>
            </tr>
          </thead>
          <tbody>
            <!-- danh sách  -->
            <!-- <tr v-for="cultivateGuide in result" v-bind:key="cultivateGuide.id"> -->
            <!-- <tr v-for="cultivateGuide in resultOnPage" :key="cultivateGuide.id"> -->
            <!-- phân trang -->

            <tr v-for="cultivateGuide in resultOnPage" :key="cultivateGuide.id">
              <td>{{ cultivateGuide.name }}</td>
              <td>{{ cultivateGuide.plantingInterval }}</td>
              <!-- <td>{{ cultivateGuide.fertilizingTimeList }}</td> -->
              <td>
                <ul>
                  <li v-for="time in cultivateGuide.fertilizingTimeList" :key="time.id">
                    Ngày {{ time.date }} - {{ time.description }} - {{ time.quantity }}
                  </li>
                </ul>
              </td>
              <td>{{ cultivateGuide.plantingGuide }}</td>
              <!-- <td>{{ cultivateGuide.amountOfFertilizer }}</td> -->

              <td class="text-center">
                <button type="button" class="btn btn-warning btn-sm text-white" data-bs-toggle="modal"
                  data-bs-target="#exampleModal" @click="edit(cultivateGuide)"><i class="bi bi-pencil"></i> Chỉnh
                  sửa</button>
                <button type="button" class="btn btn-danger btn-sm" @click="deleteSearch(cultivateGuide)"><i
                    class="bi bi-trash3"></i> Xóa</button>

              </td>
            </tr>
          </tbody>
        </table>


        <!-- Phân trang -->
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
import axios from 'axios';
import moment from 'moment';
Vue.use(axios)
export default {
  name: 'searchCrud',
  data() {
    return {
      cultivateGuide: {
        id: null,
        name: '',
        plantingInterval: '',
        fertilizingTimeList: [],
        plantingGuide: '',
        // amountOfFertilizer: '',
        createdDay: null,
        updatedDay: null
      },

      fertilizingTime: '',
      result: [],
      searchByName: '',
      resultOnPage: [],
      currentPage: 1,
      itemsPerPage: 5,
      pages: [],
      searchTerm: '',
    };
  },
  created() {
    this.searchLoad();
  },
  mounted() {
    console.log("mounted() called.......");

  },
  methods: {
    // Thêm mục thời gian bón phân mới vào danh sách
    //   addFertilizingTime() {
    //   const newFertilizingTime = {
    //     date: "",
    //     description: "",
    //      quantity: ""
    //   };
    //   this.cultivateGuide.fertilizingTimeList.push(newFertilizingTime);
    // },
    // // Xóa mục thời gian bón phân từ danh sách
    // removeFertilizingTime(fertilizingTime) {
    //   const index = this.cultivateGuide.fertilizingTimeList.indexOf(fertilizingTime);
    //   if (index !== -1) {
    //     this.cultivateGuide.fertilizingTimeList.splice(index, 1);
    //   }
    // },
    searchLoad() {
      var page = "http://localhost:8098/cultivateGuide/";
      axios.get(page)
        .then(
          ({ data }) => {
            console.log(data);
            this.result = data;


            const totalPages = Math.ceil(this.result.length / this.itemsPerPage);
            this.pages = Array.from({ length: totalPages }, (_, index) => index + 1);
            this.goToPage(1);
          }
        );
    },

    goToPage(pageNumber) {
      const startIndex = (pageNumber - 1) * this.itemsPerPage;
      const endIndex = Math.min(startIndex + this.itemsPerPage, this.result.length);
      this.resultOnPage = this.result.slice(startIndex, endIndex);
      this.currentPage = pageNumber;
    },
    save() {
      if (!this.cultivateGuide.id) {
        this.saveData();
      }
      else {
        this.editData();
      }
    },
    saveData() {

      const currentDateTime = moment().format('YYYY-MM-DD HH:mm:ss');
      this.cultivateGuide.createdDay = currentDateTime;
      this.cultivateGuide.updatedDay = currentDateTime;

      axios.post('http://localhost:8098/cultivateGuide/post', this.cultivateGuide)
        .then(response => {
          console.log(response);
          location.reload();
        });
    },
    addFertilizingTime() {
      // Thêm thời gian bón phân vào danh sách
      const time = {
        // id: Date.now(),
        date: '',
        description: '',
        quantity: ''

      };
      this.cultivateGuide.fertilizingTimeList.push(time);
    },
    removeFertilizingTime(time) {
      // Xóa thời gian bón phân khỏi danh sách
      const index = this.cultivateGuide.fertilizingTimeList.indexOf(time);
      if (index !== -1) {
        this.cultivateGuide.fertilizingTimeList.splice(index, 1);
      }
    },
    edit(cultivateGuide) {
      this.cultivateGuide = cultivateGuide;
      const currentDateTime = moment().format('YYYY-MM-DD HH:mm:ss');
      this.cultivateGuide.createdDay = currentDateTime;
      this.cultivateGuide.updatedDay = currentDateTime;

    },
    editData() {
      axios.put(`http://localhost:8098/cultivateGuide/${this.cultivateGuide.id}`, this.cultivateGuide)
        .then(({ data }) => {
          // location.reload();// Reset form fields Reset form fields
          const currentDateTime = moment().format('YYYY-MM-DD HH:mm:ss');
          this.cultivateGuide.updatedDay = currentDateTime;

        })

        .catch((error) => {
          console.error(error);
        });

    },
    deleteSearch(cultivateGuide) {
      axios.delete("http://localhost:8098/cultivateGuide/" + cultivateGuide.id).then(response => {
        console.log(response);

        location.reload()
      });
    },

    search() {
      axios.get(`http://localhost:8098/cultivateGuide/name/${this.searchTerm}`)
        .then(response => {
          if (response.data) {
            // Xử lý trường hợp tìm thấy kết quả
            if (Array.isArray(response.data)) {
              // Nếu kết quả trả về là một mảng các đối tượng
              this.resultOnPage = response.data;
            } else {
              // Nếu kết quả trả về là một đối tượng
              this.resultOnPage = [response.data];
            }
          } else {
            // Xử lý trường hợp không tìm thấy kết quả
            this.resultOnPage = [];
          }
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

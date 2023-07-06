<template>
  <div class="row">
    <div class="col">
      <div class="navbar-dark">
        <div class="row">
          <div class="col-md-2 hdl-logo py-3">

          </div>
          <div class="col-md-8">

          </div>
          <div class="col-md-2 my-3 gx-5">
            <div class="row">

              <h5 style=" color: aliceblue;"> <i class="bi bi-person-circle icon"></i> QUẢN TRỊ VIÊN
              </h5>
            </div>
          </div>
        </div>

      </div>
    </div>
    <div class="row ">
      <div class="col navbar-dark">
        <nav class="left-nav">
          <a href="#">
            <img class="img-fluid " src="../assets/img/logoo.png" alt="Logo"
              style="width: 70px; height: 70px; margin-left: 25px; margin-top: 0px; margin-bottom: 0px;">
          </a>
          <h4 style="color: aliceblue; margin-top: 40px;" class="d-inline-block ">3Nông</h4>
          <ul class="mt-4">
            <hr class="hr-customer">

            <li class="border-bottom"><a href="http://localhost:8080/#/list-search">Quản lý tra cứu</a></li>
            <li class="border-bottom"><a href="http://localhost:8080/#/list-cultivateGuide">Hướng dẫn canh tác</a></li>
            <li class="border-bottom"><a href="http://localhost:8080/#/list-users">Quản lý nông dân</a></li>
          </ul>
        </nav>

        <div class="content">
          <!-- Nội dung trang web -->
        </div>

        <a name="end"></a>
      </div>
    </div>
  </div>
</template>
<style>
.left-nav {
  position: fixed;
  top: 0;
  left: 0;
  background-color: #034E36;
  width: 200px;
  height: 100%;
}

.left-nav ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.left-nav li {
  margin: 10px 0;
}

.left-nav li a {
  display: block;
  color: white;
  text-decoration: none;
  padding: 10px;
}

.left-nav li a:hover {
  background-color: white;
  color: rgb(24, 114, 24);
}

.content {
  margin-left: 200px;
}

a[name="end"] {
  display: block;
  position: relative;
  top: -80px;
  visibility: hidden;
}

.navbar-dark {
  background-color: rgb(88, 90, 89);


}

.hr-customer {
  border-top: 2px solid #F3F1F1;
}
</style>

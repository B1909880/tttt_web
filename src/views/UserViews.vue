<template>

  <div class="">
    <ListUsers />

    <ModalUsers />
  </div>
</template>

<script>
import ModalUsers from "../components/ModalUsers.vue";
import ListUsers from "../components/ListUsers.vue";
export default {
  components: {

    ListUsers,
   
    ModalUsers
},
}
</script>

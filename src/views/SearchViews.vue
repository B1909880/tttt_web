<template>
  <div>
    <ListSearch />

   <ModalSearch/>

  </div>
</template>

<script>
import ListSearch from "../components/ListSearch.vue";
import ModalSearch from "../components/ModalSearch.vue";

export default {
  components: {
   ListSearch,
    ModalSearch
}
}

</script>

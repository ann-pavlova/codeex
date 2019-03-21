<template>
  <b-container class="mt-5">
    <Companies></Companies>
  </b-container>
</template>

<script>
  import Companies from './components/Companies';
  import EditCompany from './components/EditCompany';

  export default {
    components: {
      Companies,
      EditCompany
    }
  }
</script>

<style>

</style>

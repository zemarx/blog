
<template>
  <div class="home-wrapper">
    <posts></posts>
  </div>
</template>
// ------------------------------SCRIPT-----------------------------------------
<script>
import Posts from './Posts.vue';

export default {
    components: {
        Posts
    },
    data () {
        return {
            message: 'Home',
        }
    }
}
</script>
// -------------------------------STYLE------------------------------------------
<style scoped>
    .home-wrapper {
        height: 100%;
        width: 100%;
        /*background-color: #f2f988;*/
    }
</style>

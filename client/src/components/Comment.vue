
<template>
    <div class="wrapper">
        <div>{{comment.author_name}}</div>
        <div>{{comment.date_created}}</div>
        <div>{{comment.content}}</div>

        <div v-if="comment.children.length > 0">
            <comments :comments="comment.children"></comments>
        </div>
    </div>
</template>
// -----------------------------------------------------------------------
<script>
import Comments from './Comments.vue';

export default {
    name: 'comment',
    props: {
        comment: {
            type: Object,
            required: true
        }
    },
    components: {
        Comments
    },
    beforeCreate () {
        // This line is necessary to be able to call recursively <comments> component
        this.$options.components.Comments = require('./Comments.vue');
    }
}
</script>
// -----------------------------------------------------------------------
<style scoped>
    .wrapper {
        margin: 15px 0 20px 25px;
        border-left: 1px solid #a5a5a5;
    }
</style>

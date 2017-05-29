
<template>
    <div class="comments-wrapper">
        <comment v-for="comment in comments" :comment="comment" :key="comment._id"></comment>
    </div>
</template>
// -----------------------------------------------------------------------
<script>
import Comment from './Comment.vue';

export default {
    name: 'comments',
    props: {
        comments: {
            type: Array,
            required: true
        }
    },
    components: {
        Comment
    }
}
</script>
// -----------------------------------------------------------------------
<style scoped>
    .comments-wrapper {
        display: flex;
        flex-direction: column;
        margin-bottom: 15px;
    }
</style>

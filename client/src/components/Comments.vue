
<template>
    <div>
        <comment v-for="comment in comments" :comment="comment" :key="comment._id">
        </comment>
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
</style>

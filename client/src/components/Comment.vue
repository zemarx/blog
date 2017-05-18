
<template>
    <div class="comment-wrapper">
        <div class="comment-data-wrapper">
            <div><span>&#149;</span> {{comment.author_name}} | {{(comment.date_created + "").slice(0, 15)}}</div>
            <div>{{comment.content}}</div>
            <button @click="toggleReply">Reply</button>
            <textarea v-if="replyVisible" placeholder="Write a reply..."></textarea>
        </div>

        <comments v-if="comment.children.length > 0" :comments="comment.children"></comments>
    </div>
</template>
// -----------------------------------------------------------------------
<script>
import Comments from './Comments.vue';

export default {
    name: 'comment',
    data () {
        return {
            replyVisible: false
        }
    },
    props: {
        comment: {
            type: Object,
            required: true
        }
    },
    components: {
        Comments
    },
    methods: {
        toggleReply () {
            this.replyVisible = !this.replyVisible;
        },
        addReply () {
//            callApi('comments', 'POST', JSON.stringify({
//                id: id,
//                author_name: "",
//                content: "",
//                date_created: new Date(),
//                children: []
//            }))
//                .then(res => {
//                    this.comment.children.push({
//                        id: res.data.id,
//                        author_name: "",
//                        content: "",
//                        date_created: new Date(),
//                        children: []
//                    })
//                })
//                .catch(err => {
//
//                });

        }
    },
    beforeCreate () {
        // This line is necessary to be able to call recursively <comments> component
        this.$options.components.Comments = require('./Comments.vue');
    }
}
</script>
// -----------------------------------------------------------------------
<style scoped>
    .comment-wrapper {
        margin: 5px 0 0 50px;
        padding: 5px 0 3px 10px;
        border-left: 1px solid #fffffb;
    }

    .comment-data-wrapper {
        display: flex;
        flex-direction: column;
    }

    .comment-data-wrapper span {
        color: #000000;
    }

    .comment-data-wrapper button {
        height: 20px;
        width: 50px;
    }

    .comment-data-wrapper textarea {
        height: 20px;
        width: 120px;
    }

    .comment-data-wrapper > div:first-child {
        color: #2179b4;
    }

    .comment-data-wrapper > div:nth-child(2) {

    }

    .comment-data-wrapper > div:last-child {
        font-size: 21px;
    }
</style>


<template>
    <div class="comment-wrapper">
        <div class="comment-data-wrapper">
            <div><span>&#149;</span> {{comment.author_name}} | {{(comment.date_created + "").slice(0, 15)}}</div>
            <div>{{comment.content}}</div>
            <button @click="toggleReply">{{ $t('comment.show_reply_button')}}</button>
            <div v-if="replyVisible">
                <input v-model="replyAuthor" placeholder="Your name" type="text" value="Your name">
                <textarea v-model="replyContent" placeholder="Write a reply..."></textarea>
                <button @click="addReply">{{ $t('comment.submit_reply_button')}}</button>
            </div>
        </div>

        <comments v-if="comment.children.length > 0" :comments="comment.children"></comments>
    </div>
</template>
// -----------------------------------------------------------------------
<script>
import Comments from './Comments.vue';
import { callApi } from './../services/api.service';

export default {
    name: 'comment',
    data () {
        return {
            replyAuthor: '',
            replyContent: '',
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
            callApi('comments', 'POST', {
                comment: {
                    _id: '',
                    parent_id: this.comment._id,
                    post_id: this.comment.post_id,
                    author_name: this.replyAuthor,
                    content: this.replyContent,
                    date_created: new Date(),
                    children: []
                }
            }).then(res => {
                if (this.comment.children instanceof Array) {
                    this.comment.children.push({
                        id: res._id,
                        parent_id: res.parent_id,
                        post_id: res.post_id,
                        author_name: res.author_name,
                        content: res.content,
                        date_created: res.date_created,
                        children: res.children
                    })
                }

                this.replyVisible = false;
                this.replyAuthor = '';
                this.replyContent = '';
            }).catch(err => {
                alert('Something went wrong :/');
            });
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

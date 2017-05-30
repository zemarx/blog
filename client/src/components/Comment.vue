
<template>
    <div class="comment-wrapper">
        <div class="comment-data-wrapper">
            <div class="comment-name-date"><span class="dot-mark">&#149;</span> {{comment.author_name}} | {{ formatDate(comment.date_created)}}</div>
            <div class="comment-content">{{comment.content}}</div>
            <div class="comment-reply-toggle" @click="showReply">{{ $t('comment.show_reply_button')}}</div>
            <div class="comment-reply" v-if="replyVisible">
                <input v-model="replyAuthor" placeholder="Your name" type="text" value="Your name">
                <textarea v-model="replyContent" placeholder="Write a reply..."></textarea>

                <div v-if="isInputError" class="input-error">You have to fill all the fields</div>

                <div class="comment-reply-buttons">
                    <button @click="addReply">Save</button>
                    <button @click="hideReply">Cancel</button>
                </div>
            </div>
        </div>

        <comments v-if="comment.children.length > 0" :comments="comment.children"></comments>
    </div>
</template>
// -----------------------------------------------------------------------
<script>
import Comments from './Comments.vue';
import { callApi } from './../services/api.service';
import { getNiceDate } from './../utils/dateFormatter';

export default {
    name: 'comment',
    data () {
        return {
            isInputError: false,
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
        formatDate (dateString) {
            return getNiceDate(dateString);
        },
        showReply () {
            this.replyVisible = true;
        },
        hideReply () {
            this.isInputError = false;
            this.replyVisible = false;
        },
        addReply () {
            // check that inputs aren't empty
            if (this.replyAuthor.trim() === '' || this.replyContent.trim() === '') {
                this.isInputError = true;
                return;
            }

            this.isInputError = false;
            this.replyVisible = false;

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
        margin: 5px 0 0 30px;
        padding: 5px 0 3px 5px;
        border-left: 1px solid #e0e0dc;
    }

    .comment-name-date {
        font-size: 16px;
    }

    .comment-data-wrapper {
        display: flex;
        flex-direction: column;
    }

    .comment-data-wrapper button {
        height: 24px;
        width: 83px;
    }

    .comment-data-wrapper textarea {
        height: 20px;
        width: 120px;
    }

    .comment-content {
        margin-left: 8px;
    }

    .comment-name-date {
        color: #1c6a9f;
    }

    .comment-reply-toggle {
        color: #247fc2;
        cursor: pointer;
        margin-left: 8px;
        font-size: 13px;
    }

    .comment-reply {
        display: flex;
        flex-direction: column;
        border: 1px solid #f5f5f5;
    }

    .comment-reply input {
        margin-top: 5px;
        width: 130px;
    }

    .comment-reply textarea {
        margin-top: 5px;
        width: 50%;
        height: 60px;
    }

    .comment-reply-buttons {
        display: flex;
    }

    .comment-reply-buttons > button:first-child {
        margin-right: 10px;
    }

    .input-error {
        color: #e70000;
        margin: 3px 0 3px 0;
    }
</style>

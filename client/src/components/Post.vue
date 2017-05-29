
<template>
    <div class="post-wrapper">
        <div class="post-data">
            <span class="title">{{ post.title }}</span>
            <div class="name-date">
                <span>{{ post.author_name }}</span>
                <span>{{ formatDate(post.date_created) }}</span>
            </div>
            <div>Updated: {{ formatDate(post.last_time_edited) }}</div>

            <p v-html="post.content" class="content"></p>

            <div>
                <button v-if="loggedIn" @click="editPost">{{ $t('selected_post.edit_button') }}</button>
                <button v-if="loggedIn" @click="deletePost">{{ $t('selected_post.delete_button') }}</button>
            </div>
        </div>

        <div class="root-comments-wrapper">
            <comments :comments="comments"></comments>
        </div>

        <div class="add-comment-wrapper">
            <input v-model="commentAuthor" type="text" id="author_name" placeholder="Your name...">
            <textarea v-model="commentContent" name="" cols="30" rows="5" placeholder="What do you think?"></textarea>
            <button @click="addComment">{{ $t('selected_post.submit_comment_button') }}</button>
        </div>
    </div>
</template>
// -----------------------------------------------------------------------
<script>
import Comments from './Comments.vue';
import { callApi } from './../services/api.service';
import auth from './../services/auth.service';
import { getNiceDate } from './../utils/dateFormatter';

export default {
    data () {
        return {
            loggedIn: auth.loggedIn(),
            commentAuthor: '',
            commentContent: '',
            post: {},
            comments: []
        }
    },
    methods: {
        formatDate (dateString) {
            return getNiceDate(dateString);
        },
        editPost () {
            this.$router.push('/editpost?id=' + this.post._id)
        },
        deletePost () {
            let confirmDeletion = confirm('Do you really want to delete this post?');
            if (confirmDeletion) {
                callApi(`posts/${this.post._id}`, 'DELETE').then(res => {
                    this.$router.push('/');
                    alert('Post deleted successfully');
                }).catch(err => {
                    alert('Error deleting post');
                })
            }
        },

        addComment () {
            callApi('comments', 'POST', {
                comment: {
                    _id: '',
                    parent_id: null,
                    post_id: this.post._id,
                    author_name: this.commentAuthor,
                    content: this.commentContent,
                    date_created: new Date(),
                    children: []
                }
            }).then(res => {
                this.comments.push({
                    id: res._id,
                    parent_id: res.parent_id,
                    post_id: res.post_id,
                    author_name: res.author_name,
                    content: res.content,
                    date_created: res.date_created,
                    children: res.children
                });

                this.commentAuthor = '';
                this.commentContent = '';
            }).catch(err => {
                alert('Something went wrong :/');
            });
        }
    },
    created () {
        callApi(`posts/${this.$route.params.post_id}`).then(data => {
            this.post = data
        });

        callApi(`comments?post_id=${this.$route.params.post_id}`).then(data => {
            this.comments = data;
        })
    },
    components: {
        Comments
    }
}
</script>
// -----------------------------------------------------------------------
<style scoped>
    .post-wrapper {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        width: 100%;
        background-color: #ffffff;
    }

    .post-data {
        width: 60%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding-bottom: 40px;
        margin-top: 50px;
        margin-bottom: 40px;
        border-bottom: 1px solid black;
    }

    .title {
        margin-bottom: 20px;
        font-size: 28px;
    }

    .name-date {
        display: flex;
    }

    .name-date span:first-child {
        padding-right: 10px;
    }

    .name-date span:nth-child(2) {
        padding-left: 10px;
    }

    .name-date span:first-child {
        border-right: 1px solid black;
    }

    .content {
        font-size: 23px;
    }

    .root-comments-wrapper {
        width: 60%;
    }

    .add-comment-wrapper {
        display: flex;
        flex-direction: column;
        width: 60%;

        margin: 40px 0 70px 0;
    }
</style>

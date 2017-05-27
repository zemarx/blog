
<template>
    <div class="post-wrapper">
        <div class="post-data">
            <span class="title">{{ post.title }}</span>
            <div class="name-date">
                <span>{{ post.author_name }}</span>
                <span>{{ post.date_created }}</span>
            </div>
            <p v-html="post.content" class="content"></p>
            <button v-if="loggedIn" @click="editPost">Edit Post</button>
            <button v-if="loggedIn" @click="deletePost">Delete Post</button>
        </div>

        <comments :comments="comments"></comments>

        <div class="add-comment-wrapper">
            <input type="text" id="author_name" placeholder="Your name...">
            <textarea name="" cols="30" rows="5" placeholder="What do you think?"></textarea>
        </div>
    </div>
</template>
// -----------------------------------------------------------------------
<script>
import Comments from './Comments.vue'
import { callApi } from './../services/api.service'
import auth from './../services/auth.service';

export default {
    data () {
        return {
            loggedIn: auth.loggedIn(),
            post: {},
            comments: [
                {
                    "id": 1,
                    "author_name": "Mark",
                    "date_created": new Date(),
                    "content": "Good post",
                    "children": [
                        {
                            "id": 2,
                            "author_name": "Parker",
                            "date_created": new Date(),
                            "content": "Amazing post",
                            "children": []
                        },
                        {
                            "id": 3,
                            "author_name": "Hulk",
                            "date_created": new Date(),
                            "content": "Horrible post",
                            "children": []
                        },
                    ]
                },
                {
                    "id": 4,
                    "author_name": "Batman",
                    "date_created": new Date(),
                    "content": "Great post",
                    "children": [
                        {
                            "id": 5,
                            "author_name": "Quentin",
                            "date_created": new Date(),
                            "content": "Awful post",
                            "children": []
                        },
                        {
                            "id": 6,
                            "author_name": "Bruce",
                            "date_created": new Date(),
                            "content": "Terrific post",
                            "children": []
                        },
                    ]
                },
                {
                    "id": 7,
                    "author_name": "Barry",
                    "date_created": new Date(),
                    "content": "Fantastic post",
                    "children": []
                },
                {
                    "id": 8,
                    "author_name": "Jordan",
                    "date_created": new Date(),
                    "content": "Bad post",
                    "children": []
                },
            ]
        }
    },
    methods: {
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
        flex-direction: column;
        align-items: center;
        width: 100%;
        height: 100%;
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
        margin-bottom: 35px;
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

    .add-comment-wrapper {
        display: flex;
        flex-direction: column;
        width: 60%;

        margin: 40px 0 70px 0;
    }
</style>

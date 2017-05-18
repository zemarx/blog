
<template>
    <div class="post-wrapper">
        <div class="post-data">
            <span class="title">{{ post.title }}</span>
            <div class="name-date">
                <span>{{ post.author_name }}</span>
                <span>{{ post.date_created }}</span>
            </div>
            <p v-html="post.content" class="content"></p>
            <button @click="editPost">Edit Post</button>
            <button @click="deletePost">Delete Post</button>
        </div>

        <comments :comments="comments"></comments>
    </div>
</template>
// -----------------------------------------------------------------------
<script>
import Comments from './Comments.vue'
import { callApi } from './../services/api.service'

export default {
    data () {
        return {
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
            // TODO: confirm deletion
//            this.post
            // TODO: delete post -> Send post to trash -> Assign property
        }
    },
    created () {
        callApi(`posts/${this.$route.params.post_id}`).then(data => this.post = data);
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
        height: 500px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-top: 50px;
        margin-bottom: 80px;
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
</style>


<template>
    <div class="wrapper">
        <div class="post" v-for="post in posts">
            <span class="title">{{ post.title }}</span>
            <div class="name-date">
                <span>{{ post.author_name }}</span>
                <span>{{ post.date_created }}</span>
            </div>
            <p v-html="post.content" class="content"></p>
            <router-link :to="{ path: `/post/${post._id}`}">{{ $t('home.read_more') }}...</router-link>
        </div>
    </div>
</template>
// ------------------------------ SCRIPT -----------------------------------------
<script>
import { callApi } from './../services/api.service'

export default {
    data () {
        return {
            posts: []
        }
    },
    created () {
        callApi('posts')
            .then(data => {this.posts = data.posts})
            .catch(err => console.log(err));
    }
}
</script>
// ------------------------------ STYLES -----------------------------------------
<style scoped>
    .wrapper {
        display: flex;
        align-items: center;
        width: 100%;
        height: 100%;
        background-color: #ffffff;
    }

    .post {
        width: 60%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-top: 50px;
        padding-bottom: 40px;
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
        font-size: 18px;
    }
</style>

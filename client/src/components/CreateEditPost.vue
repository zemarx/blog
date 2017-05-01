
<template>
    <div class="wrapper">
        <h1 v-if="this.$route.path === '/createpost'">
            {{ $t('createEditPost.createNewPost') }}
        </h1>
        <h1 v-else>
            {{ $t('createEditPost.editPost') }}
        </h1>

        <div>
            <label>{{ $t('createEditPost.authorName') }}:</label>
            <input type="text" v-model="authorName"/>
        </div>
        <div>
            <label>{{ $t('createEditPost.title') }}:</label>
            <input type="text" v-model="title"/>
        </div>

        <editor :onEditorChange="this.onEditorChange" :editorContent="content"></editor>

        <div class="edit-buttons">
            <button @click="commitPost">Save</button>
            <button @click="cancelEditing">Cancel</button>
        </div>
    </div>
</template>
// -----------------------------------------------------------------------
<script>
    /*
        1. Choose whether it is post creating or post editing.
           Post editing -> {
                Get post by id
                Fill out all the fields
                Buttons = "Save", "Cancel"
                "Save"-click -> make PUT request to update post
            }

            Post creating -> {
                 Empty all fields
                 Buttons = "Save", "Cancel"
                 "Save"-click -> make POST requst to create new post
            }

            Image upload -> {
                1. Choose: upload from link or local machine
                    Link -> Just make image from link
                            (Maybe make the server download the image from the link and save it to server)
                    Upload -> 1. Choose file from local machine
                              2. Save file to the server
            }
    */

import Editor from './Editor.vue';
import { callApi } from './../services/api.service'


export default {
    data () {
        return {
            id: '',
            authorName: '',
            title: '',
            content: '',
            dateCreated: ''
        }
    },
    methods: {
        onEditorChange ({ html }) {
            this.content = html;
        },

        cancelEditing () {

        },

        commitPost () {
            let method = 'POST';
            if (this.$route.path === '/createpost') {
                method = 'POST';
            } else if (this.$route.path === '/editpost') {
                method = 'PUT';
            }

            // TODO: confirm that user wants to creat new post

            if (this.authorName.length <= 0 || this.title.length <= 0 || this.content.length <= 0) return;

            callApi('posts', method, JSON.stringify({
                post: {
                    _id: this.id || null,
                    author_name: this.authorName,
                    title: this.title,
                    content: this.content,
                    date_created: this.dateCreated || null // TODO: change to -> dateCreated
                }
            }))
            .then(data => {
                console.log(JSON.stringify(data, null, 2));
            })
            .catch(err => {
                console.log(err);
            })
        }
    },
    beforeUpdate () {
        // Creating new post
        if (this.$route.path === '/createpost') {
            console.log('CREATE POST');
            // Empty all properties
            this.id = '';
            this.authorName = '';
            this.title = '';
            this.content = '';
            this.dateCreated = '';
        }
    },
    created () {
        // Creating new post
        if (this.$route.path === '/createpost') {
            console.log('CREATE POST');
            // Empty all properties
            this.id = '';
            this.authorName = '';
            this.title = '';
            this.content = '';
            this.dateCreated = '';
        }

        // Editing post
        if (this.$route.path === '/editpost') {
            console.log('EDIT POST');
            let postId = this.$route.query.id;

            if (!postId) {
                this.$router.replace('/');
                return;
            }

            // get post by postId
            // set all the properties in the component
            callApi(`posts/${this.$route.query.id}`)
                .then(data => {
                    let post = data;

                    this.id = post._id;
                    this.authorName = post.author_name;
                    this.title = post.title;
                    this.content = post.content;
                    this.dateAdded = post.date_created;
                });
        }
    },
    components: {
        Editor
    }
}
</script>
// -----------------------------------------------------------------------
<style scoped>
.wrapper {
    margin-left: 50px;
    margin-right: 50px;
    height: 400px;
}

.edit-buttons {
    display: flex;
}
</style>

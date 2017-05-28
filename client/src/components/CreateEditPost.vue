
<template>
    <div class="wrapper">
        <h1 v-if="this.$route.path === '/createpost'">
            {{ $t('create_edit_post.create_new_post') }}
        </h1>
        <h1 v-else>
            {{ $t('create_edit_post.edit_post') }}
        </h1>

        <div>
            <label>{{ $t('create_edit_post.author_name') }}:</label>
            <input type="text" v-model="authorName"/>
        </div>
        <div>
            <label>{{ $t('create_edit_post.title') }}:</label>
            <input type="text" v-model="title"/>
        </div>

        <editor class="editor" :onEditorChange="this.onEditorChange" :editorContent="content"></editor>

        <div class="edit-buttons">
            <button @click="commitPost">{{ $t('create_edit_post.save_button') }}</button>
            <button @click="cancelEditing">{{ $t('create_edit_post.cancel_button') }}</button>
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
import { callApi } from './../services/api.service';


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
            this.$router.push('/post/' + this.id);
        },

        commitPost () {
            let method = 'POST';
            let endpoint = 'posts';

            if (this.$route.path === '/createpost') {
                method = 'POST';
            } else if (this.$route.path === '/editpost') {
                method = 'PUT';
                endpoint = `posts/${this.id}`
            }

            // TODO: confirm that user wants to create new post

            if (this.authorName.length <= 0 || this.title.length <= 0 || this.content.length <= 0) return;

            callApi(endpoint, method, JSON.stringify({
                post: {
                    _id: this.id || null,
                    author_name: this.authorName,
                    title: this.title,
                    content: this.content,
                    date_created: this.dateCreated || null
                }
            })).then(data => {
                console.log(JSON.stringify(data, null, 2));

                this.$router.replace('/');
            }).catch(err => console.log(err));
        }
    },
    beforeRouteEnter (to, from, next) {
        // When routing from 'editing post' to 'creating post' we must make sure that every property is emptied
        // Method 'beforeRouteEnter' listens for changes in url and if it is '/createpost', then it empties all properties
        if (to.path === '/createpost') {
            next(vm => {
                // Empty all properties
                vm.id = '';
                vm.authorName = '';
                vm.title = '';
                vm.content = '';
                vm.dateCreated = '';
            })
        }

        next();
    },

    created () {
        // Editing post
        if (this.$route.path === '/editpost') {
            let postId = this.$route.query.id;

            if (!postId) {
                this.$router.replace('/');
                return;
            }

            // get post by postId and set all the properties in the component
            callApi(`posts/${postId}`).then(data => {
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

.editor {
    height: 350px;
    margin-top: 20px;
    padding-bottom: 44px;
}


.edit-buttons {
    display: flex;
    margin-top: 10px;
}
</style>

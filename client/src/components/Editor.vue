<template>
    <quill-editor
            ref="editor"
            :content="editorContent"
            :options="editorOption"
            @change="onEditorChange($event)">
    </quill-editor>
</template>
// -----------------------------------------------------------------------
<script>
// TODO: Implement ability to create drafts

import Quill from 'quill';
import { ImageImport } from '../quill_modules/ImageImport.js';
import { ImageResize } from '../quill_modules/ImageResize.js';

Quill.register('modules/imageImport', ImageImport);
Quill.register('modules/imageResize', ImageResize);


export default {
    name: 'editor',
    props: {
        onEditorChange: {
            type: Function,
            required: true
        },
        editorContent: {
            type: String,
            required: true
        }
    },
    data () {
        return {
            editorOption: {
                modules: {
                    toolbar: {
                        container: [
                            ['bold', 'italic', 'underline', 'strike'],
                            ['blockquote', 'code-block'],
                            [{'header': 1}, {'header': 2}],
                            [{'list': 'ordered'}, {'list': 'bullet'}],
                            [{'script': 'sub'}, {'script': 'super'}],
                            [{'indent': '-1'}, {'indent': '+1'}],
                            [{'direction': 'rtl'}],
                            [{'size': ['small', false, 'large', 'huge']}],
                            [{'header': [1, 2, 3, 4, 5, 6, false]}],
                            [{'color': []}, {'background': []}],
                            [{'font': []}],
                            [{'align': []}],
                            ['clean'],
                            ['link', 'image', 'video']
                        ],
                        handlers: {
                            image: this.imageHandler
                        }
                    },
                    history: {
                        delay: 1000,
                        maxStack: 50,
                        userOnly: false
                    },
                    imageImport: true,
                    imageResize: {
                        displaySize: true
                    }
                }
            }
        }
    },
    methods: {
        // Custom image upload handler. Can upload images from computer or from links.
        imageHandler () {
            // Programmatically select all text in the editor
            let range = this.quill.getSelection();

            // TODO: ask if user wants to enter a url or choose image from computer
            let value = prompt('Enter the image url:');

            if (!value) {
                return;
            }

            // Inser image at the end of the text in editor
            this.quill.insertEmbed(range.index, 'image', value, Quill.sources.USER);
        }
    },
    computed: {
        quill () {
            return this.$refs.editor.quill;
        }
    }
}
</script>

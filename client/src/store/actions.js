import 'whatwg-fetch'
import { callApi } from './../services/api.service'

export const increment = ({ commit }) => {
    commit('increment')
};
export const decrement = ({ commit }) => {
    commit('decrement')
};

export const fetchPosts = ({ commit }) => {
    callApi('posts')
        .then(data => {
            commit('fetchPosts', data.posts);
        });
};

export const fetchPost = ({ commit }) => {
    // call api
    commit('fetchPost');
};

export const addPost = ({ commit }) => {
    // call api    
    commit('addPost');
};

export const updatePost = ({ commit }) => {
    // call api
    commit('updatePost');
};

export const deletePost = ({ commit }) => {
    // call api
    commit('deletePost');    
};

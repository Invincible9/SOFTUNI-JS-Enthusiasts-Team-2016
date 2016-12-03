import $ from 'jquery';

const KinveyRequester = (function() {
    const baseUrl = "https://baas.kinvey.com/";
    const appKey = "kid_SkjtoqOfg";
    const appSecret = "6c9bdb78676f46c1a2f18a0a7aa056d0";
    const kinveyAppAuthHeaders = {
        'Authorization': "Basic " + btoa(appKey + ":" + appSecret),
    };

    function loginUser(username, password) {
        return $.ajax({
            method: "POST",
            url: baseUrl + "user/" + appKey + "/login",
            headers: kinveyAppAuthHeaders,
            data: { username, password }
        });
    }

    function registerUser(username, password) {
        return $.ajax({
            method: "POST",
            url: baseUrl + "user/" + appKey + "/",
            headers: kinveyAppAuthHeaders,
            data: { username, password }
        });
    }

    function getKinveyUserAuthHeaders() {
        return {
            'Authorization': "Kinvey " + sessionStorage.getItem('authToken'),
        };
    }

    function logoutUser() {
        return $.ajax({
            method: "POST",
            url: baseUrl + "user/" + appKey + "/_logout",
            headers: getKinveyUserAuthHeaders(),
        });
    }
    // function findAllMyPosts() {
    //     return $.ajax({
    //         method: "GET",
    //         url: baseUrl + "appdata/" + appKey + "/posts",
    //         headers: getKinveyUserAuthHeaders()
    //     });
    //
    // }
    function findAllPosts() {
        return $.ajax({
            method: "GET",
            url: baseUrl + "appdata/" + appKey + "/posts",
            headers: getKinveyUserAuthHeaders()
        });
    }

    function findPostById(postId) {
        return $.ajax({
            method: "GET",
            url: baseUrl + "appdata/" + appKey + "/posts/" + postId,
            headers: getKinveyUserAuthHeaders()
        });
    }

    function createPost(title, author, description,imageUrl,date) {
        return $.ajax({
            method: "POST",
            url: baseUrl + "appdata/" + appKey + "/posts",
            headers: getKinveyUserAuthHeaders(),
            data: { title, author, description,imageUrl,date }
        });
    }

    function editPost(bookId, title, author, description) {
        return $.ajax({
            method: "PUT",
            url: baseUrl + "appdata/" + appKey + "/posts/" + bookId,
            headers: getKinveyUserAuthHeaders(),
            data: { title, author, description }
        });
    }

    function deletePost(bookId) {
        return $.ajax({
            method: "DELETE",
            url: baseUrl + "appdata/" + appKey + "/posts/" + bookId,
            headers: getKinveyUserAuthHeaders()
        });
    }

    function uploadPhoto(title, description, url) {
        return $.ajax({
            method: "POST",
            url: baseUrl + "appdata/" + appKey + "/gallery",
            headers: getKinveyUserAuthHeaders(),
            data: { title,description,url}
        });

    }

    function findAllPhotos() {
        return $.ajax({
            method: "GET",
            url: baseUrl + "appdata/" + appKey + "/gallery",
            headers: getKinveyUserAuthHeaders()
        });
    }

    return {
        loginUser, registerUser, logoutUser,
        findAllPosts, createPost, findPostById, editPost, deletePost, uploadPhoto, findAllPhotos
    }
})();

export default KinveyRequester;

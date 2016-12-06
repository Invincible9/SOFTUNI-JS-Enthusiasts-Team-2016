import $ from 'jquery';

const KinveyRequester = (function() {
    const baseUrl = "https://baas.kinvey.com/";
    const appKey = "kid_SkjtoqOfg";
    const appSecret = "6c9bdb78676f46c1a2f18a0a7aa056d0";
    const kinveyAppAuthHeaders = {
        'Authorization': "Basic " + btoa(appKey + ":" + appSecret),
    };
    const _guestCredentials = 'ea334f5e-5719-4d63-bf93-9d9cbcd83fa9.WEiFXXETAvIVSfWQ9A/Il9v/7FC1ZSZmnBZDYG3A9qQ=';

    function loginUser(username, password, isDeleted) {
        return $.ajax({
            method: "POST",
            url: baseUrl + "user/" + appKey + "/login",
            headers: kinveyAppAuthHeaders,
            data: { username, password, isDeleted }
        });
    }

    function registerUser(username, password, repeat, fullname, roles, isDeleted) {
        return $.ajax({
            method: "POST",
            url: baseUrl + "user/" + appKey + "/",
            headers: kinveyAppAuthHeaders,
            data: { username, password, repeat, fullname, roles, isDeleted }
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

    function findAllUsers() {
        return $.ajax({
            method: "GET",
            //https://baas.kinvey.com/user/kid_rkAs_Gg7x/
            url: baseUrl + "user/" + appKey,
            headers: getKinveyUserAuthHeaders()
        });
    }

    function findAllPostsByAdmin() {
        return $.ajax({
            method: "GET",
            url: baseUrl + "appdata/" + appKey + "/posts",
            headers: getKinveyUserAuthHeaders()
        });
    }

    function findUserById(userId) {
        return $.ajax({
            method: "GET",
            url: baseUrl + "user/" + appKey + "/" + userId,
            headers: getKinveyUserAuthHeaders()
        });
    }

    function editUser(userId, username, password, repeat, fullname, roles, isDeleted) {
        return $.ajax({
            method: "PUT",
            url: baseUrl + "user/" + appKey + "/" + userId,
            headers: getKinveyUserAuthHeaders(),
            data: {username, repeat, password, fullname, roles, isDeleted }
        });
    }

    function deleteUser(userId, username, repeat, fullname, roles, isDeleted) {
        return $.ajax({
            method: "PUT",
            url: baseUrl + "user/" + appKey + "/" + userId,
            headers: getKinveyUserAuthHeaders(),
            data: { username, repeat, fullname, roles, isDeleted }
        });
    }

    function findAllPosts() {
        return $.ajax({
            method: "GET",
            url: baseUrl + "appdata/" + appKey + "/posts",
            headers: getKinveyUserAuthHeaders()
        });
    }

    function findGuestPosts() {
        return $.ajax({
            method: "GET",
            url: baseUrl + "appdata/" + appKey + "/posts",
            headers: {'Authorization': "Kinvey " + _guestCredentials}
        });
    }

    function findGuestPostById(postId) {
        return $.ajax({
            method: "GET",
            url: baseUrl + "appdata/" + appKey + "/posts/" + postId,
            headers: {'Authorization': "Kinvey " + _guestCredentials}
        });
    }

    function findGuestSelectedPostComments(postId){
        return $.ajax({
            method: "GET",
            url: `${baseUrl}appdata/${appKey}/postComments/?query={"postId":"${postId}"}`,
            headers: {'Authorization': "Kinvey " + _guestCredentials}
        })
    }

    function findPostById(postId) {
        return $.ajax({
            method: "GET",
            url: baseUrl + "appdata/" + appKey + "/posts/" + postId,
            headers: getKinveyUserAuthHeaders()
        });
    }
    function findSelectedPostComments(postId){
        return $.ajax({
            method: "GET",
            url: `${baseUrl}appdata/${appKey}/postComments/?query={"postId":"${postId}"}`,
            headers: getKinveyUserAuthHeaders()
        })
    }
    function createPost(title, author, description,imageUrl,date) {
        return $.ajax({
            method: "POST",
            url: baseUrl + "appdata/" + appKey + "/posts",
            headers: getKinveyUserAuthHeaders(),
            data: { title, author, description,imageUrl,date }
        });
    }
    function addPostComment(postId, comment, commentAuthor){
        return $.ajax({
            method: "POST",
            url: baseUrl + "appdata/" + appKey + "/postComments",
            headers: getKinveyUserAuthHeaders(),
            data: JSON.stringify({ comment, postId, commentAuthor }),
            contentType: 'application/JSON'
        });
    }
    function editPost(postId, title, author, description, date, imageUrl) {
        return $.ajax({
            method: "PUT",
            url: baseUrl + "appdata/" + appKey + "/posts/" + postId,
            headers: getKinveyUserAuthHeaders(),
            data: { title, author, description, date, imageUrl} // add url
        });
    }

    function deletePost(postId) {
        return $.ajax({
            method: "DELETE",
            url: baseUrl + "appdata/" + appKey + "/posts/" + postId,
            headers: getKinveyUserAuthHeaders()
        });
    }

    function deletePostComments(postId){
        return $.ajax({
            method: "DELETE",
            url:`${baseUrl}appdata/${appKey}/postComments/?query={"postId":"${postId}"}`,
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
        loginUser, registerUser, logoutUser, deletePostComments, findGuestPostById, findGuestSelectedPostComments,
        findAllPosts, createPost, findPostById, editPost, deletePost,findGuestPosts,findSelectedPostComments,
        addPostComment,uploadPhoto,findAllPhotos, findAllUsers, findAllPostsByAdmin, editUser, findUserById,
        deleteUser,
    }
})();

export default KinveyRequester;

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import NavigationBar from './Components/NavigationBar';
import Footer from './Components/Footer';
import HomeView from './Views/HomeView';
import LoginView from './Views/LoginView';
import RegisterView from './Views/RegisterView';
import CreatePostView from './Views/CreatePostView';
import EditPostView from './Views/EditPostView';
import DeletePostView from './Views/DeletePostView';
import PostsView from './Views/PostView';
import PostDetails from './Views/PostDetailsView';
import MyPostsView from './Views/MyPostsView';
import PostComment from './Views/AddPostCommentView';
import KinveyRequester from './KinveyRequester';
import GalleryView from './Views/GalleryView';
import UploadPhotoView from './Views/UploadPhotoView';
import $ from 'jquery';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: sessionStorage.getItem("username"),
            userId: sessionStorage.getItem("userId")
        };
    }

    render() {
        return (
            <div className="App">
                <header>
                    <NavigationBar
                        username={this.state.username}
                        homeClicked={this.showHomeView.bind(this)}
                        loginClicked={this.showLoginView.bind(this)}
                        registerClicked={this.showRegisterView.bind(this)}
                        postsClicked={this.showPostsView.bind(this)}
                        createPostClicked={this.showCreatePostView.bind(this)}
                        galleryClicked={this.showGalleryView.bind(this)}
                        uploadPhotoClicked={this.showUploadPhotoView.bind(this)}
                        myPostClicked={this.showMyPost.bind(this)}
                        logoutClicked={this.logout.bind(this)} />
                    <div id="loadingBox">Loading ...</div>
                    <div id="infoBox">Info</div>
                    <div id="errorBox">Error</div>
                </header>
                <main id="main"></main>
                <Footer />
            </div>
        );
    }


    handleAjaxError(event, response) {
        let errorMsg = JSON.stringify(response);
        if (response.readyState === 0)
            errorMsg = "Cannot connect due to network error.";
        if (response.responseJSON && response.responseJSON.description)
            errorMsg = response.responseJSON.description;
        this.showError(errorMsg);
    }
    componentDidMount() {
        // Attach global AJAX "loading" event handlers
        $(document).on({
            ajaxStart: function() { $("#loadingBox").show() },
            ajaxStop: function() { $("#loadingBox").hide() }
        });

        // Attach a global AJAX error handler
        $(document).ajaxError(this.handleAjaxError.bind(this));

        // Hide the info / error boxes when clicked
        $("#infoBox, #errorBox").click(function() {
            $(this).fadeOut();
        });

        // Initially load the "Home" view when the app starts
        this.showHomeView();
    }
    showInfo(message) {
        $('#infoBox').text(message).show();
        setTimeout(function() {
            $('#infoBox').fadeOut();
        }, 3000);
    }

    showError(errorMsg) {
        $('#errorBox').text("Error: " + errorMsg).show();
    }

    showView(reactViewComponent) {
        ReactDOM.render(reactViewComponent,
            document.getElementById('main'));
        $('#errorBox').hide();
    }

    showHomeView() {
        this.showView(<HomeView username={this.state.username} />);
    }

    showLoginView() {
        this.showView(<LoginView onsubmit={this.login.bind(this)} />);
    }

    login(username, password) {
        KinveyRequester.loginUser(username, password)
            .then(loginSuccess.bind(this));

        function loginSuccess(userInfo) {
            this.saveAuthInSession(userInfo);
            this.showPostsView();
            this.showInfo("Login successful.");
        }
    }

    showRegisterView() {
        this.showView(<RegisterView onsubmit={this.register.bind(this)} />);
    }

    register(username, password) {
        KinveyRequester.registerUser(username, password)
            .then(registerSuccess.bind(this));

        function registerSuccess(userInfo) {
            this.saveAuthInSession(userInfo);
            this.showPostsView();
            this.showInfo("User registration successful.");
        }
    }

    saveAuthInSession(userInfo) {
        sessionStorage.setItem('authToken', userInfo._kmd.authtoken);
        sessionStorage.setItem('userId', userInfo._id);
        sessionStorage.setItem('username', userInfo.username);

        // This will update the entire app UI (e.g. the navigation bar)
        this.setState({
            username: userInfo.username,
            userId: userInfo._id
        });
    }

    showPostsView() {
        KinveyRequester.findAllPosts()
            .then(loadPostsSuccess.bind(this));

        function loadPostsSuccess(posts) {
            this.showInfo("Post loaded.");
            this.showView(
                <PostsView
                    posts={posts}
                    userId={this.state.userId}
                    editPostClicked={this.preparePostForEdit.bind(this)}
                    deletePostClicked={this.confirmPostDelete.bind(this)}
                    viewDetailsClicked={this.showViewDetails.bind(this)}
                />
            );
        }
    }

    //List my Post here
    showMyPost() {

        KinveyRequester.findAllPosts()
            .then(loadPostsSuccess.bind(this));

        function loadPostsSuccess(posts) {
            this.showInfo("Post loaded.");
            this.showView(
                <MyPostsView
                    posts={posts}
                    userId={this.state.userId}
                    editPostClicked={this.preparePostForEdit.bind(this)}
                    deletePostClicked={this.confirmPostDelete.bind(this)}
                    viewDetailsClicked={this.showViewDetails.bind(this)}
                />
            )

        }
    }

    confirmPostDelete(postId) {
        KinveyRequester.findPostById(postId)
            .then(loadArticleForDeleteSuccess.bind(this));
        function loadArticleForDeleteSuccess(post) {
            this.showView(
                <DeletePostView
                    onsubmit={this.deletePost.bind(this)}
                    bookId={post._id}
                    title={post.title}
                    author={post.author}
                    description={post.description}
                />
            );
        }
    }

    deletePost(postId) {
        KinveyRequester.deletePost(postId)
            .then(deletePostSuccess.bind(this));
        function deletePostSuccess() {
            this.showPostsView();
            this.showInfo("Post deleted.");
        }
    }

    showViewDetails(postId) {
        let selectedPostRequest = KinveyRequester.findPostById(postId);
        let selectedPostCommentsRequest = KinveyRequester.findSelectedPostComments(postId);
        Promise.all([selectedPostRequest, selectedPostCommentsRequest])
            .then(details.bind(this))

        function details([post, comments]) {
            this.showView(<PostDetails
                    comments={comments}
                    post={post}
                    postId={post._id}
                    imageUrl={post.imageUrl}
                    author={post.author}
                    content={post.description}
                    addCommentClicked={this.showViewAddComment.bind(this)}
                />
            );
        }
    }

    showViewAddComment(postId) {
        KinveyRequester.findPostById(postId)
            .then(showAddCommentForm.bind(this));

        function showAddCommentForm(post) {
            this.showView(
                <PostComment
                    post={post}
                    onsubmit={this.addCommentToDatabase.bind(this)}
                    title={post.title}
                    postAuthor={post.author}
                    description={post.description}
                    commentAuthor={this.state.username}
                />
            );
        }
    }

    addCommentToDatabase(post, postId, postImgUrl, postContent, postAuthor, comment, commentAuthor){
        KinveyRequester.addPostComment(postId, comment, commentAuthor)
            .then(addPostCommentSuccess.bind(this))

        function addPostCommentSuccess(){
            KinveyRequester.findPostById(postId)
                .then(this.showView(
                    <PostDetails
                        post={post}
                        postId={postId}
                        imageUrl={postImgUrl}
                        author={postAuthor}
                        content={postContent}
                        addCommentClicked={this.showViewAddComment.bind(this)}
                    />
                ))
        }
    }

    preparePostForEdit(postId) {
        KinveyRequester.findPostById(postId)
            .then(loadPostForEditSuccess.bind(this));

        function loadPostForEditSuccess(postInfo) {
            this.showView(
                <EditPostView
                    onsubmit={this.editPost.bind(this)}
                    postId={postInfo._id}
                    title={postInfo.title}
                    author={postInfo.author}
                    description={postInfo.description}
                />
            );
        }
    }

    editPost(postId, title, author, description) {
        KinveyRequester.editPost(postId, title, author, description)
            .then(editPostSuccess.bind(this));

        function editPostSuccess() {
            this.showPostsView();
            this.showInfo("Post edited.");
        }
    }

    createPost(title, author, description,imageUrl) {
        KinveyRequester.createPost(title, author, description,imageUrl)
            .then(createPostSuccess.bind(this));

        function createPostSuccess(data) {
            this.showPostsView();
            this.showInfo("Post created.");
        }
    }
    showCreatePostView() {
        this.showView(<CreatePostView onsubmit={this.createPost.bind(this)} />);
    }

    showGalleryView() {
        KinveyRequester.findAllPhotos()
            .then(loadGallerySuccess.bind(this));

        function loadGallerySuccess(cars) {
            this.showInfo("Gallery loaded.");
            this.showView(
                <GalleryView
                    cars={cars}
                />
            )
        }

    }

    uploadPhoto(title, description, url) {
        KinveyRequester.uploadPhoto(title, description, url)
            .then(uploadPhotoSuccess.bind(this));

        function uploadPhotoSuccess(data) {
            this.showUploadPhotoView();
            this.showInfo("Image uploaded.")
            this.showGalleryView();
        }

    }


    showUploadPhotoView() {
        this.showView(<UploadPhotoView onsubmit={this.uploadPhoto.bind(this)} />);
    }


    logout() {
        KinveyRequester.logoutUser();
        sessionStorage.clear();
        this.setState({username: null, userId: null});
        this.showHomeView();
        this.showInfo('Logout successful.');
    }
}

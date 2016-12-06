import React, {Component} from 'react';
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
import MyPostsView from './Views/MyPostsView'
import PostComment from './Views/AddPostCommentView';
import KinveyRequester from './KinveyRequester';
import GalleryView from './Views/GalleryView';
import UploadPhotoView from './Views/UploadPhotoView';

//ADMIN
import UsersView from './ViewsAdmin/UsersView';
import ViewDetailsUserClicked from './ViewsAdmin/ViewDetailsUserClicked';
import EditUserView from './ViewsAdmin/EditUserView';
import DeleteUserView from './ViewsAdmin/DeleteUserView';

//MODERATOR
import ModeratorUsersView from './ViewsModerator/ModeratorUsersView';
import ViewDetailsUserClickedByModerator from './ViewsModerator/ViewDetailsUserClickedByModerator';
import ModeratorEditUserView from './ViewsModerator/ModeratorEditUserView';
import ModeratorDeleteUserView from './ViewsModerator/ModeratorDeleteUserView';

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
                        homeClicked={this.showGuestView.bind(this)}
                        loginClicked={this.showLoginView.bind(this)}
                        registerClicked={this.showRegisterView.bind(this)}
                        postsClicked={this.showPostsView.bind(this)}
                        createPostClicked={this.showCreatePostView.bind(this)}
                        galleryClicked={this.showGalleryView.bind(this)}
                        uploadPhotoClicked={this.showUploadPhotoView.bind(this)}
                        myPostClicked={this.showMyPost.bind(this)}
                        adminListUsersClicked={this.showUsersView.bind(this)}
                        moderatorListUsersClicked={this.showModeratorUsersView.bind(this)}
                        logoutClicked={this.logout.bind(this)}/>
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
            ajaxStart: function () {
                $("#loadingBox").show()
            },
            ajaxStop: function () {
                $("#loadingBox").hide()
            }
        });

        // Attach a global AJAX error handler
        $(document).ajaxError(this.handleAjaxError.bind(this));

        // Hide the info / error boxes when clicked
        $("#infoBox, #errorBox").click(function () {
            $(this).fadeOut();
        });

        // Initially load the "Home" view when the app starts
        // this.showHomeView();
        this.showGuestView();
    }

    showInfo(message) {
        $('#infoBox').text(message).show();
        setTimeout(function () {
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


    showGuestView() {
        KinveyRequester.findGuestPosts()
            .then(loadPostsSuccess.bind(this));
        function loadPostsSuccess(posts) {
            function sortFunction(a, b) {
                let dateA = new Date(a.date).getTime();
                let dateB = new Date(b.date).getTime();
                return Number(dateA) < Number(dateB) ? 1 : -1;
            }

            posts.map(post => post.description.length > 600 ?
                post.description = post.description.slice(0, 600) + ' ...' :
                '');

            this.showView(<HomeView posts={posts.sort(sortFunction)}
                                    username={this.state.username}
                                    postTitleClicked={this.showViewDetails.bind(this)}
            />);
        }
    }

    showLoginView() {
        this.showView(<LoginView onsubmit={this.login.bind(this)}/>);
    }

    /// TODO HERE
    login(username, password) {
        KinveyRequester.loginUser(username, password)
            .then(loginSuccess.bind(this));

        function loginSuccess(userInfo) {
            if (userInfo.isDeleted !== "true") {
                this.saveAuthInSession(userInfo);
                this.showGuestView();
                this.showInfo("Login successful.");
            }
        }
    }

    showRegisterView() {
        this.showView(<RegisterView onsubmit={this.register.bind(this)}/>);
    }

    /// TODO HERE
    register(username, password, repeat, fullname, roles, isDeleted) {
            if(password !== repeat){
                this.showError("Password did not match");
                return;
            }

            KinveyRequester.registerUser(username, password, repeat, fullname, roles, isDeleted)
                .then(registerSuccess.bind(this))

            function registerSuccess(userInfo) {
                this.saveAuthInSession(userInfo);
                this.showPostsView();
                this.showInfo("User registration successful.");
            }

    }

    /// TODO HERE
    saveAuthInSession(userInfo) {
        sessionStorage.setItem('authToken', userInfo._kmd.authtoken);
        sessionStorage.setItem('userId', userInfo._id);
        sessionStorage.setItem('username', userInfo.username);
        sessionStorage.setItem('roles', userInfo.roles);
        sessionStorage.setItem('fullname', userInfo.fullname);
        sessionStorage.setItem('isDeleted', userInfo.isDeleted);

        // This will update the entire app UI (e.g. the navigation bar)
        this.setState({
            username: userInfo.username,
            userId: userInfo._id,
            roles: userInfo.roles,
            fullname: userInfo.fullname,
            isDeleted: userInfo.isDeleted
        });
    }

    //Added PAGINATION
    showPostsView() {
        KinveyRequester.findAllPosts()
            .then(loadPostsSuccess.bind(this));

        function loadPostsSuccess(posts) {
            //Function for sorting posts by date in descending order!!!
            function sortFunction(a, b){
                let dateA = new Date(a.date).getTime();
                let dateB = new Date(b.date).getTime();
                return Number(dateA) < Number(dateB) ? 1 : -1;
            }

            this.showInfo("Post loaded.");

            //Cutting all posts length higher than 200 symbols!!!
            posts.map(post => post.description.length > 200 ?
                post.description = post.description.slice(0,200) + '...' :
                '');

            let postsPerPage = 4;
            let startPostNumber = 0
            let countPages = Math.ceil(Number(posts.length) / postsPerPage);
            let postsToDisplay = posts.sort(sortFunction).slice(startPostNumber, startPostNumber+postsPerPage)

            this.showView(
                <PostsView
                    posts={postsToDisplay}
                    postsPerPage={postsPerPage}
                    countPages={countPages}
                    currentPage={1}
                    userId={this.state.userId}
                    editPostClicked={this.preparePostForEdit.bind(this)}
                    deletePostClicked={this.confirmPostDelete.bind(this)}
                    viewDetailsClicked={this.showViewDetails.bind(this)}
                    pageNumberClicked={showPageClicked.bind(this)}
                />
            );

            function showPageClicked(currentPage){
                startPostNumber = postsPerPage*(currentPage - 1);
                postsToDisplay = posts.sort(sortFunction).slice(startPostNumber, startPostNumber+postsPerPage)
                // console.log(posts.sort(sortFunction)[startPostNumber]);
                // console.log(postsToDisplay);
                this.showView(
                    <PostsView
                        posts={postsToDisplay}
                        postsPerPage={postsPerPage}
                        countPages={countPages}
                        currentPage={currentPage}
                        userId={this.state.userId}
                        editPostClicked={this.preparePostForEdit.bind(this)}
                        deletePostClicked={this.confirmPostDelete.bind(this)}
                        viewDetailsClicked={this.showViewDetails.bind(this)}
                        pageNumberClicked={showPageClicked.bind(this)}
                    />
                );
            }
        }
    }

    //List my Post here
    showMyPost() {

        KinveyRequester.findAllPosts()
            .then(loadPostsSuccess.bind(this));

        function loadPostsSuccess(posts) {
            this.showInfo("Post loaded.");

            let myPosts = posts.filter(post => (post._acl.creator === sessionStorage.getItem('userId')));
            this.showView(
                <MyPostsView
                    posts={myPosts}
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
                    postId={post._id}
                    title={post.title}
                    author={post.author}
                    description={post.description}
                />
            );
        }
    }

    deletePost(postId) {
        let deletePostCommentsRequest = KinveyRequester.deletePostComments(postId);
        let deletePostRequest = KinveyRequester.deletePost(postId);

        Promise.all([deletePostCommentsRequest, deletePostRequest])
            .then(deletePostSuccess.bind(this));
        function deletePostSuccess() {
            this.showPostsView();
            this.showInfo("Post deleted.");
        }
    }

    showViewDetails(postId) {
        if (!this.state.username) {
            let selectedPostRequest = KinveyRequester.findGuestPostById(postId)
            let selectedPostCommentsRequest = KinveyRequester.findGuestSelectedPostComments(postId);
            Promise.all([selectedPostRequest, selectedPostCommentsRequest])
                .then(details.bind(this))
        } else {
            let selectedPostRequest = KinveyRequester.findPostById(postId);
            let selectedPostCommentsRequest = KinveyRequester.findSelectedPostComments(postId);
            Promise.all([selectedPostRequest, selectedPostCommentsRequest])
                .then(details.bind(this))
        }


        function details([post, comments]) {
            this.showView(<PostDetails
                    comments={comments}
                    post={post}
                    postId={post._id}
                    imageUrl={post.imageUrl}
                    title={post.title}
                    author={post.author}
                    content={post.description}
                    addCommentClicked={this.showViewAddComment.bind(this)}
                    backToPosts={(sessionStorage.getItem('userId'))? this.showPostsView.bind(this):this.showGuestView.bind(this)}
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

    addCommentToDatabase(postId, comment, commentAuthor) {
        KinveyRequester.addPostComment(postId, comment, commentAuthor)
            .then(addPostCommentSuccess.bind(this))

        function addPostCommentSuccess() {
            KinveyRequester.findPostById(postId)
                .then(this.showInfo('Comment added successful'))
                .then(this.showViewDetails(postId))

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
                    date={postInfo.date}
                    imageUrl={postInfo.imageUrl}
                />
            );
        }
    }

    editPost(postId, title, author, description, date, url) {
        KinveyRequester.editPost(postId, title, author, description, date, url)
            .then(editPostSuccess.bind(this));

        function editPostSuccess() {
            this.showPostsView();
            this.showInfo("Post edited.");
        }
    }

    createPost(title, author, description, imageUrl) {
        KinveyRequester.createPost(title, author, description, imageUrl, new Date())
            .then(createPostSuccess.bind(this));

        function createPostSuccess(data) {
            this.showPostsView();
            this.showInfo("Post created.");
        }
    }

    showCreatePostView() {
        this.showView(
            <CreatePostView
                username={this.state.username}
                onsubmit={this.createPost.bind(this)}
            />
        );
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
        this.showView(<UploadPhotoView onsubmit={this.uploadPhoto.bind(this)}/>);
    }

    logout() {
        KinveyRequester.logoutUser();
        sessionStorage.clear();
        this.setState({username: null, userId: null});
        this.showGuestView();
        this.showInfo('Logout successful.');
    }

    /// TODO ALL FROM HERE
    //showModeratorView
    showModeratorUsersView() {
        KinveyRequester.findAllUsers()
            .then(loadUsersSuccess.bind(this));

        function loadUsersSuccess(users) {
            this.showInfo("Users loaded.");
            this.showView(
                <ModeratorUsersView
                    users={users}
                    userId={this.state.userId}
                    editModeratorUserClicked={this.prepareUserForEditByModerator.bind(this)}
                    deleteModeratorUserClicked={this.confirmUserDeleteByModerator.bind(this)}
                    viewModeratorUserDetailsClicked={this.showUserViewDetailsByAdmin.bind(this)}
                />
            );
        }
    }

    showUsersView() {
        KinveyRequester.findAllUsers()
            .then(loadUsersSuccess.bind(this));

        function loadUsersSuccess(users) {
            this.showInfo("Users loaded.");
            this.showView(
                <UsersView
                    users={users}
                    userId={this.state.userId}
                    editUserClicked={this.prepareUserForEdit.bind(this)}
                    deleteUserClicked={this.confirmUserDelete.bind(this)}
                    viewUserDetailsClicked={this.showUserViewDetails.bind(this)}
                />
            );
        }
    }


    //// TODO DELETE ALL USERS BY MODERATOR

    confirmUserDeleteByModerator(userId) {
        KinveyRequester.findUserById(userId)
            .then(loadUserForDeleteSuccess.bind(this));
        function loadUserForDeleteSuccess(user) {
            this.showView(
                <ModeratorDeleteUserView
                    onsubmit={this.deleteUser.bind(this)}
                    userId={user._id}
                    username={user.username}
                    repeat={user.repeat}
                    fullname={user.fullname}
                    roles={user.roles}
                    isDeleted={user.isDeleted}
                />
            );
        }
    }


    //// TODO DELETE USER BY ADMIN
    confirmUserDelete(userId) {
        KinveyRequester.findUserById(userId)
            .then(loadUserForDeleteSuccess.bind(this));
        function loadUserForDeleteSuccess(user) {
            this.showView(
                <DeleteUserView
                    onsubmit={this.deleteUser.bind(this)}
                    userId={user._id}
                    username={user.username}
                    repeat={user.repeat}
                    fullname={user.fullname}
                    roles={user.roles}
                    isDeleted={user.isDeleted}
                />
            );
        }
    }


    deleteUser(userId, username, repeat, fullname, roles, isDeleted) {
        KinveyRequester.deleteUser(userId, username, repeat, fullname, roles, isDeleted)
            .then(deleteUserSuccess.bind(this));
        function deleteUserSuccess(data) {
            if (sessionStorage.getItem('roles') === "moderator") {
                this.showModeratorUsersView();
            } else {
                this.showUsersView();
            }

            this.showInfo("User deleted.");
        }
    }


    ///// TODO DETAILS USERS MODERATOR
    showUserViewDetailsByAdmin(userId) {
        KinveyRequester.findUserById(userId).then(details.bind(this));
        function details(dataSuccess) {
            this.showView(
                <ViewDetailsUserClickedByModerator
                    username={dataSuccess.username}
                    fullname={dataSuccess.fullname}
                    roles={dataSuccess.roles}
                    isDeleted={dataSuccess.isDeleted}
                />
            );
        }
    }


    ///// TODO DETAILS USERS ADMIN
    showUserViewDetails(user) {
        KinveyRequester.findUserById(user).then(details.bind(this));
        function details(dataSuccess) {
            this.showView(
                <ViewDetailsUserClicked
                    username={dataSuccess.username}
                    fullname={dataSuccess.fullname}
                    roles={dataSuccess.roles}
                    isDeleted={dataSuccess.isDeleted}
                />
            );
        }
    }


    //////// TODO EDIT MODERATOR
    prepareUserForEditByModerator(userId) {

        KinveyRequester.findUserById(userId)
            .then(loadUserForEditSuccess.bind(this));

        function loadUserForEditSuccess(userInfo) {
            this.showView(
                <ModeratorEditUserView
                    onsubmit={this.editUser.bind(this)}
                    userId={userInfo._id}
                    username={userInfo.username}
                    password={userInfo.password}
                    repeat={userInfo.repeat}
                    fullname={userInfo.fullname}
                    roles={userInfo.roles}
                    isDeleted={userInfo.isDeleted}
                />
            );
        }
    }

    // /////////// TODO EDIT ADMIN
    prepareUserForEdit(userId) {
        KinveyRequester.findUserById(userId)
            .then(loadUserForEditSuccess.bind(this));

        function loadUserForEditSuccess(userInfo) {
            this.showView(
                <EditUserView
                    onsubmit={this.editUser.bind(this)}
                    userId={userInfo._id}
                    username={userInfo.username}
                    password={userInfo.password}
                    repeat={userInfo.repeat}
                    fullname={userInfo.fullname}
                    roles={userInfo.roles}
                    isDeleted={userInfo.isDeleted}
                />
            );
        }
    }


    editUser(userId, username, password, repeat, fullname, roles, isDeleted) {
        if(password !== repeat){
            this.showError("Password did not match");
            return;
        }

        KinveyRequester.editUser(userId, username, password, repeat, fullname, roles, isDeleted)
            .then(editUserSuccess.bind(this));

        function editUserSuccess(info) {
            if (sessionStorage.getItem('roles') === "moderator") {
                this.showModeratorUsersView();
            } else {
                this.showUsersView();
            }
            this.showInfo("User edited.");
        }
    }

}
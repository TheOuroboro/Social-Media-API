This Is the readme file for the ECX Social Media Api Assignment for the week 5 of the training.

We'll be building an api that will use the following
- Proper DDL
- Use foreign Key
- Model one to many and many - many relationship 
- Use JOIN to fetch data
- Expose everything via an express api


          ┌───────────────┐
          │   app.js      │
          │ (Middleware)  │
          └──────┬────────┘
                 │
     ┌───────────┴─────────────┐
     │                         │
┌─────────────┐           ┌─────────────┐
│  Routes     │           │  Routes     │
│ /api/users  │           │ /api/posts  │
└─────┬───────┘           └─────┬───────┘
      │                           │
      │                           │
┌─────┴─────────┐         ┌───────┴────────┐
│ userController│         │ postController │
│ createUser    │         │ createPost     │
│ getUsers      │         │ getAllPosts    │
└─────┬─────────┘         │ getPostById    │
                          │ getPostWithLikes│
                          │ getPostsByAuthor│
                          └─────┬───────────┘
                                │
                                │
                    ┌───────────┴───────────┐
                    │         DB            │
                    │ Users      Posts      │
                    │ Comments   Likes      │
                    │ Follows                │
                    └───────────────────────┘

┌───────────────┐      ┌───────────────┐
│ /api/comments │      │ /api/likes    │
└─────┬─────────┘      └─────┬─────────┘
      │                      │
      │                      │
┌─────┴─────────┐      ┌─────┴─────────┐
│ commentCtrl   │      │ likeController│
│ createComment │      │ likePost      │
│ getPostComments│     │ unlikePost    │
└───────────────┘      └───────────────┘

┌───────────────┐
│ /api/follows  │
└─────┬─────────┘
      │
┌─────┴─────────┐
│ followController│
│ followUser     │
│ unfollowUser   │
└───────────────┘

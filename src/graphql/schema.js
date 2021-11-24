import {buildSchema} from 'graphql'

import {createPost,
        posts,
      post} from './resolvers'

export const graphqlSchema = buildSchema(`
      type Query {
        posts: [Post]
        post(id:ID!): Post
      },
      type Mutation {
        createPost(postInput: PostInputData) : Post
      },
     
        type Post{
            _id:ID
            title: String
            price: Int
            thumbnail: String
        },

        input PostInputData {
            title: String!
            price: Int!
            thumbnail: String!
        }
  
`)

export const graphqlRoot = {
    createPost,
    posts,
    post
}


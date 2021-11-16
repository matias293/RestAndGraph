import {buildSchema} from 'graphql'

import {createPost,
        posts} from './resolvers'

export const graphqlSchema = buildSchema(`
      type Query {
        posts: [Post]
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
    posts
}


import conf from '../conf/conf'
import {Client, ID, Databases, Query, Storage} from 'appwrite'

export class Service{
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title,slug, content, featuredImg, status, userId }){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImg,
                    status,
                    userId,
                }
            )
        } catch (error) {
            console.log("Appwrite :: createPost :: error",error);
        }
    }

    async updatePost(slug, {title, content, featuredImg, status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImg,
                    status,
                }
            )
        } catch (error) {
            console.log("Appwrite :: updatePost :: error",error);
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("Appwrite :: deletePost :: error",error);
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("Appwrite :: getPost :: error",error)
        }
    }
            //We have to create "status" key in index of Database in Appwrite.
    async getPosts(queries = [Query.equal("status", "active")]){
       try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            )
       } catch (error) {
        console.log("Appwrite :: getPosts :: error",error)
       }
    }

    //Here we upload the file and delete the file..
    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite :: uploadFile :: error",error)
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite :: deleteFile :: error",error)
            return false
        }
    }

    async getFilePreview(fileId){

            return this.bucket.getFilePreview(
                conf.appwriteBucketId,
                fileId
            )
    }
}
const service = new Service();
export default service
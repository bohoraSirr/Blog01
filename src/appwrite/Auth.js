//This file is designed to built the functionality of create account, login account , logout ..

///////////////////////////////////////
////// This is the main functionality file and can be reused later in other project too if appwrite is used.

import conf from '../conf/conf'
import {Client, Account, ID} from 'appwrite';

export class AuthService {
    client  = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.account = new Account(this.client);
    }

    async createAccount({email, password, name}){
        try {
          const userUser =  await this.account.create(ID.unique(), email, password, name);
          if (userUser) {
            return this.login({email, password});
          } else {
            return userUser;
          }
        } catch (error) {
            console.log("Appwrite :: createAccount :: error",error);
        }
    }
    async login({email, password}) {
        try {
          return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.log("Appwrite :: login :: error",error);
        }
    }

    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite :: logout :: error",error);
        }
    }
    async getCurrentUser() {
        try {
          return await this.account.get()
        } catch (error) {
            console.log("Appwrite :: getCurrentUser :: error", error)
        }
        return null;
    }
}

const authService = new AuthService();
export default authService

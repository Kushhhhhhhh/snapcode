import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { ConnectToDB } from "./lib/db"
import User from "./models/userModel"

export const { handlers, auth } = NextAuth({ providers: [ GitHub({
    clientId: process.env.AUTH_GITHUB_ID,
    clientSecret: process.env.AUTH_GITHUB_SECRET
}) ],
secret: process.env.AUTH_SECRET,

callbacks: {
    async signIn({account, profile}){
        if(account?.provider === "github"){
            await ConnectToDB();
            
            try {
                const user = await User.findOne({email: profile?.email});

                if(!user){
                   const newUser = await User.create({
                        username: profile?.login,
                        fullName: profile?.name,
                        email: profile?.email,
                        avatar: profile?.avatar_url
                    });

                    await newUser.save();
                }

                return true;

            } catch (error) {
                console.log(error);
                return false
            }
        }
        return false;
    }
}
})
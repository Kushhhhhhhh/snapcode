import { Session } from "next-auth";
import { NextRequest } from "next/server";

export const authConfig = {
    pages:{
        signIn: '/login',
    },
    providers:[],
    callbacks:{
        async authorized({auth, request}: {auth: Session | null , request: NextRequest}) {
            const user = auth?.user
            const isVisitingChatPage = request.nextUrl.pathname.startsWith('/chat');
            const isVisitingAuthPage = request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/signup');

            if(isVisitingChatPage && !user){
                return false;
            } else if(isVisitingAuthPage && user){
                return Response.redirect(new URL('/chat', request.nextUrl));
            } else {
                return true;
            }
        }
    }
}
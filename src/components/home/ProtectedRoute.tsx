import { useSelector } from "react-redux"
import type { RootState } from "../../app/store"
import { Navigate } from "react-router";
import { type ReactNode } from "react";

type ProtectedRouteProps ={
    children: ReactNode;
}

export const ProtectedRoute = ({children}: ProtectedRouteProps) => {

    const {isAuthenticated} = useSelector((state:RootState)=> state.auth);

    if(!isAuthenticated){
        return <Navigate to='/login' replace/>
    }
  return <>{children}</>
}
